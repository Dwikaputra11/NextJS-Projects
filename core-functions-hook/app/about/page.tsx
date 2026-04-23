"use client"
import React from 'react';
import {usePathname} from "next/navigation";
import Navigation from "@/components/navigation";

const About = () => {
  const pathname = usePathname()
  return (
    <div>
      About Page
    </div>
  );
};

export default About;