import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Card from "./Components/Card/Card";
import Header from "./Components/Header/Header";
import Login from "./Login";
import invalidRoute from './InvalidRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Card} />
          <Route exact path="/login" component={Login} />
          <Route path="/" component={invalidRoute} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
