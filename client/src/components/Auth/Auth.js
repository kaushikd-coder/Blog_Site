import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Icon from "./icon";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const OAuthClientID = "356552050100-p7ubu7iqejj44tss8qqjhil0q2b4nl5h.apps.googleusercontent.com";

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const authState = useSelector((state) => state.auth);

  console.log("authState UPDATED", authState);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form));
      navigate("/");
    } else {
      dispatch(signin(form));
      navigate("/");
    }
  };

  const googleSuccess = async (res) => {
    const googleUser = jwt_decode(res.credential);
    const result = googleUser;
    const token = res.credential;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) =>
    alert("Google Sign In was unsuccessful. Try again later", +error);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleOAuthProvider clientId={OAuthClientID}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={googleSuccess}
                onFailure={googleError}
                isSignedIn={true}
                cookiePolicy="single_host_origin"
                render={(renderProps) => (
                  <Button
                    style={{ display: "block" }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    color="primary"
                    startIcon={<Icon />}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                )}
              />
            </div>
          </GoogleOAuthProvider>
          <Grid container justifyContent="center">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
