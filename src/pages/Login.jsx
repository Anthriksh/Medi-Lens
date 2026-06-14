import { useState } from "react";

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
  provider,
} from "../firebase";

export default function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isRegistering, setIsRegistering] =
    useState(false);

  const handleGoogleLogin =
    async () => {
      try {
        const result =
          await signInWithPopup(
            auth,
            provider
          );

        console.log(
          "Google Login Success:",
          result.user
        );

      } catch (error) {
        console.error(
          "Google Login Error:",
          error
        );

        alert(error.message);
      }
    };

  const handleEmailLogin =
    async () => {
      try {
        const result =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

        console.log(
          "Email Login Success:",
          result.user
        );

      } catch (error) {
        console.error(
          "Email Login Error:",
          error
        );

        alert(error.message);
      }
    };

  const handleRegister =
    async () => {
      try {
        const result =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        console.log(
          "Registration Success:",
          result.user
        );

      } catch (error) {
        console.error(
          "Registration Error:",
          error
        );

        alert(error.message);
      }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#020617",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "40px",
          borderRadius: "20px",
          background: "#0f172a",
          border: "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          MediLens AI
        </h1>

        <p
          style={{
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Login to access scan history,
          analytics and cloud storage.
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Continue With Google
        </button>

        <div
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "20px",
          }}
        >
          OR
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            marginBottom: "12px",
            border: "1px solid #334155",
            background: "#020617",
            color: "white",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            marginBottom: "20px",
            border: "1px solid #334155",
            background: "#020617",
            color: "white",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={
            isRegistering
              ? handleRegister
              : handleEmailLogin
          }
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {isRegistering
            ? "Create Account"
            : "Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#94a3b8",
          }}
        >
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setIsRegistering(
                !isRegistering
              )
            }
            style={{
              color: "#3b82f6",
              cursor: "pointer",
              marginLeft: "6px",
            }}
          >
            {isRegistering
              ? "Login"
              : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}