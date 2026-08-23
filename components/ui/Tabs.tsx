"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ChevronDown } from 'lucide-react';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

/* ARIA ids are derived from the tab's `value` (already unique per service),
   so the trigger and its panel can point at each other without threading
   generated ids through props. */
const tabId = (value: string) => `tab-${value}`;
const panelId = (value: string) => `tabpanel-${value}`;

/**
 * Read/write the active tab from inside a <Tabs> subtree.
 *
 * Exists so a tiny child can set the active tab without the PARENT needing to
 * know it — which is what keeps `useSearchParams` out of the page's render
 * path. See app/services/page.tsx <TabFromQuery />.
 */
export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used within Tabs');
  return ctx;
}

export function Tabs({
  defaultValue,
  children,
  className = '',
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Extract value + label from each TabsTrigger child for the dropdown
  const options = React.Children.toArray(children).flatMap(child => {
    if (React.isValidElement(child) && (child.props as { value?: string }).value) {
      const props = child.props as { value: string; children: React.ReactNode };
      return [{ value: props.value, label: props.children }];
    }
    return [];
  });

  const activeLabel = options.find(o => o.value === activeTab)?.label ?? activeTab;

  return (
    <>
      {/* ── Mobile: custom dropdown ───────────────────── */}
      <div ref={containerRef} className="relative md:hidden mb-10 w-full">
        {/* Closed state — stays as-is */}
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="flex items-center justify-between w-full px-5 py-3 bg-base border border-[var(--border)] rounded-[var(--radius-btn)] cursor-pointer"
        >
          <span className="text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-[var(--text-primary)]">
            {activeLabel}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {/* Open state — styled to match ServicePicker */}
        {isOpen && (
          <div className="absolute z-50 mt-2 w-full bg-base border border-[var(--border)] shadow-lg">
            {options.map(o => {
              const isSelected = o.value === activeTab;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { setActiveTab(o.value); setIsOpen(false); }}
                  className={`
                    w-full text-left px-4 py-3
                    text-[0.6875rem] font-medium tracking-[0.12em] uppercase
                    border-b border-[var(--border)] last:border-b-0
                    transition-colors duration-[var(--transition-fast)]
                    ${isSelected
                      ? 'bg-bg-fifth text-[var(--text-primary)]'
                      : 'bg-bg-third text-[var(--text-secondary)] hover:bg-bg-fifth hover:text-[var(--text-primary)]'
                    }
                  `}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Desktop: original tab buttons ──────────────
          role="tablist" is REQUIRED: ARIA only allows role="tab" inside a
          tablist, and without it screen readers announce three orphaned tabs
          with no container and no discoverable panel. Arrow-key navigation
          between tabs is part of the same pattern and is handled here. */}
      <div
        role="tablist"
        onKeyDown={(e) => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          e.preventDefault();
          const i = options.findIndex(o => o.value === activeTab);
          if (i === -1) return;
          const next = e.key === 'ArrowRight'
            ? (i + 1) % options.length
            : (i - 1 + options.length) % options.length;
          setActiveTab(options[next].value);
          // Move focus with selection, as the ARIA tabs pattern expects.
          document.getElementById(tabId(options[next].value))?.focus();
        }}
        className={`
          hidden md:flex flex-wrap items-center justify-start
          gap-2 md:gap-3
          mb-14
          ${className}
        `}
      >
        {children}
      </div>
    </>
  );
}

export function TabsTrigger({
  value,
  children,
  className = '',
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      role="tab"
      id={tabId(value)}
      aria-selected={isActive}
      aria-controls={panelId(value)}
      /* Roving tabindex: the tablist is a single tab stop, and arrow keys move
         between tabs within it. Only the selected tab is reachable via Tab. */
      tabIndex={isActive ? 0 : -1}
      className={`
        px-6 py-2.5
        rounded-[var(--radius-btn)]
        text-[0.6875rem] font-medium tracking-[0.12em] uppercase
        transition-all duration-[var(--transition-base)]
        focus-visible:outline-2 focus-visible:outline-[var(--color-black)] focus-visible:outline-offset-2
        ${isActive
          ? 'bg-[var(--bg-dark)] text-[var(--text-inverse)]'
          : 'bg-base text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className = '',
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = useContext(TabsContext);
  const container = useRef<HTMLDivElement>(null);

  if (!context) throw new Error('TabsContent must be used within Tabs');

  const isActive = context.activeTab === value;

  useGSAP(() => {
    if (!container.current) return;
    if (isActive) {
      gsap.fromTo(
        container.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      /* Panels now persist in the DOM (see `hidden` below), so GSAP's inline
         opacity/transform would survive on a hidden panel and still be there
         when it is shown again — the fromTo above re-sets them, but clearing
         keeps the element clean and avoids a stale transform if the animation
         is ever interrupted mid-flight. */
      gsap.set(container.current, { clearProps: 'opacity,transform' });
    }
  }, { scope: container, dependencies: [isActive] });

  /* Every panel stays in the DOM; inactive ones carry `hidden`.
     `return null` for inactive panels would leave each tab's aria-controls
     pointing at an element that does not exist — a dangling reference that
     axe-core and Lighthouse both flag. `hidden` is what the ARIA tabs pattern
     specifies: it removes the panel from the accessibility tree AND from
     layout (display:none), so there is no visual or layout difference. */
  return (
    <div
      ref={container}
      role="tabpanel"
      id={panelId(value)}
      aria-labelledby={tabId(value)}
      hidden={!isActive}
      /* Makes the panel itself focusable so keyboard users can Tab straight
         from the selected tab into its content. */
      tabIndex={isActive ? 0 : -1}
      className={className}
    >
      {children}
    </div>
  );
}
