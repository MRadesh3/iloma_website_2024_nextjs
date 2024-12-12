"use client";

import {
  AboutSection,
  BannerSection,
  OverviewSection,
  ServiceSection,
  FeatureSection,
  TestimonialSection,
  ContactSection,
  BlogSection,
} from "@/components/sectionList";

const Home: React.FC = () => {
  return (
    <>
      <>
        <BannerSection />
        <section className="section">
          <OverviewSection />
          <ServiceSection />
          <AboutSection />
          <FeatureSection />
          <TestimonialSection />
          <ContactSection />
          <BlogSection />
        </section>
      </>
    </>
  );
};

export default Home;
