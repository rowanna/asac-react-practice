import Header from "../components/Header";
import {
  useState,
  memo,
  useMemo,
  useCallback,
  useEffect,
  createContext,
} from "react";
import { createPortal } from "react-dom";

// const LoadingContext = createContext({
//   isShow: false,
// });

// function LoadingContextProvider({children}) {
//     return(
//         <LoadingContext.Provider>
//             {children}
//         </LoadingContext.Provider>
//     )
// }

// function Loading() {
//   return createPortal(
//     <div id="loading">
//       <span>로딩중입니다</span>
//     </div>,
//     document.body
//   );
// }

function ProductListComponent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function fetchCategories() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
        fetchProductOfCategories(data[0]);
      } catch (error) {
        console.log(error, "error");
      }
    })();
  }, []);

  async function fetchProductOfCategories(selectedCategory) {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${selectedCategory}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error, "error");
    }
  }

  function handleOnChange(e) {
    const selectedCategory = e.target.value;
    fetchProductOfCategories(selectedCategory);
  }

  return (
    <>
      {/* <Loading /> */}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <select name="" id="" onChange={handleOnChange}>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
        {products.map((product) => (
          <div key={product.id} style={{ textAlign: "start" }}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <div style={{ color: "orange" }}>{product.price}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function UseEffectPage() {
  return (
    <>
      <Header />
      <h2>UseEffectPage 실습보기</h2>

      <ProductListComponent />
    </>
  );
}

export default UseEffectPage;
