import 'server-only';

// Live explainers from the Nudgeable Learn database. Reads only what Learn already serves to anonymous
// visitors, with its publishable key. Pages revalidate on the same interval, so a new or edited lesson
// reaches nudgeable.ai within about a minute, with no redeploy.
export const CATALOG_REVALIDATE_SECONDS = 60;

export type Explainer = {
  id: string;
  title: string;
  summary: string;
  duration: string;
  thumbnail: string | null;
  previewUrl: string | null;
  youTubeId: string | null;
  featured: boolean;
  views: number;
  likes: number;
};

export type ExplainerArea = {
  key: string;
  label: string;
  description: string;
  explainers: Explainer[];
  comingSoon: number;
};

type AreaRow = { key: string; label: string; description: string | null };
type LessonRow = {
  id: string;
  title: string;
  summary: string | null;
  source: string | null;
  duration_sec: number | null;
  video_url: string | null;
  thumbnail_url: string | null;
  featured: boolean | null;
  status: string;
  area: string;
  lesson_stats: { views: number; likes: number } | null;
};

function youTubeId(url: string) {
  return url.match(/^https:\/\/(?:(?:www\.|m\.)?youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/)?.[1] ?? null;
}

// The same rules as Learn's durationLabel, so a card reads the same on both sites
function durationLabel(source: string | null, seconds: number | null) {
  if (source === 'guide') return '5 min read';
  if (source === 'tool' || source === 'claude') return 'walkthrough';
  if (seconds) return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  return source === 'short' ? 'under 1 min' : 'video';
}

function toExplainer(row: LessonRow): Explainer {
  const video = row.video_url ?? '';
  const id = row.source === 'yt' || row.source === 'short' ? youTubeId(video) : null;
  return {
    id: row.id,
    title: row.title,
    summary: row.summary ?? '',
    duration: durationLabel(row.source, row.duration_sec),
    thumbnail: id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : row.thumbnail_url,
    previewUrl: row.source === 'hosted' && video ? video : null,
    youTubeId: id,
    featured: Boolean(row.featured),
    views: row.lesson_stats?.views ?? 0,
    likes: row.lesson_stats?.likes ?? 0
  };
}

async function read<T>(url: string, path: string, key: string): Promise<T> {
  const response = await fetch(`${url}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: CATALOG_REVALIDATE_SECONDS, tags: ['learn-catalog'] }
  });
  if (!response.ok) throw new Error(`Learn catalog: ${path.split('?')[0]} returned ${response.status}`);
  return response.json() as Promise<T>;
}

// Returns an empty list when Learn is unreachable or not configured; the sections then link to Learn.
export async function getExplainerAreas(): Promise<ExplainerArea[]> {
  const url = process.env.LEARN_SUPABASE_URL?.replace(/\/+$/, '');
  const key = process.env.LEARN_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const [areas, lessons] = await Promise.all([
      read<AreaRow[]>(url, 'areas?select=key,label,description&order=position', key),
      read<LessonRow[]>(url, 'lessons?select=id,title,summary,source,duration_sec,video_url,thumbnail_url,featured,status,area,lesson_stats(views,likes)&area=not.is.null&status=in.(published,coming_soon)&order=position', key)
    ]);
    return areas.map(area => {
      const rows = lessons.filter(lesson => lesson.area === area.key);
      return {
        key: area.key,
        label: area.label,
        description: area.description ?? '',
        explainers: rows.filter(lesson => lesson.status === 'published').map(toExplainer),
        comingSoon: rows.filter(lesson => lesson.status === 'coming_soon').length
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
