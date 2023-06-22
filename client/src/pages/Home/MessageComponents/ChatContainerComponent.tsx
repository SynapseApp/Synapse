import { faFaceLaugh, faImage, faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ChatContainerComponent = () => {
    let conversation = [
        {
            msgSender: "You",
            msgText: "Adi bumbum",
            date: new Date(),
        },
        {
            msgSender: "Adi",
            msgText: "my bumbum"
        },
        {
            msgSender: "Adi",
            msgText: "I had biryani benchod",
        }, {
            msgSender: "You",
            msgText: "noice",
        }, {
            msgSender: "Adi",
            msgText: "hello",
        }]

    const printMessages = function (conversation: any[]): JSX.Element[] {
        const renderedMessages: JSX.Element[] = [];

        for (let i = 0; i < conversation.length; i++) {
            const messageClassName = conversation[i].msgSender === 'You' ? 'my-msg' : 'receiving-msg';
            const renderedMessage = (
                <div className={messageClassName} key={i}>
                    <div className='msg-div'>
                        <p>{conversation[i].msgText}</p>
                    </div>
                </div>
            );

            renderedMessages.push(renderedMessage);
        }
        return renderedMessages;
    };

    return (
        <div className='chat-container'>
            <div className='message-container'>
                <form className='message-form'>
                    <input className='message-input' placeholder='Type a message...' />
                    <FontAwesomeIcon className='msg-icon' icon={faImage} />
                    <FontAwesomeIcon className='msg-icon' icon={faFaceLaugh} />
                    <FontAwesomeIcon className='msg-icon' icon={faRightLong} />
                </form>
            </div>
            <div className='chat-content'>
                {printMessages(conversation)}
            </div>
        </div>
    )
}

export default ChatContainerComponent
