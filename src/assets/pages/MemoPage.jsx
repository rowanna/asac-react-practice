import Header from "../components/Header";
import { useState, memo, useMemo, useCallback, useEffect } from "react";

const Child1Component = memo(function Child1Component({ state }) {
  console.log(" - rerendered Child1");
  return <div>{state}</div>;
});

// 관심사를 따로 정해줄 수 있다.
function areEquals(prev, next) {}

const Child2Component = memo(function Child2Component({ state }) {
  console.log(" - rerendered Child2");
  return <div>{state}</div>;
});

const Child3Component = memo(function Child3Component({ state }) {
  console.log(" - rerendered Child3");
  return <div>{state}</div>;
});

function ParentComponent() {
  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");
  const [state3, setState3] = useState("");

  return (
    <>
      <Child1Component state={state1} />
      <Child2Component state={state2} />
      <Child3Component state={state3} />
      <input value={state1} onChange={(e) => setState1(e.target.value)} />
      <input value={state2} onChange={(e) => setState2(e.target.value)} />
      <input value={state3} onChange={(e) => setState3(e.target.value)} />
    </>
  );
}

function Practice21_1() {
  const [age, setAge] = useState(0);

  const validate = () => {
    console.log("calculated");
    return age >= 19 ? true : false;
  };
  const valid = validate();

  return (
    <>
      <p>{age}</p>
      <div>
        {valid ? (
          <p>성년입니다</p>
        ) : (
          <p style={{ color: "red" }}>미성년입니다</p>
        )}
      </div>
      <button onClick={() => setAge(age + 1)}>증가</button>
    </>
  );
}

// Practice21_2 start
const Validation = memo(function Validation({ valid }) {
  console.log("- rerendered : Validation");
  return (
    <div>
      {valid ? <p>성년입니다</p> : <p style={{ color: "red" }}>미성년입니다</p>}
    </div>
  );
});

const Button = memo(function Button({ onClick }) {
  console.log("- rerendered : Button");
  return <button onClick={onClick}>증가</button>;
});

function Practice21_2() {
  const [age, setAge] = useState(0);

  //   const validate =
  const valid = useMemo(() => {
    console.log("calculated");
    return age >= 19 ? true : false;
  }, [age >= 19]);

  const handleClick = useCallback(() => {
    setAge((prev) => prev + 1);
  }, []);
  return (
    <>
      <p>{age}</p>
      <Validation valid={valid} />
      <Button onClick={handleClick} />
    </>
  );
}

function MemoPage() {
  return (
    <>
      <Header />
      <h2>Memo 실습보기</h2>
      <ParentComponent />

      <Practice21_1 />
      <Practice21_2 />
    </>
  );
}

export default MemoPage;
