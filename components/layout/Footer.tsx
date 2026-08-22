import React from 'react';
import Link from 'next/link';
import { Phone, Clock, MessageCircle } from 'lucide-react';
import Wordmark from './Wordmark';
import { BUSINESS } from '@/lib/constants';

export default function Footer({ className = 'bg-base' }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${className} text-[var(--text-primary)] border-t border-[var(--border)]`}>
      <div className="section-wrapper pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Branding Column */}
          <div className="flex flex-col items-center gap-6 text-center">
            <Wordmark dark={false} />
            <p className="text-[var(--text-secondary)] font-light max-w-sm text-pretty">
              Asset maintenance, compliance &amp; integrated trade services. One point of contact for {BUSINESS.serviceArea}.
            </p>
            <div className="flex flex-col gap-3 text-[var(--text-secondary)] font-light">
              <p><span className="text-[var(--text-primary)]">RTA:</span> {BUSINESS.rta}</p>
              <a
                href="https://abr.business.gov.au/ABN/View?abn=51696557114"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors"
              >
                <span className="text-[var(--text-primary)]">ABN:</span> {BUSINESS.abn}
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="text-center">
            <h4 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
              Explore
            </h4>
            <ul className="flex flex-col gap-3 text-[var(--text-secondary)] font-light items-center">
              <li><Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-[var(--text-primary)] transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">About Us</Link></li>
              <li><Link href="/areas-served" className="hover:text-[var(--text-primary)] transition-colors">Areas Served</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4 className="font-[family-name:var(--font-display)] text-xl text-[var(--text-primary)] mb-4">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 text-[var(--text-secondary)] font-light items-center">
              <li>
                <a href={`tel:${BUSINESS.phoneRaw}`} className="group flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors">
                  <Phone className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock aria-hidden="true" className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
                <span>{BUSINESS.openingHours.weekdays}</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle aria-hidden="true" className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
                <span>{BUSINESS.openingHours.emergency}</span>
              </li>
              <li>
                <a
                  href={BUSINESS.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-[var(--text-primary)] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
                  Message us on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border)]">

          {/* Desktop — 3-col: Policy (left) | T&C (centre) | Copyright (right) */}
          <div className="hidden md:grid md:grid-cols-3 items-center text-sm text-[var(--text-secondary)] font-light mb-4">
            <Link href="/policy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </Link>
            <div className="text-center">
              <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">
                Terms &amp; Conditions
              </Link>
            </div>
            <p className="text-right">&copy; {currentYear} {BUSINESS.name}. All rights reserved.</p>
          </div>

          {/* Row 2 — Desktop: Integrate AI centered */}
          <div className="hidden md:flex justify-center text-sm text-[var(--text-secondary)] font-light">
            <span>Developed by&nbsp;</span>
            <a
              href="https://integrateai.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E90FF] hover:text-[#8EC5FF] transition-colors"
            >
              Integrate AI
            </a>
          </div>

          {/* Mobile — centered, each on own row */}
          <div className="flex flex-col items-center gap-4 md:hidden text-sm text-[var(--text-secondary)] font-light">
            <Link href="/policy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">
              Terms &amp; Conditions
            </Link>
            <p>&copy; {currentYear} {BUSINESS.name}. All rights reserved.</p>
            <div>
              <span>Developed by </span>
              <a
                href="https://integrateai.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E90FF] hover:text-[#8EC5FF] transition-colors"
              >
                Integrate AI
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
