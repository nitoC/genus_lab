"use client";
import Review from "@/components/Cards/Review";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrow } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";

const reviews = [
  {
    name: "Sophia Chen",
    review:
      "This platform helped me accelerate my tech career with real-world experience and supportive mentors. The structure of the program combined flexibility with accountability, making it perfect for working professionals. I especially loved how practical every lesson was.",
    avatar: "/images/woman.png",
    achievement: "🏆 Awarded: Best Female Coder of the Month – April",
    occupation: "Fullstack Developer, LA, United States",
  },
  {
    name: "Ethan Lee",
    review:
      "An incredible journey! The collaborative projects gave me the confidence I needed to land my dream job. What stood out was how the learning content stayed relevant to industry needs — no fluff, just applicable skills. I'm so glad I found this when I did.",
    avatar: "/images/man1.png",
    achievement: "🥇 Winner: Hack4Change Global Hackathon – 2024",
    occupation: "Frontend Engineer, LA, United States",
  },
  {
    name: "Jennifer Stiggens",
    review:
      "The best learning experience I've had. The practical approach made all the difference. I used to struggle with understanding how to bridge the gap between theory and application, but this program nailed it.",
    avatar: "/images/woman.png",
    achievement: "🌟 MVP: Product Design Team – Q1 Launch",
    occupation: "Product Manager, Austin, United States",
  },
  {
    name: "Jack Lee",
    review:
      "Every day felt like growth. The hands-on challenges were tough but extremely rewarding. I feel more confident in my ability to solve real-world backend problems now, and the team collaboration tools made remote teamwork seamless.",
    avatar: "/images/womain1.png",
    achievement: "Awarded Developer of the Year",
    occupation: "Backend Developer, Seattle, United States",
  },
  {
    name: "Daniell Chow",
    review:
      "I’ve grown in ways I never imagined. I now lead a team and mentor junior devs. The mentors I met here gave me lasting career advice, and I often go back to rewatch lessons even today. This isn’t just a program — it's a long-term support system.",
    avatar: "/images/womain1.png",
    achievement: "👑 Promoted: Team Lead at CoreTech Fintech",
    occupation: "Fullstack Developer, LA, United States",
  },
  {
    name: "Jackson Dean",
    review:
      "The supportive community and mentors gave me the confidence to apply what I learned immediately. I appreciated the real feedback on my projects, and that made all the difference. It wasn't just theory — it was practical, impactful learning.",
    avatar: "/images/woman.png",
    achievement: "🚀 Founder: Launched DevEdge Agency in NYC",
    occupation: "Freelance Developer, New York, United States",
  },
];

const teamMembers = [
  {
    name: "Sophia Chen",
    role: "Product Manager",
    image: "/images/woman.png",
  },
  {
    name: "Ethan Lee",
    role: "Studio Manager",
    image: "/images/man1.png",
  },
  {
    name: "Jennifer Stiggens",
    role: "Admin Officer",
    image: "/images/woman.png",
  },
  {
    name: "Jack Lee",
    role: "Fullstack Developer",
    image: "/images/man1.png",
  },
  {
    name: "Daniell Chow",
    role: "Community Manager",
    image: "/images/womain1.png", // Check spelling: should it be "woman1.png"?
  },
  {
    name: "Jackson Dean",
    role: "Frontend Developer",
    image: "/images/man1.png",
  },
];

const page = () => {
  return (
    <>
      <Header />
      <div className="wrapper flex flex-col items-center gap-[40px] overflow-hidden">
        <p className="hidden md:flex md:justify-center md:items-center w-full text-mygrey">
          <Link className="text-blue" href="/">
            Home
          </Link>{" "}
          <FaChevronRight /> <span className="text-mygrey">About</span>{" "}
          <FaChevronRight />
        </p>
        <h2 className="text-2xl p-[1rem] font-bold text-center ">
          Genus lab technologies
        </h2>
        <div className="flex p-[1rem] md:bg-[url(/images/bg-cover.png)] bg-top-right bg-cover flex-col md:w-[100%] items-center justify-center md:flex-row-reverse md:p-[3rem] md:py-[5rem] gap-[2rem] md:gap-[3rem]">
          <div className="w-full max-w-[452px] aspect-[343/195] rounded-[32px] overflow-hidden">
            <Image
              src={"/images/About.png"}
              width={343}
              height={195}
              layout="responsive"
              alt="about banner"
            />
          </div>
          <div className="flex flex-col gap-[1rem] h-full">
            <h3 className="text-blue md:text-left text-center font-bold text-[1rem] md:text-[33px]">
              GenusLab
            </h3>
            <div>
              <p className="text-center md:text-left md:text-[20px] text-mygrey">
                A community-driven space for tech enthusiasts to:
              </p>
              <ul className="list-disc md:text-[20px] pl-5 flex flex-col md:items-stretch items-center">
                <li className="text-center md:text-left text-mygrey">
                  Learn coding, design, and digital skills
                </li>
                <li className="text-center md:text-left text-mygrey">
                  Access tutorials, mentorship, and hands-on projects
                </li>
                <li className="text-center md:text-left text-mygrey">
                  Build real portfolios and career pathways
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="md:text-[24px] text-[16px] text-mygrey text-center leading-relaxed p-[2rem] md:p-[3rem]">
          Genus Lab is where ideas evolve into digital experiences. We
          specialize in crafting cutting-edge apps and websites, intuitive
          native applications, and visually compelling product branding and
          design. But we’re not just builders — we’re educators and enablers.
          Our Live Studio invites creators to present, learn, and grow through
          live reviews, quizzes, and interactive sessions. Our Learning Platform
          equips enthusiasts with in-demand tech skills, while our Job Board
          opens doors to new career paths. At Genus Lab, we’re shaping the
          future — one product, one skill, and one opportunity at a time.
        </p>
        <section className="team w-full">
          <h3 className="text-center md:text-left font-bold text-[1rem] md:text-[33px]">
            Our Team
          </h3>
          <div className="team-members-container w-full md:p-[3rem] overflow-hidden">
            <Marquee
              pauseOnHover // stop when the user hovers
              gradient={false} // disable default fade edges
              speed={40} // px/sec ← adjust to taste
              className="py-8 flex gap-[2rem]" // optional spacing
            >
              <div className="team-members flex gap-[12px] md:gap-[32px]">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="member flex flex-col items-center"
                  >
                    <div className="m-image-container w-[191px] h-[191px] rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        layout="responsive"
                        width={191}
                        height={191}
                        alt={member.name}
                      />
                    </div>
                    <div className="member-info flex flex-col items-center mt-2">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </section>
        <section className="self-start w-full overflow-hidden">
          <h3 className="text-blue text-center font-bold text-[1rem] md:text-[33px] p-[2rem]">
            Our Customer success story
          </h3>
          <div className="reviews-contain overflow-hidden w-full">
            <Marquee
              pauseOnHover // stop when the user hovers
              gradient={false} // disable default fade edges
              speed={20} // px/sec ← adjust to taste
              className="py-8 flex gap-[2rem]" // optional spacing
            >
              <div className="reviews flex gap-[2rem]">
                {reviews.map((review, index) => {
                  return (
                    <Review
                      key={review.achievement + index}
                      name={review.name}
                      avatar={review.avatar}
                      text={review.review}
                      occupation={review.occupation}
                      achievement={review.achievement}
                    />
                  );
                })}
              </div>
            </Marquee>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default page;
