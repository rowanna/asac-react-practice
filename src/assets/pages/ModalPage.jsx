import Header from "../components/Header";
import CodeBlock from "../components/CodeBlock";
import ModalUseReducerComponent from "../components/ModalComponent/ModalUseReducerComponent";
import UsecontextCustomModalResultComponent from "../components/ModalComponent/UsecontextCustomModalResultComponent";
import CustomCloseEventModalComponent from "../components/ModalComponent/CustomCloseEventModalComponent";

function ModalPage() {
  return (
    <>
      <Header />
      <h2>ModalPage 실습보기</h2>
      {/* <CodeBlock code={practiceCode} /> */}

      <section id="practiceBox">
        <h3>실습 20-1. useContext 통해 커스텀 dialog모달 출력</h3>
        <div id="resultBox">
          {/* <CodeBlock code={consumerResultCode} /> */}

          <UsecontextCustomModalResultComponent />
        </div>
      </section>
      <section id="practiceBox">
        <h3>
          실습20-4. Provider, useReducer, portal을 활용한 모달을 만들어보자.
        </h3>
        <div id="resultBox">
          {/* <CodeBlock code={resultCode1} /> */}
          <ModalUseReducerComponent />
        </div>
      </section>

      <section id="practiceBox">
        <h3>
          실습 20-6. 닫기 이벤트인데 다른이벤트를 붙일 수가 있다.닫기버튼도
          다를수있다.
        </h3>
        <div id="resultBox">
          {/* <CodeBlock code={resultCode1} /> */}
          <CustomCloseEventModalComponent />
        </div>
      </section>
    </>
  );
}

export default ModalPage;
