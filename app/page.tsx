import React from "react";
import { Nabla } from "next/font/google";
import Home from '../src/components/Home/index.js';
import BlogPreview from "../src/components/Blog/frontcard";
import Calendly from '../src/components/Home/contactMe.jsx';
import FooterSection from '../src/components/Home/footer.jsx';
import getPostMetaData from "../src/components/Blog/getPostMetadata";
import WorkedWith from '../src/components/Home/workedWith';


export default function HomePage() {
  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((post) => (
    <BlogPreview key={post.slug} {...post} />
  ));

  return (
    <>
      <Home />

      <section className="p-11 justify-center mx-auto max-w-[768px]">
        <h1 className="text-6xl text-center font-semibold  mx-auto text-emerald-900 mb-11">From Business Problem to Solution</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{postPreviews}</div>
      </section>
      <WorkedWith />


      <Calendly />
      <FooterSection />
    </>
  );
}

