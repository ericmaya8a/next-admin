import {
  Gender,
  PaymentType,
  Rank,
  UniformBrand,
  UniformType,
} from "@prisma/client";
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

const PaymentSchema = Yup.object({
  paymentType: Yup.mixed()
    .oneOf(Object.keys(PaymentType))
    .required()
    .label("Payment Type"),
});

export const LoginSchema = EmailSchema.concat(PasswordSchema);

export const SigninSchema = stringSchema("Name").concat(LoginSchema);

export const StudentFormSchema = Yup.object({
  firstName: Yup.string().required().label("Name"),
  lastName: Yup.string().required().label("Last Name"),
  birthDate: Yup.date().required().label("Birth Date"),
  gender: Yup.mixed().oneOf(Object.keys(Gender)).required().label("Gender"),
  height: Yup.string().nullable().label("Height"),
  weight: Yup.string().nullable().label("Weight"),
  inscriptionDate: Yup.date().required().label("Inscription Date"),
  phone: Yup.string().nullable().label("Phone"),
  cellPhone: Yup.string().required().label("Cell Phone"),
  lineOne: Yup.string().required().min(3).label("Street"),
  lineTwo: Yup.string().nullable().label("Street 2"),
  exteriorNumber: Yup.string().required().label("Exterior Number"),
  interiorNumber: Yup.string().nullable().label("Interior Number"),
  suburb: Yup.string().required().min(3).label("Suburb"),
  municipality: Yup.string().required().min(3).label("Municipality"),
  zipCode: Yup.string().required().min(5).max(5).label("Zip code"),
  active: Yup.bool().label("Active Student"),
}).concat(EmailSchema);

export const PromotionFormSchema = Yup.object({
  date: Yup.date().required().label("Date"),
  rank: Yup.mixed().oneOf(Object.keys(Rank)).required().label("Rank"),
});

export const PaymentFormSchema = Yup.object({
  date: Yup.date().required().label("Date"),
  amount: Yup.string()
    .required()
    .test(
      "amount",
      "invalid value",
      (value) => CONSTANTS.regex.decimal.test(value) || value.length === 0
    )
    .label("Amount"),
}).concat(PaymentSchema);

export const BuyUniformSchema = Yup.object({
  type: Yup.mixed().required().oneOf(Object.keys(UniformType)).label("Type"),
  brand: Yup.mixed().required().oneOf(Object.keys(UniformBrand)).label("Brand"),
  size: Yup.string().required().min(1).label("Size"),
  price: Yup.number().required().min(1).label("Price"),
  amount: Yup.number().required().min(1).label("Amount"),
}).concat(PaymentSchema);
