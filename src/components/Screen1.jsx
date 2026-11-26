import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export default function Screen1({ onNext }) {
return (
<main className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#100e0d] px-5 py-12">

  {/* Background lighting */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
    <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-rose-500/10 blur-[100px]" />
    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]" />
  </div>

  {/* Decorative stars */}
  {Array.from({ length: 18 }).map((_, i) => (
    <motion.div
      key={i}
      className="pointer-events-none absolute h-1 w-1 rounded-full bg-amber-200"
      style={{
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 23 + 7) % 100}%`,
      }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.7, 1.5, 0.7],
      }}
      transition={{
        duration: 2 + (i % 3),
        repeat: Infinity,
        delay: i * 0.15,
      }}
    />
  ))}

  {/* Main entrance card */}
  <motion.section
    initial={{ opacity: 0, y: 35, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] border border-amber-200/20 bg-[#211b18]/90 px-6 py-12 text-center shadow-[0_25px_100px_rgba(0,0,0,0.6)] sm:px-12 sm:py-16"
  >

    {/* Museum icon */}
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-amber-200/30 bg-amber-100/5"
    >
      <Sparkles className="h-9 w-9 text-amber-200" />
    </motion.div>

    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-amber-200/70">
      A Journey Through Memories
    </p>

    <h1 className="font-serif text-5xl font-bold tracking-wide text-[#f7e8c8] sm:text-6xl">
      Our Museum
    </h1>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 90 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="mx-auto mt-6 h-[2px] bg-gradient-to-r from-transparent via-amber-200 to-transparent"
    />

    <p className="mx-auto mt-7 max-w-sm text-base leading-8 text-stone-300/80">
      Every picture holds a memory.
      Every memory tells a story.
      And every story belongs to us.
    </p>

    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-rose-300">
      <Heart className="h-4 w-4 fill-rose-300" />
      <span>Made with love, just for you</span>
      <Heart className="h-4 w-4 fill-rose-300" />
    </div>

    {/* Enter button */}
    <motion.button
      onClick={onNext}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="mx-auto mt-12 flex min-h-14 w-full max-w-xs items-center justify-center gap-3 rounded-full border border-amber-200/40 bg-gradient-to-r from-[#b58a4b] to-[#e0b873] px-7 py-4 font-semibold text-[#21170d] shadow-[0_8px_30px_rgba(181,138,75,0.2)] transition-shadow hover:shadow-[0_8px_40px_rgba(224,184,115,0.35)]"
    >
      <span>Enter the Museum</span>
      <ArrowRight className="h-5 w-5" />
    </motion.button>

    <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-stone-500">
      An unforgettable journey awaits
    </p>

  </motion.section>

  <div className="pointer-events-none absolute bottom-5 text-xs tracking-widest text-stone-600">
    © Our Museum
  </div>

</main>

);
}
