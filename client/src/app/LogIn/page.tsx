"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { writeFileSync } from "fs";
import { LogIn } from "./_components/LogIn";
import { Reset } from "./_components/Reset";
import { Verify } from "./_components/Verify";

type FormValues = {
  email: string;
  password: string;

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
  password: Yup.string()
    .required("Invalid password. Please try again")

});

const LogInPage = () => {
  const router = useRouter();
  const [currentStep,setCurrentStep] =useState(0);
  const Components = [LogIn,Reset,Verify];  

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log("asdfghjkl");
      const response = await axios.post("http://localhost:8000/login", {
        email: values.email,
        password: values.password,
      });
      console.log(response, "axios");
      router.push("/");

      const response1 = await axios.post("http://localhost:8000/reset-password", {
        email:values.email
      });

      const response2 = await axios.post("http://localhost:8000/resend-verification", {
            email: values.email,
          });
    },
  });

  const Stepper = Components[currentStep];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-10">
     <Stepper
          values={formik.values}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          errors={formik.errors}
          prevStep={currentStep > 0 ? prevStep : undefined}
          nextStep={nextStep}
        />
        </div>
      </form>
    </div>
  );
};

export default LogInPage;

