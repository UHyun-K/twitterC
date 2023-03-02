import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}

            {isLoggedIn ? (
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
            ) : (
                <Routes>
                    <Route path="/" element={<Auth />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};
export default AppRouter;
