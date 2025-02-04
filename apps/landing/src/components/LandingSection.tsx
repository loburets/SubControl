import { PropsWithChildren } from 'react';
import classes from './LandingSection.module.css';
import { Container } from '@mantine/core';
import cx from 'clsx';

export const LandingSection = ({
  children,
  isAccent = false,
}: PropsWithChildren & { isAccent?: boolean }) => {
  return (
    <div className={classes.wrapper}>
      {isAccent && <Wave isTop />}
      <div
        className={cx(
          classes.containerWrapper,
          isAccent && classes.accentBackground
        )}
      >
        <Container size="lg" className={classes.container}>
          {children as React.ReactNode}
        </Container>
      </div>
      {isAccent && <Wave />}
    </div>
  );
};

const Wave = ({ isTop = false }: { isTop?: boolean }) => {
  return (
    <svg
      className={cx(classes.wave, isTop && classes.rotate)}
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"></path>
    </svg>
  );
};
