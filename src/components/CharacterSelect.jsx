
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const characters = [
  {
    id: "explorer",
    name: "The Explorer",
    description: "Ready to discover every corner of the museum.",
    skin: "#c98f6b",
    hair: "#241b18",
    shirt: "#557b83",
    pants: "#303b4a",
  },
  {
    id: "artist",
    name: "The Artist",
    description: "A creative soul who loves every little detail.",
    skin: "#e2ad88",
    hair: "#493027",
    shirt: "#a65f75",
    pants: "#40334b",
  },
  {
    id: "traveler",
    name: "The Traveler",
    description: "Every room is a new place to explore.",
    skin: "#a96f50",
    hair: "#171515",
    shirt: "#b18a4c",
    pants: "#384337",
  },
];

function CharacterPreview({ character }) {
  return (
    <div className="relative mx-auto flex h-44 w-32 items-end justify-center">
      <div className="absolute bottom-0 h-[76px] w-[25px] -translate-x-4 rounded-b-xl" style={{ background: character.pants }} />
      <div className="absolute bottom-0 h-[76px] w-[25px] translate-x-4 rounded-b-xl" style={{ background: character.pants }} />
      <div className="absolute bottom-[67px] z-10 h-[68px] w-[76px] rounded-[24px_24px_15px_15px]" style={{ background: character.shirt }} />
      <div className="absolute bottom-[127px] z-20 h-[45px] w-[43px] rounded-[45%]" style={{ background: character.skin }}>
        <div className="absolute -top-1 left-0 h-[19px] w-full rounded-t-full" style={{ background: character.hair }} />
        <div className="absolute left-[10px] top-[23px] h-1 w-1 rounded-full bg-black" />
        <div className="absolute right-[10px] top-[23px] h-1 w-1 rounded-full bg-black" />
      </div>
    </div>
  );
}

export default function CharacterSelect({ onStart }) {
  const [selected, setSelected] = useState("explorer");
  const active = characters.find((item) => item.id === selected) || characters[0];

  return (
    <main className="fixed inset-0 z-40 flex min-h-screen items-center justify-center overflow-y-auto bg-[#160f0b] px-4 py-8 text-[#f6e8d1]">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs tracking-[0.4em] text-amber-200/70">WELCOME TO OUR WORLD</p>
          <h1 className="font-serif text-4xl sm:text-6xl">Choose Your Character</h1>
          <p className="mt-3 text-sm text-stone-300">Select who will explore the museum.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {characters.map((character) => {
            const chosen = selected === character.id;
            return (
              <motion.button
                key={character.id}
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => setSelected(character.id)}
                className={`relative rounded-3xl border p-5 text-center ${chosen ? "border-amber-200 bg-amber-100/10" : "border-white/10 bg-black/25"}`}
              >
                {chosen && <span className="absolute right-4 top-4 rounded-full bg-amber-200 p-1 text-black"><Check size={15} /></span>}
                <CharacterPreview character={character} />
                <h2 className="mt-3 font-serif text-2xl">{character.name}</h2>
                <p className="mt-2 text-xs text-stone-300">{character.description}</p>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col items-center gap-4">
          <p className="text-xs text-amber-100/60">SELECTED: {active.name.toUpperCase()}</p>
          <button
            type="button"
            onClick={() => onStart(active)}
            className="inline-flex items-center gap-3 rounded-full bg-amber-200 px-8 py-4 text-sm font-semibold text-[#21160d]"
          >
            ENTER THE MUSEUM <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
