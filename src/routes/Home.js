import { React, useEffect, useState } from "react";
import { db } from "fbase";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    /*   const getNweets = async () => {
        const dbNweets = await getDocs(collection(db, "nweets"));
        dbNweets.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            };
            setNweets((prev) => [nweetObj, ...prev]);
            console.log("just set nweet Array:", nweets);
        }); 오래된 데이터를 가져옴 새로 생성/변경된 데이터를 새로고침해야 볼 수 있다..  
    }; */

    useEffect(() => {
        const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setNweet("");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                        <small>
                            {new Date(nweet.createdAt).toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;
