import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./components/Admin/Admin/Admin";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
