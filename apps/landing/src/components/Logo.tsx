import { Group } from '@mantine/core';
import { HeatMapOutlined } from '@ant-design/icons';
import classes from './Logo.module.css';

export function Logo() {
  return (
    <Group className={classes.container} gap={6}>
      <HeatMapOutlined className={classes.icon} />
      SubControl
    </Group>
  );
}
