import Image from "next/image";

const page = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Genus lab technologies</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-[452px] aspect-[343/195] rounded-[32px] overflow-hidden">
          <Image
            src={"/images/About.png"}
            width={343}
            height={195}
            layout="responsive"
            alt="about banner"
          />
        </div>
        <div>
          <h3 className="text-blue text-center font-bold">Genuslab</h3>
          <div>
            <p className="text-center md:text-left text-mygrey">
              A community-driven space for tech enthusiasts to:
            </p>
            <ul className="list-disc pl-5 flex flex-col md:items-stretch items-center">
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
    </div>
  );
};

export default page;
