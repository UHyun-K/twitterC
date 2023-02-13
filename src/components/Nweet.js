import { React, useState } from "react";
import { db, storageService } from "fbase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export default function Nweet({ nweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const NweetTextRef = doc(db, "nweets", `${nweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you srue you want to delete this nweet");
        if (ok) {
            await deleteDoc(NweetTextRef);
            const urlRef = ref(storageService, nweetObj.attachmentUrl);
            await deleteObject(urlRef);
        }
    };
    const toggleEditing = () => {
        setEditing((prev) => !prev);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, {
            text: newNweet,
        });
        setEditing(false);
    };

    return (
        <>
            {editing ? (
                <>
                    {isOwner && (
                        <>
                            <form onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    value={newNweet}
                                    onChange={onChange}
                                    placehoder="Edit your tweet"
                                    required
                                />

                                <input type="submit" value="Update Nweet" />
                            </form>
                            <button onClick={onDeleteClick}>Cancle</button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img
                            src={nweetObj.attachmentUrl}
                            width="50px"
                            height="50px"
                        />
                    )}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>
                                Delete Nweet
                            </button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </>
    );
}
