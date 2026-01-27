import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set to 30% volume for background music
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting and not playing, start playing
      if (!newMutedState && !isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      {/* Audio element - Add your music file to /public/music.mp3 */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Button - Fixed position in bottom right */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6 animate-pulse" />
        )}
        
        {/* Tooltip */}
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isMuted ? 'Play Music' : 'Pause Music'}
        </span>
      </button>
    </>
  );
};

export default BackgroundMusic;
