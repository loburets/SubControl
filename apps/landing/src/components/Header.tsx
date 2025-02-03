import { Button, Container, Group } from '@mantine/core';
import classes from './Header.module.css';
import { HeatMapOutlined } from '@ant-design/icons';

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
          <HeatMapOutlined />
          SubControl
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
