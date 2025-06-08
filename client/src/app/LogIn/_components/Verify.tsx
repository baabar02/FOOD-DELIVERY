"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Right from "./Right";
import { Check, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputPropsTypePage } from "../page"

export type InputPropsType = {
  values: { email: string };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  touched: { email?: boolean };
  errors: { email?: string };
 prevStep?: () => void;
  nextStep?: () => void;
};


export const Verify = ({
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
          <p className="text-2xl">Please verify Your Email</p>
          <p>We just sent an email to Test@gmail.com Click the link<br/>in the email to verify your account.</p>
        </div>

          <div>
            <Button
              type="submit"
              className="w-full rounded-md border border-gray-300 bg-gray-200"
              // onClick={}
              disabled={isButtonDisabled}
            >
              Resend email
            </Button>
          </div>
    
      </div>
      <Right />
    </div>
  );
};
