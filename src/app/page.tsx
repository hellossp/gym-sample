import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import About from "@/components/About";
import InteractiveDumbbell from "@/components/InteractiveDumbbell";
import MotivationBanner from "@/components/MotivationBanner";
import Membership from "@/components/Membership";
import Trainers from "@/components/Trainers";
import BMICalculator from "@/components/BMICalculator";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col bg-brand-dark">
        <Hero />
        <Stats />
        <About />
        <InteractiveDumbbell />
        <MotivationBanner />
        <Programs />
        <Membership />
        <Trainers />
        <BMICalculator />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}