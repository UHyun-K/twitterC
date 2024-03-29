import React, { useState } from "react";
import { authService } from "fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
export default function AuthForm({ refreshUser }) {
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

        try {
            if (newAccount) {
                await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                );
                /*Default user's DisplayName, photoURL*/
                const [defaultDisplayName] = email.split("@", 1);

                const storage = getStorage();
                const gsReference = ref(
                    storage,
                    "gs://twitter-aa12e.appspot.com/iconmonstr-user-20-240 (1).png"
                );

                const photoURL = await getDownloadURL(gsReference);
                console.log(photoURL);
                await updateProfile(authService.currentUser, {
                    photoURL,
                    displayName: defaultDisplayName,
                });
                await refreshUser();
                console.log(refreshUser);
            } else {
                await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    value={email}
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    value={password}
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "LogIn"}
                    className="authSubmit"
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "LogIn" : " Create Account"}
            </span>
        </>
    );
}
