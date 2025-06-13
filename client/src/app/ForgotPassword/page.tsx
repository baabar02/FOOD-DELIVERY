"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { writeFileSync } from "fs";
import { useAuth } from "../UserProvider";
import { ResetPage } from "./_components/Reset";
import { NewPassword } from "./_components/NewPassword";
import { VerifyPage } from "./_components/Verify";

const ForgotPassword = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const Components = [ResetPage, VerifyPage, NewPassword];
  const Stepper = Components[currentStep];

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-10">
        <Stepper prevStep={prevStep} nextStep={nextStep} />
      </div>
    </div>
  );
};

export default ForgotPassword;
