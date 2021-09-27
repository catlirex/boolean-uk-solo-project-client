import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { APP_COLOR } from "../../consistent";
import styled from "styled-components";
import useStore from "../../store";
import { signOut } from "../../API/userFunction";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { useHistory } from "react-router-dom";

const ColoredButton = withStyles(() => ({
  root: {
    height: "30px",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    margin: "10px",
    borderRadius: 0,
    color: APP_COLOR.lightGreen,
    backgroundColor: APP_COLOR.blue,
    "&:hover": {
      backgroundColor: APP_COLOR.lightGreen,
      color: APP_COLOR.blue,
    },
  },
}))(Button);

const StyleDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  .avatar {
    width: 30px;
    border-radius: 50%;
    margin: 10px;
  }
`;

export default function Login() {
  const loginUser = useStore((state) => state.loginUser);
  const logoutUser = useStore((state) => state.logoutUser);
  const [displayMenu, setDisplayMenu] = useState(false);
  const history = useHistory();

  const handleSignOut = () => {
    signOut().then((res) => {
      logoutUser();
      history.push("/");
    });
  };

  return (
    <StyleDiv>
      <ColoredButton onClick={() => handleSignOut()}>Sign Out</ColoredButton>
      <div onMouseEnter={() => setDisplayMenu(true)}>
        <img className="avatar" src={loginUser.avatar}></img>
      </div>
      <UserMenu />
    </StyleDiv>
  );
}
