import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../assets/Main.scss";

const Main = () => {
  const navigate = useNavigate();
  const [mbti, setMbti] = useState({
    IE: "",
    SN: "",
    TF: "",
    PJ: "",
  });

  const change = (e) => {
    const { id, value } = e.target;
    setMbti((next) => ({ ...next, [id]: value }));
  };

  const moving = () => {
    const mbtiResult = `${mbti.IE}${mbti.SN}${mbti.TF}${mbti.PJ}`;
    if (mbtiResult.length === 4) {
      navigate(`/Moving/${mbtiResult}`);
    } else {
      alert("4개 다 선택해야죠");
    }
  };
  return (
    <main>
      <div id="MBTIS">MBTIS</div>
      <section id="selectors">
        <select id="IE" className="selector" onChange={change}>
          <option value="">사교</option>
          <option value="I">I</option>
          <option value="E">E</option>
        </select>
        <select id="SN" className="selector" onChange={change}>
          <option value="">인식</option>
          <option value="S">S</option>
          <option value="N">N</option>
        </select>
        <select id="TF" className="selector" onChange={change}>
          <option value="">판단</option>
          <option value="T">T</option>
          <option value="F">F</option>
        </select>
        <select id="PJ" className="selector" onChange={change}>
          <option value="">계획</option>
          <option value="P">P</option>
          <option value="J">J</option>
        </select>
      </section>
      <div id="connect">
        <button id="connect" type="button" onClick={moving}>
          접속하기
        </button>
      </div>
    </main>
  );
};

export default Main;
