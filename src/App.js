import { Check } from "@material-ui/icons";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Component/Header/Header";
import ModalContainer from "./Component/modals/ModalContainer";
import { checkUserToken } from "./API/userFunction";
import useStore from "./store";
require("dotenv").config();

function App() {
  const setLoginUser = useStore((state) => state.setLoginUser);
  useEffect(() => {
    checkUserToken().then((user) => setLoginUser(user.user));
  }, []);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route>
          <h3>Error 404</h3>
        </Route>
      </Switch>
      <ModalContainer />
    </div>
  );
}

export default App;
