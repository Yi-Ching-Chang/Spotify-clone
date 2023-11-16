import { HeartIcon } from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";

export default function FavBtn({ trackId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const spotifyApi = useSpotify();

  useEffect(() => {
    // 在組件載入時檢查歌曲是否已經收藏
    // 這裡做一個簡化的假設，實際情況中可能需要更複雜的邏輯
    checkIfSongIsFavorite();
  }, [trackId]);

  const checkIfSongIsFavorite = async () => {
    // 使用存取權杖向 Spotify API 發送請求
    try {
      const accessToken = await spotifyApi.getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      // data 是一個布林值陣列，表示每首歌曲是否被收藏
      const isSongFavorite = data[0];
      setIsFavorite(isSongFavorite);
    } catch (error) {
      console.error("Error checking if song is favorite:", error);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);

    // 在這裡加入處理收藏狀態的邏輯
    if (isFavorite) {
      // 如果取消收藏，可以在這裡執行相應的邏輯
    } else {
      // 如果收藏，可以在這裡執行相應的邏輯
    }
  };

  return (
    <div>
      <button onClick={handleToggleFavorite}>
        <HeartIcon
          className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"}`}
        />
      </button>
    </div>
  );
}
