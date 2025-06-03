"use client";

import { useState } from "react";
import Right from "./_components/Rigth";
import { Button } from "@/components/ui/button";
import { Left } from "./_components/Left";
import { Password } from "./_components/password";

const SignUpPage = ({}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const components = [Left, Password];
  const Stepper = components[currentStep];

  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  return (
    <div className="flex justify-center items-center">
      <div>
        {/* {currentStep === 0 && (
          <Left
            // setCurrentStep={setCurrentStep}
            // currentStep={currentStep}
            nextStep={nextStep}
          />
        )}

        <Password /> */}
        <Stepper nextStep={nextStep} />
      </div>
      <div>
        <Right />
      </div>
    </div>
  );
};

export default SignUpPage;
