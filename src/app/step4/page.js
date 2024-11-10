"use client";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { UseEmailContext } from "../context/emailContext";
import Image from "next/image";
import { TbArrowUpRight } from "react-icons/tb";
import { TbArrowUpLeft } from "react-icons/tb";
import shoe from "../assests/shoe.png";
export default function Step4() {
  const router = useRouter();
  const { email } = UseEmailContext();

  const completeSurvey = async () => {
    const { data: progressData } = await supabase
      .from("survey_progress")
      .select("*")
      .eq("email", email)
      .single();

    if (progressData) {
      await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: progressData.email,
          first_question: progressData.data.step1,
          second_question: progressData.data.step2,
        }),
      });

      await supabase.from("survey_progress").delete().eq("email", email);
    } else {
    }
  };

  useEffect(() => {
    const completeSurvey = async () => {
      const { data: progressData } = await supabase
        .from("survey_progress")
        .select("*")
        .eq("email", email)
        .single();

      if (progressData) {
        await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: progressData.email,
            first_question: progressData.data.step1,
            second_question: progressData.data.step2,
          }),
        });

        await supabase.from("survey_progress").delete().eq("email", email);
      } else {
      }
    };

    completeSurvey();
  }, [email]);

  return (
    <div className="flex flex-col   gap-6 md:flex-row items-center justify-center min-h-screen bg-custom-gradient w-full text-white p-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={shoe} // Add the path to your shoe image here
            alt="Shoe"
            width={200}
            height={200}
            className="w-64 h-auto object-contain"
          />
        </div>
      </div>

      <div className="flex   items-end justify-end flex-col w-full max-w-md mt-8">
        <div>
          <h2 className="text-6xl font-bold mt-8 ">Thank you</h2>
          <p className="text-md mt-2 text-end">for your feedback!</p>
        </div>
        <div className=" flex flex-row w-full gap-4 justify-end items-end  mt-5 ">
          <button
            onClick={() => router.back()}
            className="bg-[#EDB6D2] flex flex-row items-center text-white px-4 py-2 rounded-3xl font-bold"
          >
            <span className="mr-2">
              <TbArrowUpLeft size={20} />
            </span>{" "}
            Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-white flex flex-row items-center text-black px-4 py-2 rounded-3xl font-bold"
          >
            Back to Home{" "}
            <span className="ml-2">
              <TbArrowUpRight size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
