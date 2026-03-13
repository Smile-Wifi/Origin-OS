/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Search, 
  Home, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ChevronRight,
  LayoutGrid,
  Smartphone,
  Globe,
  Music,
  Tv,
  FileText,
  Gamepad2
} from 'lucide-react';

// --- Types ---
interface AppIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

// --- Constants ---
const APPS: AppIcon[] = [
  { id: 'campusdc', name: 'CampusDC', icon: <Globe className="w-6 h-6" />, color: 'bg-blue-500', link: '#' },
  { id: 'smileflix', name: 'SmileFlix', icon: <Tv className="w-6 h-6" />, color: 'bg-red-500', link: '#' },
  { id: 'publicdoc', name: 'PublicDoc', icon: <FileText className="w-6 h-6" />, color: 'bg-emerald-500', link: '#' },
  { id: 'blaynebandits', name: 'BlayneBandits', icon: <Gamepad2 className="w-6 h-6" />, color: 'bg-purple-500', link: '#' },
  { id: 'karaoke', name: 'Karaoke', icon: <Music className="w-6 h-6" />, color: 'bg-pink-500', link: '#' },
  { id: 'musify', name: 'Musify', icon: <Music className="w-6 h-6" />, color: 'bg-orange-500', link: '#' },
];

const FEATURED = [
  { id: 1, title: 'New Release', subtitle: 'SmileFlix Originals', color: 'from-red-600 to-black' },
  { id: 2, title: 'Campus Life', subtitle: 'Join the Community', color: 'from-blue-600 to-black' },
  { id: 3, title: 'Top Charts', subtitle: 'Musify Weekly', color: 'from-orange-600 to-black' },
];

// --- Components ---

const GalaxyBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="galaxy-bg">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            // @ts-ignore
            '--duration': star.duration,
          }}
        />
      ))}
    </div>
  );
};

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative group w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 glass">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="https://picsum.photos/seed/galaxy/1280/720"
        playsInline
        loop
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-11604-large.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay Controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={toggleMute} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
          <button onClick={handleFullscreen} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <Maximize size={24} />
          </button>
        </div>
      </div>

      {/* Play Button Center (Mobile friendly) */}
      {!isPlaying && (
        <button 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <Play size={32} className="text-white fill-white ml-1" />
          </div>
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const appGridRef = useRef<HTMLDivElement>(null);

  const scrollToApps = () => {
    appGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredApps = APPS.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30">
      <GalaxyBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between glass border-b border-white/5">
        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
          <Menu size={24} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Smartphone size={18} className="text-white" />
          </div>
          <span className="font-bold tracking-tight text-lg">GalaxyOS</span>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </header>

      <main className="pt-20 pb-24 px-4 max-w-lg mx-auto space-y-8">
        
        {/* Hero Section */}
        <section id="hero" className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-black tracking-tighter leading-none">
              EXPLORE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">DIGITAL GALAXY</span>
            </h1>
            <p className="text-white/50 text-sm font-medium uppercase tracking-widest">Version 2.0 • Stable Release</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VideoPlayer />
          </motion.div>
        </section>

        {/* Search Section */}
        <section className="relative">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={20} className="text-white/40 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20 text-white"
            />
          </div>
        </section>

        {/* Slider Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/60">Featured Content</h2>
            <ChevronRight size={16} className="text-white/40" />
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x">
            {FEATURED.map((item) => (
              <motion.div
                key={item.id}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 w-64 h-32 rounded-3xl bg-gradient-to-br ${item.color} p-6 flex flex-col justify-end snap-start border border-white/10 shadow-xl`}
              >
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{item.title}</p>
                <h3 className="text-xl font-bold leading-tight">{item.subtitle}</h3>
              </motion.div>
            ))}
            {/* Circular Featured Item */}
            <div className="flex-shrink-0 flex items-center gap-4 px-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-20 h-20 rounded-full glass flex items-center justify-center border border-white/20 hover:border-blue-500/50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apps Grid Section */}
        <section ref={appGridRef} className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <LayoutGrid size={18} className="text-blue-400" />
            <h2 className="text-lg font-bold">Installed Apps</h2>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <motion.a
                  key={app.id}
                  href={app.link}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-white drop-shadow-md">
                      {app.icon}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">{app.name}</span>
                </motion.a>
              ))}
            </AnimatePresence>
            
            {filteredApps.length === 0 && (
              <div className="col-span-full py-12 text-center space-y-2">
                <p className="text-white/40 italic">No apps found in this sector...</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-12 px-6 border-t border-white/5 glass text-center space-y-4">
        <div className="flex justify-center gap-6 text-white/40">
          <Globe size={20} />
          <Music size={20} />
          <Tv size={20} />
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] leading-relaxed max-w-xs mx-auto">
          Cached response on intranet based bandwidth linked ecosystem
        </p>
        <div className="pt-4">
          <p className="text-[10px] text-white/10">© 2026 GALAXY WEB OS • ALL RIGHTS RESERVED</p>
        </div>
      </footer>

      {/* Floating Home Button */}
      <motion.button
        onClick={scrollToApps}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-600/40 z-50 border border-white/20"
      >
        <Home size={24} />
      </motion.button>
    </div>
  );
}
