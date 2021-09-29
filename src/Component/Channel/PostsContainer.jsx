import * as React from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PostList from "./PostList";
import styled from "styled-components";
import useStore from "../../store";
import { getPost } from "../../API/postFunction";

const StyleContainer = styled.div`
  padding: 0 30px;
`;

export default function PostsContainer({ userChannelRelation }) {
  const [order, setOrder] = React.useState("vote");
  const selectedChannel = useStore((state) => state.selectedChannel);
  const setSelectChannelPost = useStore((state) => state.setSelectChannelPost);
  const handleOrder = (event, selectedOrder) => {
    setOrder(selectedOrder);
  };

  React.useEffect(() => {
    getPost(selectedChannel.id, order).then((postList) =>
      setSelectChannelPost(postList)
    );
  }, [order, selectedChannel, setSelectChannelPost]);

  return (
    <StyleContainer>
      <ToggleButtonGroup
        value={order}
        exclusive
        onChange={handleOrder}
        aria-label="order"
      >
        <p>Sort by: </p>
        <ToggleButton value="vote" aria-label="vote">
          <BarChartIcon />
        </ToggleButton>
        <ToggleButton value="hot" aria-label="hot">
          <LocalFireDepartmentIcon />
        </ToggleButton>
        <ToggleButton value="new" aria-label="new">
          <FiberNewIcon />
        </ToggleButton>
      </ToggleButtonGroup>

      <PostList userChannelRelation={userChannelRelation} />
    </StyleContainer>
  );
}
