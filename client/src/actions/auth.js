import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";
import jwt_decode from "jwt-decode";

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data: { result: jwt_decode(data), token: data } });
  } catch (error) {
    console.error(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data: { result: jwt_decode(data), token: data } });
  } catch (error) {
    console.log(error);
  }
};
