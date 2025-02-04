'use client';

import {
  ImageProps,
  useMantineColorScheme,
  Image as MantineImage,
} from '@mantine/core';
import { useState, useEffect } from 'react';

interface ThemeAwareImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  darkSrc?: string;
  alt?: string;
}

export function Image({ src, darkSrc, ...props }: ThemeAwareImageProps) {
  const { colorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // During SSR and initial client render, use the light theme image to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc = mounted && colorScheme === 'dark' && darkSrc ? darkSrc : src;
  return <MantineImage src={imageSrc} {...props} />;
}
