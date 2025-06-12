"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const ResetPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/reset-password",
          {
            email: values.email,
          }
        );
        alert("Reset link sent to your email.");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        alert(errorMessage);
      }
    },
  });

  return (
    <div className="flex gap-10 items-center justify-center mx-5">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-[416px] h-[372px] shadow-md gap-4"
      >
        <div>
          <Button
            variant="outline"
            className="bg-transparent"
            type="button"
            onClick={() => router.back()}
          >
            <ChevronLeft size={16} />
          </Button>
        </div>
        <div>
          <p className="text-2xl">Reset your password</p>
          <p>Enter your email to receive a password reset link.</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
          <Button
            name="reset"
            type="submit"
            onClick={() => router.push("/Verify")}
            className="w-full rounded-md border border-gray-300 bg-gray-200"
          >
            Send link
          </Button>
          <div className="flex">
            <p>Don't have an account?</p>
            <Button
              variant="link"
              type="button"
              onClick={() => router.push("/SignUp")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
      {/* You mentioned <Right />, but it's not defined — omit or add definition if needed */}
    </div>
  );
};

export default ResetPage;

{
  /* <div className="flex gap-10">

          <LogIn
            values={formik.values}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            errors={formik.errors}
          />
        </div> */
}

{
  /* <form onSubmit={formik.handleSubmit}>



      </form> */
}
