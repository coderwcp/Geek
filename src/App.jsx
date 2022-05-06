import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Redirect to="/home"></Redirect>}
        ></Route>
        <Route path="/login" component={Login}></Route>
        <AuthRoute path="/home" component={Layout}></AuthRoute>
      </Switch>
    </Router>
  );
}
