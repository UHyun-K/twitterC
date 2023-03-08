import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
            {isLoggedIn && <Navigation userObj={userObj} />}

            {isLoggedIn ? (
                <div
                    style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home userObj={userObj} />} />
                        <Route
                            path="/profile"
                            element={
                                <Profile
                                    userObj={userObj}
                                    refreshUser={refreshUser}
                                />
                            }
                        />
                    </Routes>
                </div>
            ) : (
                <Routes>
                    <Route
                        path="/"
                        element={<Auth refreshUser={refreshUser} />}
                    />
                </Routes>
            )}
        </HashRouter>
    );
};
export default AppRouter;
