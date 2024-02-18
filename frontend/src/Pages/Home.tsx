import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words =
  "Your all-in-one payment solution with a user-friendly dashboard for effortless financial management.";

const Home: FC = () => {
  return (
    <motion.div
      className=" rounded-3xl md:mt-6 h-[45rem]  p-2 md:p-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Spotlight
        className="left-0 top-20 md:left-32  md:top-0 lg:left-64 lg:-top-60"
        fill="white"
      />
      <div className="flex flex-col justify-center items-center">
        <h1 className="flex flex-col justify-center items-center gap-2 tracking-tighter text-[clamp(4rem,5vw,3rem)] leading-tight md:leading-tight font-medium mb-6 mt-16  md:inline">
          <span>Seamless.</span>{" "}
          <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-black">
            Payment.
          </span>{" "}
          <span>Experience.</span>
        </h1>

        <TextGenerateEffect
          className="text-center font-light text-[2rem]"
          words={words}
        />

        <Button
          asChild
          className="mt-8 inline-flex h-14 animate-shimmer items-center justify-center rounded-full  border border-[#26CCC2]/50 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 md:w-[15rem] w-[12rem]"
        >
          <Link to="/signup">Get Started</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default Home;
