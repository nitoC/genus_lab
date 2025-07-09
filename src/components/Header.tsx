import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@/assets/icons/Menu";
import Button from "./Buttons/Button";
import { IoIosArrowDown } from "react-icons/io";
const Header = () => {
  return (
    <header className="flex gap-[40px] justify-between w-full px-10 py-10 min-w-[345px] md: mx-auto items-center">
      <div className="logo">
        <Link href={"/"}>
          <Image
            className="md:hidden"
            src={"/images/logo_mobile.png"}
            width={146}
            height={49}
            alt="logo"
          />
          <Image
            className="hidden md:inline-block"
            src={"/images/logo_desktop.png"}
            width={216}
            height={65}
            alt="logo"
          />
        </Link>
      </div>
      <nav className="flex grow justify-between items-center">
        <ul className="nav-links nav-md:flex gap-[20px] hidden">
          <li>
            <Link
              className="flex items-center gap-[5px] hover:text-blue transition-colors"
              href={"#"}
            >
              Home <IoIosArrowDown />
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-[5px] hover:text-blue transition-colors"
              href={"#"}
            >
              Academy
              <IoIosArrowDown />
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-[5px] hover:text-blue transition-colors"
              href={"#"}
            >
              Job Board
              <IoIosArrowDown />
            </Link>
          </li>
          <li>
            <Link href={"#"} className="hover:text-blue transition-colors">
              Quiz Arena
            </Link>
          </li>
          <li>
            <Link href={"#"} className="hover:text-blue transition-colors">
              About
            </Link>
          </li>
        </ul>
        <div className="hidden nav-md:flex gap-[10px]">
          <Button
            handler={() => console.log("hello world login")}
            text="Login"
            cat="secondary"
          />
          <Button
            handler={() => console.log("hello world")}
            text="Signup"
            cat="primary"
          />
        </div>
      </nav>
      <button className="btn menu-btn nav-md:hidden">
        <MenuIcon />
      </button>
    </header>
  );
};

export default Header;
