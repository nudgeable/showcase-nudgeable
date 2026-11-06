// Opened by any `.video-launch` button; see lib/design/common.ts.
export function VideoPlayerDialog() {
  return <dialog id="video-player" aria-labelledby="video-player-title">
    <div className="video-dialog-top">
      <h2 id="video-player-title">Watch video</h2>
      <button id="close-video" aria-label="Close video">✕</button>
    </div>
    <div id="video-embed" />
    <a id="watch-youtube" className="video-youtube-link" target="_blank" rel="noopener">Watch on YouTube</a>
  </dialog>;
}
