
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Screen1 from "@/components/Screen1";
import Screen2 from "@/components/Screen2";
import Screen3 from "@/components/Screen3";
import CharacterSelect from "@/components/CharacterSelect";
import FinalScreen from "@/components/FinalScreen";

export default function Website() {
  const [step, setStep] = useState(0);
  const [character, setCharacter] = useState(null);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#100d0a] text-slate-200">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <Screen1 key="screen1" onNext={() => setStep(1)} />
        )}

        {step === 1 && (
          <Screen2 key="screen2" onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <Screen3 key="screen3" onNext={() => setStep(3)} />
        )}

        {step === 3 && (
          <CharacterSelect
            key="character-select"
            onStart={(choice) => {
              setCharacter(choice);
              setStep(4);
            }}
          />
        )}

        {step === 4 && (
          <FinalScreen
            key="museum"
            character={character}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none fixed bottom-3 right-4 z-50 text-xs text-white/30"
      >
        Our Museum
      </motion.div>
    </main>
  );
}
