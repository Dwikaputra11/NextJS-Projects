import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is about page",
  openGraph: {
    title: "About Us - Kiwadev Company",
    description: "Learn more about our company and mission.",
    images: ['/globe.svg'],
    url: "http://localhost:3000/about"
  }
}

const AboutPage = () => {
  return (
      <div>
        About Page
      </div>
  );
};

export default AboutPage;