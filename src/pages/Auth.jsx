import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {SignIn, SignUp, VerifyEmail, CompleteSignUp} from "../components";
import { AuthLayout } from "../layout";
import signupstep from "../constant/signupstep";

const Auth = () => {

    const token = sessionStorage.token
    const authstep = sessionStorage.signupstep
    const navigate = useNavigate()

    useEffect(() => {
        if(token && authstep === signupstep.idle) navigate('/')
    }, [token, signupstep, navigate])

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