import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../router/routesObject";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../hooks/useForm";
import initialSignupForm from "../utils/initialSignupForm";
import signupSchema from "../models/signupSchema";
import { Container } from "@mui/material";
import SignupForm from "../forms/SignupForm";

const handleSignup = (userDetails) => {
    console.log(userDetails);
};

export default function SignupPage() {
    const {
        data,
        errors,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
        handleChangeCheckBox,
    } = useForm(initialSignupForm, signupSchema, handleSignup);

    const { user } = useCurrentUser();

    if (user) return <Navigate to={ROUTES.ROOT} replace />;

    return (
        <Container
            sx={{
                paddingTop: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SignupForm
                onSubmit={onSubmit}
                onReset={handleReset}
                validateForm={validateForm}
                title={"register form"}
                errors={errors}
                data={data}
                onInputChange={handleChange}
                handleChangeCheckBox={handleChangeCheckBox}
            />
        </Container>
    );
}