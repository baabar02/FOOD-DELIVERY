"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Right from "../../SignUp/_components/Rigth";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NewPasswordProps {
  email: string;
  prevStep: () => void;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/[0-9]/, "Password must contain numbers"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const NewPassword = ({ email, prevStep }: NewPasswordProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      if (!email) {
        setError("Email is missing. Please start the reset process again.");
        return;
      }
      try {
        await axios.post(
          "https://food-delivery-p342.onrender.com/reset-password",
          {
            email,
            newPassword: values.password,
          }
        );
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => router.push("/LogIn"), 2000);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      }
    },
  });

  const isButtonDisabled =
    !!formik.errors.password ||
    !!formik.errors.confirmPassword ||
    !formik.values.password ||
    !formik.values.confirmPassword ||
    formik.isSubmitting;

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
            onClick={prevStep} // Go back to VerifyPage
          >
            Back
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create new password</p>
          <p>
            Set a new password with a combination of letters and numbers for
            better security.
          </p>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <div className="flex flex-col gap-4">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
          <Input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Password again"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={showPassword}
              onCheckedChange={() => setShowPassword(!showPassword)}
            />
            <p>Show password</p>
          </div>
          <Button
            type="submit"
            className="w-full rounded-md border border-gray-300 bg-gray-200"
            disabled={isButtonDisabled}
          >
            {formik.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      <Right />
    </div>
  );
};
