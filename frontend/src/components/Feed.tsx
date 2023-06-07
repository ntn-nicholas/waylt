import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "./Image";

const dbUrl = "https://edge-config.vercel.com/ecfg_rvxk6ckosr879l09mtd5b3xkgujb?token=c1eb83a5-5d8e-4213-a066-35cd2a6818c9"

export default function Feed() {
  const [songList, setSongList] = useState([{}]);

  useEffect(() => {
    axios.get(dbUrl).then((response) => {
      setSongList(response.data.items.data);
    })
  });
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll sm:-mt-24">
      {songList
        .slice(0)
        .reverse()
        .map((feed: any) => (
          <Image
            key={feed}
            username={feed.username}
            album={feed.album}
            song={feed.song}
            artist={feed.artist}
            uri={feed.uri}
            url={feed.url}
          />
        ))}
    </div>
  );
}
