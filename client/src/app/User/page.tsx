"use client";

import { UserSignUp } from "./_components/UserSignUp";
import * as Yup from "yup";
import { useFormik } from "formik";
import React from "react";
import { error } from "console";
import axios from "axios";
import { Password } from "../SignUp/_components/Password";
import { useRouter } from "next/navigation";

type FormValues = {
  userName: string;
  password: string;
  confirmPassword: string;
};

export type UserProps = {
  values: FormValues;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: { userName?: boolean; password?: boolean };
  errors: { userName?: string; password?: string; confirmPassword?: string };
};

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("User name is required")
    .min(3, "User name must be at least 3 characters")
    .notOneOf(["test"], "Please enter valid user name"),
  password: Yup.string()
    .required("Invalid Password, please try again")
    .min(3, "Password must be at least 3 character")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), "Password must match"]),
});

const UserPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values, "ads");
      const response = await axios.post("http://localhost:8000/user", {
        userName: values.userName,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      console.log(response.data.message, "axx");
      if (response.data.message === "successfully registered") {
        router.push("/");
      } else {
      }
    },
  });

  return (
    <div>
      <UserSignUp
        values={formik.values}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
      />
    </div>
  );
};

export default UserPage;
