import { IconArrowNarrowRight } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section className="px-6 pt-20 pb-10 text-center relative min-h-[calc(100vh-80px)] bg-base-300 flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500" />
      <h2 className="text-xs tracking-widest text-base-content/60 mb-2">
        NOW ACCEPTING CANDIDATES
      </h2>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
        Kickstart Your Career with Road2Tech
      </h1>
      <p className="text-base-content/60 max-w-xl mx-auto text-base mb-6">
        Your gateway to career opportunities in tech and non-tech sectors.
        Submit your details and let us connect you with opportunities.
      </p>
      <a href="#register" className="btn btn-accent btn-outline rounded-full">
        Register Now <IconArrowNarrowRight size={16} />
      </a>
    </section>
  );
}
