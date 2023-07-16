import React from 'react'

const ProfileSettings = () => {
    const hardcodedData = {
        profilepicture: "https://yarwoodleather.com/wp-content/uploads/2016/12/Yarwood-Leather-Style-Bright-Orange-01-scaled.jpg",
        displayName: "Ahfinder#1234",
        userMail: "ahfinder@adibumbum.com"
    }
  return (
    <div className='profile-settings'>
        <div className='profile-settings-left'>
            <h3 className='profile-h3'>Profile</h3>
            <img className='profile-settings-img' src={hardcodedData.profilepicture} />
        </div>
        <div className='profile-settings-right'>
            <h3>Display Name</h3>
            <p className='profile-text'>{hardcodedData.displayName}</p>
        </div>
    </div>
  )
}

export default ProfileSettings
