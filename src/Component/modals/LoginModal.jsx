import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import useStore from "../../store";
import { useHistory } from "react-router-dom";
import { getUserToken } from "../../API/userFunction";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function LoginModal({ className }) {
  const classes = useStyles();
  const loginUser = useStore((state) => state.loginUser);
  const setLoginUser = useStore((state) => state.setLoginUser);
  const closeModal = useStore((store) => store.closeModal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    const loginCredentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const data = await getUserToken(loginCredentials);
    console.log("login", data);
    if (data) {
      setLoginUser(data.user);
      document.cookie = `token=${data.token}; path=/`;
      closeModal();
    } else {
      const errorMsg = document.querySelector(".error");
      errorMsg.innerHTML = "Email/Password Incorrect";
    }
  }
  console.log(loginUser);

  return (
    <div className={className}>
      <form className={classes.root} onSubmit={handleLogin}>
        <h2>(: Welcome Back :)</h2>
        <TextField
          name="email"
          id="email"
          label="email"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
          error={false}
          required
        />
        <TextField
          type="password"
          name="password"
          id="password"
          label="password"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
          error={false}
          required
        />
        <p className="error"></p>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default styled(LoginModal)`
  form {
    display: grid;
    grid-gap: 10px;
    place-items: center;
  }
  .error {
    color: red;
    font-size: 0.8rem;
  }
`;
