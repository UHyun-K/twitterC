import { React, useState } from "react";
import { dbService, storageService } from "fbase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function Nweet({ nweetObj, isOwner }) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you srue you want to delete this nweet");
        if (ok) {
            await deleteDoc(NweetTextRef);
            if (nweetObj.attachmentUrl !== "") {
                try {
                    const urlRef = ref(storageService, nweetObj.attachmentUrl);
                    await deleteObject(urlRef);
                } catch (error) {
                    console.log("deleting file Error:", error);
                }
            }
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
    const timeStamp = () => {
        const nweetTime = nweetObj.createdAt;
        const date = new Date(nweetTime);
        const monthLetter = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const mon = date.getMonth();
        const day = date.getDate();
        const hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
        const minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
        const second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
        const returnDate =
            monthLetter[mon] +
            " " +
            day +
            "  " +
            hour +
            ":" +
            minute +
            ":" +
            second;
        return returnDate;
    };

    return (
        <>
            {editing ? (
                <div className="nweet" style={{ flexDirection: "column" }}>
                    {isOwner && (
                        <>
                            <form
                                onSubmit={onSubmit}
                                className="nweetEdit container"
                            >
                                <input
                                    type="text"
                                    value={newNweet}
                                    onChange={onChange}
                                    placehoder="Edit your tweet"
                                    required
                                    autoFocus
                                    className="formInput"
                                />

                                <input
                                    type="submit"
                                    value="Update Nweet"
                                    className="formBtn"
                                />
                            </form>
                            <span
                                onClick={toggleEditing}
                                className="formBtn cancelBtn"
                            >
                                Cancel
                            </span>
                        </>
                    )}
                </div>
            ) : (
                <div className="nweet">
                    <div className="nweet__profile">
                        <img src={nweetObj.photoUrl} alt="user image" />
                    </div>
                    <div className="nweet__content">
                        <div className="nweet__content-info">
                            <span style={{ fontWeight: "bold" }}>
                                {nweetObj.displayName}
                            </span>
                            <span> &nbsp;&#183;&nbsp; {timeStamp()}</span>
                        </div>
                        <div>
                            <h4>{nweetObj.text}</h4>
                            {nweetObj.attachmentUrl && (
                                <img
                                    src={nweetObj.attachmentUrl}
                                    alt="nweetImg"
                                />
                            )}
                            {isOwner && (
                                <div className="nweet__actions">
                                    <span onClick={onDeleteClick}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                    <span onClick={toggleEditing}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
