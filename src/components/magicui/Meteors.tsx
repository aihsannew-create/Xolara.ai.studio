/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors: React.FC<MeteorsProps> = ({ number = 30, className = '' }) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    // Generate randomized starting points and staggered delays
    const styles = [...new Array(number)].map(() => ({
      top: Math.floor(Math.random() * 80) - 20 + '%',
      left: Math.floor(Math.random() * 110) - 10 + '%',
      animationDelay: (Math.random() * 4 + 0.2).toFixed(2) + 's',
      animationDuration: (Math.random() * 5 + 3).toFixed(2) + 's',
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className={`pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-amber-200 shadow-[0_0_0_1px_#ffffff50,0_0_14px_#f59e0b] before:absolute before:top-1/2 before:h-[1px] before:w-[65px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-amber-300 before:via-white/50 before:to-transparent before:content-[''] ${className}`}
        />
      ))}
    </div>
  );
};
