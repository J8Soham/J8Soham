import Hero from '../components/Hero/Hero';
import ContentSection from '../components/ContentSection/ContentSection';

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Hero />
      <main className="content-sections" style={{ minHeight: '100vh', padding: 'var(--page-padding, 1rem)' }}>
        <ContentSection>
          <h2 className="content-section-title">Some Content Here</h2>
          <p className="content-section-text">
            This is a placeholder content section. In a real application, you would
            see images, articles, or other specific items you want to feature.
            As you scroll down, the hero beautifully blurs into the background.
          </p>
        </ContentSection>
        <ContentSection>
          <h2 className="content-section-title">Another Section Down Below</h2>
          <p className="content-section-text">
            And here is a second placeholder section coming into view smoothly!
            Notice how it slid and faded into view once you scrolled far enough.
          </p>
        </ContentSection>
      </main>
    </div>
  );
}
