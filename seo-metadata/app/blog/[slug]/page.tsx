import React from 'react';
import {Metadata} from "next";

// use dynamic metadata only on path that have slug
export async function generateMetadata({params} : {params : Promise<{slug: string}>}): Promise<Metadata>{
  const {slug} = await params;
  // og image url

  const ogImageUrl= `http://localhost:300/api/og?title=${encodeURIComponent(`Blog ${slug}`)}&description=${encodeURIComponent('This is a blog page')}`
  return {
    title: `Blog ${slug}`,
    description: `This is about ${slug}`,
    openGraph:{
      title: `Blog ${slug}`,
      description: 'This is a blog page',
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
        },
        {
          url: ogImageUrl,
          width: 1800,
          height: 1600,
          alt: 'Og Image Alt',
        },
      ],
    }
  }
}

// cannot use static and dynamic metadata in same page

const BlogPage = async ({params}) => {
  const {slug} = await params;
  return (
      <div>
        Blog {slug}
      </div>
  );
};

export default BlogPage;