import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required"),
  password: Yup.string().required("Password is required."),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().required("Please enter you first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your Email Id"),
  // userName: Yup.string().required("Please enter your unique username"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
