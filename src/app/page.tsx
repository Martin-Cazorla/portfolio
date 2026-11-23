import Hero from "@/components/home/Hero";
import Problems from "@/components/home/Problems";
import Plans from "@/components/home/Plans";
import DemoTeaser from "@/components/home/DemoTeaser";
import Testimonials from "@/components/home/Testimonials";
import Founder from "@/components/home/Founder";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Plans />
      <DemoTeaser />
      <Testimonials />
      <Founder />
      <CtaBand />
    </>
  );
}
