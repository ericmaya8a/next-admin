import { ToastMessage } from "primereact/toast";

const serverError: ToastMessage = {
  severity: "error",
  summary: "Error",
  detail: "Server Error, please try again later",
};

export const CONSTANTS = {
  urls: {
    HOME: "/",
    ADMIN: "/admin",
    STUDENTS: "/admin/students",
    LOGIN: "/login",
    SIGNIN: "/signin",
    REGISTER: "/api/register",
  },
  bcrypt: {
    SALT: 10,
  },
  regex: {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password:
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z@#$%^&+=!]).{8,16}$/,
  },
  messages: {
    invalidPassword:
      "Password should have at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
    serverError,
  },
};
