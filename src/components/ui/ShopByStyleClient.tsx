"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  _count?: {
    products: number;
  };
}

export default function ShopByStyleClient({ categories }: { categories: Category[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [inView, setInView] = useState(false);
  const [charmPositions, setCharmPositions] = useState<{left: string, top: string}[]>([]);

  // The hardcoded icons from the HTML file, we'll assign them by index
  const SVGs = [
    // Beaded
    <svg viewBox="0 0 32 32" fill="none" key="beaded">
      <circle cx="7" cy="16" r="5" fill="var(--rose)"/>
      <circle cx="16" cy="16" r="5" fill="var(--gold)"/>
      <circle cx="25" cy="16" r="5" fill="var(--wine)"/>
    </svg>,
    // Charm
    <svg viewBox="0 0 32 32" fill="none" key="charm">
      <path d="M16 26s-9-5.7-9-12.2C7 9.6 10 7 13.2 7c1.6 0 3 .8 3.8 2 .8-1.2 2.2-2 3.8-2C24 7 27 9.6 27 13.8 27 20.3 16 26 16 26z" fill="var(--wine)"/>
    </svg>,
    // Chain-Link
    <svg viewBox="0 0 32 32" fill="none" key="chain">
      <ellipse cx="12" cy="16" rx="7" ry="5" stroke="var(--gold)" strokeWidth="2.4"/>
      <ellipse cx="21" cy="16" rx="7" ry="5" stroke="var(--wine)" strokeWidth="2.4"/>
    </svg>,
    // Birthstone
    <svg viewBox="0 0 32 32" fill="none" key="birthstone">
      <path d="M16 5 26 12 21 27 11 27 6 12Z" fill="var(--rose)" stroke="var(--wine)" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M6 12H26M11 27 16 12 21 27M16 5 12 12M16 5 20 12" stroke="#fff" strokeWidth="0.8" opacity="0.7"/>
    </svg>,
    // Personalized
    <svg viewBox="0 0 32 32" fill="none" key="personalized">
      <circle cx="16" cy="16" r="11" stroke="var(--gold)" strokeWidth="1.6"/>
      <text x="16" y="21" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="14" fill="var(--wine)" fontStyle="italic">A</text>
    </svg>,
    // Pearl
    <svg viewBox="0 0 32 32" fill="none" key="pearl">
      <circle cx="11" cy="13" r="5.5" fill="#fff" stroke="var(--rose)" strokeWidth="1"/>
      <circle cx="21" cy="13" r="5.5" fill="#fff" stroke="var(--rose)" strokeWidth="1"/>
      <circle cx="16" cy="21" r="5.5" fill="#fff" stroke="var(--rose)" strokeWidth="1"/>
    </svg>
  ];

  const genericSvg = (
    <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="var(--gold)" strokeWidth="1.6"/>
        <circle cx="16" cy="16" r="5" fill="var(--rose)" />
    </svg>
  );

  // Distribute points along the path based on number of categories
  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    
    const calculatePositions = () => {
      const len = path.getTotalLength();
      if (len === 0) return; // path not ready

      // Calculate fractions evenly if not exactly 6, otherwise use the specific nice-looking ones
      let fractions = [];
      if (categories.length === 6) {
        fractions = [0.045, 0.235, 0.42, 0.60, 0.785, 0.965];
      } else {
        const step = 1 / categories.length;
        for (let i = 0; i < categories.length; i++) {
          fractions.push(step * i + (step / 2));
        }
      }

      const newPositions = categories.map((_, i) => {
        const fraction = fractions[i] || 0.5;
        const pt = path.getPointAtLength(fraction * len);
        return {
          left: (pt.x / 1000 * 100) + '%',
          top: (pt.y / 300 * 100) + '%'
        };
      });
      setCharmPositions(newPositions);
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    
    // Quick timeout to let the path render and calculate length properly
    const timer = setTimeout(calculatePositions, 100);
    
    return () => {
        window.removeEventListener('resize', calculatePositions);
        clearTimeout(timer);
    };
  }, [categories]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const router = useRouter();

  return (
    <section 
      ref={sectionRef} 
      className={`collections-section py-24 px-6 md:px-12 bg-white overflow-hidden relative ${inView ? 'in-view' : ''}`}
      style={{
        background: `radial-gradient(ellipse 80% 60% at 15% 0%, rgba(217,169,160,0.25), transparent 60%),
                     radial-gradient(ellipse 70% 50% at 100% 100%, rgba(201,161,90,0.14), transparent 60%),
                     var(--ivory, #FBF6F1)`
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,340;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700&display=swap');
        
        :root {
          --ivory: #FBF6F1;
          --blush: #F3DCD4;
          --rose: #D9A9A0;
          --wine: #7A2E3A;
          --wine-dark: #4E1620;
          --gold: #C9A15A;
          --gold-light: #EBD8AA;
          --ink: #2B1F22;
          --ink-soft: #7A6669;
          --thread: #C7A98F;
        }
        .cs-inner { max-width: 1180px; margin: 0 auto; }
        .cs-header { text-align: center; max-width: 620px; margin: 0 auto 4.5rem; }
        .cs-eyebrow {
          display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.72rem;
          letter-spacing: 0.28em; text-transform: uppercase; font-weight: 700; color: var(--wine);
          margin-bottom: 1.4rem; font-family: 'Manrope', sans-serif;
        }
        .cs-eyebrow::before, .cs-eyebrow::after { content: ''; width: 22px; height: 1px; background: var(--gold); }
        .cs-heading {
          font-family: 'Fraunces', serif; font-weight: 500; font-size: clamp(2.1rem, 4.4vw, 3.4rem);
          line-height: 1.12; letter-spacing: -0.01em; margin: 0 0 1.1rem; color: var(--ink);
        }
        .cs-heading em { font-style: italic; font-weight: 400; color: var(--wine); }
        .cs-sub { font-size: 1.02rem; line-height: 1.65; color: var(--ink-soft); margin: 0; font-weight: 500; font-family: 'Manrope', sans-serif;}
        
        .cs-stage-wrap {
          overflow-x: auto; overflow-y: visible; scrollbar-width: none; -ms-overflow-style: none;
          margin: 0 -1.5rem; padding: 1rem 1.5rem 0.5rem;
        }
        .cs-stage-wrap::-webkit-scrollbar { display: none; }
        .cs-stage { position: relative; width: 100%; min-width: 760px; aspect-ratio: 1000 / 300; }
        .cs-thread-svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .cs-thread-path {
          fill: none; stroke: var(--thread); stroke-width: 2.5; stroke-linecap: round;
          stroke-dasharray: 1400; stroke-dashoffset: 1400; transition: stroke-dashoffset 1.6s cubic-bezier(.22,.8,.28,1);
        }
        .collections-section.in-view .cs-thread-path { stroke-dashoffset: 0; }
        .cs-clasp { fill: none; stroke: var(--gold); stroke-width: 2.5; stroke-linecap: round; opacity: 0; transition: opacity .5s ease .9s; }
        .collections-section.in-view .cs-clasp { opacity: 0.9; }
        
        .cs-charm {
          position: absolute; transform: translate(-50%,-50%) scale(0.5); width: 118px;
          display: flex; flex-direction: column; align-items: center; background: none; border: none;
          padding: 0; cursor: pointer; font-family: 'Manrope', sans-serif; opacity: 0;
          transition: opacity .55s cubic-bezier(.22,.8,.28,1), transform .55s cubic-bezier(.22,.8,.28,1);
        }
        .collections-section.in-view .cs-charm { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        .cs-charm:nth-of-type(1) { transition-delay: .15s; }
        .cs-charm:nth-of-type(2) { transition-delay: .35s; }
        .cs-charm:nth-of-type(3) { transition-delay: .55s; }
        .cs-charm:nth-of-type(4) { transition-delay: .75s; }
        .cs-charm:nth-of-type(5) { transition-delay: .95s; }
        .cs-charm:nth-of-type(6) { transition-delay: 1.15s; }
        .cs-charm:nth-of-type(7) { transition-delay: 1.35s; }
        .cs-charm:nth-of-type(8) { transition-delay: 1.55s; }
        
        .cs-charm-orb {
          width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(160deg, #ffffff 0%, var(--blush) 100%);
          box-shadow: 0 1px 2px rgba(122,46,58,0.08), 0 10px 24px -10px rgba(122,46,58,0.35), inset 0 0 0 1px rgba(255,255,255,0.6);
          display: flex; align-items: center; justify-content: center; position: relative;
          animation: cs-bob 5.5s ease-in-out infinite; animation-play-state: paused;
          transition: box-shadow .35s ease, transform .35s cubic-bezier(.22,.8,.28,1);
        }
        .collections-section.in-view .cs-charm-orb { animation-play-state: running; }
        .cs-charm:nth-of-type(2n) .cs-charm-orb { animation-delay: -1.8s; }
        .cs-charm:nth-of-type(3n) .cs-charm-orb { animation-delay: -3.2s; }
        @keyframes cs-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .cs-charm-orb svg { width: 32px; height: 32px; }
        .cs-charm:hover .cs-charm-orb, .cs-charm:focus-visible .cs-charm-orb {
          box-shadow: 0 0 0 3px var(--gold-light), 0 14px 28px -10px rgba(122,46,58,0.45); transform: scale(1.12) translateY(-4px);
        }
        .cs-charm:focus-visible { outline: none; }
        .cs-charm:focus-visible .cs-charm-orb { box-shadow: 0 0 0 3px var(--gold), 0 14px 28px -10px rgba(122,46,58,0.45); }
        
        .cs-charm-label { margin-top: 0.85rem; font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 500; letter-spacing: 0.01em; color: var(--ink); }
        .cs-charm-tag {
          max-width: 150px; font-size: 0.76rem; color: var(--ink-soft); line-height: 1.4; margin-top: 0.3rem; opacity: 0;
          max-height: 0; overflow: hidden; transition: opacity .3s ease, max-height .3s ease, margin .3s ease;
        }
        .cs-charm:hover .cs-charm-tag, .cs-charm:focus-visible .cs-charm-tag { opacity: 1; max-height: 3.2em; margin-top: 0.45rem; }
        
        .cs-footer { text-align: center; margin-top: 4rem; }
        .cs-cta {
          font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 0.92rem; letter-spacing: 0.02em; color: var(--wine);
          text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; padding-bottom: 3px;
          background-image: linear-gradient(var(--gold), var(--gold)); background-repeat: no-repeat; background-position: left bottom;
          background-size: 0% 1.5px; transition: background-size .35s ease, gap .35s ease, color .35s ease;
        }
        .cs-cta:hover { background-size: 100% 1.5px; gap: 0.75rem; color: var(--wine-dark); }
        .cs-cta svg { width: 16px; height: 16px; transition: transform .35s ease; }
        .cs-cta:hover svg { transform: translateX(2px); }
        
        @media (max-width: 600px) { .collections-section { padding: 4.5rem 1.25rem 3.5rem; } .cs-header { margin-bottom: 3rem; } }
        @media (prefers-reduced-motion: reduce) {
          .cs-thread-path, .cs-clasp, .cs-charm, .cs-charm-orb, .cs-cta { transition-duration: .01ms !important; animation: none !important; }
        }
      `}} />

      <div className="cs-inner">
        <div className="cs-header">
          <span className="cs-eyebrow">Shop by style</span>
          <h2 className="cs-heading">Find the strand<br/><em>made for you</em></h2>
          <p className="cs-sub">Browse our collections the way you'd browse a jewelry box.</p>
        </div>

        <div className="cs-stage-wrap">
          <div className="cs-stage">
            <svg className="cs-thread-svg" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
              <path className="cs-clasp" d="M 18 150 a 14 14 0 1 0 0.1 0" />
              <path ref={pathRef} className="cs-thread-path"
                    d="M 30 150 C 100 60, 180 240, 250 150 S 400 60, 470 150 S 620 240, 690 150 S 840 60, 910 150 S 960 190, 980 150" />
              <path className="cs-clasp" d="M 982 150 a 14 14 0 1 0 0.1 0" />
            </svg>

            {categories.map((category, i) => (
              <button 
                key={category.id}
                className="cs-charm" 
                type="button" 
                onClick={() => router.push(`/shop?category=${category.slug}`)}
                style={charmPositions[i] ? { left: charmPositions[i].left, top: charmPositions[i].top } : {}}
              >
                <span className="cs-charm-orb">
                  {SVGs[i] || genericSvg}
                </span>
                <span className="cs-charm-label">{category.name}</span>
                <span className="cs-charm-tag">{category._count?.products || 0} Pieces</span>
              </button>
            ))}
          </div>
        </div>

        <div className="cs-footer">
          <Link href="/shop" className="cs-cta">
            View all collections
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
