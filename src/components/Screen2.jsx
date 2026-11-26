import { motion } from "framer-motion";
import {
ArrowRight,
Camera,
Sparkles,
Image as ImageIcon,
Footprints,
} from "lucide-react";

const frames = [
{
title: "Beautiful Moments",
gradient: "from-rose-300 via-orange-200 to-amber-100",
},
{
title: "Special Memories",
gradient: "from-sky-300 via-blue-200 to-indigo-100",
},
{
title: "Our Little World",
gradient: "from-emerald-300 via-teal-200 to-cyan-100",
},
];

export default function Screen2({ onNext }) {
return (
<motion.main
initial={{ opacity: 0, y: 25 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -25 }}
transition={{ duration: 0.8 }}
className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#171311] px-4 py-8 sm:px-6"
>
{/* Ambient lighting */}
<div className="pointer-events-none absolute inset-0">
<div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
<div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-orange-500/10 blur-[90px]" />
</div>

  {/* Heading */}
  <div className="relative z-10 mb-7 text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="mb-4 flex items-center justify-center gap-2 text-amber-200"
    >
      <Sparkles size={15} />
      <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">
        Welcome Inside
      </span>
      <Sparkles size={15} />
    </motion.div>

    <h1 className="font-serif text-3xl font-bold text-[#f4dfbd] sm:text-4xl">
      The Memory Hall
    </h1>

    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-stone-400">
      Step inside and discover the little moments
      that make our story special.
    </p>
  </div>

  {/* Museum room */}
  <div
    className="relative z-10 w-full max-w-[430px]"
    style={{ perspective: "900px" }}
  >
    <div className="relative h-[280px] overflow-hidden rounded-t-xl border border-amber-100/10 bg-[#29221d] sm:h-[330px]">

      {/* Back wall */}
      <div className="absolute inset-x-[15%] top-0 h-[72%] border-x border-amber-100/10 bg-gradient-to-b from-[#514239] to-[#302720]">
        <div className="absolute inset-x-0 top-0 h-2 bg-amber-100/10" />

        {/* Back wall frames */}
        <div className="flex h-full items-center justify-around px-2 pb-5 pt-8">
          {frames.map((frame, index) => (
            <motion.div
              key={frame.title}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              className="w-[27%] max-w-[105px]"
            >
              <div className="border-[5px] border-[#9b7042] bg-[#e8d5b5] p-1 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                <div
                  className={`flex aspect-[4/5] items-center justify-center bg-gradient-to-br ${frame.gradient}`}
                >
                  <ImageIcon className="h-7 w-7 text-white/80" />
                </div>
              </div>

              <p className="mt-2 truncate text-center text-[7px] text-amber-100/70 sm:text-[9px]">
                {frame.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Left wall */}
      <div
        className="absolute bottom-[18%] left-0 top-0 w-[16%] origin-left border-r border-amber-100/10 bg-gradient-to-r from-[#211b18] to-[#45362b]"
        style={{ clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0 100%)" }}
      >
        <div className="absolute left-1/2 top-[35%] w-[70%] -translate-x-1/2 border-[3px] border-[#a77b49] bg-[#d8bd91] p-1">
          <div className="aspect-[3/4] bg-gradient-to-br from-orange-200 to-rose-400" />
        </div>
      </div>

      {/* Right wall */}
      <div
        className="absolute bottom-[18%] right-0 top-0 w-[16%] origin-right border-l border-amber-100/10 bg-gradient-to-l from-[#211b18] to-[#45362b]"
        style={{ clipPath: "polygon(0 15%, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="absolute right-1/2 top-[35%] w-[70%] translate-x-1/2 border-[3px] border-[#a77b49] bg-[#d8bd91] p-1">
          <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-indigo-400" />
        </div>
      </div>

      {/* Floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[32%] border-t border-amber-100/10 bg-gradient-to-b from-[#755036] to-[#3c281c]"
        style={{
          clipPath: "polygon(16% 0, 84% 0, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-x-0 top-1/2 h-px bg-amber-100/10" />
        <div className="absolute inset-x-[20%] top-[25%] h-px bg-amber-100/10" />
        <div className="absolute inset-x-[10%] top-[75%] h-px bg-amber-100/10" />
      </div>

      {/* Warm ceiling light */}
      <div className="absolute left-1/2 top-3 h-20 w-32 -translate-x-1/2 rounded-full bg-amber-200/10 blur-2xl" />

      {/* Entrance label */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-100/20 bg-black/40 px-4 py-2 text-[9px] font-medium tracking-[0.25em] text-amber-100 sm:text-[10px]"
      >
        YOUR MEMORIES AWAIT
      </motion.div>
    </div>

    {/* Room bottom edge */}
    <div className="h-2 rounded-b-lg bg-gradient-to-r from-[#543821] via-[#bd8950] to-[#543821]" />
  </div>

  {/* Museum description */}
  <div className="relative z-10 mt-7 text-center">
    <div className="flex items-center justify-center gap-2 text-amber-200">
      <Camera size={17} />
      <span className="text-xs font-semibold tracking-widest">
        A GALLERY OF MEMORIES
      </span>
    </div>

    <p className="mx-auto mt-3 max-w-xs text-xs leading-6 text-stone-400">
      Walk through the gallery, explore every frame,
      and relive the moments preserved inside.
    </p>
  </div>

  {/* Enter gallery button */}
  <motion.button
    onClick={onNext}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className="relative z-10 mt-7 flex min-h-12 w-full max-w-[260px] items-center justify-center gap-3 rounded-full border border-amber-200/40 bg-gradient-to-r from-[#a8793f] to-[#e0b873] px-6 py-3 text-sm font-bold text-[#21170d] shadow-lg shadow-amber-900/20"
  >
    <Footprints size={18} />
    <span>Explore the Gallery</span>
    <ArrowRight size={18} />
  </motion.button>

  <p className="relative z-10 mt-5 text-[9px] tracking-[0.25em] text-stone-600">
    TAKE YOUR TIME · ENJOY EVERY MEMORY
  </p>
</motion.main>

);
}
