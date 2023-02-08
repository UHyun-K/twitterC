import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { authService } from "fbase";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value.trim());
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            } else {
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
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
            <form onSubmit={onSubmit}>
                <input
                    value={email}
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    onChange={onChange}
                />
                <input
                    value={password}
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "LogIn"}
                />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "LogIn" : " Create Account"}
            </span>
            <h2>{error}</h2>
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
