"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Clock } from "lucide-react";

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    selectedDate?: string; // "YYYY-MM-DD" – used to filter today's times
    disabled?: boolean;
}

const START_HOUR = 10;
const END_HOUR = 18; // 6 PM – last bookable slot is 18:00
const INTERVAL = 15; // minutes

// Helper: always returns current Sydney time (DST‑aware) – guaranteed valid
function getSydneyNow(): Date {
    const parts = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Sydney",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).formatToParts(new Date());

    const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? "0");
    return new Date(
        get("year"),
        get("month") - 1,
        get("day"),
        get("hour"),
        get("minute"),
        get("second")
    );
}

// Returns the earliest bookable time in Sydney (Sydney time + 30 min, rounded up)
function getMinTimeToday(): string {
    const now = getSydneyNow();
    now.setMinutes(now.getMinutes() + 30);

    const minutes = now.getMinutes();
    const remainder = minutes % INTERVAL;
    if (remainder !== 0) {
        now.setMinutes(minutes + (INTERVAL - remainder));
    }
    now.setSeconds(0, 0);

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
}

export default function TimePicker({ value, onChange, selectedDate, disabled }: TimePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Generate all time slots (24h format)
    const allSlots = useMemo(() => {
        const slots: string[] = [];
        for (let h = START_HOUR; h <= END_HOUR; h++) {
            for (let m = 0; m < 60; m += INTERVAL) {
                if (h === END_HOUR && m > 0) break;
                slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
            }
        }
        return slots;
    }, []);

    // Filter based on whether today is selected (Sydney date)
    const availableSlots = useMemo(() => {
        const sydneyToday = getSydneyNow().toISOString().split("T")[0];
        if (selectedDate === sydneyToday) {
            const minTime = getMinTimeToday();
            return allSlots.filter(slot => slot >= minTime);
        }
        return allSlots;
    }, [selectedDate, allSlots]);

    // Format for display (12h)
    const formatDisplay = (slot: string) => {
        const [h, m] = slot.split(":").map(Number);
        const ampm = h >= 12 ? "PM" : "AM";
        const hour12 = h % 12 || 12;
        return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
    };

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          w-full px-4 py-3
          text-[var(--text-primary)]
          bg-base-secondary
          border border-[var(--border)]
          rounded-none
          text-sm leading-[var(--leading-normal)]
          placeholder:text-[var(--text-muted)]
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
                    {value ? formatDisplay(value) : "Preferred Time"}
                </span>
                <Clock className="w-4 h-4 text-[var(--text-muted)]" />
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-50 mt-2 w-full bg-base border border-[var(--border)] shadow-lg max-h-60 overflow-y-auto">
                    {availableSlots.length > 0 ? (
                        availableSlots.map(slot => (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => {
                                    onChange(slot);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-base-secondary transition-colors ${value === slot ? "bg-base-secondary font-medium" : ""
                                    }`}
                            >
                                {formatDisplay(slot)}
                            </button>
                        ))
                    ) : (
                        <p className="px-4 py-3 text-sm text-[var(--text-muted)]">No available times for today.</p>
                    )}
                </div>
            )}
        </div>
    );
}