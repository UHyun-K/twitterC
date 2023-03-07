import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";

function App() {
    const [init, setInit] = useState(true);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            user
                ? setUserObj({
                      displayName: user.displayName,
                      uid: user.uid,
                      photoURL: user.photoURL,
                  })
                : setUserObj(null);
            setInit(true);
        });
    }, []);
    const refreshUser = () => {
        const user = authService.currentUser;
        console.log("refreshUser is working", user);
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
        });
    };
    return (
        <>
            {init ? (
                <AppRouter
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                    refreshUser={refreshUser}
                />
            ) : (
                "Initializng..."
            )}
            <footer
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                &copy; {new Date().getFullYear()} Twitter
            </footer>
        </>
    );
}

export default App;
