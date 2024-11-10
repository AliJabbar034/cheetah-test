"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { UseEmailContext } from "../context/emailContext";
import { TbArrowUpRight } from "react-icons/tb";
import { TbArrowUpLeft } from "react-icons/tb";
import { updateSurveyStep } from "../actions/actions";
import { revalidatePath } from "next/cache";
export default function SurveyQuestion() {
  const [ratings, setRatings] = useState({
    comfort: null,
    looks: null,
    price: null,
  });
  const router = useRouter();
  const { email } = UseEmailContext();
  const [error, setError] = useState("");

  const handleRatingChange = (aspect, value) => {
    setRatings((prev) => ({ ...prev, [aspect]: value }));
  };

  const isRatingSelected = (rating) => rating !== null;

  const handleSubmit = async () => {
    if (!ratings.comfort || !ratings.looks || !ratings.price) {
      alert("Please select a score for each aspect.");
      return;
    }

    const stepData = { step: 3, data: { step2: ratings } };
    const result = await updateSurveyStep(email, stepData);

    if (result.error) {
      console.log("errrrrrrrrrrrr");

      setError("Error saving your response. Please try again.");
    } else {
      router.push("/step4");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-custom-gradient w-full text-white p-6">
      <h2 className="text-lg font-semibold mb-4">Question 2</h2>
      <h3 className="text-2xl font-bold mb-6">
        How important are these aspects for you?
      </h3>

      {["Comfort", "Looks", "Price"].map((aspect) => (
        <div key={aspect} className="mb-4 w-full max-w-md">
          {/* <label className="block text-lg font-semibold mb-2">{aspect}</label> */}
          <div className="flex justify-between bg-white items-center rounded-full px-4 py-2">
            <label className="block text-lg font-semibold  text-black">
              {aspect}
            </label>
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleRatingChange(aspect.toLowerCase(), score)}
                className={` p-2 rounded-full ${
                  ratings[aspect.toLowerCase()] === score
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              />
            ))}
          </div>
          {!isRatingSelected(ratings[aspect.toLowerCase()]) && (
            <p className="text-red-500 text-sm mt-1">Please select a score</p>
          )}
        </div>
      ))}

      <div className="flex justify-between w-full max-w-md mt-8">
        <button
          className="bg-[#EDB6D2] text-white px-4 py-2  justify-between flex flex-row items-center rounded-3xl  font-bold w-24 h-10"
          onClick={() => router.push("/step2")}
        >
          <span className="">
            <TbArrowUpLeft size={25} />
          </span>{" "}
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-white text-black  rounded-3xl  w-24 h-10  p-2  font-bold flex flex-row items-center justify-center"
        >
          Send{" "}
          <span className="ml-2">
            <TbArrowUpRight size={25} />
          </span>
        </button>
      </div>
    </div>
  );
}
