import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../actions/posts";

export default function PostComments() {
  const { postId } = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const post = useSelector((state) =>
    postId ? state.posts.find((message) => message._id === postId) : null
  );
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    comments: [],
  });
  const authState = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = () => {
    if (comment.trim().length > 0) {
      if (postId) {
        let email = user?.result?.email ?? authState?.result?.email;
        dispatch(createComment(postId, comment, email));
        setComments([...comments, { email, comment }]);
        setComment("");
      }
    } else {
      alert("Please write comment text");
    }
  };
  const dispatch = useDispatch();

  console.log("POST >>", post);
  useEffect(() => {
    if (post) {
      setPostData(post);
      setComments(post.comments);
    }
  }, [post]);

  return (
    <>
      <Container>
        <h1>{post?.title}</h1>

        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}{" "}
        </Typography>

        <p>{post.message}</p>

        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6} sm={7}>
            <h3>Comments</h3>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              { comments && comments.map(({ comment, email }, idx) => (
                <ListItem style={{ display: "flex", gap: "1rem" }} key={idx}>
                  <Box style={{ fontWeight: "bold" }}>
                    {email.split("@").at(0)}
                  </Box>
                  <Box>{comment}</Box>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Box style={{ display: "grid", gap: "1rem" }}>
            <h3 style={{ margin: 0 }}>Write a comment</h3>
            <TextField
              name="comment"
              size="medium"
              variant="outlined"
              label="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ gridColumn: "1 / 10" }}
            />
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={addComment}
              style={{ gridColumn: "1 / 10" }}
            >
              Add
            </Button>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
