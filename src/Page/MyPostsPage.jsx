import { useEffect, useState } from "react";
import useStore from "../store";
import { getUserPosts } from "../API/userFunction";
import ImagePost from "../Component/Post/ImagePost";
import VideoPost from "../Component/Post/VideoPost";
import TextPost from "../Component/Post/TextPost";
import styled from "styled-components";

const StyleMain = styled.main`
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
  padding-right: 20px;
  padding-left: 20px;
  h1 {
    padding: 20px 0;
  }
  ul {
    display: grid;
    gap: 20px;
  }
`;

export default function MyPostsPage() {
  const loginUser = useStore((state) => state.loginUser);
  const setModal = useStore((state) => state.setModal);
  const [userPosts, setUserPosts] = useState(null);
  useEffect(() => {
    getUserPosts().then((data) => setUserPosts(data));
  }, [loginUser]);

  if (userPosts === null) return <h1>Loading...</h1>;
  if (userPosts.length === 0) return <h1>No post yet</h1>;

  return (
    <StyleMain>
      <h1>My post:</h1>
      <ul>
        {userPosts.map((post) => {
          if (post.image) return <ImagePost post={post} key={post.id} />;
          else if (post.video) return <VideoPost post={post} key={post.id} />;
          else return <TextPost post={post} key={post.id} />;
        })}
      </ul>
    </StyleMain>
  );
}
