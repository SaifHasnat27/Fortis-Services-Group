"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
    value: string; // "YYYY-MM-DD"
    onChange: (value: string) => void;
    disabled?: boolean;
}

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

export default function DatePicker({ value, onChange, disabled }: DatePickerProps) {
    const sydneyNow = getSydneyNow();
    const [isOpen, setIsOpen] = useState(false);
    const [viewYear, setViewYear] = useState(sydneyNow.getFullYear());
    const [viewMonth, setViewMonth] = useState(sydneyNow.getMonth());
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

    // Booking window: today (Sydney) → today + 90 days
    const today = useMemo(() => {
        const d = getSydneyNow();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const maxDate = useMemo(() => {
        const d = new Date(today);
        d.setDate(d.getDate() + 90);
        return d;
    }, [today]);

    // Build calendar grid
    const calendarDays = useMemo(() => {
        const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const days: (number | null)[] = [];

        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let d = 1; d <= daysInMonth; d++) days.push(d);
        return days;
    }, [viewYear, viewMonth]);

    // Navigation limits
    const canGoPrev = useMemo(() => {
        const prevMonthStart = new Date(viewYear, viewMonth - 1, 1);
        return prevMonthStart >= new Date(today.getFullYear(), today.getMonth(), 1);
    }, [viewYear, viewMonth, today]);

    const canGoNext = useMemo(() => {
        const nextMonthStart = new Date(viewYear, viewMonth + 1, 1);
        return nextMonthStart <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    }, [viewYear, viewMonth, maxDate]);

    const isDateSelectable = (day: number) => {
        const date = new Date(viewYear, viewMonth, day);
        return date >= today && date <= maxDate;
    };

    const handlePrevMonth = () => {
        if (!canGoPrev) return;
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(viewYear - 1);
        } else {
            setViewMonth(viewMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (!canGoNext) return;
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(viewYear + 1);
        } else {
            setViewMonth(viewMonth + 1);
        }
    };

    const handleSelect = (day: number) => {
        const year = String(viewYear);
        const month = String(viewMonth + 1).padStart(2, "0");
        const dayStr = String(day).padStart(2, "0");
        onChange(`${year}-${month}-${dayStr}`);
        setIsOpen(false);
    };

    // Format displayed date
    const displayDate = value
        ? new Date(value + "T00:00:00").toLocaleDateString("en-AU", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Preferred Date";

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
          hover:border-[var(--color-neutral-400)]
          flex justify-between items-center
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
            >
                <span className={value ? "" : "text-[var(--text-muted)]"}>{displayDate}</span>
                <Calendar className="w-4 h-4 text-[var(--text-muted)]" />
            </button>

            {isOpen && !disabled && (
                <div
                    className="
            absolute z-50 mt-2
            w-full
            md:w-[calc(200%+1.5rem)] md:left-0
            bg-base
            border border-[var(--border)]
            shadow-lg
          "
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            disabled={!canGoPrev}
                            className={`p-1 rounded transition-colors ${canGoPrev
                                ? "hover:bg-base-secondary text-[var(--text-primary)]"
                                : "text-[var(--text-muted)] cursor-not-allowed opacity-50"
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                            {MONTHS[viewMonth]} {viewYear}
                        </span>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            disabled={!canGoNext}
                            className={`p-1 rounded transition-colors ${canGoNext
                                ? "hover:bg-base-secondary text-[var(--text-primary)]"
                                : "text-[var(--text-muted)] cursor-not-allowed opacity-50"
                                }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 px-2 pt-2 pb-1">
                        {DAYS.map((d) => (
                            <div key={d} className="text-center text-xs text-[var(--text-muted)] py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 px-2 pb-3">
                        {calendarDays.map((day, i) => {
                            if (day === null) return <div key={`empty-${i}`} className="h-9 md:h-8.5" />;
                            const selectable = isDateSelectable(day);
                            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const selected = value === dateStr;

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    disabled={!selectable}
                                    onClick={() => selectable && handleSelect(day)}
                                    className={`
                    h-9 md:h-8.5 text-sm flex items-center justify-center transition-colors
                    ${selectable
                                            ? "hover:bg-base-secondary"
                                            : "text-[var(--text-muted)] cursor-not-allowed opacity-40"
                                        }
                    ${selected ? "!bg-[var(--color-black)] text-[var(--text-primary)] font-medium" : ""}
                  `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}