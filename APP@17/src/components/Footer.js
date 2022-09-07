import React from 'react'
import { Link } from 'react-router-dom'
import {AiFillHome, AiOutlinePlayCircle, AiOutlineSchedule} from 'react-icons/ai'
import {TbBrandTelegram} from 'react-icons/tb'
import {FiSettings} from 'react-icons/fi'


const Footer = () => {
  return (
    <div>
    {/* <nav className=" main-inner display-flex space-between main-inner border-down "> */}
    <nav className="display-flex space-between main-inner border-down font-size background-white">
       <Link to="/">
            <AiFillHome />
       </Link>
       <Link to="/"><AiOutlineSchedule/></Link>
       <Link to="/"><AiOutlinePlayCircle/></Link>
       <Link to="/message">
        <span className='notification' >1</span>
      
        <TbBrandTelegram/>
        </Link>
       <Link to="/setting"><FiSettings/></Link>
      </nav>
    </div>
  )
}

export default Footer