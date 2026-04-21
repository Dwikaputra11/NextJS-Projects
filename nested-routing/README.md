# Advanced Routing

File-base routing in **NextJs** make it more simple to define routing application.

## Nested Routing

We can use slug [] to define as a path paramater to show the page. For example, 
we wanna show `/product/1/reviews/2` page. We can make the project structure this below.


```shell
└── products
    └── [id]
        ├── page.tsx
        └── reviews
            └── [reviewId]
                └── page.tsx
```
**Note: The slug name must be different with another**

To get the parameter we can simply do like below.
```javascript
const ProductByID = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            Page {id}
        </div>
    );
};

export default ProductByID;
```

```javascript
const ReviewByID = async ({params}) => {
    const {id, reviewId} = await params;
    return (
        <div>
            Page {id} {reviewId}
        </div>
    );
};

export default ReviewByID;
```

## Catch All Segment
Allows you to capture multiple parts of the url into single parameter.
Let say there we have nested routing that involve multiple ids like this `feature/[id]/concept/[id]/example/[id]`.
This can be make us project structure not clean.

We can use `[...params]` to catch all segment.

```shell
├── docs
│   └── [...slug]
│        └── page.tsx
```
The code is down below.
```javascript

const Page = async ({params}) => {
    const {slug} = await params;
    return (
        <div>
            {slug?.join("/")}
        </div>
    );
};


export default Page;
```

## Optional Catch Segment
The optional is fix the problem of origin path cannot be access while using `[...slug]`. To make origin path accessible by change the directory name using `[[..slug]]`.

```shell
── docs
│   └── [[...slug]]
│       └── page.tsx
```

**Note: Make sure only use one between Catch All or Optional Segment**

## Group Route
is a way to organize without affecting the url structure by using parentheses `()` (e.g **(auth)**, (dashboard), (admin)). 
To no fully expose our project structure to the path define for url, we can use this to group related path into one.

```shell
├── (auth)
│   ├── forget
│   │   └── page.tsx
│   ├── login
│   │   └── page.tsx
│   └── signup
│       └── page.tsx
```
you can access it by `{domain}/login`, `{domain}/login`, `{domain}/forget`.

We can also sharing layouts across multiple routes without adding the url.

## Private Folder
is folders that Next.Js ignores in the routing system. You can define it with an underscore `_`. For example to storing `_components`, `_util`, `_config`

```shell
── (auth)
│   ├── _components
│   ├── _config
│   ├── forget
│   │   └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── signup
│   │   └── page.tsx
│   └── _util
```

## Intercepting Routes
Let you show a page inside the current layout (like modal or drawer) instead navigating away completely.
Intercepting routes can be defined with the `(..)` convention, which is similar to relative path convention ../ but for route segments.

You can use:

### `(.)` to match segments on the same level
```shell
├── dashboard
│   ├── (.)reports
│   │   └── page.tsx
│   ├── reports
│   │   └── page.tsx
```
### `(..)` to match segments one level above
```shell
├── dashboard
│   ├── page.tsx
│   ├── (..)profile
│   │   └── page.tsx
├── profile
│   └── page.tsx
```
### `(..)(..)` to match segments two levels above
```shell
├── dashboard
│   ├── page.tsx
│   └── section
│       ├── (...)admin
│       │   └── page.tsx
│       ├── page.tsx
│       └── (..)(..)settings
│           └── page.tsx
└── settings
    └── page.tsx
```
### `(...)` to match segments from the root app directory
```shell
├── admin
│   └── page.tsx
├── dashboard
│   ├── page.tsx
│   └── section
│       ├── (...)admin
│       │   └── page.tsx
│       ├── page.tsx
```

## Parallel Routes
Let you render multiple apges or layout at the same time, side by side inside one layout. 
You can define "slots" where different routes will render. Each slot can have its own navigation, state, error boundaries, even be conditionally
```shell
├── dashboard-main
│   ├── @feed
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @stats
│   │   └── page.tsx
│   ├── @tab1
│   │   ├── page.tsx
│   └── @tab2
│       ├── page.tsx
```

**layout.tsx**
```javascript
export default function DashboardMainLayout({feed, stats}){
    return (
        <div style={{display: "flex", gap:"20px"}}>
            <div className="flex-2">{feed}</div>
            <div className="flex-1">{stats}</div>
        </div>
    )
}
```

There is also some convention to directly access some tab inside the layout
```javascript
export default function DashboardMainLayout({tab1, tab2}){
    return (
        
        <div>
            <nav className={"mb-3"}>
                <Link href={"/dashboard-main/tab1"}>Tab 1</Link> | {" "}
                <Link href={"/dashboard-main/tab2"}>Tab 2</Link> | {" "}
            </nav>
            <div>
                {tab1}
                {tab2}
            </div>
        </div>
    )
}
```
The project structure define below.
```shell
├── dashboard-main
│   ├── @feed
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @stats
│   │   └── page.tsx
│   ├── @tab1
│   │   ├── page.tsx
│   │   └── tab1
│   │       └── page.tsx
│   └── @tab2
│       ├── page.tsx
│       └── tab2
│           └── page.tsx
```
when the dashboard page first access it render `@tab1/page.tsx`, but when the link is click then its render `@tab1/tab1/page.tsx`.

There is problem when you refresh the page with the tab is access by using matched url, its gonna be unmatch. This situation makes **unmatched routes**. 
So we need default.js file to resolve this problem

The project structure define below.
```shell
├── dashboard-main
│   ├── layout.tsx
│   ├── page.tsx
│   ├── @tab1
│   │   ├── default.tsx
│   │   ├── page.tsx
│   │   └── tab1
│   │       └── page.tsx
│   └── @tab2
│       ├── default.tsx
│       ├── page.tsx
│       └── tab2
│           └── page.tsx
```

## Not Found Page
You can customize **Not Found Page** by creating file name `not-found` in /app directory. It automatically render as not found page.
```javascript
const NotFound = () => {
    return (
        <div className={"flex flex-col items-center justify-center h-screen text-center"}>
            <Image src={"/not-found.svg"} alt={"Not-Found-Image"} height={400} width={400} />
            <Link href={"/"} className={"rounded-lg text-white font-bold px-3 py-3 bg-indigo-500 mt-10"}>
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
```


**Resource Links:**
- [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- [Route Group](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups)
- [Interceptor Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)
- [Tutorial Routing in Next.Js](https://medium.com/@farihatulmaria/mastering-next-js-routing-an-in-depth-guide-to-advanced-features-5aa10e15ec7f)