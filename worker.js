export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Try to serve from __STATIC_CONTENT (KV assets)
    try {
      const path = url.pathname === '/' ? '/index.html' : url.pathname
      const asset = await env.__STATIC_CONTENT.get(path)
      if (asset) {
        const contentType = getContentType(path)
        return new Response(asset, {
          headers: { 'Content-Type': contentType },
        })
      }
    } catch {}

    // SPA fallback: return index.html for all routes
    try {
      const indexHtml = await env.__STATIC_CONTENT.get('/index.html')
      if (indexHtml) {
        return new Response(indexHtml, {
          headers: { 'Content-Type': 'text/html;charset=UTF-8' },
        })
      }
    } catch {}

    return new Response('Not Found', { status: 404 })
  },
}

function getContentType(path) {
  if (path.endsWith('.html')) return 'text/html;charset=UTF-8'
  if (path.endsWith('.css')) return 'text/css'
  if (path.endsWith('.js')) return 'application/javascript'
  if (path.endsWith('.json')) return 'application/json'
  if (path.endsWith('.png')) return 'image/png'
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
  if (path.endsWith('.svg')) return 'image/svg+xml'
  if (path.endsWith('.ico')) return 'image/x-icon'
  if (path.endsWith('.woff2')) return 'font/woff2'
  if (path.endsWith('.woff')) return 'font/woff'
  return 'application/octet-stream'
}
