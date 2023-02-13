import { React, useState } from "react";
import { db } from "fbase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

export default function Nweet({ nweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const NweetTextRef = doc(db, "nweets", `${nweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you srue you want to delete this nweet");
        if (ok) {
            await deleteDoc(NweetTextRef);
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
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>

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
