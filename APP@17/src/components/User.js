import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
const User = () => {
    return (
        <div>
            <br/>
            <div className="card">
                <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="img" />
                <br/>
                <br/>
                <h2>Partha Singha Roy</h2>
                <p className="title">CEO & Founder, iot-app</p>
                <p><a href="https://coold69.netlify.app/">CoolD69</a></p>
                <br/>
                <div className='display-flex user-icon'>
                   <a href='https://github.com/PSR0001'> <FaGithub /></a>
                    <FaTwitter />
                    <a href="https://www.linkedin.com/in/partha-singha-roy-33b983201/" ><FaLinkedinIn /></a>
                   <a href="https://www.facebook.com/arjun.singharoy.752"> <FaFacebookF /></a>
                
                </div>
                <br />
                <p><button className='button1' type='button'>Contact</button></p>
            </div>
        </div>
    )
}

export default User