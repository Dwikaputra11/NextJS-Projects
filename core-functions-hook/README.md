# Core Functions and Hooks in Next.js (App Router)

> Learning summary covering the most commonly used built-in functions and hooks in Next.js App Router, with practical code examples.

---

## Table of Contents

- [fetch() — Data Fetching with Caching](#fetch--data-fetching-with-caching)
- [notFound() — Trigger 404 Page](#notfound--trigger-404-page)
- [useSearchParams() — Read Query Parameters](#usesearchparams--read-query-parameters)
- [useParams() — Read Dynamic Route Params](#useparams--read-dynamic-route-params)
- [useRouter() — Programmatic Navigation](#userouter--programmatic-navigation)
- [redirect() — Server-Side Redirect](#redirect--server-side-redirect)
- [Resource Links](#resource-links)

---

## `fetch()` — Data Fetching with Caching

### What is it?
Next.js **extends the native Web `fetch()` API** with additional options for caching and revalidation. Unlike plain `fetch()` in the browser, Next.js's version is deeply integrated with its caching system, allowing you to control how and when data is cached at the request or page level.

### What is it used for?
- Fetching data from APIs or external sources in **Server Components**
- Controlling caching behavior per-request (static, dynamic, or time-based)
- Enabling **Incremental Static Regeneration (ISR)** with `revalidate`
- Tagging fetch results for **on-demand revalidation** with `revalidateTag()`

### How to use it?

The extended `fetch()` accepts a second argument with `cache` and `next` options on top of the standard fetch options.

**Backend — API Route (`/api/timer/route.ts`)**
```ts
import { NextResponse } from "next/server";

export async function GET() {
  const currentTime = new Date();

  return NextResponse.json({
    timestamp: currentTime.toISOString(),
    readable: currentTime.toLocaleTimeString(),
    unix: currentTime.getTime(),
    message: "Timer API called successfully.",
    requestId: Math.random().toString(36).substring(2, 15),
  });
}
```

**Frontend — Page Component (`/app/page.tsx`)**
```ts
const page = async () => {
  const response = await fetch("http://localhost:3000/api/timer", {
    cache: "force-cache", // Cache the response indefinitely (default behavior)
    next: {
      revalidate: 10, // Re-fetch in the background every 10 seconds (ISR)
      tags: ["timer"], // Tag this fetch so it can be invalidated on-demand
    },
  });

  const data = await response.json();

  return (
    <div>
      <h1>Nextjs Response</h1>
      <p>Time: {data.readable}</p>
      <p>Request ID: {data.requestId}</p>
    </div>
  );
};

export default page;
```

### Cache Options Explained

| Option                 | Behavior |
|------------------------|----------|
| `cache: "no-cache"`    | Cache the response and reuse it on every request (default in Next.js) |
| `cache: "no-store"`    | Never cache — always fetch fresh data on every request |
| `cache: "force-cache"` | Fetch fresh, but store the result in cache for potential future reuse |

### `next.revalidate` Options

| Value | Behavior |
|-------|----------|
| `revalidate: false` | Cache forever — never revalidate automatically |
| `revalidate: 0` | Equivalent to `no-store` — bypass cache every request |
| `revalidate: 10` | Serve cached data, but re-fetch in background every 10 seconds (ISR) |

### `next.tags`
Allows you to assign a string label to a fetch request. You can later call `revalidateTag("timer")` from a Server Action or Route Handler to instantly bust that specific cache entry, enabling **on-demand revalidation** without waiting for the `revalidate` timer.

---

## `notFound()` — Trigger 404 Page

### What is it?
`notFound()` is a function from `next/navigation` that **throws a special error** causing Next.js to render the nearest `not-found.tsx` file. It is used exclusively inside Server Components.

### What is it used for?
- Showing a 404 page when a requested resource does not exist
- Validating dynamic route params (e.g., an ID that is out of range or not found in the database)
- Cleanly exiting a component render without returning JSX

### How to use it?

```tsx
import React from "react";
import { notFound } from "next/navigation";

const Review = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Guard: only IDs 1–10 are valid
  if (parseInt(id) > 10) {
    return notFound(); // Renders the nearest not-found.tsx page
  }

  return (
    <div>
      Review {id}
    </div>
  );
};

export default Review;
```

> **Note:** Calling `notFound()` immediately stops rendering the component — anything after it will not execute. You can optionally create a `not-found.tsx` file in your `app/` directory to customize the 404 UI.

---

## `useSearchParams()` — Read Query Parameters

### What is it?
`useSearchParams()` is a **Client Component hook** from `next/navigation` that gives you read access to the current URL's query string. It returns a read-only `URLSearchParams` interface.

### What is it used for?
- Reading search/filter values from the URL (e.g., `?q=shoes&category=men&page=2`)
- Building search pages, filter UIs, or paginated views that reflect state in the URL
- Keeping UI in sync with shareable, bookmark-friendly URLs

### How to use it?

```tsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();

  // Read individual query params by key
  const query = searchParams.get("q");         // ?q=shoes → "shoes"
  const category = searchParams.get("category"); // ?category=men → "men"
  const page = searchParams.get("page");        // ?page=2 → "2"

  // Get all params as [key, value] pairs
  const allParams = Array.from(searchParams.entries());
  // → [["q", "shoes"], ["category", "men"], ["page", "2"]]

  return (
    <div>
      <h1>Search result for: {query}</h1>
      <p>Category: {category}</p>
      <p>Page: {page}</p>
    </div>
  );
};

export default SearchPage;
```

### Common `URLSearchParams` Methods

| Method | Description |
|--------|-------------|
| `.get("key")` | Returns the value of the first matching param, or `null` |
| `.getAll("key")` | Returns all values for a key as an array (useful for multi-select) |
| `.has("key")` | Returns `true` if the param exists |
| `.entries()` | Returns an iterator of all `[key, value]` pairs |
| `.toString()` | Serializes back to a query string |

> **Important:** This hook requires `"use client"` at the top of the file. For reading search params in Server Components, use the `searchParams` prop passed directly to page components instead.

---

## `useParams()` — Read Dynamic Route Params

### What is it?
`useParams()` is a **Client Component hook** from `next/navigation` that reads the **dynamic segments** from the current URL path. Dynamic segments are defined in the folder structure using `[param]` syntax (e.g., `/product/[id]/[slug]`).

### What is it used for?
- Accessing route params like `id` or `slug` inside deeply nested Client Components without prop drilling
- Building product pages, profile pages, or any route driven by URL segments

### How to use it?

Given a route like `/product/[id]/[slug]`:

```tsx
"use client"; // Required — useParams is a Client Component hook
import React from "react";
import { useParams } from "next/navigation";

const ProductIdSlugPage = () => {
  const params = useParams();
  // For URL /product/42/blue-sneakers → { id: "42", slug: "blue-sneakers" }

  return (
    <div>
      <h1>Product Id: {params.id}</h1>
      <h1>Slug: {params.slug}</h1>
    </div>
  );
};

export default ProductIdSlugPage;
```

### `useParams()` vs Server Component `params` prop

| | `useParams()` hook | `params` prop (Server Component) |
|---|---|---|
| **Where** | Client Components | Server Components / Page components |
| **How** | Hook call | Passed as a prop by Next.js |
| **Type** | `Record<string, string \| string[]>` | `Promise<{ [key]: string }>` (must be awaited) |

> **Note:** For catch-all routes `[...slug]`, the value will be an array of strings (e.g., `params.slug → ["a", "b", "c"]`).

---

## `useRouter()` — Programmatic Navigation

### What is it?
`useRouter()` is a **Client Component hook** from `next/navigation` that gives you access to the router object, allowing you to **navigate programmatically** from event handlers, effects, or any logic — not just `<Link>` components.

### What is it used for?
- Redirecting after a form submission or login
- Navigating back and forward through browser history
- Replacing the current history entry (useful to prevent going back to a previous step)
- Triggering soft navigations that re-fetch Server Component data

### How to use it?

```tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    // After a successful login, navigate to /product
    router.push("/product");
  };

  return (
    <div>
      <button onClick={handleLogin}>Go To Products</button>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default LoginPage;
```

### Router Methods

| Method | Description |
|--------|-------------|
| `router.push("/path")` | Navigate to a new URL and **add** it to the browser history stack |
| `router.replace("/path")` | Navigate to a new URL but **replace** the current history entry — the user cannot go back to the previous page |
| `router.back()` | Go back one step in the browser history (equivalent to the browser's back button) |
| `router.forward()` | Go forward one step in the browser history (equivalent to the browser's forward button) |
| `router.refresh()` | Re-run the current route's Server Components and refresh data without a full page reload |
| `router.prefetch("/path")` | Preload the destination page in the background to make navigation feel instant |

> **`push` vs `replace`:** Use `push` for normal navigation. Use `replace` when you don't want the user to be able to go back — for example, after a login redirect or after submitting a multi-step form.

---

## `redirect()` — Server-Side Redirect

### What is it?
`redirect()` is a **Server-side function** from `next/navigation` that immediately stops rendering and redirects the user to another URL. It works in Server Components, Route Handlers, and Server Actions.

### What is it used for?
- Protecting routes: redirect unauthenticated users to `/login`
- Redirecting after a Server Action completes (e.g., after saving a form)
- Conditional routing based on server-side data (e.g., redirect to onboarding if profile is incomplete)

### How to use it?

```tsx
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth"; // example auth utility

const DashboardPage = async () => {
  const user = await getCurrentUser();

  // Server-side guard: redirect if not authenticated
  if (!user) {
    redirect("/login"); // Immediately stops rendering and redirects
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
    </div>
  );
};

export default DashboardPage;
```

### `redirect()` vs `useRouter().push()`

| | `redirect()` | `router.push()` |
|---|---|---|
| **Where** | Server Components, Server Actions, Route Handlers | Client Components only |
| **When** | At render time / action time | In response to user events |
| **HTTP** | Issues a real HTTP redirect (307/308) | Client-side soft navigation |
| **Use case** | Auth guards, post-action routing | Button clicks, form submissions on client |

> **Note:** By default, `redirect()` issues a **307 (Temporary Redirect)**. You can pass a second argument `redirect("/path", RedirectType.replace)` to use a replace-style navigation instead of a push.

---

## Resource Links

- [fetch() — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [notFound() — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/not-found)
- [useSearchParams() — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [useParams() — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/use-params)
- [useRouter() — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/use-router)
- [redirect() — Next.js Docs](https://nextjs.org/docs/app/api-reference/functions/redirect)
- [Caching in Next.js](https://nextjs.org/docs/app/building-your-application/caching)
- [Routing: Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)