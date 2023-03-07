import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Navigation({ userObj }) {
    console.log("Navi userObj", userObj);
    return (
        <ul
            style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0 auto",
                marginTop: 20,
                width: 350,
            }}
        >
            <li>
                <Link
                    to="/profile"
                    style={{
                        marginLeft: 10,
                    }}
                >
                    <img
                        src={userObj.photoURL}
                        alt="user image"
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                        }}
                    ></img>
                </Link>
            </li>
            <li>
                <Link to="/" style={{ marginRight: 27 }}>
                    <FontAwesomeIcon
                        icon={faTwitter}
                        color={"#04AAFF"}
                        size="2x"
                    />
                </Link>
            </li>
            <li></li>
        </ul>
    );
}
