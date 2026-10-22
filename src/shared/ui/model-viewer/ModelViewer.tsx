'use client';

import type { ModelViewerElement } from '@google/model-viewer';
import { useEffect, useRef } from 'react';

export type Viewer = ModelViewerElement;

interface Props {
  src: string;
  poster: string;
  alt: string;
  /** glTF material variant to show, e.g. a fabric. */
  variantName?: string;
  cameraOrbit?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  ar?: boolean;
  /** `lazy` waits until the viewer scrolls into view. */
  loading?: 'eager' | 'lazy';
  className?: string;
  onReady?: (viewer: Viewer) => void;
}

let registered: Promise<unknown> | undefined;

/** Loads the web component after first paint and points it at the local Draco decoder. */
function registerModelViewer() {
  registered ??= import('@google/model-viewer').then((mod) => {
    mod.ModelViewerElement.dracoDecoderLocation = '/draco/';
  });
  return registered;
}

export function ModelViewer({
  src,
  poster,
  alt,
  variantName,
  cameraOrbit,
  interactive = true,
  autoRotate = false,
  ar = false,
  loading = 'eager',
  className,
  onReady,
}: Props) {
  const ref = useRef<Viewer | null>(null);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarsePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const handleLoad = () => {
      if (!cancelled) onReady?.(el);
    };
    el.addEventListener('load', handleLoad);
    void registerModelViewer();
    return () => {
      cancelled = true;
      el.removeEventListener('load', handleLoad);
    };
  }, [onReady]);

  return (
    <model-viewer
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      alt={alt}
      loading={loading}
      reveal="auto"
      camera-controls={interactive}
      touch-action="pan-y"
      interaction-prompt={interactive ? 'auto' : 'none'}
      auto-rotate={autoRotate && !reduceMotion}
      shadow-intensity={coarsePointer ? 0 : 1}
      shadow-softness="1"
      environment-image="neutral"
      exposure="1"
      camera-orbit={cameraOrbit}
      variant-name={variantName}
      ar={ar}
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="fixed"
      ar-placement="floor"
      interpolation-decay={reduceMotion ? 1 : undefined}
    />
  );
}
