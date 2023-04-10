import React from 'react'
import img from '../assets/Icon.png'

function Dashboard() {

  return (
    <div className='dashboard'>
      <div className="img">
        <img src={img} alt="Session icon" />
      </div>

      <div className="logout">
        <form onSubmit={() => {localStorage.removeItem("authToken")}}>

            <button>
              Log out
            </button>

        </form>
      </div>
    </div>
  )
}

export default Dashboard