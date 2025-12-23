"use client";
import { useState, useEffect } from "react";
import { Menu, X, Box, Lock, Star, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Protocol", href: "#features" },
    { name: "Keys", href: "#" },
    { name: "Relays", href: "#" },
    { name: "Manifesto", href: "#hero" },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all
       duration-300 border-b backdrop-blur ${
         isScrolled || mobileMenuOpen
           ? " glass border-white/10 py-5"
           : "bg-transparent border-transparent py-6 backdrop-blur"
       }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between ">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="w-8 h-8 bg-void border border-white/20 flex items-center justify-center group-hover:border-[#00ff41] transition-colors">
                <Box className="w-4 h-4 text-white group-hover:text-[#00ff41]" />
              </div>
              <div className="absolute inset-0 bg-neon-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-mono font-bold text-xl tracking-widest group-hover:text-glow-green transition-all text-white">

              Vanix
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-[#00ff41] hover:shadow-[0_3px_0_currentColor]  transition-all  "
            >
              <span className="mr-1 opacity-50 text-[#b026ff]">{`//`}</span>{" "}
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={"https://github.com/BABAR-TAHSEEN55/Vanix"}
            target="_blank"
          >
            <Button variant="custom" size="sm">
              <Star size={14} />
              <Github size={14} />
              Star on Github
            </Button>
          </Link>
          <Button variant="custom" size="sm">
            <Lock size={14} />
            <Link href={"/composer"}>Open Vault</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-neon-green transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden absolute  top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 h-screen`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-mono font-bold text-white hover:text-neon-green border-l-2 border-transparent hover:border-neon-green pl-4 transition-all "
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-4" />
          <Link href={"/composer"}>
            <Button variant="custom" className="w-full">
              Open Vault
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
