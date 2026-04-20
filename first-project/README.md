# Routing in NextJs

> **a React framework that enables several extra features, including server-side rendering and static rendering**. React is a JavaScript library that is traditionally used to build web applications rendered in the client's browser with JavaScript

# Router

NextJs is using App Router to configure the router to solve the path.

There is 2 type Router:

1. Page Router

   Configuration by define page file to manage the router through coding to define which file handle the one path.

2. App Router

   File-Based routing to define path. In NextJS the path scan from /app folder.


Next.js uses **file-system based routing**, meaning you can use folders and files to define routes [links](https://nextjs.org/docs/app/getting-started/layouts-and-pages).

There are 2 file that important to know for routing:

1. **page.tsx**

   This file is determine the UI that is rendered on specific route.

    ```jsx
    / app
    		|
    		-- page.tsx // this will show when app running
    ```

2. **layout.tsx**

   A layout is UI that is **shared** between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

   for layout file must implement children props to make pages as child

   ![image.png](attachment:24a9c8c0-44dc-4bfe-b121-1dd551303add:image.png)

    ```jsx
    export default function DashboardLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="en">
          <body>
            {/* Layout UI */}
            {/* Place children where you want to render a page or nested layout */}
            <main>{children}</main>
          </body>
        </html>
      )
    }
    ```


# [Common Special Files](https://nextjs.org/docs/app/api-reference/file-conventions)

| page.tsx | UI rendered |
| --- | --- |
| layout.tsx | Shared UI, no need to re-render |
| loading.tsx | create meaningful Loading UI |
| error.tsx | create error UI |
| not-found.tsx | create not-found page UI |
| route.tsx | handle custom request handle for API |

# Type of Routes

1. **Static Routes**

   A static routes using file based routing, e.g /about, /contact, etc.

2. **Dynamic Routes**

   A dynamic route can be define by include []. Example: /user/[id]/page.tsx

3. **Catch All Routes**

   An enhance dynamic route can be define by include […]. Example: /user/[…slug]/page.tsx

4. **Route Groups**

   help to organize without effecting the path by using () Example: (admin)/about

   in web will identify {domain}/about


Resource Links:

- [Layout and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions)