"use client";
import Button from "@/components/Buttons/Button";
import Header from "@/components/Header";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";
import Gradient from "@/components/Cards/Gradient";
import Group from "@/assets/icons/Group";
import GradCap from "@/assets/icons/GradCap";
import Trophy from "@/assets/icons/Trophy";

const gradientCardData = [
  {
    text: " Start building at Genus lab, we train you in cutting-edge techcode, design, AI, and more and pay you to work on real projects while you’re still in training. Why wait years to start earning? Learn by doing. Earn by building. Launch your tech career now. Learn more",
    heading: "Earn While you learn",
    icon: <GradCap />,
  },
  {
    text: " Tap into local opportunities with a global mission. Our regional teams give you hands-on experience, mentorship, and peer collaboration right where you are. Work on real projects, contribute to community-driven solutions, and build your network—all while advancing your tech career.",
    heading: "join a regional Team",
    icon: <Group />,
  },
  {
    text: " Think you’re smart? Prove it. Take on weekly tech quizzes, climb the leaderboard, and win your share of ₦120 million+ in cash, gadgets, and exclusive opportunities. The more correct answers, the more you earn. It's not just learning—it's winning.",
    heading: "Win ₦120M+ in Prizes",
    icon: <Trophy />,
  },
];

export default function Home() {
  const text = `Unlock Your 
Potential with
<span className="text">Cutting-edge</span> Tech Solutions`;
  return (
    <>
      <Header />
      <section className="hero bg-[url(/images/banner.png)] bg-center md:bg-top-left bg-cover w-full md:aspect-1440/851">
        <div className="wrapper p-[1rem]  md:flex justify-start items-center h-full md:py-[2rem]">
          <div className="intro-container max-w-[800px]  ">
            <div className="intro-text-wrapper flex flex-col gap-[1rem] items-center md:items-start text-center md:text-start  ">
              <h1 className="intro-heading text-clamp md:whitespace-pre font-extrabold leading-15 text-shadow-white text-shadow-sm">
                Unlock Your
                <br />
                Potential with
                <br />
                <span className="text text-blue ">Cutting-edge</span> Tech
                Solutions
              </h1>
              <p className="intro-sub-text text-shadow-white text-shadow-sm">
                Join a vibrant community of learners and professionals. Access
                top-tier courses, explore exciting job opportunities, and
                connect with industry experts.
              </p>
            </div>
            <div className="w-fit flex-col flex justify-center md:justify-start gap-[16px] m-auto md:m-0">
              <div className="intro-image-wrapper">
                <Image
                  src={"/images/intro-image.png"}
                  width={433}
                  height={221}
                  alt="intro image"
                />
              </div>
              <div className="hidden md:flex flex-col md:flex-row items-stretch gap-[10px] md:justify-center">
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
              <div className="flex flex-col md:hidden items-stretch gap-[10px] md:justify-center">
                <button
                  className=" bg-blue text-white rounded-[16px] px-[30px] py-[10px] cursor-pointer"
                  type="button"
                >
                  Join Quiz
                </button>
                <button
                  className="bg-green text-white  rounded-[16px] px-[30px] py-[10px] cursor-pointer"
                  type="button"
                >
                  Watch Live Show
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="divider-wrapper border-b border-b-pink px-[2rem] py-[4rem] max-w-[1049px] m-auto rounded-[20px] relative md:-translate-y-[100px] min-h-[332px] z-[1] bg-white">
        <div className="divider flex-col md:flex-row flex gap-[1rem] md:gap-0 items-center justify-center ">
          {gradientCardData.map((a, b) => {
            if (b === 1) {
              return (
                <Gradient
                  key={a.text}
                  text={a.text}
                  heading={a.heading}
                  active={true}
                  Icon={a.icon}
                />
              );
            }
            return (
              <Gradient
                key={a.text}
                text={a.text}
                heading={a.heading}
                Icon={a.icon}
              />
            );
          })}
        </div>
      </div>
      <section className=" wrapper section-container flex flex-col gap-[3rem]">
        <div className="heading">
          <h2
            className="text-center p-[1rem]"
            style={{ fontSize: "clamp(20px,8vw, 40px)" }}
          >
            <span className="text-blue">GenusLab</span> – your gateway to
            future-ready skills.
          </h2>
        </div>
        <div className="">
          <div className="flex-container">
            <div className="flex justify-center items-center py-[1rem] section-md:py-0 section-md:items-stretch flex-col section-md:flex-row nav-md:justify-between gap-[1rem] section-md:rounded-[2rem] bg-[#F5F9FF]">
              <div className="img-container max-w-[578px] md:min-h-[386px] overflow-hidden rounded-[32px] ">
                <Image
                  src={"/images/Student Img.png"}
                  alt="flex image"
                  width={578}
                  height={386}
                  layout="responsive"
                />
              </div>
              <div className="section-content items-center flex flex-col gap-[1rem] p-[3rem]">
                <h2
                  className="text-center"
                  style={{ fontSize: "clamp(20px,8vw, 40px)" }}
                >
                  <span className="text-blue">Genus Lab</span>
                  <span style={{ color: "#0DF280" }}> Academy</span>
                </h2>
                <p className="max-w-[515px]">
                  🚀 Dive into expert-led bootcamps and real-world learning
                  across:
                  <ul className="list-disc p-[1rem]">
                    <li>Coding</li>
                    <li>AI & Machine</li>
                    <li>Learning Crypto & Blockchain</li>
                    <li>Digital Marketing</li>
                  </ul>
                  ⏰ Next Bootcamp Starts Soon – Spots are limited! 📚 Browse
                  the Curriculum, read Student Reviews, Join Now to get started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
