import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Moving from "./pages/member/Moving";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/Moving/:mbti",
    element: <Moving />,
  },
]);

export default router;
