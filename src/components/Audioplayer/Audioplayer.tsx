import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { AudioProps } from "../../Types";
import styles from "./Audioplayer.module.scss";
import download from "../../assets/download.svg";
import close from "../../assets/close.svg";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import { formatCallDuration } from "../../utils";

const CustomAudioPlayer: React.FC<AudioProps> = observer(
  ({ recordId, partnershipId, id, time }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);

    useEffect(() => {
      if (audioRef.current && store.audioUrl) {
        audioRef.current.src = store.audioUrl;
      }
    }, [id]);
    const duration = time || 0;
    console.log(recordId, partnershipId, id);

    const handleDownload = useCallback(() => {
      const link = document.createElement("a");
      link.href = store.audioUrl;
      link.download = `record_${id}.mp3`;
      link.click();
    }, [id]);

    const handlePlayPause = useCallback(() => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }, [isPlaying]);

    const handleTimeUpdate = useCallback(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, []);

    const handleClose = useCallback(() => {
      store.setIsAudioPlayerOpen(false);
    }, []);

    return (
      <>
        {store.audioUrl && store.currentRowId === id && (
          <div key={id} className={styles.audioPlayer}>
            <div className={styles.audioPlayer__container}>
              {/* Длительность звонка */}
              <div className={styles.duration}>
                {formatCallDuration(duration)}
              </div>

              {/* Кнопка плей/пауза */}
              <button onClick={handlePlayPause} className={styles.playButton}>
                <img
                  src={isPlaying ? pause : play}
                  alt={isPlaying ? "Pause" : "Play"}
                />
              </button>

              {/* Прогресс проигрывания */}
              <input
                type="range"
                className={styles.progressBar}
                value={currentTime}
                max={duration}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = parseFloat(e.target.value);
                  }
                }}
              />

              {/* Кнопка скачать */}
              <button
                onClick={handleDownload}
                className={styles.downloadButton}
              >
                <img src={download} alt="Download" />
              </button>

              {/* Кнопка закрыть */}
              <button onClick={handleClose} className={styles.closeButton}>
                <img src={close} alt="Close" />
              </button>

              {/* Аудио элемент */}
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                src={store.audioUrl}
                // onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </div>
        )}
      </>
    );
  }
);

export default React.memo(CustomAudioPlayer);
