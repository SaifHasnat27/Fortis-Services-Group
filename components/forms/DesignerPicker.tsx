"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DESIGNERS = [
    { value: "ray", label: "Ray" },
    { value: "ellie", label: "Ellie" },
    { value: "Emilia", label: "Emilia" },
    { value: "anyone", label: "Anyone available" },
];

interface DesignerPickerProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function DesignerPicker({ value, onChange, disabled }: DesignerPickerProps) {
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

    const selectedLabel = DESIGNERS.find((d) => d.value === value)?.label || "Choose your eye doctor";

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          w-full px-4 py-3
          text-[var(--text-primary)]
          bg-base
          border border-[var(--border)]
          rounded-none
          text-sm leading-[var(--leading-normal)]
          transition-all duration-[var(--transition-fast)]
          focus:outline-none
          focus:border-[var(--border-dark)]
          focus:ring-1 focus:ring-[var(--color-black)]
          hover:border-[var(--color-stone-400)]
          flex justify-between items-center
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
            >
                <span className={value ? "" : "text-[var(--text-muted)]"}>
                    {selectedLabel}
                </span>
                <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-50 mt-2 w-full bg-base border border-[var(--border)] shadow-lg">
                    {DESIGNERS.map((designer) => (
                        <button
                            key={designer.value}
                            type="button"
                            onClick={() => {
                                onChange(designer.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-base-secondary transition-colors border-b border-[var(--border)] last:border-b-0 ${value === designer.value ? "bg-base-secondary font-medium" : ""
                                }`}
                        >
                            {designer.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}