import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Card3DHover } from '@/components/ui/SimpleAnimations';

const contacts = [
  {
    name: "Call Us",
    desc: "Speak directly with our team",
    icon: <Phone aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: `tel:${BUSINESS.phoneRaw}`,
  },
  {
    name: "Email Us",
    desc: "Send us a message anytime",
    icon: <Mail aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    name: "WhatsApp",
    desc: "Chat with us on WhatsApp",
    icon: <MessageCircle aria-hidden="true" className="w-8 h-8 stroke-1" />,
    href: BUSINESS.whatsappLink,
  },
];

export default function QuickContact({ cardClassName = 'bg-base' }: { cardClassName?: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
      {contacts.map((contact) => (
        <Card3DHover key={contact.name}>
          <a
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group
              block
              ${cardClassName}
              p-8
              border border-[var(--border)]
              transition-all duration-[var(--transition-base)]
            `}
          >
            <div className="icon-wrapper text-[var(--text-primary)] mb-7 transition-transform duration-[var(--transition-base)] origin-left">
              {contact.icon}
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-[var(--text-primary)] text-[1.5rem] mb-3 text-left leading-snug">
              {contact.name}
            </h3>
            <p className="text-[var(--text-secondary)] font-light text-sm leading-[var(--leading-relaxed)] mb-7 min-h-[48px] text-left">
              {contact.desc}
            </p>
            <div className="inline-flex items-center text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-primary)] group-hover:text-[var(--text-accent)] transition-colors duration-[var(--transition-fast)] border-b md:border-b-2 border-current pb-0.5">
              Contact now
            </div>
          </a>
        </Card3DHover>
      ))}
    </div>
  );
}
