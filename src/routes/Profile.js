import { authService, storageService } from "fbase";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadString,
} from "firebase/storage";
import { v4 } from "uuid";

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
    const onClearProfile = async () => {
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
        if (profileImg !== null) {
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
                const prevImgRef = ref(storageService, userObj.photoURL);
                await deleteObject(prevImgRef);
                await updateProfile(authService.currentUser, {
                    photoURL: profileUrl,
                });
            } catch (error) {
                console.log(`error message:$`, error);
            }
        }

        onClearProfile();
        refreshUser();
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
        <div className="profile container">
            {/*             {userObj.photoURL && (
                <img
                    src={userObj.photoURL}
                    alt="userProfile"
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            )} */}
            <span>My profile</span>
            {profileImg ? (
                <div className="profileImg__container">
                    <img
                        src={profileImg}
                        alt="chagneProfile"
                        className="profileUrl"
                    />
                    <div className="" onClick={onClearProfile}>
                        <span>❌</span>
                    </div>
                </div>
            ) : (
                userObj.photoURL && (
                    <div className="profileImg__container">
                        <img
                            src={userObj.photoURL}
                            alt="userProfile"
                            className="profileUrl"
                        />
                        <label htmlFor="fileInput">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="r-jwli3a r-4qtqp9 r-yyyyoo r-18yzcnr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-yc9v9c"
                                style={{
                                    background: "rgba(0, 0, 0, 0.3)",
                                    fill: "white",
                                    width: 25,
                                    borderRadius: "50%",
                                }}
                            >
                                <g>
                                    <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                                </g>
                            </svg>
                        </label>
                    </div>
                )
            )}

            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                    style={{ paddingLeft: 60, display: "none" }}
                    id="fileInput"
                    className="fileInput"
                />
                <span>Name</span>
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
