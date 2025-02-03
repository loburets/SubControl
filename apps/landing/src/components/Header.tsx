import { Button, Container, Group } from '@mantine/core';
import Image from 'next/image';
import classes from './Header.module.css';

const links = [
  { title: 'Demo', href: 'https://mantine.dev' },
  { title: 'Sign Up', href: '#' },
  { title: 'Login', href: '#' },
];

export function Header() {
  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Image src={Logo} alt="Logo" />;
          <Group gap={16} visibleFrom="sm">
            {links.map((link) => (
              <Button key={link.title} component="a" href={link.href}>
                {link.title}
              </Button>
            ))}
          </Group>
        </div>
      </Container>
    </header>
  );
}
