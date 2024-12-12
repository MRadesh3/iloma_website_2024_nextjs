"use client";

import TopBanner from "@/components/topbanner/TopBanner";
import { CounterSection, CeoMessage, TeamSection } from "@/components/about";
import {
  OverviewSection,
  AboutSection,
  FeatureSection,
  TestimonialSection,
} from "@/components/sectionList";

const About = () => {
  return (
    <>
      <TopBanner heading="About Us" />
      <section>
        <OverviewSection />
        <AboutSection />
        <CounterSection />
        <FeatureSection />
        <CeoMessage />
        <TeamSection />
        <TestimonialSection />
      </section>
    </>
  );
};

export default About;
