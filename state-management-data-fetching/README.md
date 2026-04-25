# State Management and Data Fetching

## TanStack Query
A server state management library for react and next.js

### Why we have to use?
- Handle data fetching
- Provided caching (no refetch everytime)
- Manages loading error, success states
- Support optimistic updates
- Offers retry logic out of the box

### Use Case
When fetching data on the client side (CSR)
```text
// a lot boilerplate
Fetch -> useEffect -> useState
```
### TanStack Query Provide
1. Cache by queryKey
2. Automatic retry on network failure
3. Refetch on window focus

```javascript
const {data: users, isLoading, error, isError} = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});
```


```tsx
 const {data: users, isLoading, error, isError} = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});

console.log(users);


if(isLoading) return <div className={"p-4"}>Loading users</div>
if(isError) return <div className={"p-4"}>Error: {error.message}</div>
```

## Hydration & Caching in NextJs

### What is caching?
saving a copy to server faster later

#### Type of Caching
- Page caching
- Api data caching
- database caching
- no caching

### What is hydration?
A static html page "come alive" and become interactive.

Analogy
```text
Frozen Pizza -> Put it in oven -> Hot Pizza
```

#### How it works?
```text
server send html (static page) 
-> javascript download (interaction code arrives) 
-> browsers prepares to make page interactive 
-> page "hydrate" (button works, form submits, animation play)
```# Next.js Core Concepts: State Management & Data Fetching

> A structured reference document summarizing key Next.js and React concepts including TanStack Query, hydration, and caching strategies.

---

## Table of Contents

- [TanStack Query (`useQuery`)](#tanstack-query-usequery)
- [Hydration in Next.js](#hydration-in-nextjs)
- [Caching in Next.js](#caching-in-nextjs)

---

## TanStack Query (`useQuery`)

### What is it?

**TanStack Query** (formerly React Query) is a powerful **server state management library** for React and Next.js. It abstracts the complexity of fetching, caching, synchronizing, and updating remote data in your application.

The `useQuery` hook is TanStack Query's primary API for **reading/fetching** remote data on the client side (CSR — Client-Side Rendering).

---

### What is it used for?

Without TanStack Query, fetching data on the client requires a significant amount of boilerplate:

```tsx
// ❌ Without TanStack Query — lots of manual work
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setIsLoading(true);
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err);
      setIsLoading(false);
    });
}, []);
```

`useQuery` collapses all of the above into a single, declarative call — while also providing features your manual implementation likely lacks:

| Feature | Manual (`useEffect` + `useState`) | TanStack Query |
|---|---|---|
| Loading state | ✅ Manual | ✅ Built-in |
| Error handling | ✅ Manual | ✅ Built-in |
| Caching | ❌ None | ✅ By `queryKey` |
| Auto-retry on failure | ❌ None | ✅ Built-in |
| Refetch on window focus | ❌ None | ✅ Built-in |
| Optimistic updates | ❌ Complex | ✅ Supported |

---

### How do you use it?

#### Syntax

```tsx
const { data, isLoading, error, isError } = useQuery({
  queryKey: ["unique-key"],
  queryFn: yourFetchFunction,
});
```

**Parameter breakdown:**

- **`queryKey`** — A unique array identifier for this query. TanStack Query uses this as the cache key. If another component calls `useQuery` with the same `queryKey`, it receives cached data instead of making a new network request.
- **`queryFn`** — An async function that fetches and returns the data. It should throw an error on failure (which TanStack Query will catch and expose via `isError`/`error`).

> [!NOTE]
> The `queryKey` is the foundation of TanStack Query's caching. Think of it as the "address" of your server data. Use descriptive, specific keys — e.g., `["users"]`, `["user", userId]`, `["posts", { status: "published" }]`.

> [!WARNING]
> `useQuery` is a **client-side** hook. It cannot be used inside React Server Components (RSC). If you are fetching data in a Server Component, use `fetch()` or an ORM directly — TanStack Query is for Client Components only.

---

### Code Implementation

```tsx
// lib/api.ts — Your fetch function
async function fetchUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
```

```tsx
// components/UserList.tsx — Client Component
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";

export default function UserList() {
  // useQuery handles fetching, caching, loading, and error states
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],   // Cache key — same key = same cached data
    queryFn: fetchUsers,   // The function that actually fetches data
  });

  // TanStack Query exposes granular states — handle each explicitly
  if (isLoading) return <div className="p-4">Loading users...</div>;
  if (isError)   return <div className="p-4">Error: {error.message}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

> [!NOTE]
> For `useQuery` to work, your app must be wrapped in `<QueryClientProvider>`. This is typically done once in your root layout or `_app.tsx`.
>
> ```tsx
> // app/providers.tsx
> "use client";
> import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
>
> const queryClient = new QueryClient();
>
> export function Providers({ children }: { children: React.ReactNode }) {
>   return (
>     <QueryClientProvider client={queryClient}>
>       {children}
>     </QueryClientProvider>
>   );
> }
> ```

---

### Resources

- [TanStack Query — Official Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query — `useQuery` API Reference](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)
- [Next.js — Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)

---

## Hydration in Next.js

### What is it?

**Hydration** is the process by which a **static HTML page sent from the server "comes alive"** and becomes fully interactive in the browser. The term comes from the idea of adding "water" (JavaScript interactivity) to a "dry" (static) HTML structure.

**Technical definition:** Hydration is the React process of attaching event listeners and client-side JavaScript state to server-rendered HTML, making it interactive without discarding or re-rendering the existing DOM.

---

### What is it used for?

Next.js (and React in general) leverages hydration to combine the best of two worlds:

- **Server-Side Rendering (SSR) / Static Generation (SSG):** The server sends fully-formed HTML, which the browser can display immediately. This means fast initial page loads and good SEO — the page content is visible even before JavaScript runs.
- **Client-Side Interactivity:** Once JavaScript downloads, React "hydrates" the page — attaching state, event handlers, and dynamic behavior to the existing HTML.

Without hydration, you would have to choose between a fast-but-static page (no interactivity) or a slow-but-interactive page (full CSR, blank screen on load).

---

### How does it work?

```
1. Server renders HTML  →  Sends static page to browser
         ↓
2. Browser receives HTML  →  Displays content immediately (fast!)
         ↓
3. JavaScript bundle downloads  →  React code arrives in browser
         ↓
4. React "hydrates"  →  Attaches event listeners to existing HTML
         ↓
5. Page is fully interactive  →  Buttons, forms, animations all work
```

**The pizza analogy:**

```
Frozen Pizza   →  Put in Oven  →  Hot Pizza
(Static HTML)     (Hydration)     (Interactive Page)
```

> [!NOTE]
> During hydration, React expects the HTML it generates on the client to **exactly match** the HTML sent by the server. A mismatch causes a **hydration error** — one of the most common bugs in Next.js development.
>
> **Common cause:** Rendering something that differs between server and client, such as `new Date()`, `Math.random()`, or browser-only APIs like `window` or `localStorage`.

> [!WARNING]
> **Hydration errors to watch for:**
> - Using `window`, `localStorage`, or `document` directly in a component that renders on the server.
> - Displaying timestamps or random values without ensuring server/client output matches.
> - **Fix:** Use `useEffect` to run browser-only code after hydration, or use Next.js's `dynamic()` with `{ ssr: false }`.

---

### Code Implementation

```tsx
// ✅ Safe pattern — browser-only code runs after hydration
"use client";

import { useEffect, useState } from "react";

export default function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, AFTER hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on the server — avoids hydration mismatch
  if (!mounted) return null;

  return <div>Window width: {window.innerWidth}px</div>;
}
```

```tsx
// ✅ Alternative — disable SSR entirely for a component
import dynamic from "next/dynamic";

const BrowserOnlyWidget = dynamic(
  () => import("@/components/BrowserOnlyWidget"),
  { ssr: false } // This component will NEVER be server-rendered — no hydration needed
);
```

---

### Resources

- [Next.js — Rendering: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [React.dev — Hydration](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Next.js — `dynamic` (disable SSR)](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr)
- [Understanding Cache & Hydration (LinkedIn Article)](https://www.linkedin.com/pulse/understanding-cache-hydration-venu-vardhan-reddy-tekula-wz2ne/)

---

## Caching in Next.js

### What is it?

**Caching** is the practice of **saving a copy of data or a computed result** so it can be served faster on subsequent requests — without repeating the original, expensive operation (like a database query or API call).

In the context of Next.js, caching is a first-class feature deeply integrated into the framework across multiple layers of your application.

---

### What is it used for?

Without caching, every user request triggers a full round-trip: your server fetches fresh data from the database or an external API, builds the response, and sends it. This is slow and resource-intensive at scale.

Caching solves this by storing the result and reusing it:

```
Without Cache:  User Request → Server → Database → Response  (slow every time)
With Cache:     User Request → Cache HIT → Response           (fast after first)
```

---

### Types of Caching in Next.js

Next.js supports multiple caching strategies, each suited to different scenarios:

#### 1. Page / Full Route Caching

The entire rendered page output is cached. Used with Static Site Generation (SSG) — pages are built at deploy time and served as static files from a CDN.

```tsx
// app/blog/[slug]/page.tsx
// generateStaticParams tells Next.js which pages to pre-render and cache at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug); // Fetched once at build, then cached
  return <article>{post.content}</article>;
}
```

#### 2. API / `fetch()` Data Caching

Next.js **extends the native `fetch()` API** to support caching at the data level. This is controlled by the `cache` and `next.revalidate` options.

```tsx
// app/page.tsx — Server Component

// ✅ Cache indefinitely (static) — fetch once, serve forever
const data = await fetch("https://api.example.com/data", {
  cache: "force-cache", // Default in Next.js App Router
});

// ✅ Revalidate every 60 seconds (ISR — Incremental Static Regeneration)
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 60 },
});

// ✅ No caching — always fetch fresh (SSR behavior)
const data = await fetch("https://api.example.com/data", {
  cache: "no-store",
});
```

#### 3. Client-Side Caching (TanStack Query)

For data fetched on the client, TanStack Query provides its own caching layer keyed by `queryKey`. See the [`useQuery` section](#tanstack-query-usequery) above.

#### 4. No Caching

Used when data must always be fresh — e.g., user dashboards, real-time feeds, or financial data.

```tsx
// Forces dynamic rendering — no caching at any level
export const dynamic = "force-dynamic";

export default async function LiveDashboard() {
  const stats = await fetch("/api/stats", { cache: "no-store" });
  // ...
}
```

---

### Caching Strategy Summary

| Strategy | Next.js Mechanism | When to Use |
|---|---|---|
| **Static / Page Cache** | `generateStaticParams`, `force-cache` | Content that rarely changes (blogs, docs) |
| **ISR (Time-based Revalidation)** | `next: { revalidate: N }` | Semi-dynamic content (product listings) |
| **Server-Side (No Cache)** | `cache: "no-store"`, `force-dynamic` | User-specific or real-time data |
| **Client-Side Cache** | TanStack Query `queryKey` | Data fetched from Client Components |

> [!NOTE]
> Next.js App Router **caches aggressively by default**. If your data appears stale during development, check whether your `fetch()` calls are missing `cache: "no-store"` or whether you need to call `revalidatePath()` / `revalidateTag()` after a mutation.

---

### Resources

- [Next.js — Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Next.js — `fetch()` with Caching Options](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api)
- [Next.js — Incremental Static Regeneration (ISR)](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Next.js — `revalidatePath` and `revalidateTag`](https://nextjs.org/docs/app/building-your-application/caching#revalidating)
- [Understanding Cache & Hydration (LinkedIn Article)](https://www.linkedin.com/pulse/understanding-cache-hydration-venu-vardhan-reddy-tekula-wz2ne/)

---

*Last updated: April 2026 · Next.js 15+ (App Router) · TanStack Query v5*

#### Why Hydration matters?
- make interaction

**Resource Links:**
- [Caching & Hydration](https://www.linkedin.com/pulse/understanding-cache-hydration-venu-vardhan-reddy-tekula-wz2ne/)