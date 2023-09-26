import React from "react";
import { Nabla } from "next/font/google";
import Home from '../src/components/Home/index.js';
import BlogPreview from "../src/components/Blog/frontcard";
import getPostMetaData from '../src/components/Blog/getPostMetadata';
import Calendly from '../src/components/Home/contactMe.jsx';
import FooterSection from '../src/components/Home/footer.jsx';

export default function HomePage() {
  const PostMetaData = getPostMetaData();
  return (
    <>
      <Home />
      <BlogPreview />
      <Calendly />
      <FooterSection />
    </>
  );
}

