"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { LogIn } from "./_components/LogIn";
import { useAuth } from "../_components/UserProvider";

type FormValues = {
  email: string;
  password: string;
};

type JwtPayload = {
  userId: string;
};

export type InputPropsTypePage = {
  values: FormValues;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: { email?: boolean; password?: boolean };
  errors: { email?: string; password?: string };
  prevStep?: () => void;
  nextStep?: () => void;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter valid email address"),
  password: Yup.string().required("Invalid password. Please try again"),
});

const LogInPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { user, tokenChecker } = useAuth();
  console.log(user, "from page");

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://food-delivery-p342.onrender.com/login",
          {
            email: values.email,
            password: values.password,
          }
        );

        console.log("after response");

        if (typeof window !== "undefined") {
          localStorage.setItem("token", response?.data?.token);
        }
        tokenChecker(response?.data?.token);

        console.log("after localstorage set");
        console.log(user, "USER");
      } catch (err: any) {
        console.log("Login error", err);

        const errorMessage =
          err.response?.data?.message || "Error occured. try again";
        alert(errorMessage);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-10">
          <LogIn
            values={formik.values}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>
      </form>
    </div>
  );
};

export default LogInPage;
