import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Blogs from "./Components/Blogs/Blogs";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import invalidRoute from "./Components/Invalid/InvalidRoute";
import Nav from "./Components/Nav/Nav";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <QueryClientProvider client={queryClient}>
                <Blogs {...props} />
              </QueryClientProvider>
            )}
          />
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
