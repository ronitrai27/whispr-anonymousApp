"use client";

import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
import { CircleFadingPlus } from "lucide-react";
// import { usePathname } from "next/navigation";

export default function Home() {
  const { user, darkMode } = useAppContext();

  return (
    <main
      className={`w-full h-screen select-none px-6 py-2 ${
        darkMode ? "bg-accent-foreground" : "bg-white"
      }`}
    >
      <div className="bg-accent w-full h-full rounded-lg px-3 py-3">
        <div className="grid grid-cols-5 gap-3 h-full">
          {/* LEFT SIDE - 1fr */}
          <div className="col-span-1 rounded-lg flex flex-col gap-5">
            {/* TOP  */}
            <div className="bg-white p-2 rounded-sm">
              <div
                className={`rounded-md p-2 ${
                  darkMode
                    ? "bg-accent-foreground"
                    : "bg-gradient-to-bl from-fuchsia-600 via-purple-500 to-purple-800"
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Image
                    src={user?.profilePic || "/default-avatar.png"}
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className={`rounded-full h-[50px] w-[50px] object-cover border-[1px] ${
                      darkMode
                        ? "border-accent bg-accent"
                        : "border-white bg-accent"
                    }`}
                  />
                  <div className="flex flex-col items-center relative">
                    <h1
                      className={`font-medium text-[16px] tracking-wide ${
                        darkMode ? "text-white" : "text-white"
                      }`}
                    >
                      {user?.username}
                    </h1>
                    <div className=" absolute w-2 h-2 bg-green-400 rounded-full animate-pulse transition-all duration-300 top-2 -right-3"></div>
                    <p
                      className={`font-light ${
                        darkMode ? "text-gray-400" : "text-gray-300"
                      } text-[14px] tracking-tighter`}
                    >
                      {user?.publicId}
                    </p>
                  </div>
                </div>
                {/* USER FOLLOWINGS--- */}
                <div className="flex items-center justify-between mt-3 px-2 py-1">
                  <div className="flex flex-col items-center">
                    <h1
                      className={`${
                        darkMode ? "text-white" : "text-white"
                      } font-medium text-[15px]`}
                    >
                      {user?.followed?.length ?? 0}
                    </h1>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-300"
                      } text-[12px] font-light tracking-tight`}
                    >
                      Following
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1
                      className={`${
                        darkMode ? "text-white" : "text-white"
                      } font-medium text-[15px]`}
                    >
                      {user?.followers?.length ?? 0}
                    </h1>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-300"
                      } text-[12px] font-light tracking-tight`}
                    >
                      Followers
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1
                      className={`${
                        darkMode ? "text-white" : "text-white"
                      } font-medium text-[15px]`}
                    >
                      {user?.likes ?? 0 > 0 ? 0 : user?.likes ?? 0}
                    </h1>
                    <p
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-300"
                      } text-[12px] font-light tracking-tight`}
                    >
                      Likes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* MIDDLE */}
            <div className={`bg-white p-2 rounded-sm `}>
              <Sidebar />
            </div>
          </div>

          {/* MIDDLE SIDE - 3fr */}
          <div className="col-span-3">
            {/* USER FOLLOWERS */}
            <div className={`bg-white p-2 rounded-md`}>
              <div className={` flex  gap-5`}>
                {/* user banner */}
                <div className="relative flex flex-col items-center gap-1">
                  <Image
                    src={user?.profilePic || "/default-avatar.png"}
                    alt="Profile Picture"
                    width={65}
                    height={65}
                    className={`rounded-full h-[65px] w-[65px] object-cover border-[1.8px] border-purple-500 bg-purple-200`}
                  />
                  <div className="absolute top-10 -right-1.5 bg-blue-900 rounded-full w-6 h-6 flex items-center justify-center">
                    <CircleFadingPlus
                      className=" text-accent font-extrabold"
                      size={18}
                    />
                  </div>
                  <p className="text-[12px] font-light text-gray-600 tracking-tighter">
                    thoughts ?
                  </p>
                </div>
                {/* AI BANNER */}
                <div className="flex flex-col items-center gap-1">
                  <Image
                    src="/pixelcut-export (1).jpg"
                    alt="Profile Picture"
                    width={65}
                    height={65}
                    className={`rounded-full h-[65px] w-[65px] object-contain border-[1.8px] border-purple-500`}
                  />
                  <p className="text-[12px] font-light text-gray-600 tracking-tighter">
                    Sara AI
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 1fr */}
          <div className="col-span-1 bg-white rounded-lg">Right</div>
        </div>
      </div>
    </main>
  );
}
