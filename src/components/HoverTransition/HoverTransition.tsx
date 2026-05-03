'use client';

import { useEffect, useState, useCallback, type CSSProperties } from 'react';
import styles from './HoverTransition.module.css';

export type HoverEffect =
  | 'ribbon'
  | 'dots'
  | 'curtain'
  | 'mosaic'
  | 'wave'
  | 'shutter';

export type TriggerMode = 'hover' | 'tap';

export type CaptionPosition = 'above' | 'below';

export interface HoverTransitionProps {
  /** URL of the image visible by default. */
  beforeImage: string;
  /** URL of the image revealed on hover/tap. */
  afterImage: string;
  /** Which transition effect to use. @default 'ribbon' */
  effect?: HoverEffect;
  /** Animation duration in seconds. @default 0.85 */
  speed?: number;
  /** CSS aspect-ratio value (e.g. '1 / 1', '16 / 9', '4 / 5'). @default '1 / 1' */
  aspectRatio?: string;
  /** Optional caption text. */
  caption?: string;
  /** Where to place the caption relative to the image. @default 'below' */
  captionPosition?: CaptionPosition;
  /**
   * Interaction model:
   *  - 'hover': hover plays on desktop; tap toggles on touch (default)
   *  - 'tap':   tap/click toggles on all devices
   * @default 'hover'
   */
  trigger?: TriggerMode;
  /** Accessibility label for the image pair. */
  alt?: string;
  /** Additional className applied to the outer wrapper. */
  className?: string;
  /** Inline styles applied to the outer wrapper. */
  style?: CSSProperties;
  /** Number of strips (ribbon effect only). @default 8 */
  ribbonStrips?: number;
  /** Number of strips (wave effect only). @default 14 */
  waveStrips?: number;
  /** Number of slats (shutter effect only). @default 8 */
  shutterSlats?: number;
  /** Mosaic grid columns. @default 6 */
  mosaicCols?: number;
  /** Mosaic grid rows. @default 6 */
  mosaicRows?: number;
}

type CSSVarStyle = CSSProperties & Record<`--${string}`, string | number>;

export function HoverTransition({
  beforeImage,
  afterImage,
  effect = 'ribbon',
  speed = 0.85,
  aspectRatio = '1 / 1',
  caption,
  captionPosition = 'below',
  trigger = 'hover',
  alt,
  className = '',
  style,
  ribbonStrips = 8,
  waveStrips = 14,
  shutterSlats = 8,
  mosaicCols = 6,
  mosaicRows = 6,
}: HoverTransitionProps) {
  const [active, setActive] = useState(false);

  // Preload both images so the first hover/tap plays smoothly.
  useEffect(() => {
    [beforeImage, afterImage].forEach((src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });
  }, [beforeImage, afterImage]);

  const handleClick = useCallback(() => {
    // In the default 'hover' trigger mode on a hover-capable device,
    // ignore clicks — let CSS :hover do the work.
    if (
      trigger === 'hover' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover)').matches
    ) {
      return;
    }
    setActive((a) => !a);
  }, [trigger]);

  const canvasStyle: CSSVarStyle = {
    '--htw-old': `url("${beforeImage}")`,
    '--htw-new': `url("${afterImage}")`,
    '--htw-speed': `${speed}s`,
    aspectRatio,
  };

  const captionEl = caption ? (
    <div className={styles.caption}>{caption}</div>
  ) : null;

  const canvasClasses = [
    styles.canvas,
    styles[effect],
    active ? styles.active : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${styles.wrap} ${className}`} style={style}>
      {captionEl && captionPosition === 'above' && captionEl}

      <div
        className={canvasClasses}
        style={canvasStyle}
        onClick={handleClick}
        role={alt ? 'img' : undefined}
        aria-label={alt}
      >
        <div
          className={styles.base}
          style={{ backgroundImage: `url("${afterImage}")` }}
        />

        {effect === 'dots' && (
          <div
            className={styles.top}
            style={{ backgroundImage: `url("${beforeImage}")` }}
          />
        )}

        {effect === 'curtain' && (
          <>
            <div className={`${styles.half} ${styles.halfL}`} />
            <div className={`${styles.half} ${styles.halfR}`} />
          </>
        )}

        {effect === 'ribbon' &&
          Array.from({ length: ribbonStrips }).map((_, i) => {
            const stripStyle: CSSVarStyle = {
              left: `${(i / ribbonStrips) * 100}%`,
              width: `${100 / ribbonStrips}%`,
              '--htw-bg-pos': `${(i / Math.max(1, ribbonStrips - 1)) * 100}%`,
              '--htw-bg-size': `${ribbonStrips * 100}% 100%`,
              '--htw-delay': `${i * 35}ms`,
              '--htw-dir': i % 2 === 0 ? '-101%' : '101%',
            };
            return (
              <div key={i} className={styles.strip} style={stripStyle} />
            );
          })}

        {effect === 'wave' &&
          Array.from({ length: waveStrips }).map((_, i) => {
            const stripStyle: CSSVarStyle = {
              top: `${(i / waveStrips) * 100}%`,
              height: `calc(${100 / waveStrips}% + 1px)`,
              '--htw-bg-pos': `${(i / Math.max(1, waveStrips - 1)) * 100}%`,
              '--htw-bg-size': `100% ${waveStrips * 100}%`,
              '--htw-delay': `${i * 45}ms`,
            };
            return (
              <div key={i} className={styles.strip} style={stripStyle} />
            );
          })}

        {effect === 'shutter' &&
          Array.from({ length: shutterSlats }).map((_, i) => {
            const slatStyle: CSSVarStyle = {
              top: `${(i / shutterSlats) * 100}%`,
              height: `calc(${100 / shutterSlats}% + 1px)`,
              '--htw-bg-pos': `${(i / Math.max(1, shutterSlats - 1)) * 100}%`,
              '--htw-bg-size': `100% ${shutterSlats * 100}%`,
              '--htw-delay': `${i * 60}ms`,
            };
            return <div key={i} className={styles.slat} style={slatStyle} />;
          })}

        {effect === 'mosaic' && (
          <div
            className={styles.grid}
            style={
              {
                '--htw-cols': mosaicCols,
                '--htw-rows': mosaicRows,
              } as CSSVarStyle
            }
          >
            {Array.from({ length: mosaicRows }).flatMap((_, y) =>
              Array.from({ length: mosaicCols }).map((__, x) => {
                const bgPos = `${(x / Math.max(1, mosaicCols - 1)) * 100}% ${
                  (y / Math.max(1, mosaicRows - 1)) * 100
                }%`;
                const tileStyle: CSSVarStyle = {
                  '--htw-d': `${(x + y) * 45}ms`,
                };
                return (
                  <div
                    key={`${x}-${y}`}
                    className={styles.tile}
                    style={tileStyle}
                  >
                    <div
                      className={`${styles.face} ${styles.front}`}
                      style={{ backgroundPosition: bgPos }}
                    />
                    <div
                      className={`${styles.face} ${styles.back}`}
                      style={{ backgroundPosition: bgPos }}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {captionEl && captionPosition === 'below' && captionEl}
    </div>
  );
}

export default HoverTransition;
