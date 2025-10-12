"use client";

import { LogOut, Monitor, MapPin, Clock } from "lucide-react";
import TaskManager from "./TaskManager";

interface Session {
  username: string;
  password?: string;
  loginAt: { currDate: string; currTime: string };
  device: string;
  location: { lat?: number; lon?: number } | "Unavailable";
}

function parseDeviceInfo(info: string) {
  let browser = "Unknown";
  if (info.includes("Edg")) browser = "Edge";
  else if (info.includes("Firefox")) browser = "Firefox";
  else if (info.includes("Safari") && !info.includes("Chrome"))
    browser = "Safari";
  else if (info.includes("Chrome")) browser = "Chrome";

  let os = "Unknown";
  if (info.includes("Win")) os = "Windows";
  else if (info.includes("Mac")) os = "MacOS";
  else if (info.includes("Linux")) os = "Linux";
  else if (/Android/i.test(info)) os = "Android";
  else if (/iphone|ipad|ipod/i.test(info)) os = "iOS";

  const deviceType = /Mobi|Android/i.test(info) ? "Mobile" : "Desktop";
  return { browser, os, deviceType };
}

export default function Dashboard({
  session,
  onLogout,
}: {
  session: Session;
  onLogout: () => void;
}) {
  const parsedInfo = parseDeviceInfo(session.device);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white flex items-center justify-center ">
      <div className="w-full max-w-5xl p-4 ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-2xl sm:text-2xl font-bold tracking-tight">
              Welcome, {session.username}
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Here’s a summary of your current session
            </p>
          </div>

          <button
            onClick={onLogout}
            className="mt-4 sm:mt-0 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-white font-medium transition-all w-full sm:w-auto justify-center"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 flex items-center gap-3  transition-all hover:scale-105 duration-500 ">
            <Clock className="text-indigo-400 w-6 h-6" />
            <div className="truncate">
              <p className="text-gray-400 text-sm">Login At</p>
              <p className="text-white font-medium text-sm sm:text-base">
                {session.loginAt.currDate} • {session.loginAt.currTime}
              </p>
            </div>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 flex items-center gap-3  transition-all hover:scale-105 duration-500">
            <Monitor className="text-teal-400 w-6 h-6" />
            <div className="truncate">
              <p className="text-gray-400 text-sm">Device</p>
              <p className="text-white font-medium text-sm sm:text-base">
                {parsedInfo.browser} ({parsedInfo.deviceType}) — {parsedInfo.os}
              </p>
            </div>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 flex items-center gap-3 sm:col-span-2 lg:col-span-1  transition-all hover:scale-105 duration-500">
            <MapPin className="text-pink-400 w-6 h-6 flex-shrink-0" />
            <div className="truncate">
              <p className="text-gray-400 text-sm">Geolocation</p>
              <p className="text-white font-medium text-sm sm:text-base">
                {typeof session.location === "string"
                  ? "Unavailable"
                  : `Lat: ${session.location.lat?.toFixed(
                      4
                    )}, Lon: ${session.location.lon?.toFixed(4)}`}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-full"><TaskManager /></div>
      </div>
    </div>
  );
}
