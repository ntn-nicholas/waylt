import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "./Image";

export default function Feed() {
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/retrieveData").then((response: any) => {
      setSongList(response.data);
    });
  });
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-scroll sm:-mt-24">
      {songList
        .slice(0)
        .reverse()
        .map((feed: any) => (
          <Image
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
