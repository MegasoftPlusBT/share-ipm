import Link from "next/link";
import Layout from "../components/Layout";
import React from "react";
import { useState } from "react";
import IndexIntro from "../components/IndexIntro";
import Top5 from "../components/Top5";
import Ranking from "../components/ranking/Ranking";
import IndexAbout from "../components/IndexAbout";
import { getQuestions } from "./api/ipm/methodology";
import { getMedia } from "./api/ipm/media";
import { categories } from "./api/ipm/categories";

//type Props = {};

const IndexPage = ({ questions, media, categories }) => {
  return (
    <Layout media={media}>
      <h1 className="share-red text-center text-5xl mb-16">
        <span className="text-[#F0368F] tracking-[10px] lg:tracking-[51px] md:tracking-[30px]">
          &nbsp;INDEKS
        </span>
        <br />
        <span className="text-[#14A3DB] text-4xl">PRIVATNOSTI U MEDIJIMA</span>
        <br />
        <span className="text-[#F0368F] tracking-wide">2022</span>
      </h1>
      <IndexIntro />
      <Top5 media={media} />
      <hr />
      <Ranking media={media} categories={categories} />
      <hr />
      <IndexAbout />
      <style>
        {`

        #category-links {
          display: none;
        }
          .main-wrapper {
            background-color: rgb(255, 255, 255);
            background-position-x: center, 0%, 0%;
            background-position-y: -40%, 0%, 0%;
            background-repeat: no-repeat, repeat, repeat;
            background-attachment: scroll, scroll, scroll;
            background-image: url("/images/share-nilo.png"),
              linear-gradient(rgba(125, 206, 233, 0.14) 0%, rgba(125, 206, 233, 0) 68.86%),
              none;
            background-size: 170% 50%, auto, auto;
            background-origin: padding-box, padding-box, padding-box;
            background-clip: border-box, border-box, border-box;
          }
        `}
      </style>
    </Layout>
  );
};

export default IndexPage;

export async function getStaticProps() {
  try {
    const questions = await getQuestions();
    const media = await getMedia();

    return {
      props: {
        questions,
        media,
        categories,
      },
      revalidate: 300, // In seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        questions: [],
        media: [],
        categories: [],
      },
      revalidate: 300, // In seconds
    };
  }
}

