import React from 'react'
import { MdPersonSearch } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { VscBracketError } from "react-icons/vsc";
const Fotter = () => {
  return (
   <div className="w-full text-white text-sm md:text-base font-mono font-medium flex items-center gap-2 justify-center border-t border-white/25 mt-2">
 <a className='flex items-center gap-1' href="https://sauravdutta.netlify.app/"><span>DEV</span><span><VscBracketError /></span><span className="font-bold">Saurav Dutta</span>
  <span>|</span>
  <span className="text-yellow-400">24BCS10029</span>
  <span className="text-red-500 animate-pulse text-xl"><CiHeart/></span> </a>

  <span className='text-3xl'><a href="https://sauravdutta.netlify.app/"><MdPersonSearch/></a></span>
</div>
  )
}

export default Fotter;
