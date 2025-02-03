import { Button, Group, ButtonVariant, MantineGradient } from '@mantine/core';
import classes from './Header.module.css';
import { RocketOutlined, UserAddOutlined } from '@ant-design/icons';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { GitHubLink } from '@/components/GitHubLink';
import { Logo } from '@/components/Logo';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

const links: {
  title: string;
  href: string;
  leftSection?: React.ReactNode;
  variant?: ButtonVariant;
  gradient?: MantineGradient;
}[] = [
  {
    title: 'Demo',
    href: `${appUrl}/demo`,
    leftSection: <RocketOutlined />,
    variant: 'gradient',
    gradient: {
      from: 'var(--mantine-color-brand-filled)',
      to: 'var(--accent-color)',
    },
  },
  {
    title: 'Sign Up',
    href: `${appUrl}/sign-up`,
    leftSection: <UserAddOutlined />,
    variant: 'filled',
  },
];

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <Group gap={10}>
          {links.map((link) => (
            <Button
              variant={link.variant}
              key={link.title}
              component="a"
              href={link.href}
              leftSection={link.leftSection}
              gradient={link.gradient}
              size="sm"
            >
              {link.title}
            </Button>
          ))}
          <ThemeSwitcher />
          <div className={classes.github}>
            <GitHubLink />
          </div>
        </Group>
      </div>
    </header>
  );
}
