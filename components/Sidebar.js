import React from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession();
  // console.log(session);

  return (
    <>
      <div className="text-gray-500 p-5 text-xs border-r border-gray-900 h-screen ">
        <div className="space-y-4">
          <button
            className="flex items-center space-x-2 hover:text-white"
            onClick={() => signOut()}
          >
            <LogoutIcon className="h-5 w-5" />
            <p>登出</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>首頁</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white ">
            <SearchIcon className="h-5 w-5" />
            <p>搜尋</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <LibraryIcon className="h-5 w-5" />
            <p>你的音樂庫</p>
          </button>

          <hr className="border-t-[0.1px] border-gray-900" />

          <button className="flex items-center space-x-2 hover:text-white">
            <PlusCircleIcon className="h-5 w-5" />
            <p>建立播放清單</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <HeartIcon className="h-5 w-5" />
            <p>已按讚的歌曲</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <RssIcon className="h-5 w-5" />
            <p>已儲存的節目</p>
          </button>

          <hr className="border-t-[0.1px] border-gray-900" />
          {/* PlayLists */}
          <p className="cursor-pointer hover:text-white">播放清單</p>
          <p className="cursor-pointer hover:text-white">播放清單</p>
          <p className="cursor-pointer hover:text-white">播放清單</p>
          <p className="cursor-pointer hover:text-white">播放清單</p>
          <p className="cursor-pointer hover:text-white">播放清單</p>
          <p className="cursor-pointer hover:text-white">播放清單</p>
          <p className="cursor-pointer hover:text-white">播放清單</p>
        </div>
      </div>
    </>
  );
}
