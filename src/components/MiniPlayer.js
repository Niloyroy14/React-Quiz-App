import classes from "../styles/MiniPlayer.module.css";
import ReactPlayer from 'react-player/youtube';
import { useRef, useState } from "react";


export default function MiniPlayer({ videoId, videoTitle }) {

    const [status, setStatus] = useState(false);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const buttonRef = useRef();

    function toggleMiniPlayer() {
        if (!status) {
            buttonRef.current.classList.remove(classes.floatingBtn);
            setStatus(true);
        } else {
            buttonRef.current.classList.add(classes.floatingBtn);
            setStatus(false);
        }
    }

    return (
        <div className={` ${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggleMiniPlayer}>
            <span className={`material-icons-outlined ${classes.open}`}> play_circle_filled </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={toggleMiniPlayer}> close </span>

            <ReactPlayer
                className={classes.player}
                url={videoUrl}
                width="300px"
                height="168px"
                playing={status}
                controls
            />

            <p>{videoTitle}</p>
        </div>
    );
}