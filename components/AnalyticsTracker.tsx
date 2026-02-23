"use client";

import { useEffect, useRef } from "react";

export function AnalyticsTracker() {
    const ran = useRef(false);

    useEffect(() => {
        if (ran.current) return;
        ran.current = true;

        // Simple distinct visit check (sessionStorage)
        if (!sessionStorage.getItem('visited')) {
            fetch('/api/analytics', {
                method: 'POST',
                body: JSON.stringify({ type: 'visit' }),
                headers: { 'Content-Type': 'application/json' }
            });
            sessionStorage.setItem('visited', 'true');
        }
    }, []);

    return null;
}
