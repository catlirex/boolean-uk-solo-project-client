import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import useStore from "../../store";
import { useHistory } from "react-router-dom";

function ErrorModal({ className }) {
  const errorMsg = useStore((state) => state.errorMsg);
  const clearErrorMsg = useStore((state) => state.clearErrorMsg);
  const closeModal = useStore((state) => state.closeModal);
  const history = useHistory();

  const handleClick = () => {
    clearErrorMsg();
    closeModal();
    history.push("/");
  };

  return (
    <div className={className}>
      <p>{errorMsg}</p>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Back to Home
      </Button>
    </div>
  );
}

export default styled(ErrorModal)``;
