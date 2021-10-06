import "./App.css";
import Products from "./components/Products/Products";
import { useState } from "react";
import { AppContext } from "./context/AppContext";
function App() {
  const [products, setProducts] = useState();

  return (
    <div className="App">
      <AppContext.Provider value={{ products, setProducts }}>
        <Products />
      </AppContext.Provider>
    </div>
  );
}

export default App;
