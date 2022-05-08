import "./App.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import customHistory from "./utils/customHistory";
import AuthRoute from "./components/AuthRoute";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router history={customHistory}>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <AuthRoute path="/home" component={Layout}></AuthRoute>
        <Redirect exact path="/" to="/home"></Redirect>
      </Switch>
    </Router>
  );
}
