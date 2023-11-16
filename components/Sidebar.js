import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("播放清單id為", playlistId);

  // console.log(Session);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlists);

  return (
    <>
    
      <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900  h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36 overflow-y-scroll scrollbar-hide">
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

          <hr className="border-t-[0.1px] border-gray-900" />
          <div className="flex  justify-between ">
            <button className="flex items-center space-x-2 hover:text-white">
              <LibraryIcon className="h-5 w-5" />
              <p>你的音樂庫</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex ">
            
            <button className=" bg-sidebar-btn-color text-white w-20 h-7 rounded-lg hover:bg-sidebar-btn-hover mr-2">
              播放清單
            </button>
            <button className=" bg-sidebar-btn-color text-white w-12 h-7 rounded-lg hover:bg-sidebar-btn-hover mr-2">
              藝人
            </button>
            <button className=" bg-sidebar-btn-color text-white w-12 h-7 rounded-lg hover:bg-sidebar-btn-hover mr-2">
              專輯
            </button>
            {/* <button className=" bg-sidebar-btn-color text-white w-28 h-7 rounded-lg hover:bg-sidebar-btn-hover mr-2 ">
              Podcast 和節目
            </button> */}
          </div>

          <button className="flex items-center space-x-2 hover:text-white">
            <HeartIcon className="h-5 w-5" />
            <p>已按讚的歌曲</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <RssIcon className="h-5 w-5" />
            <p>已儲存的節目</p>
          </button>

          <hr className="border-t-[0.1px] border-gray-900" />

          {/* Playlist */}
          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              onClick={() => setPlaylistId(playlist.id)}
              className="cursor-pointer hover:text-white"
            >
              {" "}
              {playlist.name}{" "}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
