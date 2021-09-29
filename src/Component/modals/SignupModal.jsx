import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import styled from "styled-components";
import { postUser } from "../../API/userFunction";
import useStore from "../../store";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function SignUpModal({ className }) {
  const closeModal = useStore((store) => store.closeModal);
  const classes = useStyles();
  const setLoginUser = useStore((state) => state.setLoginUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(newUser);
    postUser(newUser).then((data) => {
      if (data) {
        setLoginUser(data.user);
        document.cookie = `token=${data.token}`;
        closeModal();
      } else {
        const errorMsg = document.querySelector(".error");
        errorMsg.innerHTML = "Email Exists";
      }
    });
  };
  // function signUp(e) {
  //   e.preventDefault();
  //   const target = e.target;

  //   let newUser = {
  //     id: target.username.value,
  //     name: target.name.value,
  //     password: target.password.value,
  //     history: [],
  //     "saved-journey": [],
  //     "saved-place": {},
  //   };

  //   if (target.home.value && postCodeIsValid)
  //     newUser["saved-place"] = { home: target.home.value };
  //   else if (target.home.value && !postCodeIsValid)
  //     return alert("PostCode incorrect");

  //   postUser(newUser).then((dataFromServer) => {
  //     if (!dataFromServer || dataFromServer.id !== newUser.id) return;
  //     newRegUserSetLogin(dataFromServer);
  //     closeModal();
  //     history.push(`/logged-in/${dataFromServer.id}`);
  //   });
  // }

  return (
    <div className={className}>
      <form
        className={classes.root}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2>Welcome to VoteUp</h2>
        <h3>Join to hottest channel today</h3>
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
          label="Password"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
          required
        />
        <TextField
          name="avatar"
          id="avatar"
          label="Avatar image url"
          autoComplete="off"
          defaultValue=""
          variant="outlined"
        />
        <p className="error"></p>
        <Button variant="contained" color="primary" type="submit">
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default styled(SignUpModal)`
  form {
    display: grid;
    grid-gap: 10px;
    place-items: center;

    .error{
        color:red;
        font-size:0.8rem;
    }
  `;
