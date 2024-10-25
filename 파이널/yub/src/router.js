import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Moving from "./pages/member/Moving";
import Post from "./pages/member/Post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/Moving/:mbti",
    element: <Moving />,
  },

  {
    path: "/Moving/:mbti/Post/:no",
    element: <Post />,
  },
]);

export default router;
