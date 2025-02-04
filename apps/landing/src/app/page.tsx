import { Container, Title, Text, Button, Image, Group } from '@mantine/core';
import { Header } from '@/components/Header';
import { Section } from '@/components/Section';
import { RocketOutlined, UserAddOutlined } from '@ant-design/icons';
import classes from './Page.module.css';

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
          src="/screenshots/upcoming-payments.png"
          mt={40}
          radius="md"
          alt="Upcoming payments dashboard"
          className={classes.screenshot}
        />
      </Section>

      <Container size="lg">
        <Group my="lg">
          <Title order={2}>Subscription Tracker</Title>
        </Group>

        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Title order={1}>Manage Your Subscriptions Easily</Title>
          <Text size="lg" mt="md">
            Keep track of all your subscriptions in one place.
          </Text>
          <Button size="lg" mt="lg">
            Get Started
          </Button>
          <Image
            src="/screenshots/desktop.png"
            mt="lg"
            radius="md"
            alt="Desktop Screenshot"
          />
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Features Section */}
        <section>
          <Title order={2}>Why Choose Us?</Title>
          <Text>✔ Track your subscriptions easily</Text>
          <Text>✔ Get reminders before renewals</Text>
          <Text>✔ Save money by avoiding unused services</Text>
        </section>

        {/* Mobile Screenshot */}
        <section style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Title order={2}>Use it on Mobile</Title>
          <Image
            src="/screenshots/mobile.png"
            mt="md"
            radius="md"
            alt="Mobile Screenshot"
            width={300}
          />
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Title order={2}>Start Managing Subscriptions Today</Title>
          <Button size="lg" mt="lg">
            Sign Up Free
          </Button>
        </section>
      </Container>
    </>
  );
}
