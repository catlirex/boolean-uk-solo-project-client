import * as React from "react";
import styled from "styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useStore from "../../store";
import SmsIcon from "@mui/icons-material/Sms";
import { Button } from "@material-ui/core";

const StyleFooter = styled.footer`
  padding-top: 5px;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  .vote-group {
    width: 150px;
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
  }
  .vote-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .icon {
    width: 40px;
    height: 40px;
  }
  .vote-num {
    color: black;
    font-weight: 700;
    font-size: 1rem;
  }
`;

export default function PostFoot({ post }) {
  const [vote, setVote] = React.useState(null);
  const loginUser = useStore((state) => state.loginUsers);
  const setModal = useStore((state) => state.setModal);
  console.log("loginUser", loginUser);

  const handleAlignment = (event, selectedVote) => {
    if (!loginUser) return setModal("login");
    setVote(selectedVote);
    console.log(selectedVote);
    // saveVote(selectedVote)
  };

  return (
    <StyleFooter>
      <ToggleButtonGroup
        className="vote-group"
        value={vote}
        exclusive
        onChange={handleAlignment}
        aria-label="vote"
      >
        <ToggleButton className="vote-btn" value="up" aria-label="vote up">
          <ArrowDropUpIcon className="icon" />
        </ToggleButton>

        <ToggleButton className="vote-btn" disabled aria-label="vote number">
          <p className="vote-num">{post.vote}</p>
        </ToggleButton>

        <ToggleButton className="vote-btn" value="down" aria-label="vote down">
          <ArrowDropDownIcon className="icon" />
        </ToggleButton>
      </ToggleButtonGroup>
      <Button>
        <SmsIcon />
        {post._count.comment}
      </Button>
    </StyleFooter>
  );
}
