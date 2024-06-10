import React from "react";
import { cn } from "../lib/utils";
import { TextInput, Button } from "@carbon/react";
import { Login as LoginIcon } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { loginUser } from "../lib/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = ({ loginUser, isLoading, error }) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    loginUser(data);
    if (!error) navigate("/");
  };

  return (
    <div className={cn("grid size-full flex-1 md:place-items-center")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "md:bg-cds-background-secondary flex w-full flex-col gap-8 md:max-w-lg md:p-8",
        )}
      >
        <h1 className={cn("text-5xl")}>Login</h1>
        <div className={cn("flex flex-col gap-4")}>
          <TextInput labelText="E-Mail" id="email" {...register("email")} />
          <TextInput
            labelText="Password"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <Button type="submit" className={cn("flex items-center gap-1")}>
          <LoginIcon size={20} />
          Sign In
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
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
