// context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [jwt, setJwt] = useState(null);

//     useEffect(() => {
//         // Load from localStorage when the app starts
//         const storedUser = localStorage.getItem("user");
//         const storedJwt = localStorage.getItem("jwt");
//         if (storedUser && storedJwt) {
//             setUser(JSON.parse(storedUser));
//             setJwt(storedJwt);
//         }
//     }, []);

//     const login = (userData, token) => {
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("jwt", token);
//         setUser(userData);
//         setJwt(token);
//     };

//     const logout = () => {
//         localStorage.removeItem("user");
//         localStorage.removeItem("jwt");
//         setUser(null);
//         setJwt(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, jwt, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);



// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
// import { useSession } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jwt, setJwt] = useState(null);
    const [loading, setLoading] = useState(true); // ⭐ NEW

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedJwt = localStorage.getItem("jwt");
        if (savedUser && savedJwt) {
            setUser(JSON.parse(savedUser));
            setJwt(savedJwt);
        }
        // ⭐ Add small delay to prevent skeleton flicker
        const timer = setTimeout(() => setLoading(false), 800);

        return () => clearTimeout(timer);
    }, []);

    // ⭐ NEXTAUTH GOOGLE LOGIN SESSION SYNC
    // const { data: session, status } = useSession();

    // useEffect(() => {
    //     if (status === "authenticated" && session?.jwt) {
    //         localStorage.setItem("jwt", session.jwt);
    //         localStorage.setItem("user", JSON.stringify(session.user));

    //         setUser(session.user);
    //         setJwt(session.jwt);
    //     }
    // }, [status, session]);

    const login = (userData, token) => {
        setUser(userData);
        setJwt(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("jwt", token);
    };

    const logout = () => {
        setUser(null);
        setJwt(null);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    };

    return (
        <AuthContext.Provider value={{ user, jwt, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
