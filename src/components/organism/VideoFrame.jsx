'use client';

import { useEffect, useRef } from 'react';
import YouTubePlayer from 'youtube-player';
import { synth, speech } from '@/utils/textToSpeech';

const VideoFrame = ({ playback, videoId, isPlaying, setPaused, setVideoEnded, setCurrenTimeVideo , handleEditMateri}) => {
    const playerRef = useRef(null);
   
    const handleVideoSize = async (player) => {
        try {
            const size = await player.getDuration();
            console.log(size);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInitialPlay = () => {
        const player = YouTubePlayer('player', {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                fs: 1,
            },
        });

        playerRef.current = player;

        // Ambil waktu terakhir dari localStorage untuk video saat ini
        if ( playback > 0) {
            player.seekTo(playback);
            player.pauseVideo();
        } 

        // Ketika video diputar, simpan waktu saat video dimulai
        player.on('stateChange', async (event) => {
            if (event.data === 2) {
                const currentTime = await player.getCurrentTime();
                // synth.speak(speech('Anda pause video'));
                console.log('cur', currentTime);
                handleEditMateri(currentTime, 2)
                setCurrenTimeVideo(currentTime);
                return;
            }

            if (event.data === 0) {
                const currentTime = await player.getCurrentTime();
                synth.speak(speech('Video sudah selesai'));
                handleEditMateri(currentTime, 1)
                setVideoEnded(true);
                console.log('Video selesai');
            }
        });
        

        handleVideoSize(player);
        
    };

    useEffect(() => {
        handleInitialPlay(playback);

        // event listener untuk mendeteksi keydown pada keyboard
        const handleKeyDown = (e) => {
            //Q key clicked
            if (e.keyCode === 81) {
                handlePlay();
            } else if (e.keyCode === 87) {
                handlePause();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // hapus event listener saat komponen VideoFrame di-unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            if (playerRef.current) {
                playerRef.current.destroy();
            }

        };
   
    }, [videoId, isPlaying]);

    const handlePause = () => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
            setPaused(true);
        }
    };

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
            setPaused(false);
            
        }
    };

    return <div id='player' className='h-full w-full' tabIndex='-1'></div>;
};

export default VideoFrame;
