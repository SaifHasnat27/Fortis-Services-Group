"use client";

import React, { useState, useEffect } from 'react';
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${className} border-b border-[var(--border)]`}>
      <div className="section-wrapper flex items-center justify-between h-[var(--nav-height)]">
        <div className="flex items-center gap-3 h-9">
          <Link href="/" aria-label={`${BUSINESS.name} home`}>
            <Image
              src="/icon.png"
              alt={`${BUSINESS.name} logo`}
              width={36}
              height={36}
              className="h-12 w-auto flex-shrink-0"
              priority={false}
            />
          </Link>
          <Wordmark dark={false} />
        </div>

        <nav className="hidden xl:flex items-center gap-10">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
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

          <a href={`tel:${BUSINESS.phoneRaw}`}>
            <Button variant="primary" size="md" className="gap-2">
              <Phone aria-hidden="true" className="w-4 h-4" />
              <span>Free Quote</span>
            </Button>
          </a>
        </nav>

        <button
          className="
            xl:hidden p-2 -mr-2
            text-[var(--text-primary)]
            rounded-md
            transition-colors duration-[var(--transition-fast)]
            hover:bg-base-secondary
            focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2
          "
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={`
              absolute top-full left-0 right-0
              ${className} border-b border-[var(--border)]
              shadow-md
              xl:hidden
            `}
          >
            <nav className="flex flex-col section-wrapper py-8 gap-1">
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
              <div className="pt-6">
                <a href={`tel:${BUSINESS.phoneRaw}`}>
                  <Button variant="primary" size="md" className="w-full justify-center">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Free Quote</span>
                  </Button>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
