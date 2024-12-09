import Link from "next/link";
import React from "react";
import { GithubIcon } from "./Icons";

const Navbar = () => {

  return (
    <nav className="p-2 w-[90%] flex items-center justify-between font-mono text-2xl border-b border-b-white mb-1">
      <p>🤵 AI Lawyer</p>
      <Links />
    </nav>
  );
};

export const Links = () => {
    return (
        <div className="flex gap-2 text-base font-mono">
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
