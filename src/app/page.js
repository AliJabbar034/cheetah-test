"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UseEmailContext } from "./context/emailContext";
import Image from "next/image";
import shoe from "./assests/shoe.png";
import { TbArrowUpRight } from "react-icons/tb";
import { submitSurvey } from "./actions/actions";
import { useEffect } from "react";
export default function Step1() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { emailHandler } = UseEmailContext();

  const [error, setError] = useState("");

  const handleStartSurvey = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    const response = await fetch(`/api/survey/?email=${email}`, {
      method: "GET",
    });

    if (response.ok) {
      router.push(`/step4`);
      return;
    }
    const result = await submitSurvey(email);

    if (result.error) {
      setError(result.error);
    } else {
      setError("");
      emailHandler(email);

      router.push(`/step${result.step}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-custom-gradient w-full p-4">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl w-full p-4 md:p-8 ">
        <div className="relative w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <Image
            src={shoe}
            alt="Shoe Image"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center md:text-left">
            Questionnaire
          </h1>
          <div className="bg-pink-200 p-6 rounded-3xl mb-6 text-center md:text-left ">
            <h2 className="text-lg font-semibold mb-2  text-gray-800">
              Welcome!
            </h2>
            <p className="text-sm text-gray-800">
              Were excited to hear your thoughts, ideas, and insights. Dont
              worry about right or wrong answers—just speak from the heart. Your
              genuine feedback is invaluable to us!
            </p>
          </div>
          <div className="space-y-4">
            <label className="block">
              <span className="text-white font-medium">Email</span>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 rounded-3xl text-black block w-full px-4 py-2  border-none focus:ring-2 focus:ring-green-400"
              />
            </label>

            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleStartSurvey}
              className="w-full px-6 py-3 mt-4 font-semibold text-black cursor-pointer bg-lime-400 rounded-3xl flex items-center justify-between"
            >
              Start Survey
              <span className="ml-2">
                <TbArrowUpRight size={30} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
