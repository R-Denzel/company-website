import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef(null);
  const location = useLocation();

  // Only show on home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set to 30% volume
      
      // Auto-play on home page load (only once)
      if (isHomePage && !hasPlayed) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasPlayed(true);
            })
            .catch(err => {
              console.log('Autoplay prevented:', err);
              // If autoplay fails, user will need to click the button
            });
        }
      }
    }
  }, [isHomePage, hasPlayed]);

  // Handle time update to stop at 33 seconds
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= 33) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // If unmuting and not playing, start playing
      if (!newMutedState && !isPlaying && audioRef.current.currentTime < 33) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
        setIsPlaying(true);
      }
    }
  };

  // Don't render on other pages
  if (!isHomePage) return null;

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
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
