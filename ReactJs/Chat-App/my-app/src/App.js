import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "./app/reducers/auth.slice";
import Loading from "./components/loading";
import "./App.css";

const Home = lazy(() => import("./containers/HomePage"));
const Login = lazy(() => import("./containers/LoginPage"));
const Register = lazy(() => import("./containers/RegisterPage"));
const NotFoundPage = lazy(() => import("./components/notfound"));
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.accepted) {
      dispatch(isLoggedIn());
    }
  });
  return (
    <Suspense fallback= {<Loading />}>
      <div className="App">
        <Router>
          <Switch>
            {/* only users who have passed the accepted access to the home page */}
            <PrivateRouter exact path="/" component={Home} />
            {/* ////////////// */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
