"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Herosection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const scrollThreshold = 100;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (imageElement) {
        if (scrollPosition > scrollThreshold) {
          imageElement.classList.add("scrolled");
        } else {
          imageElement.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-2 justify-center items-center md:mt-32 mt-18">
      <div className="gradient-title animate-gradient text-3xl md:text-4xl lg:text-6xl xl:text-8xl text-center">
        Your AI Career Coach for <br />
        Professional Success
      </div>
      <div className="text-muted-foreground md:text-xl max-w-[600px] mx-2 text-center mt-3">
        Advance your career with personalized guidance, interview prep, and
        AI-powered tools for job success.
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Link href={"/dashboard"}>
          <Button size={"lg"} className="flex gap-2">
            <span>Get Started</span>
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>
      <div className="hero-image-wrapper mt-5 md:mt-0">
        <div ref={imageRef} className="hero-image">
          <Image
            src="/banner.jpeg"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Herosection;
