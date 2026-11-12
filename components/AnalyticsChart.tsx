'use client';

import { useState } from 'react';

export interface TimelineBucket {
  key: string;
  label: string;
  visitors: number;
  videoVisitors: number;
  blogVisitors: number;
}

type SeriesKey = 'visitors' | 'videoVisitors' | 'blogVisitors';

const SERIES: { key: SeriesKey; label: string; color: string }[] = [
  { key: 'visitors', label: 'All visitors', color: '#1d4ed8' },
  { key: 'videoVisitors', label: 'On videos', color: '#ea580c' },
  { key: 'blogVisitors', label: 'On blogs', color: '#16a34a' }
];

const WIDTH = 900;
const HEIGHT = 220;
const PAD_LEFT = 34;
const PAD_RIGHT = 8;
const PAD_BOTTOM = 24;
const PAD_TOP = 22;

export function AnalyticsChart({ timeline }: { timeline: TimelineBucket[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!timeline.length) return null;

  const max = Math.max(1, ...timeline.map(b => b.visitors), ...timeline.map(b => b.videoVisitors || 0), ...timeline.map(b => b.blogVisitors || 0));
  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const baseline = HEIGHT - PAD_BOTTOM;
  const slot = timeline.length > 1 ? plotWidth / (timeline.length - 1) : 0;

  // Show at most ~10 x-axis labels so they don't collide.
  const labelStride = Math.max(1, Math.ceil(timeline.length / 10));

  function xFor(index: number) {
    return timeline.length > 1 ? PAD_LEFT + index * slot : PAD_LEFT + plotWidth / 2;
  }

  function yFor(value: number) {
    return PAD_TOP + plotHeight - (value / max) * plotHeight;
  }

  const lines = SERIES.map(series => {
    const points = timeline.map((bucket, index) => ({ x: xFor(index), y: yFor(bucket[series.key] || 0) }));
    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    return { ...series, points, path };
  });
  const main = lines[0];
  const areaPath = `${main.path} L ${main.points[main.points.length - 1].x} ${baseline} L ${main.points[0].x} ${baseline} Z`;

  const gridLines = [0.25, 0.5, 0.75, 1].map(fraction => ({
    fraction,
    y: PAD_TOP + plotHeight * (1 - fraction),
    value: Math.round(max * fraction)
  }));

  const active = hovered !== null ? timeline[hovered] : null;
  const activeX = hovered !== null ? xFor(hovered) : null;

  return <div className="analytics-chart">
    <div className="analytics-chart-legend">
      {SERIES.map(series => <span key={series.key}><i style={{ background: series.color }} />{series.label}</span>)}
    </div>
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Unique visitors over time, overall and on videos and blogs" className="analytics-chart-svg">
      {gridLines.map(line => (
        <g key={line.fraction}>
          <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={line.y} y2={line.y} className="analytics-chart-grid" />
          <text x={PAD_LEFT - 8} y={line.y} textAnchor="end" dominantBaseline="middle" className="analytics-chart-axis-label">{line.value}</text>
        </g>
      ))}

      <path d={areaPath} className="analytics-chart-area" fill={main.color} />
      {lines.map(line => <path key={line.key} d={line.path} className="analytics-chart-line" stroke={line.color} fill="none" />)}

      {activeX !== null && (
        <line x1={activeX} x2={activeX} y1={PAD_TOP} y2={baseline} className="analytics-chart-crosshair" />
      )}

      {timeline.map((bucket, index) => {
        const x = xFor(index);
        const showLabel = index % labelStride === 0 || index === timeline.length - 1;
        const mainY = main.points[index].y;
        return <g
          key={bucket.key}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="analytics-chart-hit"
        >
          {/* Full-height invisible hit target, wider than the line itself */}
          <rect x={x - slot / 2} y={PAD_TOP} width={slot || plotWidth} height={plotHeight} fill="transparent" />
          {/* Draw the main line's dot last so it sits on top where lines overlap */}
          {[...lines].reverse().map(line => (
            <circle key={line.key} cx={x} cy={line.points[index].y} r={hovered === index ? 4 : 2.5} fill={line.color} className="analytics-chart-dot" />
          ))}
          {bucket.visitors > 0 && (
            <text
              x={x}
              y={mainY <= PAD_TOP + 10 ? mainY + 14 : mainY - 8}
              textAnchor="middle"
              className="analytics-chart-value-label"
            >
              {bucket.visitors}
            </text>
          )}
          {showLabel && (
            <text x={x} y={HEIGHT - PAD_BOTTOM + 16} textAnchor="middle" className="analytics-chart-axis-label">
              {bucket.label}
            </text>
          )}
        </g>;
      })}
    </svg>
    {active && <div className="analytics-chart-tooltip">
      <strong>{active.label}</strong>
      {SERIES.map(series => (
        <span key={series.key}><i style={{ background: series.color }} />{series.label}: {active[series.key] || 0}</span>
      ))}
    </div>}
  </div>;
}
