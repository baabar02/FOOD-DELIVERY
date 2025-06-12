"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Right from "../SignUp/_components/Rigth";
import { ChevronLeft } from "lucide-react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

const VerifyPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8000/verify", {
          email: values.email,
        });
        alert("Verification email resent.");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        alert(errorMessage);
      }
    },
  });

  const isButtonDisabled = !!formik.errors.email || !formik.values.email.trim();

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
          <p className="text-2xl">Please verify your email</p>
          <p>
            We just sent a verification email to{" "}
            <strong>{formik.values.email || "your email"}</strong>.
            <br />
            Click the link in the email to verify your account.
          </p>
        </div>

        <Input
          name="Otp"
          type="Otp"
          placeholder="Otp"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-md"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        <div>
          <Button
            type="submit"
            onClick={() => router.push("/SignUp/Password")}
            className="w-full rounded-md border border-gray-300 bg-gray-200"
            disabled={isButtonDisabled}
          >
            Resend email
          </Button>
        </div>
      </form>
      <Right />
    </div>
  );
};

export default VerifyPage;
