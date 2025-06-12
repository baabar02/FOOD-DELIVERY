import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { error } from "console";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserProps } from "../page";
import { useRouter } from "next/navigation";

const userNameProps = {
  name: "userName",
  placeholder: "Enter your user name",
};

export const UserSignUp = ({
  values,
  onChange,
  touched,
  onBlur,
  errors,
}: UserProps) => {
  const router = useRouter();

  const isButtonDisabled =
    !errors.userName || !errors.password || !errors.confirmPassword;

  return (
    <div className="flex gap-10 items-center justify-center mx-5">
      <div className="flex flex-col w-[416px] h-[288px] gap-4 shadow-md">
        <div>
          <Button variant="outline" disabled={false} className="bg-transparent">
            <ChevronLeft />
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create your User account</p>
          <p>Sign up to explore your favorite dishes.</p>
        </div>

        <Input
          name="userName"
          value={values.userName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter your user name"
          className="w-full rounded-2"
        />
        {touched.userName && errors.userName && (
          <div className="text-red-500">{errors.userName}</div>
        )}
        <Input
          name="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter your password"
          className="w-full rounded-2"
        />
        {touched.password && errors.password && (
          <div className="text-red-500">{errors.password}</div>
        )}
        <Input
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Confirm your password"
          className="w-full rounded-2"
        />
        {touched.password && errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword}</div>
        )}

        <div>
          {
            <Button
              disabled={isButtonDisabled}
              onClick={() => router.push("/userLogIn")}
              variant="ghost"
              className="w-full rounded-2 border border-color-gray-50 bg-color-gray-300"
            >
              Lets go
            </Button>
          }
        </div>

        <div className="flex content-center items-center justify-center gap-2">
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
