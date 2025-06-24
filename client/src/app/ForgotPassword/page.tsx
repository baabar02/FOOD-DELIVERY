"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_components/UserProvider";
import { ResetPage } from "./_components/Reset";
import { VerifyPage } from "./_components/Verify";
import { NewPassword } from "./_components/NewPassword";

const ForgotPassword = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");

  const Components = [
    () => <ResetPage nextStep={() => setCurrentStep(1)} setEmail={setEmail} />,
    () => (
      <VerifyPage
        nextStep={() => setCurrentStep(2)}
        prevStep={() => setCurrentStep(0)}
        email={email}
      />
    ),
    () => <NewPassword prevStep={() => setCurrentStep(1)} email={email} />,
  ];
  const Stepper = Components[currentStep];

  // useEffect(() => {
  //   if (user) {
  //     router.push("/");
  //   }
  // }, [user, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-10">
        <Stepper />
      </div>
    </div>
  );
};

export default ForgotPassword;
