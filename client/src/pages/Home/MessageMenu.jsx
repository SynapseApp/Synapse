import React from 'react'
import Search from './MessageComponents/Search'
import ChatMenu from './MessageComponents/ChatMenu'

const MessageMenu = () => {
    return (
        <div id='message-menu'>
            <Search />
            <ChatMenu />
        </div>
    )
}

export default MessageMenu
