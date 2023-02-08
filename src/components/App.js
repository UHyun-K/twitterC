import AppRouter from "components/Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsILoggedIn] = useState(authService.currentUser);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsILoggedIn(true);
            } else {
                setIsILoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializng..."}
            <footer>&copy; {new Date().getFullYear} Twitter</footer>
        </>
    );
}

export default App;
