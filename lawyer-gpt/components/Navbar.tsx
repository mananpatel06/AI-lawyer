import Link from "next/link";
import React from "react";
import { GithubIcon } from "./Icons";

const Navbar = () => {

  return (
    <nav className="p-2 md:w-[90%] w-[95%] flex items-center justify-between font-mono md:text-2xl text-xl border-b border-b-white mb-1">
      <p>🤵 AI Lawyer</p>
      <Links />
    </nav>
  );
};

export const Links = () => {
    return (
        <div className="flex gap-2 md:text-lg text-sm font-mono">
        <Link
          href="https://github.com/mananpatel06/AI-lawyer"
          target="_blank"
          className="links"
        >
          <GithubIcon /> Github
        </Link>
        <Link href="https://mananpatel.netlify.app/" target="_blank" className="links">
          👨‍💻 Developer
        </Link>
      </div>
    )
}


export default Navbar;
