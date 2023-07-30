import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  Box,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost } from "../../../actions/posts";
import useStyles from "./styles";

import { Link } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />{" "}
      <div className={classes.overlay}>
        <Typography variant="h6"> {post.creator} </Typography>{" "}
        <Typography variant="body2">
          {" "}
          {moment(post.createdAt).fromNow()}{" "}
        </Typography>{" "}
      </div>{" "}
      {/* <div className={classes.overlay2}>
                <Button
                    style={{
                        color: "white",
                    }}
                    size="small"
                    onClick={() => setCurrentId(post._id)}>
                    {" "}
                    Edit
                </Button>{" "}
            </div>{" "} */}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {" "}
          {post.tags.map((tag) => `#${tag} `)}{" "}
        </Typography>{" "}
      </div>{" "}
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {" "}
        {post.title}{" "}
      </Typography>{" "}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {" "}
          {post.message}{" "}
        </Typography>{" "}
      </CardContent>{" "}
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => setCurrentId(post._id)}
        >
          {" "}
          <EditIcon fontSize="small" />
          Edit
        </Button>{" "}
        <Link to={`/comments/${post._id}`}>
          <QuestionAnswerIcon fontSize="small" /> Comments
        </Link>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          {" "}
          <DeleteIcon fontSize="small" /> Delete{" "}
        </Button>{" "}
      </CardActions>{" "}
    </Card>
  );
};

export default Post;
