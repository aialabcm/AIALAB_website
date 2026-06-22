"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const stackImages = [
  {
    url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    alt: "Design et Conception Graphique AIA LAB"
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    alt: "Collaboration et Planification de Projet"
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    alt: "Espace de création digitale interactive"
  }
];

export default function WorkCTA() {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Rotation automatique de l'index de l'image pour l'effet de pile superposée
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % stackImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Déclencher le showreel si le paramètre est présent dans l'URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("showreel") === "true") {
        setShowVideo(true);
      }
    }
  }, []);

  // Gérer la lecture / pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  // Gérer le son
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Mise à jour du temps de lecture
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  // Chargement des metadonnées
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 15);
  };

  // Ajustement de la timeline au clic
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Formatage du timer
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Génération des sous-titres dynamiques synchronisés
  const getSubtitle = (time: number) => {
    if (time >= 0 && time < 3) return "AIA LAB — Initialisation de l'environnement de design...";
    if (time >= 3 && time < 7) return "Calcul des structures géométriques et grilles d'interaction...";
    if (time >= 7 && time < 11) return "Optimisation des performances de rendu et intégration Next.js...";
    if (time >= 11 && time < 15) return "Rendu finalisé : L'alliance parfaite de l'Art et de la Technologie.";
    return "AIA LAB — Conception digitale de précision.";
  };

  // S'assurer que le body ne scrolle pas quand la vidéo est ouverte
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showVideo]);

  // Déterminer la position d'une image dans la pile
  const getCardStyles = (idx: number) => {
    const diff = (idx - activeImageIndex + stackImages.length) % stackImages.length;

    if (diff === 0) {
      // Carte active tout devant
      return {
        zIndex: 30,
        rotate: 0,
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      };
    } else if (diff === 1) {
      // Carte suivante décalée et inclinée à droite
      return {
        zIndex: 20,
        rotate: 4,
        x: 12,
        y: -6,
        scale: 0.96,
        opacity: 0.85,
      };
    } else {
      // Carte en retrait inclinée à gauche
      return {
        zIndex: 10,
        rotate: -4,
        x: -12,
        y: 6,
        scale: 0.92,
        opacity: 0.6,
      };
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">

          {/* Card A: Watch Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-[2rem] bg-white border border-black/[0.04] shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col min-h-[400px] sm:min-h-[480px] md:min-h-[540px]"
          >
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

            {/* Header: Label & Arrow */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-primary bg-primary/5 border border-primary/10 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">/ process</span>
              <button
                onClick={() => setShowVideo(true)}
                className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 cursor-pointer min-w-[44px] min-h-[44px]"
              >
                <ArrowUpRight className="w-4 h-4 text-black-deep" />
              </button>
            </div>

            {/* Text Area */}
            <div className="relative z-10 mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-black-deep tracking-tight">
                Découvrir notre Lab.
              </h3>
              <p className="font-sans text-dark/70 text-xs sm:text-sm max-w-[40ch] leading-relaxed">
                Apprenez comment nous fusionnons l&apos;intelligence artificielle et le design haut de gamme en moins de 5 minutes.
              </p>
            </div>

            {/* Large Looping Video Vignette Below Text */}
            <button
              type="button"
              onClick={() => setShowVideo(true)}
              className="relative z-10 w-full h-36 sm:h-44 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.08] bg-black shadow-inner mt-5 sm:mt-8 group/vignette cursor-pointer flex-shrink-0"
            >
              <video
                src="/images/video/aialab.mp4"
                className="w-full h-full object-cover opacity-80 group-hover/vignette:opacity-100 group-hover/vignette:scale-[1.03] transition-all duration-500"
                autoPlay
                loop
                muted
                playsInline
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black-deep/20 group-hover/vignette:bg-black-deep/0 transition-colors duration-300">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg scale-95 group-hover/vignette:scale-110 transition-transform duration-300">
                  <Play className="w-4 h-4 text-black-deep fill-black-deep ml-0.5" />
                </div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px] font-bold tracking-wider">
                0:15
              </div>
            </button>

            {/* CTA Button */}
            <div className="relative z-10 mt-auto pt-4 sm:pt-6">
              <button
                onClick={() => setShowVideo(true)}
                className="px-5 sm:px-6 py-3 bg-black-deep text-white hover:bg-primary hover:text-black-deep font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full transition-colors duration-300 cursor-pointer min-h-[44px]"
              >
                Regarder la Démo
              </button>
            </div>
          </motion.div>

          {/* Card B: Schedule Call */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-[2rem] bg-white border border-black/[0.04] shadow-sm hover:shadow-premium hover:border-secondary/20 transition-all duration-500 overflow-hidden flex flex-col min-h-[400px] sm:min-h-[480px] md:min-h-[540px]"
          >
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-secondary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-secondary bg-secondary/5 border border-secondary/10 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider">/ contact</span>
              <Link
                href="/lancer-un-projet"
                className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 min-w-[44px] min-h-[44px]"
              >
                <ArrowUpRight className="w-4 h-4 text-black-deep" />
              </Link>
            </div>

            {/* Content Area */}
            <div className="relative z-10 mt-4 sm:mt-6 space-y-2 sm:space-y-3">
              <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-black-deep tracking-tight">
                Planifier un projet.
              </h3>
              <p className="font-sans text-dark/70 text-xs sm:text-sm max-w-[32ch] leading-relaxed">
                Réservez un créneau d&apos;échange avec nos experts pour évaluer vos objectifs stratégiques et budgétaires.
              </p>
            </div>

            {/* Stacked Images Display */}
            <div className="relative z-10 w-full h-36 sm:h-44 md:h-52 mt-5 sm:mt-8 flex-shrink-0 flex items-center justify-center">
              {stackImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  animate={getCardStyles(idx)}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  className="absolute w-[85%] sm:w-[80%] md:w-[75%] h-full rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.08] bg-white shadow-md flex-shrink-0"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 60vw, 30vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="relative z-10 mt-auto pt-4 sm:pt-6">
              <Link href="/lancer-un-projet" className="inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-primary text-black-deep hover:bg-black-deep hover:text-white font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-full transition-colors duration-300 min-h-[44px]">
                Prendre rendez-vous
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* LECTEUR VIDÉO IMMERSIF (SIMULATION) */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Bouton de Fermeture */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors duration-300 z-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cadre du Lecteur Vidéo */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl aspect-video bg-neutral-950 rounded-xl sm:rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group/player"
            >
              {/* Balise Vidéo réelle */}
              <video
                ref={videoRef}
                src="/images/video/aialab.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
              />

              {/* AIA LAB Watermark */}
              <div className="absolute top-6 left-6 font-mono text-[9px] font-bold text-white/40 tracking-widest uppercase pointer-events-none">
                AIA LAB // Core Lab Process
              </div>

              {/* Sous-titres dynamiques de simulation de processus */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[90%] px-6 pointer-events-none">
                <div className="px-4 py-2 bg-black/75 backdrop-blur-sm border border-white/10 rounded-xl text-white font-sans text-xs sm:text-sm font-semibold tracking-tight text-center shadow-lg transition-all duration-300">
                  {getSubtitle(currentTime)}
                </div>
              </div>

              {/* Barre de Lecture (Timeline) */}
              <div
                onClick={handleTimelineClick}
                className="absolute bottom-16 left-6 right-6 h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden group/bar"
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>

              {/* Barre des contrôles en bas */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white select-none z-10">
                {/* Contrôles gauche : Play/Pause & Timer */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <span className="font-mono text-xs text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Contrôles droite : Volume & Plein écran */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-default opacity-50">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
