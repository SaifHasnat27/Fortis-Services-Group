"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import type { ServiceSelection } from "./formSchema";
import { services } from "@/lib/servicesData";

const SERVICES = services.map((s) => s.name);

interface ServicePickerProps {
    value: ServiceSelection[];
    onChange: (services: ServiceSelection[]) => void;
    disabled?: boolean;
    error?: string;
}

export default function ServicePicker({ value, onChange, disabled, error }: ServicePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const toggleService = (label: string) => {
        const exists = value.some((s) => s.id === label);
        if (exists) {
            onChange(value.filter((s) => s.id !== label));
        } else {
            onChange([...value, { id: label, label }]);
            setIsOpen(false);
        }
    };

    const removeService = (label: string) => {
        onChange(value.filter((s) => s.id !== label));
    };

    return (
        <div ref={containerRef} className="relative">
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
                    w-full px-4 py-3
                    text-[var(--text-primary)]
                    bg-base-secondary
                    border border-[var(--border)]
                    rounded-none text-sm leading-[var(--leading-normal)]
                    transition-all duration-[var(--transition-fast)]
                    focus:outline-none focus:border-[var(--border-dark)]
                    focus:ring-1 focus:ring-[var(--color-black)]
                    hover:border-[var(--color-stone-400)]
                    flex justify-between items-center gap-2
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${error ? "border-red-600" : ""}
                `}
            >
                <span className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
                    {value.length > 0 ? (
                        <>
                            {value.map((sel) => (
                                <span
                                    key={sel.id}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-bg-third text-[var(--text-primary)] border border-[var(--border)]"
                                >
                                    {sel.label}
                                    <span
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) => { e.stopPropagation(); removeService(sel.id); }}
                                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); removeService(sel.id); } }}
                                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                                    >
                                        <X className="w-3 h-3" />
                                    </span>
                                </span>
                            ))}
                            <span className="text-[var(--text-muted)]">Select more services</span>
                        </>
                    ) : (
                        <span className="text-[var(--text-muted)]">Select services...</span>
                    )}
                </span>
                <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {isOpen && !disabled && (
                <div className="absolute z-50 mt-2 w-full bg-base border border-[var(--border)] shadow-lg">
                    {SERVICES.map((name) => {
                        const isSelected = value.some((s) => s.id === name);
                        return (
                            <button
                                key={name}
                                type="button"
                                onClick={() => toggleService(name)}
                                className={`
                                    w-full text-left px-4 py-3 text-[0.6875rem] font-medium tracking-[0.12em] uppercase
                                    border-b border-[var(--border)] last:border-b-0
                                    transition-colors duration-[var(--transition-fast)]
                                    ${isSelected
                                        ? "bg-bg-fifth text-[var(--text-primary)]"
                                        : "bg-bg-third text-[var(--text-secondary)] hover:bg-bg-fifth hover:text-[var(--text-primary)]"
                                    }
                                `}
                            >
                                {name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
