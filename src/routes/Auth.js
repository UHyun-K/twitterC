import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService } from "fbase";
import AuthForm from "components/AuthForm";
export default function Auth({ refreshUser }) {
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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm refreshUser={refreshUser} />

            <div className="authBtns">
                <button
                    onClick={onSocialClick}
                    name="google"
                    className="authBtn"
                >
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button
                    onClick={onSocialClick}
                    name="github"
                    className="authBtn"
                >
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    );
}
