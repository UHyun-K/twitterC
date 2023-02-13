import AppRouter from "components/Router";
import { authService } from "fbase";
import { useEffect, useState } from "react";

function App() {
    const [init, setInit] = useState(true);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            user ? setUserObj(user) : setUserObj(null);
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? (
                <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
            ) : (
                "Initializng..."
            )}
            <footer>&copy; {new Date().getFullYear()} Twitter</footer>
        </>
    );
}

export default App;
