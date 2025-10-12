"use client";

import { useState } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export interface Session {
  username: string;
  loginAt: { currDate: string; currTime: string };
  device: string;
  location: { lat: number; lon: number } | "Unavailable";
}

export default function LoginForm({
  onLogin,
}: {
  onLogin: (data: Session) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const HandleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter username and password");
      return;
    }

    if (username === "sid" && password === "pass") {
      setLoading(true);
      const date = new Date();
      const currDate = `
    ${date.getDate()} 
    ${months[date.getMonth()]} ${date.getFullYear()}`;
      const currTime = `${date.getHours().toString().padStart(2, "0")} 
    ${date.getMinutes().toString().padStart(2, "0")} 
    ${date.getSeconds().toString().padStart(2, "0")}`;
      const loginAt = { currDate, currTime };
      const device = navigator.userAgent;
      if ("navigator" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const location = {
            lon: pos.coords.longitude,
            lat: pos.coords.latitude,
          };
          const session: Session = { username, loginAt, device, location };
          localStorage.setItem("session", JSON.stringify(session));
          onLogin(session);
          setLoading(false);
        });
      } else {
        const session: Session = {
          username,
          loginAt,
          device,
          location: "Unavailable",
        };
        localStorage.setItem("session", JSON.stringify(session));
        onLogin(session);
        setLoading(false);
      }
    } else {
      setErrorMessage("Invalid credentials entered");
    }
  };
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800/70 w-full max-w-md p-8 backdrop-blur-lg text-white border border-white/10 rounded-2xl shadow-xl">
        <h2 className="text-3xl text-white text-center font-bold mb-4">
          Login
        </h2>
        <p className="text-center text-gray-300 text-sm mb-4">
          Enter your credentials to continue
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            placeholder="username"
            className="px-4 py-3 border border-gray-600 bg-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all "
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            placeholder="password"
            className="px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-gray-400 rounded-xl"
          />
          {errorMessage && (
            <p className="text-center text-red-400 text-sm">{errorMessage}</p>
          )}
          <button
            onClick={HandleLogin}
            disabled={!username.trim() || !password.trim() || loading}
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold border border-gray-600 text-center text-white "
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
