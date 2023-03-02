import React, { useRef, useState } from "react";
import { dbService, storageService } from "fbase";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { v4 as uuidv4, v4 } from "uuid";
export default function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(
                attachmentRef,
                attachment,
                "data_url"
            );
            attachmentUrl = await getDownloadURL(response.ref);
        }

        try {
            await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                attachmentUrl,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setNweet("");
        setAttachment("");
        fileInput.current.value = "";
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
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
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = "";
    };
    return (
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={fileInput}
            />
            <input type="submit" value="Nweet" />
            {attachment && (
                <div>
                    <img
                        src={attachment}
                        width="50px"
                        height="50px"
                        alt="img"
                    />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
}
