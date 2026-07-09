"use client";

import React, { useEffect, useRef } from 'react';
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
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const targets = sectionRef.current.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => { el.classList.add('is-visible'); });
      return;
    }
    
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    targets.forEach((el) => { io.observe(el); });
    
    return () => io.disconnect();
  }, []);

  const cardStyles = [
    { bg: "linear-gradient(150deg, #8C4A5B, #C9A24E)", tag: "Bestseller" },
    { bg: "linear-gradient(150deg, #4A3140, #B4677A)", tag: "New in" },
    { bg: "linear-gradient(150deg, #2E1626, #8C4A5B)", tag: "Loved" },
    { bg: "linear-gradient(150deg, #B4677A, #E7D6A8)", tag: "" },
    { bg: "linear-gradient(150deg, #C9A24E, #4A3140)", tag: "Coming soon" },
  ];

  const SVGs = [
    <svg key="1" viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="32" cy="32" r="21"/>
      <circle cx="32" cy="11" r="3.4" fill="#fff" stroke="none"/>
      <circle cx="49" cy="21" r="3.4" fill="#fff" stroke="none"/>
      <circle cx="49" cy="43" r="3.4" fill="#fff" stroke="none"/>
      <circle cx="32" cy="53" r="3.4" fill="#fff" stroke="none"/>
      <circle cx="15" cy="43" r="3.4" fill="#fff" stroke="none"/>
      <circle cx="15" cy="21" r="3.4" fill="#fff" stroke="none"/>
    </svg>,
    <svg key="2" viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 14c0 14 9 24 20 24s20-10 20-24"/>
      <circle cx="32" cy="44" r="5" fill="#fff" stroke="none"/>
    </svg>,
    <svg key="3" viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="32" cy="14" r="5"/>
      <path d="M32 19v10c0 8 6 14 6 20a6 6 0 1 1-12 0"/>
    </svg>,
    <svg key="4" viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 32c0-8 6-14 14-14s14 6 14 14-6 14-14 14"/>
      <path d="M46 32c0-8-6-14-14-14"/>
      <circle cx="18" cy="32" r="4" fill="#fff" stroke="none"/>
    </svg>,
    <svg key="5" viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="16" cy="20" r="6"/>
      <circle cx="34" cy="14" r="4"/>
      <circle cx="48" cy="26" r="7"/>
      <circle cx="22" cy="40" r="5"/>
      <circle cx="40" cy="44" r="6"/>
    </svg>
  ];

  const genericSvg = (
    <svg viewBox="0 0 64 64" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="32" cy="32" r="16"/>
    </svg>
  );

  return (
    <section ref={sectionRef} className="charmora-categories">
      <style dangerouslySetInnerHTML={{__html: `
        :root{
          --ivory:      #FBF3EC;
          --plum:       #2E1626;
          --plum-soft:  #4A3140;
          --mauve:      #B4677A;
          --mauve-deep: #8C4A5B;
          --gold:       #C9A24E;
          --gold-light: #E7D6A8;
          --blush:      #F3DCE1;
          --ease: cubic-bezier(.22,.9,.3,1);
        }

        .charmora-categories{
          background: var(--ivory);
          padding: 88px 24px;
          font-family: var(--font-inter), 'Jost', sans-serif;
          color: var(--plum);
          overflow: hidden;
        }

        .cc-inner{
          max-width: 1180px;
          margin: 0 auto;
        }

        .cc-header{
          text-align: center;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity .8s var(--ease), transform .8s var(--ease);
        }
        .cc-header.is-visible{ opacity: 1; transform: translateY(0); }

        .cc-eyebrow{
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--mauve-deep);
          margin: 0 0 14px;
          font-weight: 500;
        }
        .cc-eyebrow::before,
        .cc-eyebrow::after{
          content:"";
          width: 26px;
          height: 1px;
          background: var(--gold);
        }

        .cc-heading{
          font-family: var(--font-playfair), 'Cormorant Garamond', serif;
          font-weight: 600;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.1;
          margin: 0 0 14px;
          letter-spacing: .01em;
        }
        .cc-heading em{
          font-style: italic;
          color: var(--mauve);
          font-weight: 500;
        }

        .cc-sub{
          max-width: 480px;
          margin: 0 auto;
          font-size: 15.5px;
          line-height: 1.7;
          color: var(--plum-soft);
          font-weight: 400;
        }

        .cc-grid{
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-auto-rows: auto;
          gap: 16px;
        }

        .cc-card{
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 22px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          color: #fff;
          isolation: isolate;
          cursor: pointer;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .7s var(--ease), transform .7s var(--ease),
                      box-shadow .45s var(--ease);
          box-shadow: 0 0 0 rgba(46,22,38,0);
        }
        .cc-card.is-visible{ opacity: 1; transform: translateY(0); }
        .cc-card:nth-child(1){ transition-delay: .02s; }
        .cc-card:nth-child(2){ transition-delay: .12s; }
        .cc-card:nth-child(3){ transition-delay: .22s; }
        .cc-card:nth-child(4){ transition-delay: .32s; }
        .cc-card:nth-child(5){ transition-delay: .42s; }

        @media (max-width: 1024px){
          .cc-grid{ grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
        @media (max-width: 720px){
          .cc-grid{ grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }

        .cc-media{
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(155deg, rgba(46,22,38,.12) 0%, rgba(46,22,38,.55) 100%),
            var(--img);
          background-size: cover;
          background-position: center;
          transform: scale(1.08);
          transition: transform .9s var(--ease), filter .9s var(--ease);
        }
        .cc-card:hover .cc-media{ transform: scale(1.18) rotate(.4deg); }

        .cc-icon-wrap{
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: .5;
          transform: scale(1);
          transition: transform .9s var(--ease), opacity .5s var(--ease);
        }
        .cc-card:hover .cc-icon-wrap{ transform: scale(1.1) rotate(-3deg); opacity: .32; }
        .cc-icon-wrap svg{ width: 34%; height: 34%; }
        .cc-hero .cc-icon-wrap svg{ width: 26%; height: 26%; }

        .cc-shine{
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 40%, rgba(231,214,168,.55) 50%, transparent 60%);
          transform: translateX(-120%);
          z-index: 3;
          pointer-events: none;
        }
        .cc-card:hover .cc-shine{ animation: shineSweep 1.1s var(--ease); }
        @keyframes shineSweep{
          to{ transform: translateX(120%); }
        }

        .cc-tag{
          position: absolute;
          top: 14px;
          left: 18px;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px 6px 10px;
          background: var(--ivory);
          color: var(--plum);
          font-family: var(--font-inter), 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .05em;
          text-transform: uppercase;
          border-radius: 3px 9px 9px 3px;
          box-shadow: 0 6px 14px rgba(46,22,38,.22);
          transform-origin: top left;
          animation: sway 4.5s ease-in-out infinite;
        }
        .cc-tag::before{
          content:"";
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--ivory);
          border: 1.5px solid var(--plum);
        }
        .cc-tag::after{
          content:"";
          position: absolute;
          left: 4px;
          top: -9px;
          width: 1px;
          height: 9px;
          background: rgba(46,22,38,.5);
        }
        .cc-card:hover .cc-tag{ animation: swayHover .6s ease-in-out; }

        @keyframes sway{
          0%,100%{ transform: rotate(-3deg); }
          50%{ transform: rotate(3deg); }
        }
        @keyframes swayHover{
          0%{ transform: rotate(-3deg); }
          30%{ transform: rotate(9deg); }
          60%{ transform: rotate(-7deg); }
          100%{ transform: rotate(-3deg); }
        }

        .cc-info{
          position: absolute;
          left: 0; right: 0; bottom: 0;
          z-index: 3;
          padding: 14px 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 6px;
        }

        .cc-info-text {
          transform: translateY(4px);
          transition: transform .45s var(--ease);
        }
        .cc-card:hover .cc-info-text {
          transform: translateY(0);
        }

        .cc-info-text h3{
          font-family: var(--font-playfair), 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 20px;
          margin: 0 0 2px;
          letter-spacing: .01em;
          color: #fff;
        }

        .cc-count{
          font-size: 11.5px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #fff;
          font-weight: 500;
          opacity: 0.8;
          transition: opacity .45s var(--ease);
        }
        .cc-card:hover .cc-count {
          opacity: 1;
        }

        .cc-arrow{
          flex-shrink: 0;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.55);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(0) rotate(0deg);
          transition: transform .45s var(--ease), background .45s var(--ease), border-color .45s var(--ease);
          align-self: flex-end;
          margin-top: -18px;
        }
        .cc-arrow svg{ width: 14px; height: 14px; transition: transform .45s var(--ease); }
        .cc-card:hover .cc-arrow{
          background: var(--gold);
          border-color: var(--gold);
          transform: rotate(45deg);
        }
        .cc-card:hover .cc-arrow svg{ transform: rotate(-45deg); }

        @media (prefers-reduced-motion: reduce){
          .cc-card, .cc-header, .cc-media, .cc-icon-wrap, .cc-arrow, .cc-tag{
            transition: none !important;
            animation: none !important;
          }
        }
      `}} />

      <div className="cc-inner">
        <div className="cc-header" data-reveal>
          <p className="cc-eyebrow">Shop by category</p>
          <h2 className="cc-heading">Every piece, <em>perfectly you</em></h2>
          <p className="cc-sub">Handcrafted in small batches — browse the collection the way you'd browse a jewelry box.</p>
        </div>

        <div className="cc-grid">
          {categories.map((category, i) => {
            const style = cardStyles[i] || cardStyles[cardStyles.length - 1];
            const svg = SVGs[i] || genericSvg;
            const bgImg = category.image ? `url('${category.image}')` : style.bg;

            return (
              <a
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className="cc-card"
                data-reveal
                style={{ '--img': bgImg } as React.CSSProperties}
              >
                <div className="cc-media" />
                <div className="cc-icon-wrap">{svg}</div>
                <div className="cc-shine" />
                {style.tag && <span className="cc-tag">{style.tag}</span>}
                <div className="cc-info">
                  <div className="cc-info-text">
                    <h3>{category.name}</h3>
                    <span className="cc-count">
                      {category._count?.products === 1 ? '1 piece' : `${category._count?.products || 0} pieces`}
                    </span>
                  </div>
                  <span className="cc-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="19" x2="19" y2="5"/>
                      <polyline points="8 5 19 5 19 16"/>
                    </svg>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
