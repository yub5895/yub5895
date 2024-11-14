import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import "../assets/Paging.scss";

const Paging = ({ page, totalPages }) => {
  const pageCount = 10;
  let num = totalPages % 10;
  const [start, setStart] = useState(1);
  const [work, setWork] = useState(true);
  const { mbti } = useParams();

  const prevClick = () => {
    if (start > 1) {
      setStart(start - pageCount);
    }
    console.log("뒤로가기 작동");
  };

  const nextClick = () => {
    if (start + pageCount <= totalPages) {
      setStart(start + pageCount);
    }
    console.log("앞으로가기 작동");
  };

  return (
    <div className="paging">
      {work === true && (
        <ul className="paging-number">
          {start != 1 ? (
            <li>
              <button onClick={prevClick}>&lt;</button>
            </li>
          ) : null}

          {Array(pageCount)
            .fill()
            .map((a, i) =>
              start + i <= totalPages ? (
                <li
                  id="numberLi"
                  key={start + i}
                  className={start + i == page ? "active" : ""}
                >
                  <Link
                    className="number"
                    to={`/Moving/${mbti}?page=${start + i}`}
                    state={start + i}
                  >
                    {start + i}
                  </Link>
                </li>
              ) : null
            )}
          {start == totalPages - 4 || start == totalPages - (num - 1) ? null : (
            <li>
              <button onClick={nextClick}>&gt;</button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
export default Paging;
