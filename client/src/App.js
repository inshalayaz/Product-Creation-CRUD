import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import NoAccess from "./pages/NoAccess/NoAccess";
import Register from "./pages/Register/Register";
import Navbar from "./components/Products/Navbar/Navbar";
import { AppContext } from "./context/AppContext";
import DynamicForm from "./pages/DynamicForm/DynamicForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  var authStatus = false;
  if (localStorage.getItem("profile") !== null) {
    authStatus = true;
  } else {
    authStatus = false;
  }

  const [products, setProducts] = useState();
  const [loginStatus, setLoginStatus] = useState(authStatus);
  const [board, setBoard] = useState([]);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          products,
          setProducts,
          loginStatus,
          setLoginStatus,
          board,
          setBoard,
        }}
      >
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/form">
              <DndProvider backend={HTML5Backend}>
                <DynamicForm />
              </DndProvider>
            </Route>
            <Route path="/noaccess">
              <NoAccess />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
