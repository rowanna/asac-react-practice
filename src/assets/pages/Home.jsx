import Header from "../components/Header";
import { Link } from "react-router-dom";

function PostList() {
  return (
    <>
      <h2>post list</h2>
      <button>
        <Link to="/useReducerPage">useReducer실습 보기</Link>
      </button>
      <button>
        <Link to="/useStatePage">useState 실습 보기</Link>
      </button>
    </>
  );
}

function Home() {
  return (
    <>
      <Header />
      <PostList />
    </>
  );
}

export default Home;
