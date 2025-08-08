**🧳 AI Trip Planner**

An AI-powered travel planning app that generates personalized itineraries based on your preferences such as destination, trip duration, budget, and travel companions.

**✨ What It Does**

1- Google OAuth Login — Users can sign in with Google before generating trips.

2- Trip Preferences Form — Select your destination, number of days, budget, and travel companions.

3- AI-Powered Itinerary Generation — Uses Gemini API to generate a custom trip plan.

4- Conditional Auth Check — If a non-logged-in user tries to generate a trip, a Google sign-in dialog will appear.

5- Google Places Autocomplete — Helps users pick their travel destination easily.

**🛠 Tech Stack**
Frontend:

React 18
Tailwind CSS
@react-oauth/google (Google OAuth Login)
react-google-places-autocomplete
react-toastify

Backend / API:

Google Places API (for location autocomplete)
Gemini API (for itinerary generation)

**🚀 Getting Started**

1️⃣ Clone the repo
bash
Copy
Edit
git clone https://github.com/yourusername/ai-trip-planner.git
cd ai-trip-planner
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Create a .env file
env
Copy
Edit
VITE_GOOGLE_API_KEY=your_google_places_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
4️⃣ Run the development server
bash
Copy
Edit
npm run dev

**📌 Project Structure**

bash

Copy

Edit

src/

   ├── assets/              # Images, logos
 
   ├── components/          # Reusable UI components (e.g., Header)
 
   ├── constants/           # Static options for form
 
   ├── service/             # API functions (Gemini, etc.)
 
   ├── pages/               # Main screens (CreateTrip, etc.)
 
   └── App.jsx              # App entry point

 
**🔮 Pending Work**

1- Login Flow

2- Store and retrieve logged-in user details properly.

3- Add logout functionality.

4- Show user avatar/name in header when logged in.

5- Display Page

-Replace raw JSON trip plan with a styled itinerary view (cards, timelines, or daily breakdown).

-Add images, hotel recommendations, and map previews.

-Improved Error Handling

-Better error messages for API failures.

-Handle expired Google tokens.

**📄 License**
This project is licensed under the MIT License — feel free to use and modify it.
