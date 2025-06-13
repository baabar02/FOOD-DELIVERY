"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Right from "@/app/LogIn/_components/Right";
import { ChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

interface VerifyPageProps {
  email: string;
  nextStep: () => void;
  prevStep: () => void;
}

const validationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export const VerifyPage = ({ email, nextStep, prevStep }: VerifyPageProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema,
    onSubmit: async (values) => {
      if (!email) {
        setError("Email is missing. Please start the reset process again.");
        return;
      }
      try {
        await axios.post("http://localhost:8000/checkOtp", {
          email,
          otp: values.otp,
        });
        setSuccess("OTP verified! Redirecting...");
        setTimeout(() => nextStep(), 2000); // Advance to NewPassword
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred. Please try again.");
      }
    },
  });

  const handleResend = async () => {
    if (!email) {
      setError("Email is missing. Please start the reset process again.");
      return;
    }
    try {
      await axios.post("http://localhost:8000/sendOtp", { email });
      setSuccess("OTP resent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const isButtonDisabled = !!formik.errors.otp || !formik.values.otp.trim();

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
            onClick={prevStep} // Go back to ResetPage
          >
            <ChevronLeft size={16} />
          </Button>
        </div>
        <div>
          <p className="text-2xl">Please verify your email</p>
          <p>
            We sent a 6-digit OTP to <strong>{email || "your email"}</strong>.
            <br />
            Enter the OTP below to verify.
          </p>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <Input
          name="otp"
          type="text"
          placeholder="Enter 6 digit OTP"
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-md"
        />
        {formik.touched.otp && formik.errors.otp && (
          <div className="text-red-500 text-sm">{formik.errors.otp}</div>
        )}
        <Button
          type="submit"
          className="w-full rounded-md border border-gray-300 bg-gray-200"
          disabled={isButtonDisabled || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Verifying..." : "Verify OTP"}
        </Button>
        <Button
          type="button"
          onClick={handleResend}
          className="w-full rounded-md border border-gray-300 bg-gray-200"
        >
          Resend OTP
        </Button>
      </form>
      <Right />
    </div>
  );
};