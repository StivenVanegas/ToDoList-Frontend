import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Register} path="/register" exact/>
        <PrivateRoute component={Home} path="/home" exact/>
        <PublicRoute restricted={true} component={Login} path="/" exact />
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
