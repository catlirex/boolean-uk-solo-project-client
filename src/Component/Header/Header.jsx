import styled from "styled-components";
import logo from "../../asset/voteup_logo.png";
import useStore from "../../store";
import NoLogin from "./NoLogin";
import Login from "./Login.jsx";
import { APP_COLOR } from "../../consistent";
import { useHistory } from "react-router-dom";

const StyleHeader = styled.header`
  .container {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
  }
  background-color: ${APP_COLOR.darkBlue};
  .logo {
    width: 100px;
    margin: 10px;
    border-radius: 10px;
  }
`;

export default function Header() {
  const loginUser = useStore((state) => state.loginUser);
  const history = useHistory();

  return (
    <StyleHeader>
      <div className="wrapper container">
        <img className="logo" src={logo} onClick={() => history.push("/")} />
        {loginUser ? <Login /> : <NoLogin />}
      </div>
    </StyleHeader>
  );
}
