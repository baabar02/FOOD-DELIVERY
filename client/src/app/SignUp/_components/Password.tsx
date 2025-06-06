"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../page";
import Right from "./Rigth";
import { Check } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const Password = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  handleSubmit,
  togglePassword,
  prevStep,
  showPassword,
}: InputPropsType) => {
  const isButtonDisabled =
    !!errors.password || !!errors.confirmPassword || !values.password;

  return (
    <div className="flex gap-10 items-center justify-center mx-5 ">
      <div className="flex flex-col w-[416px] h-[372px] shadow-md gap-4">
        <div>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={prevStep}
          >
            Back
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create a strong password</p>
          <p>Create a strong password with letters, numbers.</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={values.password}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full rounded-md"
          />
          {touched.password && errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          <Input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full rounded-md"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
          )}
          <div className="flex items-center gap-3">
            <Checkbox onClick={togglePassword} />

            <p>Show password</p>
          </div>
          <div>
            <Button
              type="submit"
              variant="ghost"
              className="w-full rounded-md border border-gray-300 bg-gray-200"
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Right />
    </div>
  );
};
