import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Card from "./Components/Card/Card";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import invalidRoute from "./InvalidRoute";
import Nav from "./Components/Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" render={(props) => <Card {...props} />} />
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route path="/" component={invalidRoute} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
