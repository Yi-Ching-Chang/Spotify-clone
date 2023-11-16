import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useState, useCallback, useEffect } from "react";
import useSongInfo from "../hooks/useSongInfo";
import { debounce } from "lodash";
import {
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [songInfo, setSongInfo] = useState(null); // 新增 songInfo 狀態

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("正在播放", data?.body?.item);
        setCurrentTrackId(data?.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          if (data?.body) {
            setIsPlaying(data.body.is_playing);
          }
        });

        // 更新歌曲信息
        setSongInfo(data?.body?.item);
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyDevices().then((data) => {
      const activeDevice = data?.body?.devices?.find(
        (device) => device.is_active
      );

      if (activeDevice) {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          if (data?.body) {
            if (data.body.is_playing) {
              spotifyApi.pause();
              setIsPlaying(false);
            } else {
              spotifyApi.play();
              setIsPlaying(true);
            }
          }
        });
      } else {
        console.error("No active device found. Please select a device.");
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    } // 設定定時器，定期檢查當前播放的歌曲狀態
    const checkCurrentPlayback = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState();
        const playbackState = response.body;

        if (
          playbackState &&
          playbackState.is_playing &&
          playbackState.progress_ms >= playbackState.item.duration_ms
        ) {
          console.log(
            "Current track has finished playing. Playing next track..."
          );
          skipToNextTrack();
        }
      } catch (error) {
        console.error("Error checking current playback:", error);
      }
    };

    const playbackInterval = setInterval(checkCurrentPlayback, 5000); // 這裡設定每5秒檢查一次，你可以根據需要調整間隔時間

    // 在 component 卸載時清除定時器
    return () => clearInterval(playbackInterval);
  }, [currentTrackId, spotifyApi, session]);

  const skipToPreviousTrack = () => {
    // 回到上一首
    spotifyApi.skipToPrevious().then(
      function () {
        console.log("Skip to previous");
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  };

  const skipToNextTrack = () => {
    // 跳到下一首
    spotifyApi.skipToNext().then(
      function () {
        console.log("Skip to previous");
      },
      function (err) {
        console.error("Something went wrong!", err);
      }
    );

    fetchCurrentSong(); // 更新當前播放歌曲的信息
  };

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        console.log(err.msg);
      });
    }, 300),
    []
  );

  useEffect(() => {
    if (volume >= 0 && volume <= 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div className="h-[5.6rem] bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt="Song_Poster"
        />
        <div>
          {/* 使用 songInfo 更新 UI */}
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
    
        <RewindIcon className="button" onClick={skipToPreviousTrack} />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" onClick={skipToNextTrack} />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
