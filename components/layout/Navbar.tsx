"use client";

import React, { useState, useEffect, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Wordmark from './Wordmark';
import Button from '@/components/ui/Button';
import { BUSINESS } from '@/lib/constants';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Areas Served', href: '/areas-served' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ className = 'bg-base' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock page scroll while the full-screen mobile menu is open, so the page
  // behind can't move. Always restored on close/unmount.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Links stay real <a href> (via next/link) so right-click "open in new tab",
  // middle-click and copy-link all work. We only intercept a PLAIN left-click on
  // the page you're already on, and smooth-scroll to the top instead of doing nothing.
  const handleNavClick = (e: MouseEvent<HTMLElement>, href: string) => {
    setIsOpen(false);
    const plainClick = !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0;
    if (href === pathname && plainClick) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${className} border-b border-[var(--border)]`}>
      <div className="section-wrapper flex items-center justify-between h-[var(--nav-height)]">
        <div className="flex items-center gap-2 min-[400px]:gap-3 h-9 min-w-0">
          {/* Logo: always a square that never gets squeezed (shrink-0); size steps with the screen */}
          <Link href="/" onClick={(e) => handleNavClick(e, '/')} aria-label={`${BUSINESS.name} home`} className="shrink-0">
            <Image
              src="/icon.png"
              alt={`${BUSINESS.name} logo`}
              width={48}
              height={48}
              className="w-10 h-10 sm:w-11 sm:h-11 xl:w-12 xl:h-12 shrink-0 object-contain"
              priority={false}
            />
          </Link>
          {/* Below desktop: wordmark scales with screen width (13px on the narrowest phones,
              up to its normal 16px from ~460px), so it's as big as the space allows and never
              runs under the icons. Desktop keeps its own larger sizes. */}
          {/* Wordmark is its own link (shared with the footer), so catch its click here:
              same scroll-to-top on the home page as the logo. Footer untouched. */}
          <div className="min-w-0" onClickCapture={(e) => handleNavClick(e, '/')}>
            <Wordmark dark={false} className="max-md:[&_span]:text-[clamp(0.75rem,3.85vw,1rem)]" />
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-10">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`
                      relative text-[0.8125rem] font-medium tracking-[0.08em] uppercase
                      transition-colors duration-[var(--transition-fast)]
                      after:absolute after:bottom-[-3px] after:left-0 after:right-0
                      after:h-px after:origin-left
                      after:transition-transform after:duration-300
                      ${isActive
                        ? 'text-[var(--text-primary)] after:bg-[var(--text-primary)] after:scale-x-100'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] after:bg-[var(--text-primary)] after:scale-x-0 hover:after:scale-x-100'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Goes to the quote form on /contact (same as the mobile menu button) */}
          <Link href="/contact#quote-form">
            <Button variant="primary" size="md" tabIndex={-1}>
              <span>Free Quote</span>
            </Button>
          </Link>
        </nav>

        {/* Mobile: one-tap call + menu toggle */}
        <div className="flex items-center gap-1 xl:hidden -mr-2">
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="
              p-2
              rounded-sm
              text-[var(--text-primary)]
              bg-base
              transition-colors duration-[var(--transition-fast)]
              focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2
            "
            aria-label="Call us now"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
          </a>
          <button
            className="
              p-2
              rounded-sm
              text-[var(--text-primary)]
              bg-base
              transition-colors duration-[var(--transition-fast)]
              focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2
            "
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          /* Full-screen mobile menu: fills from just under the bar to the bottom of the
             screen on any device height. Same surface as the bar so they read as one.
             Page scroll is locked while open (see effect above). */
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`
              fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-40
              flex flex-col
              ${className}
              xl:hidden
            `}
          >
            <nav className="w-full flex-1 overflow-y-auto flex flex-col section-wrapper py-8 gap-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`
                        block py-3 text-[0.8125rem] tracking-[0.1em] uppercase font-medium
                        border-b border-[var(--border)] last:border-0
                        transition-colors duration-[var(--transition-fast)]
                        ${isActive
                          ? 'text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }
                      `}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA pinned to the bottom, clear of the iPhone home indicator */}
            <div className="w-full section-wrapper pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
              {/* Goes to the quote form on /contact (not a call). The call option is the phone icon in the bar. */}
              <Link href="/contact#quote-form" onClick={() => setIsOpen(false)} className="block">
                <Button variant="primary" size="md" className="w-full justify-center" tabIndex={-1}>
                  <span>Free Quote</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
