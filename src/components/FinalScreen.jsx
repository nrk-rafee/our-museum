
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  Heart,
  Music2,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const memories = [
  {
    title: "Our First Memory",
    description: "A beautiful moment to remember forever.",
    image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1000",
  },
  {
    title: "Beautiful Moments",
    description: "Every little moment means something.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000",
  },
  {
    title: "Special Memories",
    description: "Some memories never fade.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000",
  },
  {
    title: "Forever Special",
    description: "A collection of unforgettable moments.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000",
  },
  {
    title: "Our Little World",
    description: "Welcome to our little museum.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000",
  },
];

function Frame({ memory, position, rotation = [0, 0, 0], onSelect }) {
  const texture = useTexture(memory.image);

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[1.65, 1.95, 0.13]} />
        <meshStandardMaterial color="#9a7044" roughness={0.45} />
      </mesh>

      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[1.43, 1.72, 0.025]} />
        <meshStandardMaterial color="#ead6b5" />
      </mesh>

      <mesh
        position={[0, 0, 0.1]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(memory);
        }}
      >
        <planeGeometry args={[1.28, 1.56]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <Text
        position={[0, -1.17, 0.12]}
        fontSize={0.14}
        color="#f3dfbd"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {memory.title}
      </Text>
    </group>
  );
}

function MuseumRoom({ onSelect, movement }) {
  const frames = useMemo(
    () => [
      { memory: memories[0], position: [-3.1, 2.25, -6.85] },
      { memory: memories[1], position: [0, 2.25, -6.85] },
      { memory: memories[2], position: [3.1, 2.25, -6.85] },
      {
        memory: memories[3],
        position: [-4.85, 2.25, -2.4],
        rotation: [0, Math.PI / 2, 0],
      },
      {
        memory: memories[4],
        position: [4.85, 2.25, -2.4],
        rotation: [0, -Math.PI / 2, 0],
      },
    ],
    []
  );

  useFrame(({ camera }, delta) => {
    const speed = 3 * delta;

    const forward = Number(movement.forward) - Number(movement.backward);
    const sideways = Number(movement.right) - Number(movement.left);

    if (forward || sideways) {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();

      const side = new THREE.Vector3()
        .crossVectors(direction, camera.up)
        .normalize();

      camera.position.addScaledVector(direction, forward * speed);
      camera.position.addScaledVector(side, sideways * speed);

      camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.2, 4.2);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, -5.7, 5.7);
      camera.position.y = 1.65;
    }
  });

  return (
    <>
      <color attach="background" args={["#100d0a"]} />
      <fog attach="fog" args={["#100d0a", 11, 24]} />

      <ambientLight intensity={1.2} />
      <pointLight position={[0, 5, 0]} intensity={90} color="#ffd79b" />
      <pointLight position={[-4, 3, -4]} intensity={35} color="#ffbd78" />
      <pointLight position={[4, 3, -4]} intensity={35} color="#ffbd78" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 16]} />
        <meshStandardMaterial color="#493323" roughness={0.8} />
      </mesh>

      {/* Floor decoration */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.012, -6 + i * 2]}
        >
          <planeGeometry args={[9.8, 0.025]} />
          <meshStandardMaterial color="#80603d" />
        </mesh>
      ))}

      {/* Back wall */}
      <mesh position={[0, 2.5, -7.5]}>
        <boxGeometry args={[10, 5, 0.25]} />
        <meshStandardMaterial color="#49382b" />
      </mesh>

      {/* Side walls */}
      <mesh position={[-5, 2.5, 0]}>
        <boxGeometry args={[0.25, 5, 15]} />
        <meshStandardMaterial color="#35271e" />
      </mesh>

      <mesh position={[5, 2.5, 0]}>
        <boxGeometry args={[0.25, 5, 15]} />
        <meshStandardMaterial color="#35271e" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[10, 0.2, 15]} />
        <meshStandardMaterial color="#211913" />
      </mesh>

      {/* Gallery title */}
      <Text
        position={[0, 4.15, -7.32]}
        fontSize={0.38}
        color="#f4d6a4"
        anchorX="center"
      >
        OUR BEAUTIFUL MEMORIES
      </Text>

      {/* Wall frames */}
      <Suspense fallback={null}>
        {frames.map((frame) => (
          <Frame
            key={frame.memory.title}
            memory={frame.memory}
            position={frame.position}
            rotation={frame.rotation}
            onSelect={onSelect}
          />
        ))}
      </Suspense>

      {/* Entrance glow */}
      <pointLight position={[0, 2, 6]} intensity={18} color="#e8a65e" />
    </>
  );
}

export default function FinalScreen() {
  const [selected, setSelected] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keys = {
        w: "forward",
        ArrowUp: "forward",
        s: "backward",
        ArrowDown: "backward",
        a: "left",
        ArrowLeft: "left",
        d: "right",
        ArrowRight: "right",
      };

      const direction = keys[event.key];
      if (direction) {
        event.preventDefault();
        setMovement((old) => ({ ...old, [direction]: true }));
      }
    };

    const handleKeyUp = (event) => {
      const keys = {
        w: "forward",
        ArrowUp: "forward",
        s: "backward",
        ArrowDown: "backward",
        a: "left",
        ArrowLeft: "left",
        d: "right",
        ArrowRight: "right",
      };

      const direction = keys[event.key];
      if (direction) {
        setMovement((old) => ({ ...old, [direction]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const playMusic = async () => {
    const audio = document.getElementById("museum-audio");
    if (!audio) return;

    try {
      if (musicOn) {
        audio.pause();
        setMusicOn(false);
      } else {
        await audio.play();
        setMusicOn(true);
      }
    } catch {
      console.log("Music could not play.");
    }
  };

  const changeMove = (direction, active) => {
    setMovement((old) => ({ ...old, [direction]: active }));
  };

  const currentIndex = selected
    ? memories.findIndex((item) => item.title === selected.title)
    : 0;

  const changeMemory = (direction) => {
    const nextIndex =
      (currentIndex + direction + memories.length) % memories.length;
    setSelected(memories[nextIndex]);
  };

  return (
    <main className="fixed inset-0 z-[100] flex flex-col bg-[#100d0a] text-[#f5e5c9]">
      <audio id="museum-audio" src="/music.mp3" loop />

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-amber-100/10 bg-black/45 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em]">
          <Heart size={17} className="text-rose-300" />
          OUR MUSEUM
        </div>

        <button
          onClick={playMusic}
          className="flex items-center gap-2 rounded-full border border-amber-100/20 bg-black/40 px-3 py-2 text-xs"
        >
          {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          {musicOn ? "Music On" : "Music Off"}
        </button>
      </header>

      {/* 3D Museum */}
      <div className="relative min-h-0 flex-1">
        <Canvas
          camera={{ position: [0, 1.65, 5.5], fov: 65 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
        >
          <MuseumRoom onSelect={setSelected} movement={movement} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={0.85}
            maxPolarAngle={2.25}
            minAzimuthAngle={-1.1}
            maxAzimuthAngle={1.1}
            rotateSpeed={0.55}
            target={[0, 1.65, -2]}
          />
        </Canvas>

        {/* Instructions */}
        <div className="pointer-events-none absolute left-1/2 top-[76px] z-10 w-max max-w-[90%] -translate-x-1/2 rounded-full border border-amber-100/15 bg-black/55 px-4 py-2 text-center text-[10px] text-amber-100/80 backdrop-blur">
          DRAG TO LOOK AROUND · MOVE TO EXPLORE · TAP A PHOTO
        </div>

        {/* Mobile movement controls */}
        <div className="absolute bottom-5 left-5 z-20 grid grid-cols-3 gap-1">
          <div />
          <button
            onPointerDown={() => changeMove("forward", true)}
            onPointerUp={() => changeMove("forward", false)}
            onPointerLeave={() => changeMove("forward", false)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-100/20 bg-black/55"
          >
            <ArrowUp />
          </button>
          <div />

          <button
            onPointerDown={() => changeMove("left", true)}
            onPointerUp={() => changeMove("left", false)}
            onPointerLeave={() => changeMove("left", false)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-100/20 bg-black/55"
          >
            <ArrowLeft />
          </button>

          <button
            onPointerDown={() => changeMove("backward", true)}
            onPointerUp={() => changeMove("backward", false)}
            onPointerLeave={() => changeMove("backward", false)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-100/20 bg-black/55"
          >
            <ArrowDown />
          </button>

          <button
            onPointerDown={() => changeMove("right", true)}
            onPointerUp={() => changeMove("right", false)}
            onPointerLeave={() => changeMove("right", false)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-100/20 bg-black/55"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="absolute bottom-7 right-4 z-10 rounded-full border border-amber-100/15 bg-black/50 px-3 py-2 text-[10px] text-amber-100/70">
          3D MEMORY HALL
        </div>
      </div>

      {/* Bottom note */}
      <footer className="flex items-center justify-center gap-2 border-t border-amber-100/10 bg-[#17110c] px-3 py-3 text-[10px] tracking-wider text-amber-100/60">
        <Music2 size={13} />
        A LITTLE MUSEUM OF BEAUTIFUL MEMORIES
        <Heart size={13} className="text-rose-300" />
      </footer>

      {/* Photo viewer */}
      {selected && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-3"
          >
            <X />
          </button>

          <div
            className="w-full max-w-lg text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="max-h-[65vh] w-full rounded-xl border border-amber-200/30 object-contain shadow-2xl"
            />

            <h2 className="mt-5 font-serif text-2xl text-amber-100">
              {selected.title}
            </h2>

            <p className="mt-2 text-sm text-stone-300">
              {selected.description}
            </p>

            <div className="mt-5 flex items-center justify-center gap-8">
              <button
                onClick={() => changeMemory(-1)}
                className="rounded-full border border-amber-100/20 p-3"
              >
                <ChevronLeft />
              </button>

              <span className="text-xs text-amber-100/70">
                {currentIndex + 1} / {memories.length}
              </span>

              <button
                onClick={() => changeMemory(1)}
                className="rounded-full border border-amber-100/20 p-3"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
