"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { ChevronLeft, Link } from "lucide-react";
import Image from "next/image";
import * as Yup from "yup";

const validationLogIn = Yup.object({
  email: Yup.string()
    .required()
    .test(
      "email",
      "Invalid email. Use format like example@email.com",
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    ),
});

export const Password = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationLogIn,
    onSubmit: (values) => {},
  });

  const emailInputProps = {
    name: "email",
    placeholder: "Password",
    value: formik.values.email,
    onChange: formik.handleChange,
  };

  const isButtonDisabled = !formik.errors.email;

  return (
    <div className="flex gap-10 items-center justify-center mx-5">
      <div className="flex flex-col  w-[416px] h-[288px] gap-4 border border-green-400">
        <div>
          <Button variant="outline" className="bg-transparent">
            <ChevronLeft />
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create your account</p>
          <p>Sign up to explore your favorite dishes.</p>
        </div>

        <Input className="w-full rounded-2" {...emailInputProps} />
        <Input className="w-full rounded-2" {...emailInputProps} />

        <div className="text-red-500">
          {formik.touched && formik.errors.email}
        </div>
        <Button
          variant="ghost"
          className="w-full rounded-2 border border-color-gray-50 bg-color-gray-200"
        >
          Let's go
        </Button>
        <div className="flex content-center items-center justify-center gap-4">
          <p>Already have an acount?</p>
          <Button className="text-blue-600 " variant="ghost">
            {" "}
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

// export default Password;
