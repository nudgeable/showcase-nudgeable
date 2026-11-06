import { formatBlogDate, readingTimeMinutes, type BlogPost } from '@/lib/blogShared';
import { BlogThumb } from './BlogThumb';

export function BlogCard({ post }: { post: BlogPost }) {
  return <article className="article-card">
    <a href={`/insights/blogs/${post.slug}`}>
      <div className="article-image">
        {post.coverImage ? <img src={post.coverImage} alt={post.title} loading="lazy" /> : <BlogThumb post={post} />}
      </div>
      <div className="article-body">
        <span className="article-category">{post.category}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="article-meta">
          <span>{formatBlogDate(post.publishedAt)} · {readingTimeMinutes(post.content)} min read</span>
          <b>Read article</b>
        </div>
      </div>
    </a>
  </article>;
}
