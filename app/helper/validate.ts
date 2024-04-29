/** validate username */
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { Alert } from "react-native";

interface UserNameValues {
  userName: string;
}

interface PasswordValues {
  password: string;
}
interface ResetPasswordValues {
  password: string;
  confirm_pwd: string;
}

interface EmailValues {
  password: string;
  email: string;
  userName: string;
}
interface RegisterFormValues {
  password: string;
  email: string;
  userName: string;
}

export const userNameValidate = async (values: UserNameValues) => {
  const errors = verifyUserName(values);
  return errors;
};

export const passwordValidate = async (values: PasswordValues) => {
  const errors = verifyPassword(values);
  return errors;
};

export const resetPasswordValidate = async (values: ResetPasswordValues) => {
  const errors = verifyPassword(values);
  if (values.password != values.confirm_pwd) {
    errors.password = "Password doesn't match";
    Alert.alert("Error", errors.password);
  }
  return errors;
};

export const registerFormValidation = async (values: RegisterFormValues) => {
  const errors = verifyUserName(values);
  passwordValidate(values);
  emailValidate(values);

  return errors;
};

export const emailValidate = async (values: EmailValues) => {
  const errors = verifyEmail(values);
  return errors;
};

const verifyEmail = (values: EmailValues) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordRegex =
    /^(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[\w!@#$%^&*()-_=+[\]{};:'",.<>?/\\|]{8,}$/;
  let errors: FormikErrors<EmailValues> = {};
  if (!values.email) {
    errors.email = "Email required";
    Alert.alert("Error", errors.email);
  } else if (values.email.includes(" ")) {
    errors.email = "Invalid Email Address";
    Alert.alert("Error", errors.email);
  } else if (!emailRegex.test(values.email)) {
    (errors.email = "Error"), "Please enter a valid email address.";
    Alert.alert("Error", errors.email);
  }

  return errors;
};

// else if (!values.password) {
//     errors.password = "Password required";
//     Alert.alert("Error", errors.password);
//   } else if (values.password.includes(" ")) {
//     errors.password = "Invalid Password";
//     Alert.alert("Error", errors.password);
//   } else if (values.password.length < 5) {
//     errors.password = "Password must be more tha 4 characters";
//     Alert.alert("Error", errors.password);
//   } else if (!passwordRegex.test(values.password)) {
//     errors.password =
//       "Password must be at least 8 characters long and contain at least one special character.";
//     Alert.alert("Error", errors.password);
//   }

const verifyUserName = (values: UserNameValues) => {
  let errors: FormikErrors<UserNameValues> = {};
  if (!values.userName) {
    errors.userName = "Username required";
    Alert.alert("Error", errors.userName);
  } else if (values.userName.includes(" ")) {
    errors.userName = "Invalid UserName";
    Alert.alert("Error", errors.userName);
  }

  return errors;
};

const verifyPassword = (values: PasswordValues) => {
  let errors: FormikErrors<PasswordValues> = {};
  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*[!@#$%^&*()-_=+[\]{};:'",.<>?/\\|])[\w!@#$%^&*()-_=+[\]{};:'",.<>?/\\|]{8,}$/;
  if (!values.password) {
    errors.password = "Password required";
    Alert.alert("Error", errors.password);
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  } else if (values.password.length < 5) {
    errors.password = "Password must be more tha 4 characters";
    Alert.alert("Error", errors.password);
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters long and contain at least one special character.";
    Alert.alert("Error", errors.password);
  }

  return errors;
};
