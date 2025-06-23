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
  const { tokenChecker } = useAuth();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8000/login", {
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("token", response.data.token);
        await tokenChecker(response.data.token);

        redirect("/");
      } catch (err: any) {
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
