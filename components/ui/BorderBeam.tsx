'use client';

/*
 * Adapted from Magic UI "Border Beam" (https://magicui.design/docs/components/border-beam)
 * Source: https://github.com/magicuidesign/magicui
 *
 * MIT License
 * Copyright (c) Magic UI
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions: The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
 *
 * Changes: ported from motion/react + Tailwind 4 to framer-motion + Tailwind 3 (mask
 * styles inline), removed the cn() helper, Sitelya brand colours as defaults.
 */

import { motion, type MotionStyle } from 'framer-motion';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  reverse?: boolean;
}

export default function BorderBeam({
  size = 120,
  duration = 8,
  delay = 0,
  colorFrom = '#60a5fa',
  colorTo = '#2563EB',
  borderWidth = 1.5,
  reverse = false,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent"
      style={{
        borderWidth,
        borderStyle: 'solid',
        WebkitMask: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
        WebkitMaskClip: 'padding-box, border-box',
        WebkitMaskComposite: 'source-in',
        mask: 'linear-gradient(transparent, transparent) padding-box, linear-gradient(#000, #000) border-box',
        maskComposite: 'intersect',
      }}
    >
      <motion.div
        className="absolute aspect-square"
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          } as MotionStyle
        }
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration, delay: -delay }}
      />
    </div>
  );
}
