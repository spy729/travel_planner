import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  SelectBudgetOptions,
  SelectTravelersList,
} from "../constants/options.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateTripPlan } from "../service/geminiApi.jsx";

function CreateTrip() {
  const [openDialog , setopenDialog] = useState(false);
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [tripPlan, setTripPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 7) {
      toast.warning("Maximum allowed trip duration is 7 days");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if(!user){
        setopenDialog(true);
        return ;
    }
    const { noOfDays, location, budget, traveler } = formData;

    if (!noOfDays || !location || !budget || !traveler) {
      toast.error("Please enter all details");
      return;
    }

    try {
      toast.info("Generating your travel plan...");
      setLoading(true);
      const result = await generateTripPlan(formData);
      console.log("🧳 Raw Trip Plan Response:", result);
      setTripPlan(result);
      toast.success("Trip plan generated!");
    } catch (error) {
      toast.error("Failed to generate trip. Try again.");
      console.error("❌ Gemini API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Form Updated:", formData);
  }, [formData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-10 md:px-32 lg:px-56 xl:px-72 bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="w-full max-w-4xl text-center mt-3">
        <h2 className="font-bold text-3xl">Tell us your travel Preferences</h2>
        <p className="mt-3 text-xl text-gray-500">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary.
        </p>

        <div className="mt-12 flex flex-col gap-10 items-center">
          {/* Destination Input */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium text-left">
              What is your destination of choice?
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
              selectProps={{
                value: place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v?.label);
                },
              }}
            />
          </div>

          {/* Days input */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium text-left">
              How many days are you planning your trip?
            </h2>
            <input
              placeholder="Ex. 3"
              type="number"
              min={1}
              onChange={(e) =>
                handleInputChange("noOfDays", Number(e.target.value))
              }
              className="w-full px-3 py-2.5 text-lg font-bold rounded-lg border bg-white text-gray-800 focus:outline-gray-400 border-gray-300"
            />
          </div>

          {/* Budget options */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium text-left">
              What is your budget?
              <br />
              <span className="text-sm text-gray-500 font-normal">
                Budget is allocated for activities and dining only.
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border rounded-lg hover:shadow-lg text-left cursor-pointer ${
                    formData?.budget === item.title
                      ? "shadow-lg border-black"
                      : ""
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Travelers options */}
          <div className="w-full">
            <h2 className="text-xl my-3 font-medium text-left">
              Who do you plan to travel with?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
              {SelectTravelersList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 border rounded-lg hover:shadow-lg text-left cursor-pointer ${
                    formData?.traveler === item.people
                      ? "shadow-lg border-black"
                      : ""
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h3 className="font-bold text-lg mt-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-10 mb-10">
          <button
            onClick={onGenerateTrip}
            disabled={loading}
            className="font-bold rounded-lg text-lg w-48 h-16 bg-[#374151] text-white disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Trip"}
          </button>
        </div>

        {/* Trip Plan Display */}
        {tripPlan && (
          <div className="w-full mt-10 text-left bg-white shadow-lg p-6 rounded-lg overflow-auto max-h-[600px]">
            <h3 className="text-2xl font-semibold mb-4">Generated Trip Plan</h3>
            <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
              {JSON.stringify(tripPlan, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateTrip;
