import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
const User = () => {
    return (
        <div>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="img" />
                <h1>Partha Singha Roy</h1>
                <p className="title">CEO & Founder, iot-app</p>
                <p>CoolD69</p>
                <div className='display-flex user-icon'>
                    <FaGithub />
                    <FaTwitter />
                    <FaLinkedinIn />
                    <FaFacebookF />
                </div>
                <br />
                <p><button className='button1' type='button'>Contact</button></p>
            </div>
        </div>
    )
}

export default User