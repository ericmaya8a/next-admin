import { Gender } from "@prisma/client";
import * as Yup from "yup";
import { CONSTANTS } from "../constatnts";

const EmailSchema = Yup.object({
  email: Yup.string()
    .required()
    .matches(CONSTANTS.regex.email, { message: "Invalid Email" })
    .label("Email"),
});

const PasswordSchema = Yup.object({
  password: Yup.string()
    .required()
    .min(8)
    .matches(CONSTANTS.regex.password, {
      message: CONSTANTS.messages.invalidPassword,
    })
    .max(16)
    .label("Password"),
});

const stringSchema = (key: string) =>
  Yup.object({ [key.toLowerCase()]: Yup.string().required().label(key) });

export const LoginSchema = EmailSchema.concat(PasswordSchema);

export const SigninSchema = stringSchema("Name").concat(LoginSchema);

export const StudentFormSchema = Yup.object({
  firstName: Yup.string().required().label("Name"),
  lastName: Yup.string().required().label("Last Name"),
  birthDate: Yup.date().required().label("Birth Date"),
  gender: Yup.mixed().oneOf(Object.keys(Gender)).required().label("Gender"),
});
