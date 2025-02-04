'use client';

import {
  ImageProps,
  useMantineColorScheme,
  Image as MantineImage,
} from '@mantine/core';

interface ThemeAwareImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  darkSrc?: string;
  alt?: string;
}

export function Image({ src, darkSrc, ...props }: ThemeAwareImageProps) {
  const { colorScheme } = useMantineColorScheme();
  console.log({ colorScheme });
  const imageSrc = colorScheme === 'dark' && darkSrc ? darkSrc : src;

  return <MantineImage src={imageSrc} {...props} />;
}
