import React from 'react'
import { Link } from 'react-router-dom'
function Landing() {
    return (
        <>
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1 className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[#f56551]'> Discover Your Next Adventure with AI :</span> Personalized Itineraries at Your Fingertips
            </h1>
            <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget</p>
            <Link to={'create-trip'}>
                <button class="font-bold rounded-lg text-md  w-48 h-16 bg-[#374151] text-[#ffffff] justify-center">Get Started , It's Free</button>
            </Link>

        </div>
        </>
    )
}

export default Landing
