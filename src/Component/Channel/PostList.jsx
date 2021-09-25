import useStore from "../../store";
import ImagePost from "../Post/ImagePost";
import VideoPost from "../Post/VideoPost";
import TextPost from "../Post/TextPost";
import styled from "styled-components";

const StyleUl = styled.ul`
  padding: 0;
  display: grid;
  gap: 20px;
`;

export default function PostList() {
  const selectedChannelPosts = useStore((state) => state.selectedChannelPosts);
  if (!selectedChannelPosts) return <h2>no post.. be the first one</h2>;
  return (
    <StyleUl>
      {selectedChannelPosts.map((post) => {
        if (post.image) return <ImagePost post={post} key={post.id} />;
        else if (post.video) return <VideoPost post={post} key={post.id} />;
        else return <TextPost post={post} key={post.id} />;
      })}
    </StyleUl>
  );
}
