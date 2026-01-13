if (!self.define) {
  let e,
    s = {}
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;((e.src = a), (e.onload = s), document.head.appendChild(e))
        } else ((e = a), importScripts(a), s())
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (n, c) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[i]) return
    let t = {}
    const r = (e) => a(e, i),
      d = { module: { uri: i }, exports: t, require: r }
    s[i] = Promise.all(n.map((e) => d[e] || r(e))).then((e) => (c(...e), t))
  }
}
define(['./workbox-f1770938'], function (e) {
  'use strict'
  ;(importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/ICON_INSTRUCTIONS.md', revision: 'ed5784ca74582c53242a69feed7600c1' },
        { url: '/_next/static/chunks/109-d3a1d15b564361e2.js', revision: 'd3a1d15b564361e2' },
        { url: '/_next/static/chunks/175-c012f17dacfdb4b0.js', revision: 'c012f17dacfdb4b0' },
        { url: '/_next/static/chunks/217-5ca861cc8630d67a.js', revision: '5ca861cc8630d67a' },
        { url: '/_next/static/chunks/3-1c6c5d6b8bc7372e.js', revision: '1c6c5d6b8bc7372e' },
        { url: '/_next/static/chunks/4bd1b696-67e30520d621c4dd.js', revision: '67e30520d621c4dd' },
        { url: '/_next/static/chunks/506-06813f48354ccca9.js', revision: '06813f48354ccca9' },
        { url: '/_next/static/chunks/585.1079105c1db21c5a.js', revision: '1079105c1db21c5a' },
        { url: '/_next/static/chunks/609-513014f412c2f4da.js', revision: '513014f412c2f4da' },
        { url: '/_next/static/chunks/711-f31a1f809e820091.js', revision: 'f31a1f809e820091' },
        { url: '/_next/static/chunks/81-04016bf45f17a887.js', revision: '04016bf45f17a887' },
        { url: '/_next/static/chunks/835-b31bc9e44729ca97.js', revision: 'b31bc9e44729ca97' },
        { url: '/_next/static/chunks/890-3a467a7696e7250e.js', revision: '3a467a7696e7250e' },
        { url: '/_next/static/chunks/899.1813981119fa1f8a.js', revision: '1813981119fa1f8a' },
        { url: '/_next/static/chunks/928-9092f8175d6408b6.js', revision: '9092f8175d6408b6' },
        { url: '/_next/static/chunks/935-5caaef6c714e90d5.js', revision: '5caaef6c714e90d5' },
        {
          url: '/_next/static/chunks/app/(dashboard)/gastos/page-b95b92e9a6bdc47e.js',
          revision: 'b95b92e9a6bdc47e',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/inventario/page-5a61369fdc200593.js',
          revision: '5a61369fdc200593',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/layout-d0a7b0570fe690b5.js',
          revision: 'd0a7b0570fe690b5',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/page-6106a501180c6ebc.js',
          revision: '6106a501180c6ebc',
        },
        {
          url: '/_next/static/chunks/app/(dashboard)/ventas/page-bfa54f9d497eecac.js',
          revision: 'bfa54f9d497eecac',
        },
        {
          url: '/_next/static/chunks/app/_global-error/page-085dfe6b711ec138.js',
          revision: '085dfe6b711ec138',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-4107d80bae85edcc.js',
          revision: '4107d80bae85edcc',
        },
        {
          url: '/_next/static/chunks/app/layout-b1f0e6b60dd2fd25.js',
          revision: 'b1f0e6b60dd2fd25',
        },
        {
          url: '/_next/static/chunks/app/login/page-e9ba8d0c04b1f927.js',
          revision: 'e9ba8d0c04b1f927',
        },
        {
          url: '/_next/static/chunks/app/manifest.webmanifest/route-085dfe6b711ec138.js',
          revision: '085dfe6b711ec138',
        },
        { url: '/_next/static/chunks/framework-d7de93249215fb06.js', revision: 'd7de93249215fb06' },
        { url: '/_next/static/chunks/main-045e93c09e2534ea.js', revision: '045e93c09e2534ea' },
        { url: '/_next/static/chunks/main-app-280924dd1e8de14b.js', revision: '280924dd1e8de14b' },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/app-error-085dfe6b711ec138.js',
          revision: '085dfe6b711ec138',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/forbidden-085dfe6b711ec138.js',
          revision: '085dfe6b711ec138',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/global-error-b8b96b36cfe81b1b.js',
          revision: 'b8b96b36cfe81b1b',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/not-found-085dfe6b711ec138.js',
          revision: '085dfe6b711ec138',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/unauthorized-085dfe6b711ec138.js',
          revision: '085dfe6b711ec138',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        { url: '/_next/static/chunks/webpack-488f4a709a78c1b3.js', revision: '488f4a709a78c1b3' },
        { url: '/_next/static/css/50c017091c7d82cd.css', revision: '50c017091c7d82cd' },
        {
          url: '/_next/static/media/4cf2300e9c8272f7-s.p.woff2',
          revision: '18bae71b1e1b2bb25321090a3b563103',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/8d697b304b401681-s.woff2',
          revision: 'cc728f6c0adb04da0dfcb0fc436a8ae5',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        {
          url: '/_next/static/rZNkcCPTrJyELYXJG13-T/_buildManifest.js',
          revision: '78f0a4aae3e499a9217acd4e669d7334',
        },
        {
          url: '/_next/static/rZNkcCPTrJyELYXJG13-T/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/manifest.json', revision: '88b5e90c7b493666b8d0307b4c4766e3' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/swe-worker-5c72df51bb1f6ee0.js', revision: '76fdd3369f623a3edcf74ce2200bfdd0' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, { status: 200, statusText: 'OK', headers: e.headers })
                : e,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith('/api/auth/callback') || !s.startsWith('/api/')),
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        a &&
        !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') && a && !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    ),
    (self.__WB_DISABLE_DEV_LOGS = !0))
})
