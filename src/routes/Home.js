import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { Link } from "react-router-dom";

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
        <>
            <div className="container">
                <NweetFactory userObj={userObj} />
                <div style={{ marginTop: 30 }}>
                    {nweets.map((nweet) => (
                        <Nweet
                            key={nweet.id}
                            nweetObj={nweet}
                            isOwner={nweet.creatorId === userObj.uid}
                        />
                    ))}
                </div>
            </div>
            <Link to="/tweet">
                <aside
                    style={{
                        width: 50,
                        padding: 13,
                        position: "fixed",
                        top: "80%",
                        right: 35,
                        borderRadius: "50%",
                        background: "white",
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
                    >
                        <g>
                            <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                        </g>
                    </svg>
                </aside>
            </Link>
        </>
    );
};
export default Home;
