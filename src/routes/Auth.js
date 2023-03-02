import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import React from "react";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";
export default function Auth() {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        try {
            if (name === "google") {
                provider = new GoogleAuthProvider();
            } else if (name === "gitihub") {
                provider = new GithubAuthProvider();
            }
            const data = await signInWithPopup(authService, provider);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <AuthForm />

            <div>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
}
