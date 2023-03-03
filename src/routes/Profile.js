import { authService, dbService, storageService } from "fbase";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

export default function Profile({ userObj, refreshUser }) {
    const navigate = useNavigate();
    const fileInput = useRef();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [profileImg, setProfileImg] = useState();
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
    const onClearProfile = () => {
        setProfileImg(null);
        fileInput.current.value = "";
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        let profileUrl = "";
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName,
            });
            refreshUser();
        }
        if (profileImg !== "") {
            const fileRef = ref(
                storageService,
                `${userObj.uid}/profile/${v4()}`
            );
            const response = await uploadString(
                fileRef,
                profileImg,
                "data_url"
            );
            profileUrl = await getDownloadURL(response.ref);
            try {
                await updateProfile(authService.currentUser, {
                    photoURL: profileUrl,
                });
            } catch (error) {
                console.log(`error message:$`, error);
            }
            setProfileImg(null);
        }
        refreshUser();
        onClearProfile();
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setProfileImg(result);
        };
        reader.readAsDataURL(theFile);
    };

    return (
        <div className="container">
            {/*             {userObj.photoURL && (
                <img
                    src={userObj.photoURL}
                    alt="userProfile"
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            )} */}
            {profileImg ? (
                <div>
                    <img
                        src={profileImg}
                        alt="chagneProfile"
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                    <div className="" onClick={onClearProfile}>
                        <span>Remove</span>
                    </div>
                </div>
            ) : (
                userObj.photoURL && (
                    <img
                        src={userObj.photoURL}
                        alt="userProfile"
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                )
            )}
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                />
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                    autoFocus
                    className="formInput"
                />

                <input
                    type="submit"
                    value="UpdateProfile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
                Log Out
            </span>
        </div>
    );
}
