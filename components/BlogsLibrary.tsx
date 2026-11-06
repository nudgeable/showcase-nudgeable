'use client';

import { useState } from 'react';
import { BLOG_CATEGORIES, formatBlogDate, type BlogPost } from '@/lib/blogShared';
import { BlogCard } from './BlogCard';
import { BlogNewsletter } from './BlogNewsletter';
import { BlogThumb } from './BlogThumb';

const FILTERS = ['All', ...BLOG_CATEGORIES];
const PAGE_SIZE = 9;

export function BlogsLibrary({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const featured = posts.find(post => post.featured) ?? posts[0];
  const term = query.trim().toLowerCase();
  const matches = posts
    .filter(post => post.id !== featured?.id)
    .filter(post => category === 'All' || post.category === category)
    .filter(post => `${post.title} ${post.excerpt}`.toLowerCase().includes(term));

  function pick(next: string) {
    setCategory(next);
    setLimit(PAGE_SIZE);
  }

  return <>
    <section className="inner-hero editorial-hero unified-hero">
      <div className="container blog-hero-grid unified-hero-grid">
        <div className="blog-hero-copy">
          <div className="eyebrow"><span className="section-dash" />THE NUDGEABLE BLOG</div>
          <h1 className="unified-hero-title">
            <span className="hero-title-line">Better questions.</span>
            <span className="hero-title-line"><span className="hero-title-highlight">Useful ideas.</span></span>
            <span className="hero-title-line">For your work.</span>
          </h1>
          <p>Ideas and practical guidance on AI, behavior and work.</p>
        </div>
        <div className="blog-hero-feature">
          {featured
            ? <a className="featured-article" href={`/insights/blogs/${featured.slug}`}>
              <div className="featured-article-image">
                {featured.coverImage ? <img src={featured.coverImage} alt={featured.title} /> : <BlogThumb post={featured} />}
              </div>
              <div className="featured-article-copy">
                <div className="eyebrow"><span className="section-dash" />FEATURED ARTICLE</div>
                <span className="article-category">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="article-meta">Nudgeable · {formatBlogDate(featured.publishedAt)}</span>
                <span className="button">Read the article</span>
              </div>
            </a>
            : <p className="empty-results">New writing from the Nudgeable team will appear here.</p>}
        </div>
      </div>
    </section>
    <section className="section article-library">
      <div className="container">
        <div className="library-toolbar">
          <div className="filter-buttons" role="group" aria-label="Filter articles by topic">
            {FILTERS.map(filter => <button key={filter} className={`filter-chip${category === filter ? ' selected' : ''}`} aria-pressed={category === filter} onClick={() => pick(filter)}>{filter === 'All' ? 'All articles' : filter}</button>)}
          </div>
          <label className="library-search">
            <span>Search articles</span>
            <input type="search" id="article-search" placeholder="Search articles…" autoComplete="off" value={query} onChange={event => { setQuery(event.target.value); setLimit(PAGE_SIZE); }} />
          </label>
        </div>
        <div className="library-status" id="article-status" role="status">
          {matches.length} article{matches.length === 1 ? '' : 's'}{term ? ` matching “${query.trim()}”` : ''}{category !== 'All' ? ` in ${category}` : ''}
        </div>
        <div className="article-grid">{matches.slice(0, limit).map(post => <BlogCard key={post.id} post={post} />)}</div>
        <p id="article-empty" className="empty-results" hidden={matches.length !== 0}>No articles match your search. Try another topic or keyword.</p>
        <div className="load-more-wrap">
          <button className="button button-outline" id="more-articles" hidden={matches.length <= limit} onClick={() => setLimit(value => value + PAGE_SIZE)}>Show more articles</button>
        </div>
        <BlogNewsletter />
      </div>
    </section>
    <section className="academy-callout">
      <div className="container">
        <div>
          <div className="eyebrow"><span className="section-dash" />PREFER TO WATCH?</div>
          <h2>A new perspective.<br />In a <span className="serif-word">few minutes.</span></h2>
        </div>
        <a className="button" href="/insights">Explore the videos</a>
      </div>
    </section>
  </>;
}
