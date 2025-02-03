import {
  Button,
  Container,
  Group,
  ButtonVariant,
  MantineGradient,
} from '@mantine/core';
import classes from './Header.module.css';
import {
  HeatMapOutlined,
  LoginOutlined,
  RocketOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const links: {
  title: string;
  href: string;
  leftSection?: React.ReactNode;
  variant?: ButtonVariant;
  gradient?: MantineGradient;
}[] = [
  {
    title: 'Demo',
    href: 'https://mantine.dev',
    leftSection: <RocketOutlined />,
    variant: 'gradient',
    gradient: {
      from: 'var(--mantine-color-brand-filled)',
      to: 'var(--accent-color)',
    },
  },
  {
    title: 'Sign Up',
    href: '#',
    leftSection: <UserAddOutlined />,
    variant: 'filled',
  },
  {
    title: 'Login',
    href: '#',
    leftSection: <LoginOutlined />,
    variant: 'filled',
  },
];

export function Header() {
  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <HeatMapOutlined />
          SubControl
          <Group gap={16} visibleFrom="sm">
            {links.map((link) => (
              <Button
                variant={link.variant}
                key={link.title}
                component="a"
                href={link.href}
                leftSection={link.leftSection}
                gradient={link.gradient}
                size="compact-sm"
              >
                {link.title}
              </Button>
            ))}
          </Group>
        </div>
      </Container>
    </header>
  );
}
