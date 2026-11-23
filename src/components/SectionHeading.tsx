import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export default function SectionHeading({ eyebrow, title, intro, align = "center", as = "h2" }: Props) {
  const H = as;
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <H
        className={`mt-4 font-display font-bold tracking-tight ${
          as === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </H>
      {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
    </Reveal>
  );
}
