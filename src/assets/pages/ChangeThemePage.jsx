import Header from "../components/Header";
import UseContextChangeThemeComponent from "../components/ChangeThemeComponent/UseContextChangeThemeComponent";

function ChangeThemePage() {
  return (
    <>
      <Header />
      <h2>ChangeTheme 실습보기</h2>
      <div>
        <UseContextChangeThemeComponent></UseContextChangeThemeComponent>
      </div>
    </>
  );
}

export default ChangeThemePage;
