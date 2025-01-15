import { useState, createContext, useContext } from "react";

function LC() {
  console.log("- A.4. Fourth Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Fourth Component
    </div>
  );
}

function TC() {
  console.log("- A.3. Third Component");

  const { count } = useContext(CreatedContext);

  return (
    <div className="component-box" style={{ padding: 10 }}>
      Third Component : {count}
      <LC />
    </div>
  );
}

function SC() {
  console.log("- A.2. Second Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Second Component
      <TC />
    </div>
  );
}

function FC() {
  console.log("- A.1. First Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      First Component
      <SC />
    </div>
  );
}

function ButtonComponent() {
  // 5. useContext에 생성한 컨텍스트 객체 넣어주어서 받은 value 꺼내옴.
  const { setCount } = useContext(CreatedContext);
  console.log("- B. Button Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Button Component
      <div>
        {/* 6. 일반변수처럼 사용하면 됨 */}
        <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
      </div>
    </div>
  );
}

function NonContextComponent({ count }) {
  console.log("- C. Non-Context Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Non-Context Component : {count}
    </div>
  );
}

// 1. contextAPI 사용할거라고 선언.
const CreatedContext = createContext({
  count: 0,
  setCount: (state) => {},
}); // default value
// 2. 상태를 가지는 provider를 따로 컴포넌트화 (부모컴포넌트에 상태를 가지지 않게 하기 위함: )
// 부모컴포넌트에 상태를 가지면 상태가 바뀔때마다 전체 리렌더링이 되기 때문

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <>
      {/* 3. provider에 하위컴포넌트에 쓰일 initial value 설정 */}
      <CreatedContext.Provider value={{ count, setCount }}>
        {children}
      </CreatedContext.Provider>
    </>
  );
}

function UseContextResultComponent() {
  return (
    <div
      className="section-box"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: 10,
      }}
    >
      {/* 4. 프로바이더 적용 */}
      <CountContextProvider>
        <FC />
        <ButtonComponent />
      </CountContextProvider>

      <NonContextComponent />
    </div>
  );
}

export default UseContextResultComponent;
