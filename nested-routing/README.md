# Advanced Routing

File-base routing in **NextJs** make it more simple to define routing application.

## Nested Dynamic Routing

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