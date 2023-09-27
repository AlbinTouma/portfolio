import React from "react";
import { Nabla } from "next/font/google";
import Home from '../src/components/Home/index.js';
import BlogPreview from "../src/components/Blog/frontcard";
import Calendly from '../src/components/Home/contactMe.jsx';
import FooterSection from '../src/components/Home/footer.jsx';
import getPostMetaData from "../src/components/Blog/getPostMetadata";

export default function HomePage() {
  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((post) => (
    <BlogPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <Home />
      <div>{postPreviews}</div>
      <Calendly />
      <FooterSection />
    </>
  );
}

