import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/HomePage";
import Login from "./containers/LoginPage";
import Register from "./containers/RegisterPage";
import PrivateRouter from "./components/PrivateRouter";
function App() {
  return (
    <div className="App">
      <Router>
        {/* only users who have passed the accepted access to the home page */}
        <PrivateRouter exact path="/" component={Home} />
        {/* ////////////// */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
