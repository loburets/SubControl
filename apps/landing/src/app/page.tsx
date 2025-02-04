import { Container, Title, Text, Button, Image, Group } from '@mantine/core';
import { Header } from '@/components/Header';
import { LandingSection } from '@/components/LandingSection';

export default function Home() {
  return (
    <>
      <Header />
      <LandingSection>Test</LandingSection>
      <LandingSection isAccent>Test</LandingSection>
      <LandingSection>Test</LandingSection>
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
