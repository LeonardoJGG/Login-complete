import React from 'react'
import img from '../assets/Icon.png'

function Side() {
  return (
    <>
        <div className="side">
            <h1>Welcome</h1>
            <img src={img} alt="Session icon" />
            <p>Lorem Ipsum passages, and more recently with desktop publishing 
            software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>

        <div className="circle">
            <div className="item"> </div>
            <div className="item1"></div>
            <div className="item2"></div>
        </div>
    </>
  )
}

export default Side;