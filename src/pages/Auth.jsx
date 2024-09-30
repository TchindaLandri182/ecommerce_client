import React from "react";
import { Route, Routes } from "react-router-dom";
import {SignIn, SignUp, VerifyEmail, CompleteSignUp} from "../components";
import { AuthLayout } from "../layout";

const Auth = () => {
    return (
        <AuthLayout>
            <Routes>
                <Route path="/signin" Component={SignIn} />
                <Route path="/signup" Component={SignUp} />
                <Route path="/verify/:id" Component={VerifyEmail} />
                <Route path="/verify" Component={VerifyEmail} />
                <Route path="/complete" Component={CompleteSignUp} />
            </Routes>
        </AuthLayout>
    )
}

export default Auth