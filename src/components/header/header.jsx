import React from 'react'
function Header() {
    return (
        <>
        <div className='shadow-sm p-3 flex justify-between items-center px-5'>
            <img src='.\src\assets\Logo.svg'/>
            <div>
                <button className="font-bold rounded-lg text-md  w-40 h-12 bg-[#374151] text-[#ffffff] justify-center">Sign In</button>
            </div>
        </div>
        </>
    )
}

export default Header
