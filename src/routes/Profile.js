import { authService, dbService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    orderBy,
    getDocs,
    query,
    where,
} from "@firebase/firestore";

import { useEffect } from "react";

export default function Profile({ userObj }) {
    const navigate = useNavigate();
    const onLogoutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMyNweets = async () => {
        const q = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    };
    useEffect(() => {
        getMyNweets();
    }, []);
    return (
        <>
            <button onClick={onLogoutClick}>Logout</button>
        </>
    );
}
