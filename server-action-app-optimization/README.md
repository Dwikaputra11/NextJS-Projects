# Next.js Core Functions & Components — Learning Notes

> A personal learning summary covering core Next.js built-ins used in the **kostanku** project and related experiments.

---

## Table of Contents

- [Server Actions](#server-actions)
- [Font Module (`next/font`)](#font-module-nextfont)
- [`<Form>` Component](#form-component)
- [`<Image>` Component](#image-component)
- [`<Link>` Component](#link-component)
- [`<Script>` Component](#script-component)
- [Resource Links](#resource-links)

---

## Server Actions

### What is it?

Server Actions are **async functions that run exclusively on the server**, defined using the `"use server"` directive. They replace the traditional pattern of creating API route handlers just to handle form submissions or data mutations.

### What is it for?

- **Form handling without API routes** — you can pass a Server Action directly as a `<form action={...}>`, and Next.js handles the round trip.
- **Progressive enhancement** — forms with Server Actions work even when JavaScript hasn't loaded yet (or is disabled), because the browser can submit the form natively.
- **Client hydration queue** — in Client Components, if JS hasn't loaded yet, submissions are queued until hydration is complete, so no data is lost.
- **Data mutations** — create, update, delete operations that run securely on the server.
- **Cache & revalidation** — when a Server Action is called, Next.js can revalidate cached data and return updated UI in a single round trip, without a full page reload.
- **Flexible invocation** — Server Actions are not limited to `<form>`. They can be called from `onClick` event handlers, `useEffect`, or any third-party library.

### How to use it?

**Option 1: Inline in a Server Component**

```tsx
// /components/user-form.tsx
import React from 'react';
import { createUser } from "@/actions";

const UserForm = () => {
  return (
    <div>
      <form action={createUser}>
        <input type="text" name={"name"} placeholder={"Name"} />
        <button type={"submit"}>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
```

The `createUser` function is defined in a separate file with `"use server"` at the top. It receives the `FormData` object automatically.

**Option 2: Dedicated actions file**

```ts
// /actions.ts
"use server";

export async function createUser(prevState: any, formData: FormData) {
  const name = formData.get("name");

  if (!name) {
    return { error: "Name is required" };
  }

  console.log("Creating user:", name);
  // → call your database here
}
```

**Option 3: Used with `useFormState` in a Client Component**

When you need to reflect the result of a Server Action back to the UI (e.g., show validation errors), use `useFormState` from `react-dom`:

```tsx
// /components/form.tsx
"use client";
import React from 'react';
import { createUser } from "@/actions";
import { useFormState } from "react-dom";

const Form = () => {
  const [state, formAction] = useFormState(createUser, {});

  return (
    <div>
      <form action={formAction}>
        <input type="text" name={"name"} placeholder={"Name"} />
        <button type={"submit"}>Submit</button>
        {state.error && <p>{state.error}</p>}
      </form>
    </div>
  );
};

export default Form;
```

`useFormState` wraps the Server Action and gives you a `state` object (the return value of the action) and a `formAction` to bind to the form. Every time the action runs, `state` is updated and the component re-renders.

---

## Font Module (`next/font`)

### What is it?

`next/font` is a built-in font optimization system in Next.js. It supports both **Google Fonts** (`next/font/google`) and **local font files** (`next/font/local`).

### What is it for?

- **Zero layout shift** — fonts are downloaded at build time, so the browser never has to fetch them at runtime, eliminating flash-of-unstyled-text (FOUT).
- **Privacy** — Google Fonts are self-hosted by Next.js on your server. No requests are made to Google's CDN from the user's browser.
- **Performance** — only the specific weights and subsets you declare are downloaded, keeping bundle size small.
- **Automatic CSS variable or class injection** — each font object exposes a `.className` or `.variable` property you apply directly to elements.
- **Local font support** — you can load your own `.ttf`, `.woff2`, etc. files from the `public/fonts/` directory.

### How to use it?

**Loading Google Fonts**

```tsx
// /app/example-font/page.tsx
import { Roboto, Poppins, Jockey_One } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const jockeyOne = Jockey_One({
  weight: ["400"],
  subsets: ["latin"],
});
```

Each font instance exposes a `.className` — apply it to any element via Tailwind's template literal pattern:

```tsx
<h1 className={`text-4xl ${poppins.className}`}>Hello World</h1>
<p className={`${roboto.className}`}>Body text here</p>
<p className={`${jockeyOne.className}`}>Display text</p>
```

**Loading a local font file**

```tsx
import LoveDay from "next/font/local";

const loveDay = LoveDay({
  src: "../../public/fonts/love-days.ttf",
});

// Usage
<p className={`${loveDay.className}`}>Custom font text</p>
```

The font file lives in `public/fonts/` and Next.js handles the `@font-face` declaration automatically. No CSS changes needed.

> **Key insight:** You declare fonts at the module level (outside the component), not inside `useEffect` or render. Next.js processes them at build time, not runtime.

---

## `<Form>` Component

### What is it?

`<Form>` is a **Next.js built-in component** (`next/form`) that extends the native HTML `<form>` element with client-side navigation behavior, similar to how `<Link>` extends `<a>`.

### What is it for?

- **URL-based navigation on submit** — instead of a page reload, the form navigates to the `action` URL with search params appended, like a SPA would.
- **Prefetching** — when the `<Form>` component scrolls into the viewport, Next.js prefetches the target route's loading UI, making the navigation feel instant.
- **Progressive enhancement** — just like native forms, it works without JavaScript. The `action` is a real URL the browser can navigate to.
- **URL search params integration** — form field `name` attributes automatically become query parameters in the URL (e.g., `/products?query=gold&searchType=both`).
- **Replaces manual `router.push`** — no need to write `e.preventDefault()` + `router.push(...)` just to submit a search form.

### How to use it?

```tsx
// /components/search-product.tsx
import Form from "next/form";
import { Search, Sparkles } from "lucide-react";

const SearchProduct = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">

        {/* Main search form — navigates to /products?query=...&searchType=... */}
        <Form action="/products" className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              id="query"
              name="query"
              placeholder="Enter product title or description..."
              className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              required
            />
          </div>

          <select id="searchType" name="searchType" className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white">
            <option value="both">Title and Description</option>
            <option value="title">Title only</option>
            <option value="description">Description only</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Search Products</span>
          </button>
        </Form>

        {/* Quick search chips — each is its own <Form> with hidden inputs */}
        <div className="flex flex-wrap gap-2 justify-center mt-8">
          {["Gold", "Concrete", "Keyboard", "Chicken", "Metal", "Ceramic"].map((term) => (
            <Form key={term} action="/products" className="inline">
              <input type="hidden" name="query" value={term.toLowerCase()} />
              <input type="hidden" name="searchType" value="both" />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm border border-gray-600"
              >
                {term}
              </button>
            </Form>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SearchProduct;
```

On the receiving end, `/app/products/page.tsx` reads the params:

```tsx
// /app/products/page.tsx
export default function ProductsPage({
  searchParams,
}: {
  searchParams: { query?: string; searchType?: string };
}) {
  const { query, searchType } = searchParams;
  // use query and searchType to filter your data
}
```

> **Difference from `<form action={serverAction}>`:** Use `next/form` when you need URL navigation (search pages, filters). Use `<form action={serverAction}>` when you need to mutate data (create, update, delete).

---

## `<Image>` Component

### What is it?

`<Image>` (`next/image`) is a drop-in replacement for the native `<img>` tag that adds automatic optimization, lazy loading, and layout shift prevention.

### What is it for?

- **Automatic format conversion** — serves WebP or AVIF to browsers that support it, falling back to the original format otherwise.
- **Responsive sizing** — generates multiple sizes automatically and serves the correct one based on the device's viewport.
- **Lazy loading by default** — images below the fold are not loaded until the user scrolls near them, improving initial page load time.
- **Prevents Cumulative Layout Shift (CLS)** — requires `width` and `height` (or `fill`), so the browser reserves space before the image loads.
- **Remote image security** — external image domains must be explicitly whitelisted in `next.config.ts` via `remotePatterns`. This prevents your image optimization endpoint from being abused.

### How to use it?

**Local image (from `/public`)**

```tsx
// /app/example-image/page.tsx
import Image from "next/image";

const ExampleImage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src={"/vercel.svg"} alt={"Vercel Logo"} width={100} height={100} />
    </div>
  );
};

export default ExampleImage;
```

**Remote image (from an external URL)**

```tsx
<Image
  src={"https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/1ce3e567100dca17dd2ee56032ff88b6"}
  alt={"Daily Dev Post Image"}
  width={100}
  height={100}
/>
```

For remote images, you **must** whitelist the domain in `next.config.ts`:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.daily.dev",
        pathname: "/**",        // allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
```

Without this config, Next.js throws an error: *"hostname not configured under images in your `next.config.js`"*. This is an intentional security measure.

> **`fill` mode:** If you don't know the image dimensions at build time (e.g., user-uploaded content), use `fill` with a positioned parent instead of `width`/`height`. The image will stretch to fill the parent container.

```tsx
<div className="relative w-32 h-32">
  <Image src={url} alt="..." fill className="object-cover" />
</div>
```

---

## `<Link>` Component

### What is it?

`<Link>` (`next/link`) is a client-side navigation component that replaces the native `<a>` tag for internal links within a Next.js application.

### What is it for?

- **Client-side navigation** — navigates between pages without a full browser reload, preserving React state and giving a SPA-like experience.
- **Automatic prefetching** — when a `<Link>` enters the viewport, Next.js automatically prefetches the linked page in the background, so navigation is near-instant.
- **Scroll restoration** — by default, navigating to a new page scrolls to the top. You can disable this with `scroll={false}` to preserve scroll position (e.g., for modals or tabs).
- **Active link detection** — use the `usePathname()` hook alongside `<Link>` to compare the current path and apply active styles.

### How to use it?

**Basic usage**

```tsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}
```

**Dynamic routes**

```tsx
// Link to /products/42
<Link href={`/products/${product.id}`}>{product.name}</Link>
```

**Active link styling with `usePathname`**

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <ul>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={pathname === item.href ? "text-blue-500 font-bold" : "text-gray-400"}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

> **`<Link>` vs `<Form>`:** Use `<Link>` for navigating to a page (GET). Use `<Form action="/path">` when you need to submit data and build a URL with query params (also GET, but driven by form input). Use `<form action={serverAction}>` for data mutations (POST-equivalent Server Actions).

---

## `<Script>` Component

### What is it?

`<Script>` (`next/script`) is a component for loading third-party scripts with fine-grained control over **when** and **how** they load, without blocking the page render.

### What is it for?

- **Loading strategy control** — the `strategy` prop determines when the script is loaded relative to the page:
    - `beforeInteractive` — loaded before the page becomes interactive (use for critical scripts like consent banners).
    - `afterInteractive` *(default)* — loaded after the page hydrates (use for analytics like Google Analytics, Tag Manager).
    - `lazyOnload` — loaded during browser idle time (use for non-critical scripts like chat widgets, social embeds).
    - `worker` *(experimental)* — loaded in a Web Worker, off the main thread.
- **Inline scripts** — you can run inline code safely using the `dangerouslySetInnerHTML` prop or a child `<Script>` block.
- **`onLoad` / `onReady` callbacks** — run code after the script has loaded.
- **Avoids duplicate loading** — Next.js deduplicates scripts with the same `src` across the component tree.

### How to use it?

**Loading a third-party analytics script**

```tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
```

**Running code after a script loads**

```tsx
<Script
  src="https://example.com/some-lib.js"
  strategy="afterInteractive"
  onLoad={() => {
    console.log("Script loaded, now safe to call window.someLib.init()");
  }}
/>
```

> **When NOT to use `<Script>`:** For your own application code, use regular `import`. `<Script>` is specifically for **third-party** scripts that are loaded from an external URL and don't have an npm package, or where the CDN version is required.

---

## Resource Links

| Topic | URL |
|---|---|
| Server Actions & Mutations | https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations |
| `useFormState` hook | https://react.dev/reference/react-dom/hooks/useFormState |
| Font Module | https://nextjs.org/docs/app/api-reference/components/font |
| `<Form>` Component | https://nextjs.org/docs/app/api-reference/components/form |
| `<Image>` Component | https://nextjs.org/docs/app/api-reference/components/image |
| `<Link>` Component | https://nextjs.org/docs/app/api-reference/components/link |
| `<Script>` Component | https://nextjs.org/docs/app/api-reference/components/script |
| All Components (API Reference) | https://nextjs.org/docs/app/api-reference/components |