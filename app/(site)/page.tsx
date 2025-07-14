"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { motion } from "framer-motion";

export default function HomePage() {
  const [githubStars, setGithubStars] = useState(0);
  const [displayStars, setDisplayStars] = useState(0);

  const fetchGithubStars = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/nativeui-org/ui"
      );
      const data = await response.json();
      if (data.stargazers_count) {
        setGithubStars(data.stargazers_count);
      } else {
        setGithubStars(0);
      }
    } catch (error) {
      console.error("Failed to fetch GitHub stars", error);
      setGithubStars(0);
    }
  };

  useEffect(() => {
    fetchGithubStars();
  }, []);

  useEffect(() => {
    if (displayStars < githubStars) {
      const timeout = setTimeout(() => {
        setDisplayStars((prev) => {
          const increment = Math.ceil((githubStars - prev) / 10);
          return Math.min(prev + increment, githubStars);
        });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [displayStars, githubStars]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with subtle background */}
      <section className="relative w-full py-24 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <BackgroundBeams className="opacity-70" />
        </motion.div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <a
                href="https://github.com/nativeui-org/ui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <div className="relative group">
                  <MovingBorderButton
                    borderRadius="1.75rem"
                    containerClassName="w-auto"
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400 transition-colors group-hover:animate-pulse mr-2 ml-4"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span className="font-semibold tracking-wide mr-4">
                        {displayStars.toLocaleString()} STARS ON GITHUB
                      </span>
                    </div>
                  </MovingBorderButton>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                </div>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="text-primary">Beautiful React Native</span>{" "}
                components for your next app
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                NativeUI provides a comprehensive suite of customizable,
                accessible, and platform-adaptive components to help you build
                better mobile applications faster.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mt-10 justify-center"
            >
              <Button size="lg" asChild>
                <a href="/docs">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/components">Browse Components</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="relative w-full py-20 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Open Source Community</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                NativeUI is an open-source project inspired by shadcn/ui, bringing its design principles to React Native. 
                We leverage shadcn&apos;s registry while adapting components for native mobile development.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                  <h3 className="text-xl font-bold">Philosophy</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Like shadcn/ui, we&apos;re not a component library you install from npm. Instead, we provide a collection of reusable components that you can copy and customize for your React Native applications.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                  <h3 className="text-xl font-bold">Contribute</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Join our community of developers building beautiful React Native interfaces. Your contributions help make mobile development better for everyone.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="https://github.com/nativeui-org/ui" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.278 9.52 21.017C9.52 20.783 9.512 20.067 9.508 19.192C6.726 19.826 6.139 17.949 6.139 17.949C5.685 16.811 5.028 16.509 5.028 16.509C4.128 15.88 5.095 15.893 5.095 15.893C6.092 15.962 6.626 16.926 6.626 16.926C7.521 18.437 8.97 18.005 9.54 17.752C9.631 17.091 9.889 16.659 10.175 16.419C7.955 16.177 5.62 15.312 5.62 11.449C5.62 10.301 6.01 9.363 6.646 8.631C6.545 8.381 6.2 7.429 6.747 6.075C6.747 6.075 7.587 5.813 9.497 7.085C10.293 6.869 11.152 6.76 12.002 6.757C12.852 6.76 13.71 6.869 14.507 7.085C16.417 5.813 17.255 6.075 17.255 6.075C17.803 7.429 17.458 8.381 17.357 8.631C17.994 9.363 18.38 10.301 18.38 11.449C18.38 15.322 16.042 16.174 13.815 16.411C14.172 16.705 14.492 17.287 14.492 18.175C14.492 19.453 14.478 20.702 14.478 21.017C14.478 21.281 14.654 21.587 15.162 21.486C19.133 20.161 22 16.415 22 12C22 6.477 17.523 2 12 2Z" fill="currentColor"/>
                    </svg>
                    Contribute on GitHub
                  </a>
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Inspired by shadcn/ui
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
