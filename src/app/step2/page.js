"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { UseEmailContext } from "../context/emailContext";
import Image from "next/image";
import shoes1 from "../assests/s1.png";
import shoes2 from "../assests/s2.png";
import { TbArrowUpRight } from "react-icons/tb";
import { updateSurveyStep } from "../actions/actions";
import { revalidatePath } from "next/cache";

export default function Step2() {
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const { email } = UseEmailContext();
  const [error, setError] = useState("");

  const handleNext = async () => {
    const stepData = { step: 2, data: { step1: selectedOption } };
    const result = await updateSurveyStep(email, stepData);

    if (result.error) {
      setError("Failed to save your selection. Please try again.");
    } else {
      router.push("/step3");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-custom-gradient p-4 w-full">
      <div className="text-center text-white mb-8">
        <h2 className="text-sm font-semibold tracking-widest uppercase">
          Question 1
        </h2>
        <h1 className="text-xl font-bold mt-2">
          What is your preferred choice?
        </h1>
      </div>

      <div className="flex flex-col items-center justify-between gap-4  md:flex-row  mb-8 w-full max-w-md">
        <div
          onClick={() => setSelectedOption("Nike Orange")}
          className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-colors duration-200 ${
            selectedOption === "Nike Orange"
              ? "bg-[#6D6D6D] border-2 border-lime-400"
              : "bg-[#6D6D6D]"
          }`}
        >
          <Image
            src={shoes1}
            alt="Nike Orange"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <h3 className="mt-4 text-lg font-medium text-white">Nike Orange</h3>
          {selectedOption === "Nike Orange" && (
            <span className="text-lime-400 mt-2">✔</span>
          )}
        </div>

        <div
          onClick={() => setSelectedOption("Nike Black")}
          className={`flex flex-col items-center p-4 rounded-xl cursor-pointer transition-colors duration-200 ${
            selectedOption === "Nike Black"
              ? "bg-[#6D6D6D] border-2 border-lime-400"
              : "bg-[#6D6D6D]"
          }`}
        >
          <Image
            src={shoes2}
            alt="Nike Black"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <h3 className="mt-4 text-lg font-medium text-white">Nike Black</h3>
          {selectedOption === "Nike Black" && (
            <span className="text-lime-400 mt-2">✔</span>
          )}
        </div>
      </div>

      {!selectedOption && (
        <p className="text-red-500 mb-4 text-center">Please select one</p>
      )}

      <div className="flex gap-4 flex-row w-full items-center max-w-md justify-between">
        <button
          onClick={() => router.push("/")}
          className="flex items-center justify-center w-24 h-10 bg-pink-300 text-black font-semibold rounded-3xl hover:bg-pink-400"
        >
          Back
          <span className="ml-2">
            <TbArrowUpRight size={25} />
          </span>
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`flex items-center justify-center w-24 h-10 font-semibold rounded-3xl ${
            selectedOption
              ? "bg-lime-400 text-black hover:bg-lime-500"
              : "bg-lime-400 text-black cursor-not-allowed"
          }`}
        >
          Next
          <span className="ml-2">
            <TbArrowUpRight size={25} />
          </span>
        </button>
      </div>
    </div>
  );
}
