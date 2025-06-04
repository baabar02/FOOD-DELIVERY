"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Left } from "./_components/Left";
import { Password } from "./_components/Password";
import Right from "./_components/Rigth";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type TouchedType = {
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export type InputPropsType = {
  values: FormValues;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: TouchedType;
  errors: Errors;
  handleSubmit: () => void;
  togglePassword: () => void;
  showPassword: boolean;
  prevStep: () => void;
  nextStep: () => void;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email. Use format like example@email.com"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignUpPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const Components = [Left, Password];
  const Stepper = Components[currentStep];

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  console.log(showPassword, "asd");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      if (currentStep < Components.length - 1) {
        nextStep();
      } else {
        router.push("/");
        console.log(values, "asddadas");
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-10">
          <Stepper
            prevStep={prevStep}
            nextStep={nextStep}
            values={formik.values}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
            handleSubmit={formik.handleSubmit}
            togglePassword={togglePassword}
            showPassword={showPassword}
          />
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
