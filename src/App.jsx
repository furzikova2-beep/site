import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RiseRiceSite() {
  const X_LINK = "https://x.com/grainofrice_sol";
  const LOGO = "/rice-logo.png";
  const TARGET_GRAINS = 12500;
  const STARTING_TOTAL_GRAINS = 0;
  const [totalGrainsDropped, setTotalGrainsDropped] = useState(0);
  const [grains, setGrains] = useState(0);
  const [fallingGrains, setFallingGrains] = useState([]);
  const [filledJars, setFilledJars] = useState(0);

  const donors = [
    { name: "moonwalker", grains: 186420 },
    { name: "basedmax", grains: 142800 },
    { name: "0xlegend", grains: 118500 },
    { name: "degenbaby", grains: 96300 },
    { name: "chillguy", grains: 74800 },
    { name: "catfather", grains: 51200 },
  ];

  const topDonorGrains = Math.max(...donors.map((donor) => donor.grains));

  const progress = Math.min((grains / TARGET_GRAINS) * 100, 100);
  const remaining = Math.max(TARGET_GRAINS - grains, 0);
  const jarFillHeight = useMemo(() => (progress === 0 ? "0%" : `${Math.max(progress, 3)}%`), [progress]);

  const dropGrain = (amount = 1) => {
    setGrains((current) => {
      setTotalGrainsDropped((total) => total + amount);
      const nextTotal = current + amount;

      if (nextTotal >= TARGET_GRAINS) {
        const completedJars = Math.floor(nextTotal / TARGET_GRAINS);
        setFilledJars((jars) => jars + completedJars);
        return nextTotal % TARGET_GRAINS;
      }

      return nextTotal;
    });

    const newGrains = Array.from({ length: Math.min(amount, 18) }).map((_, index) => ({
      id: `${Date.now()}-${index}-${Math.random()}`,
      x: Math.random() * 96 - 48,
      delay: Math.random() * 0.15,
      rotate: Math.random() * 160 - 80,
    }));

    setFallingGrains((current) => [...current, ...newGrains]);

    setTimeout(() => {
      setFallingGrains((current) => current.filter((grain) => !newGrains.some((newGrain) => newGrain.id === grain.id)));
    }, 1200);
  };

  const resetJar = () => {
    setTotalGrainsDropped(0);
    setGrains(0);
    setFilledJars(0);
    setFallingGrains([]);
  };


  return (
    <main className="min-h-screen bg-[#fbf7ec] text-[#1f1b16]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-[#1f1b16] bg-[#fffaf0]">
            <img
              src={LOGO}
              alt="RISE logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black tracking-tight">RICE</div>
            <div className="text-xs text-[#756b5d]">just 1 grain of rice</div>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a
            href={X_LINK}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter / X"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#1f1b16] bg-[#fffaf0] transition hover:-translate-y-0.5"
          >
            <XIcon />
          </a>
          <a
            href="#pumpfun-link"
            aria-label="Pump.fun link placeholder"
            className="grid h-9 w-9 place-items-center rounded-full border border-[#1f1b16] bg-[#fffaf0] text-[13px] font-black transition hover:-translate-y-0.5"
          >
            pf
          </a>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-8 md:grid-cols-[1fr_430px] md:px-8 md:pb-24 md:pt-16">
        <div className="flex flex-col justify-center">
          <div className="mb-6 w-fit rounded-full border border-[#1f1b16] bg-[#fffaf0] px-4 py-2 text-sm">
            World Hunger Day · 28 May
          </div>

          <h1 className="text-[72px] font-black leading-[0.86] tracking-[-0.08em] md:text-[130px]">
            RICE
          </h1>

          <p className="mt-5 text-2xl font-medium tracking-[-0.03em] md:text-4xl">
            just 1 grain of rice
          </p>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#4f473d]">
            RICE is a memecoin about helping people who don’t have enough food. Click the button, drop one grain, fill the jar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => dropGrain(1)}
              className="rounded-full border border-[#1f1b16] bg-[#1f1b16] px-7 py-4 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5"
            >
              drop one grain
            </button>
            <button
              onClick={() => dropGrain(100)}
              className="rounded-full border border-[#1f1b16] bg-[#fffaf0] px-7 py-4 text-sm font-black uppercase tracking-[0.08em] transition hover:-translate-y-0.5"
            >
              drop x100
            </button>
            <a
              href={X_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full border border-[#1f1b16] bg-[#f3ead8] px-7 py-4 text-center text-sm font-black uppercase tracking-[0.08em] transition hover:-translate-y-0.5"
            >
              enjoy project
            </a>
          </div>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#1f1b16] bg-[#fffaf0] p-4 shadow-[4px_4px_0_#1f1b16]">
              <div className="text-3xl font-black tracking-[-0.06em]">{totalGrainsDropped.toLocaleString("en-US")}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#73685b]">grains dropped</div>
            </div>
            <div className="rounded-2xl border-2 border-[#1f1b16] bg-[#fffaf0] p-4 shadow-[4px_4px_0_#1f1b16]">
              <div className="text-3xl font-black tracking-[-0.06em]">{filledJars}x</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#73685b]">250g jars filled</div>
            </div>
          </div>

          <div className="mt-6 max-w-xl border-l-2 border-[#1f1b16] pl-5 text-sm leading-7 text-[#5d5347]">
            12,500 grains = 250g of rice. That’s one basic daily rice portion. We want to turn a simple meme into something useful.
          </div>
        </div>

        <div id="jar" className="relative mx-auto w-full max-w-[430px]">
          <div className="absolute -right-2 -top-5 z-30 rounded-2xl border-2 border-[#1f1b16] bg-[#fffaf0] px-4 py-3 text-sm font-black shadow-[4px_4px_0_#1f1b16] md:-right-8">
            <div className="flex items-center gap-2">
              <span>{filledJars}x</span>
              <MiniJarIcon />
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#73685b]">filled jars</div>
          </div>

          <div className="rounded-[28px] border-2 border-[#1f1b16] bg-[#fffaf0] p-5 shadow-[8px_8px_0_#1f1b16]">
            <div className="mb-5 flex items-center justify-between text-sm font-bold">
              <span>250g jar</span>
              <span>{progress.toFixed(1)}%</span>
            </div>

            <div className="relative mx-auto h-[410px] w-[250px]">
              <div className="absolute left-1/2 top-0 h-9 w-[128px] -translate-x-1/2 rounded-t-2xl border-2 border-[#1f1b16] bg-[#fbf7ec]" />

              <div className="absolute left-1/2 top-8 h-[360px] w-[210px] -translate-x-1/2 overflow-hidden rounded-b-[52px] rounded-t-[18px] border-2 border-[#1f1b16] bg-white">
                <div className="absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white/70 to-transparent" />

                <motion.div
                  className="absolute bottom-0 left-0 right-0 overflow-hidden bg-[#ead6a8]"
                  animate={{ height: jarFillHeight }}
                  transition={{ type: "spring", stiffness: 100, damping: 18 }}
                >
                  <div className="absolute bottom-0 left-0 h-[360px] w-full">
                    <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#d9bd83] via-[#ead6a8] to-[#f3e2bb]" />

                    {Array.from({ length: 720 }).map((_, index) => {
                      const columns = 28;
                      const row = Math.floor(index / columns);
                      const col = index % columns;
                      const xOffset = row % 2 === 0 ? 0 : 3.2;
                      const left = 4 + col * 7.1 + xOffset + ((index * 13) % 5) * 0.25;
                      const bottom = 3 + row * 6.8 + ((index * 7) % 4) * 0.35;
                      const rotate = [-32, -18, -6, 9, 21, 34][index % 6];

                      if (left > 96 || bottom > 345) return null;

                      return (
                        <span
                          key={index}
                          className="absolute h-[13px] w-[4px] rounded-full border border-[#c4a15d] bg-[#fff7dd] shadow-[0_1px_0_rgba(255,255,255,0.75)]"
                          style={{
                            left: `${left}%`,
                            bottom: `${bottom}px`,
                            transform: `rotate(${rotate}deg)`,
                          }}
                        />
                      );
                    })}

                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#f7e8c8] to-transparent opacity-80" />
                  </div>
                </motion.div>

                <div className="absolute inset-0 rounded-b-[52px] rounded-t-[18px] shadow-inner" />
              </div>

              <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-[390px] w-[180px] -translate-x-1/2">
                <AnimatePresence>
                  {fallingGrains.map((grain) => (
                    <motion.div
                      key={grain.id}
                      initial={{ y: -30, x: grain.x, rotate: grain.rotate, opacity: 0 }}
                      animate={{ y: 295, opacity: [0, 1, 1, 0], rotate: grain.rotate + 180 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.95, delay: grain.delay, ease: "easeIn" }}
                      className="absolute left-1/2 top-0 h-[14px] w-[5px] rounded-full border border-[#c4a362] bg-[#fff7df]"
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
              <Stat value={grains.toLocaleString("en-US")} label="this jar" />
              <Stat value={remaining.toLocaleString("en-US")} label="left" />
              <Stat value={totalGrainsDropped.toLocaleString("en-US")} label="total" />
            </div>

            <button onClick={resetJar} className="mt-4 w-full rounded-full border border-[#1f1b16] px-4 py-3 text-sm font-bold transition hover:bg-[#f3ead8]">
              reset demo
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <PlainCard number="01" title="Click" text="Every click drops one rice grain into the jar." />
          <PlainCard number="02" title="Fill" text="When the jar reaches 12,500 grains, it equals 250g of rice." />
          <PlainCard number="03" title="Donate" text="RICE is aiming to donate to Rice Against Hunger." />
        </div>
      </section>

      <section id="community" className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        <div className="rounded-[28px] border-2 border-[#1f1b16] bg-[#fffaf0] p-6 shadow-[8px_8px_0_#1f1b16] md:p-8">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.1em]">community</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] md:text-5xl">who dropped rice</h2>
            </div>
            <p className="text-sm text-[#5d5347]">top community donors</p>
          </div>

          <div className="space-y-4">
            {donors.map((donor) => {
              const width = (donor.grains / topDonorGrains) * 100;

              return (
                <div key={donor.name}>
                  <div className="mb-1 flex items-center justify-between text-sm font-bold">
                    <span>@{donor.name}</span>
                    <span>{donor.grains.toLocaleString("en-US")} grains</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full border border-[#1f1b16] bg-[#f4ecda]">
                    <div className="h-full rounded-full bg-[#d8b06a]" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="rounded-[28px] border-2 border-[#1f1b16] bg-[#fffaf0] p-6 shadow-[8px_8px_0_#1f1b16] md:p-10">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.1em]">charity project</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">
                one grain can become x100
              </h2>
            </div>
            <div className="text-base leading-8 text-[#4f473d]">
              <p>
                This project is not officially partnered yet. The goal is to send donations to Rice Against Hunger and show proof when it happens.
              </p>
              <a
                href="https://riseagainsthunger.org/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full border border-[#1f1b16] bg-[#1f1b16] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5"
              >
                riceagainsthunger.org
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#d6c9b2] px-5 py-8 text-sm text-[#6b6257] md:flex-row md:items-center md:justify-between md:px-8">
        <p>RICE — just 1 grain of rice</p>
        <div className="flex gap-4">
          <a href={X_LINK} target="_blank" rel="noreferrer" className="underline underline-offset-4">X</a>
          <a href="#pumpfun-link" className="underline underline-offset-4">Pump.fun</a>
        </div>
      </footer>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-[#1f1b16] bg-[#fbf7ec] px-2 py-3">
      <div className="font-black tracking-[-0.04em]">{value}</div>
      <div className="mt-1 text-xs text-[#73685b]">{label}</div>
    </div>
  );
}

function PlainCard({ number, title, text }) {
  return (
    <div className="rounded-[24px] border-2 border-[#1f1b16] bg-[#fffaf0] p-6 shadow-[5px_5px_0_#1f1b16]">
      <div className="mb-8 text-sm font-black text-[#8b7b61]">{number}</div>
      <h3 className="text-3xl font-black tracking-[-0.06em]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5d5347]">{text}</p>
    </div>
  );
}

function RiceMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="4.8" ry="9" transform="rotate(28 12 12)" fill="#fff7df" stroke="#1f1b16" strokeWidth="1.8" />
    </svg>
  );
}

function MiniJarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3H16V6H8V3Z" fill="#fffaf0" stroke="#1f1b16" strokeWidth="1.6" />
      <path d="M7 6H17L18.2 20H5.8L7 6Z" fill="#ffffff" stroke="#1f1b16" strokeWidth="1.6" />
      <path d="M7 15H17.4L17.8 20H6.2L6.6 15H7Z" fill="#ead6a8" stroke="#1f1b16" strokeWidth="1.2" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
