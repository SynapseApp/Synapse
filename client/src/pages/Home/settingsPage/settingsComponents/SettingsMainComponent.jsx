import React from 'react'
import ProfileSettings from './ProfileSettings'
import Appearance from './Appearance'

const SettingsMainComponent = () => {
  return (
    <div className='settings-div'>
        <h1 className='settings-header'>Settings</h1>
      <ProfileSettings/>
      <Appearance/>
    </div>
  )
}

export default SettingsMainComponent
