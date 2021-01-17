import * as yup from "yup";

export default yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(3, "username must be 3 chars long"),
  password: yup
    .string().required("password is required")
    .min(8, "password must be at least 8 characters in length")
});