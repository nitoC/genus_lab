"use client";
import Button from "@/components/Buttons/Button";
import Header from "@/components/Header";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";
import Gradient from "@/components/Cards/Gradient";

const gradientCardData = [
  {
    text: " Start building at Genus lab, we train you in cutting-edge techcode, design, AI, and more and pay you to work on real projects while you’re still in training. Why wait years to start earning? Learn by doing. Earn by building. Launch your tech career now. Learn more",
    heading: "Earn While you learn",
  },
  {
    text: " Tap into local opportunities with a global mission. Our regional teams give you hands-on experience, mentorship, and peer collaboration right where you are. Work on real projects, contribute to community-driven solutions, and build your network—all while advancing your tech career.",
    heading: "join a regional Team",
  },
  {
    text: " Think you’re smart? Prove it. Take on weekly tech quizzes, climb the leaderboard, and win your share of ₦120 million+ in cash, gadgets, and exclusive opportunities. The more correct answers, the more you earn. It's not just learning—it's winning.",
    heading: "Win ₦120M+ in Prizes",
  },
];

export default function Home() {
  const text = `Unlock Your 
Potential with
<span className="text">Cutting-edge</span> Tech Solutions`;
  return (
    <>
      <Header />
      <section className="hero bg-[url(/images/banner.png)] bg-top-left bg-cover w-full aspect-1440/851">
        <div className="wrapper  flex justify-start items-center h-full">
          <div className="intro-container max-w-[800px]  ">
            <div className="intro-text-wrapper flex flex-col gap-[1rem] ">
              <h1 className="intro-heading text-5xl whitespace-pre font-extrabold leading-15 text-shadow-white text-shadow-sm">
                Unlock Your{"\n"}
                Potential with{"\n"}
                <span className="text text-blue ">Cutting-edge</span> Tech
                Solutions
              </h1>
              <p className="intro-sub-text text-shadow-white text-shadow-sm">
                Join a vibrant community of learners and professionals. Access
                top-tier courses, explore exciting job opportunities, and
                connect with industry experts.
              </p>
            </div>
            <div className="w-fit flex-col flex gap-[16px]">
              <div className="intro-image-wrapper">
                <Image
                  src={"/images/intro-image.png"}
                  width={433}
                  height={221}
                  alt="intro image"
                />
              </div>
              <div className="hidden nav-md:flex gap-[10px] justify-center">
                <Button
                  handler={() => console.log("hello world login")}
                  text="Join Quiz"
                  cat="linear"
                  Icon={<MdOutlineKeyboardDoubleArrowRight color="white" />}
                />
                <Button
                  handler={() => console.log("hello world")}
                  text="Watch Live Show"
                  cat="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="divider flex justify-center px-[2rem] py-[4rem] max-w-[1049px] m-auto rounded-[20px] relative -translate-y-1/4 min-h-[332px] z-[1] bg-white">
        {gradientCardData.map((a, b) => {
          if (b === 1) {
            return <Gradient text={a.text} heading={a.heading} active={true} />;
          }
          return <Gradient text={a.text} heading={a.heading} />;
        })}
      </div>
    </>
  );
}
