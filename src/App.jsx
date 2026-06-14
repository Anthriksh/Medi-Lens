import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";

function App() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme") ||
      "dark";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );

 const unsubscribe =
  onAuthStateChanged(
    auth,
    (currentUser) => {

      console.log(
        "Auth State Changed:",
        currentUser
      );

      console.log(
        "Current User UID:",
        currentUser?.uid
      );

      setUser(currentUser);
      setLoading(false);
    }
  );
    return () => unsubscribe();

  }, []);

  console.log(
    "Current User State:",
    user
  );

  if (loading) {

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          background: "#020617",
          color: "white",
        }}
      >
        Loading MediLens AI...
      </div>
    );

  }

  return (
    <BrowserRouter>

      {!user ? (

        <Login />

      ) : (

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/history"
            element={<History />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

        </Routes>

      )}

    </BrowserRouter>
  );
  onAuthStateChanged(
  auth,
  (currentUser) => {

    console.log(
      "Auth State Changed:",
      currentUser
    );

    console.log(
      "Current URL:",
      window.location.href
    );

    console.log(
      "Firebase App:",
      auth.app.options.projectId
    );

    setUser(currentUser);
    setLoading(false);
  }
);
}

export default App;