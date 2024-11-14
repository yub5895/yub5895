import { useState, useEffect } from "react";
import { getBoard } from "../api/member";

const Count = () => {
  const [board2, setBoard2] = useState({
    count: 0,
  });

  const boardAPI2 = async () => {
    const result2 = await getBoard();
    setBoard2(result2.data);
  };

  useEffect(() => {
    boardAPI2();
  }, []);

  return <p className="board-item">{board2.count}회</p>;
};

export default Count;
