import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Component/Header/Header";
import ModalContainer from "./Component/modals/ModalContainer";
import { checkUserToken } from "./API/userFunction";
import useStore from "./store";
import HomePage from "./Page/HomePage";
import MyChannelPage from "./Page/MyChannelPage";
import MyPostsPage from "./Page/MyPostsPage";
import CreateChannelPage from "./Page/CreateChannelPage.jsx";
import ChannelPage from "./Page/ChannelPage";
require("dotenv").config();

function App() {
  const setLoginUser = useStore((state) => state.setLoginUser);
  const loginUer = useStore((state) => state.loginUer);
  useEffect(() => {
    checkUserToken().then((user) => setLoginUser(user.user));
  }, [loginUer, setLoginUser]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/Home" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/MyChannels" exact>
          <MyChannelPage />
        </Route>
        <Route path="/MyPosts" exact>
          <MyPostsPage />
        </Route>
        <Route path="/createChannel" exact>
          <CreateChannelPage />
        </Route>
        <Route path="/channel/:ChannelId">
          <ChannelPage />
        </Route>

        <Route>
          <h3>Error 404</h3>
        </Route>
      </Switch>
      <ModalContainer />
    </div>
  );
}

export default App;
