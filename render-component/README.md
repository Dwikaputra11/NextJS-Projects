# Rendering & Components Deep Dive

## Server Components
By default, Next.Js render all the page in server side not in client side (client's browser).
The output is static html + minimal js. 
This actually great for performance which cause smaller bundle sizes and faster load times.

Use Server Components when you need:

- Fetch data from databases or APIs close to the source.
- Use API keys, tokens, and other secrets without exposing them to the client.
- Reduce the amount of JavaScript sent to the browser.
- Improve the First Contentful Paint (FCP), and stream content progressively to the client.

### Advantages
- Data fetching happens securely on the server
- can directly query databases or call API.
- Reduce javascript shipped to the client.

### Disadvantages
- No Browser API (e.g. Window, Document)
- No React Hooks like useState, useEffect
- For Interactivity, you need client components (e.g. Theme, alert)

## Client Components
Components that run in the browsers instead of the server.

write this on top of the page.
```javascript
"use client"
```

Use Client Components when you need:
- State and event handlers. E.g. onClick, onChange.
- Lifecycle logic. E.g. useEffect.
- Browser-only APIs. E.g. localStorage, window, Navigator.geolocation, etc.
- Custom hooks.