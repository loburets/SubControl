import { Title, Text, Button, Group, Space } from '@mantine/core';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import {
  GithubOutlined,
  RocketOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import classes from './Page.module.css';
import { Image } from '@/components/Image';
import { MobilePhone } from '@/components/MobilePhone';
import cx from 'clsx';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default function Home() {
  return (
    <>
      <Header />
      <Section>
        <Title className={classes.mainTitle}>
          Track your subscriptions effortlessly with{' '}
          <span className={classes.accentWord}>SubControl</span>
        </Title>
        <Text size="xl" mt="md" className={classes.limitedText}>
          Keep all your subscriptions in one place, avoid unexpected charges,
          and stay in control of your spending.
        </Text>
        <Group mt={40} gap="md">
          <Button
            size="lg"
            variant="gradient"
            gradient={{
              from: 'var(--mantine-color-brand-filled)',
              to: 'var(--accent-color)',
            }}
            leftSection={<RocketOutlined />}
            component="a"
            href={`${appUrl}/demo`}
          >
            Try a live demo
          </Button>
          <Button
            size="lg"
            variant="filled"
            leftSection={<UserAddOutlined />}
            component="a"
            href={`${appUrl}/sign-up`}
          >
            Sign up – it&apos;s quick & easy!
          </Button>
        </Group>
      </Section>
      <Section isAccent>
        <Title order={2} className={classes.sectionTitle}>
          No more surprises – stay ahead of your payments!
        </Title>
        <Text size="xl" mt="md" className={classes.limitedText}>
          Get a clear view of all upcoming charges. See what&apos;s due next and
          track past expenses.
        </Text>
        <Image
          src={'/screenshots/upcoming-payments.png'}
          darkSrc={'/screenshots/upcoming-payments-dark.png'}
          mt={40}
          radius="md"
          alt="Upcoming payments dashboard"
          className={cx(classes.screenshot, classes.desktopScreenshot)}
        />
      </Section>
      <Section>
        <Title order={2} className={classes.sectionTitle}>
          Access it anytime, anywhere
        </Title>
        <Text size="xl" mt="md" className={classes.limitedText}>
          SubControl works smoothly on mobile. Just add it to your home screen
          for an app-like experience. Dark mode included!
        </Text>
        <Group
          justify="center"
          gap={40}
          mt={40}
          className={classes.mobileScreenshotsGroup}
        >
          <MobilePhone>
            <Image
              src={'/screenshots/main-mobile.png'}
              radius="md"
              alt="Mobile Light mode"
            />
          </MobilePhone>
          <MobilePhone hideFromExtraSmall>
            <Image
              src={'/screenshots/stats-mobile-dark.png'}
              radius="md"
              alt="Mobile Dark mode"
            />
          </MobilePhone>
        </Group>
      </Section>
      <Section isAccent>
        <Title order={2} className={classes.sectionTitle}>
          Understand your spending with detailed statistics
        </Title>
        <Text size="xl" mt="md" className={classes.limitedText}>
          Get insights into your subscription costs with beautiful charts and
          breakdowns. Track spending trends and identify opportunities to
          optimize your expenses.
        </Text>
        <Image
          src={'/screenshots/stats.png'}
          darkSrc={'/screenshots/stats-dark.png'}
          mt={40}
          radius="md"
          alt="Statistics dashboard"
          className={cx(classes.screenshot, classes.desktopScreenshot)}
        />
      </Section>
      <Section>
        <Title order={2} className={classes.sectionTitle}>
          Built for the community – open source & free
        </Title>
        <Text size="xl" mt="md" className={classes.limitedText}>
          SubControl is free to use with no hidden fees. You can even contribute
          or check the code yourself.
        </Text>
        <Button
          size="lg"
          variant="filled"
          leftSection={<GithubOutlined />}
          component="a"
          href="https://github.com/loburets/SubControl"
          mt={40}
        >
          Check it out on GitHub
        </Button>
      </Section>
      <Space h={80} />
    </>
  );
}
