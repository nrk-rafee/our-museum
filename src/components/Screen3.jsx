"use client";

import { motion } from "framer-motion";
import {
ArrowRight,
Heart,
Sparkles,
Images,
Camera,
} from "lucide-react";

export default function Screen3({ onNext }) {
return (
<motion.main
initial={{ opacity: 0, y: 25, scale: 0.97 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: -25, scale: 0.97 }}
transition={{ duration: 0.8 }}
className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-amber-100/10 bg-[#15110f] px-6 py-12 text-center"
>
{/* Background lighting */}
<div className="pointer-events-none absolute inset-0">
<div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
<div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-rose-500/10 blur-[90px]" />
</div>

  {/* Floating sparkles */}
  {[...Array(12)].map((_, index) => (
    <motion.div
      key={index}
      className="pointer-events-none absolute text-amber-200/70"
      style={{
        left: `${(index * 31 + 9) % 100}%`,
        top: `${(index * 19 + 8) % 100}%`,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.7, 1.2, 0.7],
        y: [0, -8, 0],
      }}
      transition={{
        duration: 2.5 + (index % 3),
        repeat: Infinity,
        delay: index * 0.2,
      }}
    >
      <Sparkles size={14} />
    </motion.div>
  ))}

  {/* Main icon */}
  <motion.div
    initial={{ scale: 0, rotate: -30 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      type: "spring",
      stiffness: 150,
      damping: 12,
      delay: 0.2,
    }}
    className="relative z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-amber-200/30 bg-amber-100/5 shadow-[0_0_50px_rgba(217,169,91,0.12)]"
  >
    <Images className="h-11 w-11 text-amber-200" />

    <motion.div
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute -right-1 -top-1"
    >
      <Heart className="h-7 w-7 fill-rose-400 text-rose-400" />
    </motion.div>
  </motion.div>

  {/* Text */}
  <div className="relative z-10 max-w-sm">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-200/70"
    >
      The Journey Continues
    </motion.p>

    <motion.h1
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-5 font-serif text-4xl font-bold leading-tight text-[#f5e4c5] sm:text-5xl"
    >
      Every Memory
      <br />
      <span className="italic text-amber-200">
        Has a Story
      </span>
    </motion.h1>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 85 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"
    />

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="mt-7 text-sm leading-7 text-stone-400"
    >
      Behind every picture, there is a moment.
      Behind every moment, there is a feeling.
      Now it's time to explore the memories
      waiting inside our little museum.
    </motion.p>
  </div>

  {/* Feature icons */}
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1 }}
    className="relative z-10 mt-9 flex items-center justify-center gap-8"
  >
    <div className="flex flex-col items-center gap-2 text-amber-200/70">
      <Camera size={21} />
      <span className="text-[9px] tracking-widest">PHOTOS</span>
    </div>

    <div className="h-8 w-px bg-amber-100/20" />

    <div className="flex flex-col items-center gap-2 text-rose-300/80">
      <Heart size={21} />
      <span className="text-[9px] tracking-widest">MEMORIES</span>
    </div>

    <div className="h-8 w-px bg-amber-100/20" />

    <div className="flex flex-col items-center gap-2 text-amber-200/70">
      <Sparkles size={21} />
      <span className="text-[9px] tracking-widest">MOMENTS</span>
    </div>
  </motion.div>

  {/* Continue button */}
  <motion.button
    onClick={onNext}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.3 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    className="relative z-10 mt-10 flex min-h-14 w-full max-w-[270px] items-center justify-center gap-3 rounded-full border border-amber-200/40 bg-gradient-to-r from-[#a8793f] to-[#e0b873] px-7 py-4 text-sm font-bold text-[#21170d] shadow-lg shadow-amber-900/20"
  >
    <span>Discover Our Memories</span>
    <ArrowRight size={19} />
  </motion.button>

  <p className="relative z-10 mt-7 text-[9px] uppercase tracking-[0.3em] text-stone-600">
    Made with love · Preserved forever
  </p>
</motion.main>

);
}
