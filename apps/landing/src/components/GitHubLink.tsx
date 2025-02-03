import { Button } from '@mantine/core';
import { GithubOutlined } from '@ant-design/icons';
import classes from './GitHubLink.module.css';

export function GitHubLink() {
  return (
    <Button
      component="a"
      href="https://github.com/loburets/SubControl"
      variant="default"
      size="compact-sm"
      aria-label="GitHub Link"
      target="_blank"
      className={classes.link}
    >
      <GithubOutlined className={classes.icon} />
    </Button>
  );
}
