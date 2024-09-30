import Main from "../Main";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Moving = () => {
  const { mbti } = useParams();
  return (
    <main>
      <div>MBTIS</div>
      <div>{mbti}</div>
      <section>
        <div>게시글</div>
      </section>
    </main>
  );
};

export default Moving;
