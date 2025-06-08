"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Right from "./Right";
import { Check, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type InputPropsType = {
  values: { email: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: { email?: boolean };
  errors: { email?: string };
   prevStep?: () => void;
  nextStep?: () => void;
};


export const Reset = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  prevStep

}: InputPropsType) => {
  const router = useRouter();
  const isButtonDisabled =
    !!errors.email || !values.email;

  return (
    <div className="flex gap-10 items-center justify-center mx-5 ">
      <div className="flex flex-col w-[416px] h-[372px] shadow-md gap-4">
        <div>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={prevStep}
          >
            <ChevronLeft size={16}/>
          </Button>
        </div>
        <div>
          <p className="text-2xl">Reset your password</p>
          <p>Enter your email to recieve a password reset link.</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            name="email"
            type="email"
            placeholder="Enter your password"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full rounded-md"
          />
          {touched.email && errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full rounded-md border border-gray-300 bg-gray-200"
              // onClick={}
              disabled={isButtonDisabled}
            >
              Send link
            </Button>
          </div>
            <div className="flex">
            <p>Don't have an account?</p>
            <Button variant='link'
            onClick={()=>router.push("/signup")}>Sign up</Button>
          </div>
        </div>
      </div>
      <Right />
    </div>
  );
};
