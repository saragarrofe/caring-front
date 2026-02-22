import { Hero } from '@components/Hero/Hero';
import { PageTitle } from '@components/PageTitle/PageTitle';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container py-4">
        <PageTitle
          title="Good morning!"
          subtitle="Here's what needs attention today."
        />
      </div>
    </div>
  );
}
