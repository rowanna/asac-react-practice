import Header from "../components/Header";
import CodeBlock from "../components/CodeBlock";
import UseContextResultComponent from "../components/ContextAPIComponent/UseContextResultComponent";
import ConsumerResultComponent from "../components/ContextAPIComponent/ConsumerResultComponent";
import CustomModalResult from "../components/ContextAPIComponent/CustomModalResult";

const practiceCode = `
function LC() {
  console.log('- A.4. Fourth Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Fourth Component
    </div>
  )
}

function TC({ count }) {
  console.log('- A.3. Third Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Third Component : {count}
      <LC />
    </div>
  )
}

function SC({ count }) {
  console.log('- A.2. Second Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Second Component
      <TC count={count} />
    </div>
  )
}

function FC({ count }) {
  console.log('- A.1. First Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      First Component
      <SC count={count} />
    </div>
  )
}

function ButtonComponent({ onClick }) {
  console.log('- B. Button Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Button Component
      <div>
        <button onClick={onClick}>증가</button>
      </div>
    </div>
  )
}

function NonContextComponent({ count }) {
  console.log('- C. Non-Context Component')
  return (
    <div className='component-box' style={{ padding: 10 }}>
      Non-Context Component : {count}
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  return (
    <div
      className='section-box'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        padding: 10,
      }}
    >
      <FC count={count} />
      <ButtonComponent onClick={() => setCount((prev) => prev + 1)} />
      <NonContextComponent count={count} />
    </div>
  )
}
`;
const useContextResultCode = `
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

`;

const consumerResultCode = `
import { useState, createContext } from "react";

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

  return (
    // 3. 쓸거라고 Consumer이용해서 쓴다.
    <CreatedContext.Consumer>
      {({ count }) => (
        <div className="component-box" style={{ padding: 10 }}>
          Third Component : {count}
          <LC />
        </div>
      )}
    </CreatedContext.Consumer>
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
  console.log("- B. Button Component");
  // 3. 쓸거라고 Consumer이용해서 쓴다.
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Button Component
      <CreatedContext.Consumer>
        {({ setCount }) => (
          <div>
            <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
          </div>
        )}
      </CreatedContext.Consumer>
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

// 1. context를 쓸거라고 선언.
const CreatedContext = createContext({
  count: -10,
  setCount: (state) => {},
});

// 2. provider 컴포넌트 만들기
function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreatedContext.Provider value={{ count, setCount }}>
        {children}
      </CreatedContext.Provider>
    </>
  );
}

function ConsumerResultComponent() {
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
      <CountContextProvider>
        <FC />
        <ButtonComponent />
      </CountContextProvider>

      <NonContextComponent />
    </div>
  );
}

export default ConsumerResultComponent;

`;

function ContextAPIPage() {
  return (
    <>
      <Header />
      <h2>contextAPI 실습보기</h2>
      <CodeBlock code={practiceCode} />

      <section id="practiceBox">
        <h3>
          실습 17. 아래 Props Drilling 문제를 해결하기 위해 Context API 를
          도입하라.
          <br />위 Props Drilling 을 이해했다면, 이 문제를 Context API 를
          적용하여 풀어보자(useContext로)
        </h3>
        <div id="resultBox">
          <CodeBlock code={useContextResultCode} />
          <UseContextResultComponent />
        </div>
      </section>

      <section id="practiceBox">
        <h3>실습 17. Consumer로 구현하라 - 컴포넌트4만 렌더링된다.</h3>
        <div id="resultBox">
          <CodeBlock code={consumerResultCode} />
          <ConsumerResultComponent />
        </div>
      </section>

      <section id="practiceBox">
        정리 : 전역 상태가 저장되는 Context,
        <br />
        전역 상태를 제공하는 Provider,
        <br />
        전역 상태를 사용하는 Consumer,
        <br />
      </section>

      <section id="practiceBox">
        <h3>useContext와 Consumer 사용 시 차이점이 있다. </h3>
        <p>
          useContext는 사용한 컴포넌트3도 콘솔에 찍히지만 Consumer는 사용한
          컴포넌트3은 콘솔에 찍히지 않았다.{" "}
        </p>
        <p>
          이는 useContext를 사용하는 컴포넌트는 Context를 직접 참조하므로,
          React는 해당 컴포넌트가 변경 사항을 구독하고 있다고 판단
        </p>
        <p>
          Context.Consumer는 React가 값을 변경했을 때 **최소한의 작업(Consumer
          자식 함수만 실행)**만 수행하도록 설계되었다.
        </p>
      </section>

      <section id="practiceBox">
        <h3>실습 19-2. useContext 통해 커스텀 dialog모달 출력</h3>
        <div id="resultBox">
          {/* <CodeBlock code={consumerResultCode} /> */}

          <CustomModalResult />
        </div>
      </section>
    </>
  );
}

export default ContextAPIPage;
