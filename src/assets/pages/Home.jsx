import Header from "../components/Header";
import { Link } from "react-router-dom";

function PostList() {
  return (
    <>
      <h2>post list</h2>
      <button>
        <Link to="/useReducerPage">useReducer로 구현한 카운터 보기</Link>
      </button>
      <button>
        <Link to="/contextAPIPage">
          contextAPI로 전역상태 관리하는 컴포넌트 보기 <br />
          (+ 어떻게 하면 필요한 컴포넌트만 렌더링할 수 있을까?)
        </Link>
      </button>
      <button>
        <Link to="/ChangeThemePage">Display Mode 바꾸는 컴포넌트 보기</Link>
      </button>
      <button>
        <Link to="/ModalPage">다양한 Modal 컴포넌트 구현방법 보기</Link>
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
