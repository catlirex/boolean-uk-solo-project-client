import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { APP_COLOR } from "../../consistent";
import useStore from "../../store";

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

export default function NoLogin() {
  const setModal = useStore((state) => state.setModal);
  return (
    <div>
      <ColoredButton onClick={() => setModal("signUp")}>SignUp</ColoredButton>
      <ColoredButton onClick={() => setModal("login")}>LogIn</ColoredButton>
    </div>
  );
}
