"use client";

import { ReactNode } from "react";

export function TrackedLink({ href, children, className, type = 'click' }: { href: string, children: ReactNode, className?: string, type?: string }) {
    const handleClick = () => {
        fetch('/api/analytics', {
            method: 'POST',
            body: JSON.stringify({ type: 'click' }),
            headers: { 'Content-Type': 'application/json' }
        });
    };

    return (
        <a href={href} className={className} onClick={handleClick} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    )
}
