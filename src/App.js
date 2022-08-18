import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import PrivateRouter from "./components/PrivateRouter";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import NewCase from "./pages/newCase/NewCase";
function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRouter path="/dashboard" exact component={Dashboard} />
          <PrivateRouter path="/dashboard/case" exact component={NewCase} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
