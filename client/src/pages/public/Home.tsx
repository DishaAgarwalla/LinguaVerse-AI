import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import HowItWorks from "../../components/home/HowItWorks";
import SignLanguage from "../../components/home/SignLanguage";
import Testimonials from "../../components/home/Testimonials";
import FAQ from "../../components/home/FAQ";
import CTA from "../../components/home/CTA";

const Home = () => {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <Features />
      <HowItWorks />
      <SignLanguage />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;