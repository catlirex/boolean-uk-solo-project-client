import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getPostDetail } from "../API/postFunction";
import styled from "styled-components";
import { APP_COLOR } from "../consistent";
import PostHeader from "../Component/Post/PostHeader";
import PostFoot from "../Component/Post/PostFoot";
import { getVideoId } from "../Component/Post/VideoPost";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CreateComment from "../Component/Comment/CreateComment";
import CommentList from "../Component/Comment/CommentList";

const ColoredButton = withStyles(() => ({
  root: {
    placeSelf: "center",
    height: "30px",
    width: "150px",
    justifySelf: "right",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    margin: "10px",
    borderRadius: 0,
    color: APP_COLOR.darkBlue,
    backgroundColor: APP_COLOR.sharpGreen,
    "&:hover": {
      backgroundColor: APP_COLOR.darkBlue,
      color: APP_COLOR.sharpGreen,
    },
  },
}))(Button);

const StyleMain = styled.main`
  padding: 0 20px;
  .post-content {
    padding: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${APP_COLOR.darkBlue};
    color: ${APP_COLOR.white};
    .post-img {
      width: 100%;
      padding-top: 10px;
    }
  }
  .channel-info {
    padding: 20px 0px;
    display: grid;
    grid-auto-flow: column;
    max-inline-size: fit-content;
    align-items: center;
  }
  .content-container {
    display: grid;
    place-items: center;
  }
`;

export default function PostDetailPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  let videoId = null;

  if (postDetail?.video && postDetail.video.includes("youtube")) {
    videoId = getVideoId(postDetail.video);
  }

  useEffect(() => {
    getPostDetail(postId).then((data) => {
      if (!data) setPostDetail(undefined);
      else setPostDetail(data);
    });
  }, [postId]);

  if (postDetail === null)
    return (
      <StyleMain>
        <h1>Loading</h1>
      </StyleMain>
    );
  if (postDetail === undefined)
    return (
      <StyleMain>
        <h1>Post not found</h1>
      </StyleMain>
    );
  else
    return (
      <StyleMain>
        <div className="channel-info">
          <p>Post from: </p>
          <ColoredButton
            onClick={() => history.push(`/channel/${postDetail.channelId}`)}
          >
            {postDetail.channelId}
          </ColoredButton>
        </div>
        <section className="post-content">
          <PostHeader post={postDetail} />
          <h2>{postDetail.title}</h2>
          <div className="content-container">
            {postDetail.content ? <p>{postDetail.content}</p> : null}
            {postDetail.image ? (
              <img src={postDetail.image} className="post-img" />
            ) : null}
            {postDetail.video ? (
              <div className="video-container">
                {postDetail.video.includes("youtube") ? (
                  <iframe
                    title={postDetail.title}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <iframe
                    title={postDetail.title}
                    frameBorder="0"
                    allowFullScreen
                    src={postDetail.video}
                  ></iframe>
                )}
              </div>
            ) : null}
          </div>
        </section>
        <PostFoot post={postDetail} />
        <section className="comment-section">
          <CreateComment
            postDetail={postDetail}
            setPostDetail={setPostDetail}
          />
          <CommentList postDetail={postDetail} setPostDetail={setPostDetail} />
        </section>
      </StyleMain>
    );
}
