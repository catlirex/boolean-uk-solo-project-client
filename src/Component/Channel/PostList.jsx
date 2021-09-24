import useStore from "../../store";
import ImagePost from "../Post/ImagePost";
import VideoPost from "../Post/VideoPost";
import TextPost from "../Post/TextPost";

export default function PostList() {
  const selectedChannelPosts = useStore((state) => state.selectedChannelPosts);
  if (!selectedChannelPosts) return <h2>no post.. be the first one</h2>;
  return (
    <ul>
      {selectedChannelPosts.map((post) => {
        if (post.image) return <ImagePost />;
        else if (post.video) return <VideoPost />;
        else return <TextPost />;
      })}
    </ul>
  );
}
