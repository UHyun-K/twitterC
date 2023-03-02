import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    /*   const getNweets = async () => {
        const dbServiceNweets = await getDocs(collection(dbService, "nweets"));
        dbServiceNweets.forEach((doc) => {
            const nweetObj = {
                ...doc.data(),
                id: doc.id,
            };
            setNweets((prev) => [nweetObj, ...prev]);
            console.log("just set nweet Array:", nweets);
        }); 오래된 데이터를 가져옴 새로 생성/변경된 데이터를 새로고침해야 볼 수 있다..  
    }; */

    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);

    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;
