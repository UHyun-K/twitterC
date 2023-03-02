import { authService } from "fbase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";

export default function Profile({ userObj, refreshUser }) {
    console.log(userObj);

    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogoutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input type="submit" value="UpdateProfile" />
            </form>
            <button onClick={onLogoutClick}>Logout</button>
        </>
    );
}
