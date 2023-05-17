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
  date: {
    region: "es-MX",
    calendarFormat: "dd/mm/yy",
  },
  belts: {
    BLANCA: "#CCCCCC",
    AMARILLA: "#F6E05E",
    NARANJA: "#ED8936",
    VERDE: "#2F855A",
    AZUL: "#2B6CB0",
    MORADA: "#553C9A",
    CAFE: "#8B4513",
    ROJA: "#822727",
    NEGRA: "#000000",
    DAN_1: "#4A5568",
    DAN_2: "#4A5568",
    DAN_3: "#4A5568",
    DAN_4: "#4A5568",
    DAN_5: "#4A5568",
    DAN_6: "#E53E3E",
    DAN_7: "#E53E3E",
    DAN_8: "#E53E3E",
    DAN_9: "#E53E3E",
    DAN_10: "#E53E3E",
  },
  inputMask: {
    phone: "99 9999 9999",
  },
  modal: {
    breackpoints: {
      "960px": "75vw",
      "641px": "100vw",
    },
  },
};
