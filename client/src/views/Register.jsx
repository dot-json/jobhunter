import React from "react";
import { cn } from "../lib/utils";
import { TextInput, Button } from "@carbon/react";
import { Add } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { registerUser } from "../lib/actions/userActions";
import { useNavigate } from "react-router-dom";

const Register = ({ registerUser, isLoading, error }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      role: "jobseeker",
    },
  });
  const onSubmit = (data) => {
    registerUser(data);
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <div className={cn("grid size-full flex-1 md:place-items-center")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "md:bg-cds-background-secondary flex w-full flex-col gap-8 md:max-w-lg md:p-8",
        )}
      >
        <h1 className={cn("text-5xl")}>Register</h1>
        <div className={cn("flex flex-col gap-4")}>
          <TextInput
            id="fullname"
            labelText="Full Name"
            type="text"
            {...register("fullname")}
          />
          <TextInput
            id="email"
            labelText="E-Mail"
            type="email"
            {...register("email")}
          />
          <TextInput
            id="password"
            labelText="Password"
            type="password"
            {...register("password")}
          />
          <div
            className={cn("grid grid-cols-2 place-items-center")}
            style={{ border: "1px solid #f4f4f4" }}
          >
            <label className={cn("grid size-full place-items-center")}>
              <input
                type="radio"
                name="role"
                id="jobseeker"
                value="jobseeker"
                className={cn("peer hidden")}
                {...register("role")}
              />
              <p
                className={cn(
                  "relative z-10 size-full cursor-pointer select-none p-2 text-center transition-colors after:absolute after:inset-0 after:bottom-0 after:-z-10 after:h-0 after:bg-white after:transition-all peer-checked:text-black peer-checked:after:h-full",
                )}
              >
                Jobseeker
              </p>
            </label>
            <label className={cn("grid size-full place-items-center")}>
              <input
                type="radio"
                name="role"
                id="company"
                value="company"
                className={cn("peer hidden")}
                {...register("role")}
              />
              <p
                className={cn(
                  "relative z-10 size-full cursor-pointer select-none p-2 text-center transition-colors after:absolute after:inset-0 after:bottom-0 after:-z-10 after:h-0 after:bg-white after:transition-all peer-checked:text-black peer-checked:after:h-full",
                )}
              >
                Company
              </p>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className={cn("flex items-center gap-1")}
        >
          <Add size={20} />
          Sign Up
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.user.isLoading,
  error: state.user.error,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
