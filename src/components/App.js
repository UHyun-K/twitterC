import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";

function App() {
    const [init, setInit] = useState(true);
    const [isLoggedIn, setIsILoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsILoggedIn(true);
                setUserObj(user);
            } else {
                setIsILoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                "Initializng..."
            )}
            <footer>&copy; {new Date().getFullYear()} Twitter</footer>
        </>
    );
}

export default App;
