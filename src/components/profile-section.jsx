import { useState } from "react";
import { UserRound } from 'lucide-react';



export default function ProfileSection(){
   const [profilebtn,setProfilebtn] = useState(false)
   

   const handleClick = () => setProfilebtn(!profilebtn)


    return (
        <div className=" cursor-pointer profile-section transition-transform duration-300
        hover:-translate-y-1">
          <button onClick={handleClick}>
            <UserRound className="cursor-pointer w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--background)] mr-1" />
          </button>
          {profilebtn && (
            <div className="login-or-signup">
            <button className="sign-up">Sign Up</button>
            <button className="login">Login</button>
            </div>
          )}
        </div>
    )
}
