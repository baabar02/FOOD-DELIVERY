"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Right from "./Right";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { boolean, string } from "yup";
import { error } from "console";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { InputPropsTypePage } from "../page";

type InputPropsType = {
  values: { email: string; password: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: { email?: boolean; password?: boolean };
  errors: { email?: string; password?: string };
  prevStep?: () => void;
  nextStep?: () => void;
};

export const LogIn = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  nextStep,
  prevStep,
}: InputPropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  console.log(showPassword, "asd");
  const router = useRouter();
  const togglePassword = () => setShowPassword((prev) => !prev);

  const isButtonDisabled =
    !!errors.email || !values.password || !values.email || !values.password;

  return (
    <div className="flex gap-10 items-center justify-center mx-5 ">
      <div className="flex flex-col w-[416px] h-[372px] shadow-md gap-4">
        <div>
          <p className="text-2xl">Log in</p>
          <p>Log in to enjoy your favorite dishes.</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email adress"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full rounded-md"
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          <div className="relative">
            <Input
              name="password"
              placeholder="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={onChange}
              onBlur={onBlur}
              className="w-full rounded-md"
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={togglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="link"
              // onClick={nextStep}
              className="text-blue-600 underline"
            >
              Forgot password?
            </Button>
          </div>
          <div>
            <Button
              variant="ghost"
              className="w-full rounded-md border border-gray-300 bg-gray-200"
              // onClick={() => router.push("/")}
              type="submit"
              disabled={isButtonDisabled}
            >
              Let's go
            </Button>
          </div>
          <div className="flex">
            <p>Don't have an account?</p>
            <Button variant="ghost" onClick={() => router.push("/SignUp")}>
              Sign up
            </Button>
          </div>
        </div>
      </div>
      <Right />
    </div>
  );
};
