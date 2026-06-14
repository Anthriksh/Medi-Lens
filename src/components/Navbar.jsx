import { Link } from "react-router-dom";
import { Pill, LogOut } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import translations from "../data/translations";

export default function Navbar() {

  const language =
    localStorage.getItem("language") ||
    "English";

  const t =
    translations[language] ||
    translations.English;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">

      {/* LEFT */}

      <div className="logo">
        <Pill size={24} />
        <span>MediLens AI</span>
      </div>

      {/* CENTER */}

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">History</Link>
        <Link to="/analytics">Analytics</Link>
      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {auth.currentUser && (
          <>
            <img
              src={auth.currentUser.photoURL}
              alt="Profile"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "2px solid #3b82f6",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                {auth.currentUser.displayName}
              </span>

              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#94a3b8",
                }}
              >
                {auth.currentUser.email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </>
        )}
      </div>

    </nav>
  );
}