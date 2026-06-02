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
          {/* Brand Column */}
          <div className="flex flex-col items-center gap-6 text-center">
            <Wordmark dark={false} />
            <p className="text-[var(--text-secondary)] font-light max-w-sm text-pretty">
              Asset maintenance, compliance &amp; integrated trade services. One point of contact for {BUSINESS.serviceArea}.
            </p>
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
              Visit Us
            </h4>
            <ul className="flex flex-col gap-3 text-[var(--text-secondary)] font-light items-center">
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="w-5 h-5 text-[var(--text-primary)] shrink-0" />
                <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-[var(--text-primary)] transition-colors">
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
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border)]">
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 items-center text-sm text-[var(--text-secondary)] font-light">
            <p>&copy; {currentYear} {BUSINESS.name}. All rights reserved.</p>
            <div className="text-center">
              <span>Developed by </span>
              <a
                href="https://integrateai.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-400 transition-colors"
              >
                Integrate AI
              </a>
            </div>
            <a
              href={BUSINESS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-end hover:text-[var(--text-primary)] transition-colors"
            >
              <MessageCircle aria-hidden="true" className="w-4 h-4" />
              <span>Message us on WhatsApp</span>
            </a>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col items-center gap-4 md:hidden text-sm text-[var(--text-secondary)] font-light">
            <a
              href={BUSINESS.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
            >
              <MessageCircle aria-hidden="true" className="w-4 h-4" />
              <span>Message us on WhatsApp</span>
            </a>
            <p>&copy; {currentYear} {BUSINESS.name}. All rights reserved.</p>
            <div>
              <span>Developed by </span>
              <a
                href="https://integrateai.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-400 transition-colors"
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
