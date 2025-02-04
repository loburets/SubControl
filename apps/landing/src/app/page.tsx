import { Title, Text, Button, Group } from '@mantine/core';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { RocketOutlined, UserAddOutlined } from '@ant-design/icons';
import classes from './Page.module.css';
import { Image } from '@/components/Image';

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
            Sign up – it's quick & easy!
          </Button>
        </Group>
      </Section>
      <Section isAccent>
        <Title order={2} className={classes.sectionTitle}>
          No more surprises – stay ahead of your payments!
        </Title>
        <Text size="xl" mt="md" className={classes.limitedText}>
          Get a clear view of all upcoming charges. See what's due next and
          track past expenses.
        </Text>
        <Image
          src={'/screenshots/upcoming-payments.png'}
          darkSrc={'/screenshots/upcoming-payments-dark.png'}
          mt={40}
          radius="md"
          alt="Upcoming payments dashboard"
          className={classes.screenshot}
        />
      </Section>
    </>
  );
}
