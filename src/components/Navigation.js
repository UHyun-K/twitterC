import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Navigation({ userObj }) {
    return (
        <ul
            style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
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
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                        }}
                    ></img>
                </Link>
            </li>
            <li>
                <Link to="/" style={{ marginRight: 10 }}>
                    <FontAwesomeIcon
                        icon={faTwitter}
                        color={"#04AAFF"}
                        size="2x"
                    />
                </Link>
            </li>
        </ul>
    );
}
