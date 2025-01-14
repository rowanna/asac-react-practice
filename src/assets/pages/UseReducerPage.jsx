import Header from "../components/Header";
import { useReducer, useState } from "react";

function reducer(prevState, action) {
  const callType = action.type;
  switch (callType) {
    case "INCREASE":
      return prevState + 10;
    case "DECREASE":
      return prevState - 10;
    default:
      return prevState;
  }
}

function UseReducerPracticeResult() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => dispatch({ type: "INCREASE" })}>증가</button>
      <button onClick={() => dispatch({ type: "DECREASE" })}>감소</button>
      <button onClick={() => dispatch({ type: "RESET" })}>리셋</button>
    </>
  );
}

function upgradedReducer(prevState, { type, step }) {
  switch (type) {
    case "INCREASE":
      return prevState + step;
    case "DECREASE":
      return prevState - step;
    default:
      return prevState;
  }
}
function UpgradedUseReducerPracticeResult() {
  const [count, dispatch] = useReducer(upgradedReducer, 0);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => dispatch({ type: "INCREASE", step: 20 })}>
        증가
      </button>
      <button onClick={() => dispatch({ type: "DECREASE", step: 20 })}>
        감소
      </button>
    </>
  );
}

const props = {
  code: `function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((prev) => prev + 10)}>증가</button>
      <button onClick={() => setCount((prev) => prev - 10)}>감소</button>
    </>
  );
}`,
  language: "javascript",
};

function UseReducerPage() {
  return (
    <>
      <Header />
      <h2>useReducer 실습보기</h2>

      <h3>
        실습 16. 아래 자율적 상태변이 코드를 10 단위로 + / - 되도록 제약적
        상태변이가 되도록 변경하라
      </h3>
      <div id="resultBox">
        <UseReducerPracticeResult />
      </div>

      <h3>
        제약적 상태변이가 완료됐다면 10 단위로 수정되는게 아닌 원하는 수를
        넘겨줄 수 있도록 수정하라
      </h3>
      <UpgradedUseReducerPracticeResult />
    </>
  );
}

export default UseReducerPage;
