import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormEvent, useState } from 'react';


const Search = () => {
    const [placeholderValue, setPlaceholderValue] = useState("Search Here");
    const [inputValue, setInputValue] = useState("")

    function handleChange(event: FormEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        setInputValue(target.value);
    }

    let userChats = [{
        friend: "Aditya", message: "hello",
        picture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSDw8VFRUVFRcVFxUVFQ8VFRcXFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0NFQ8PFS0dFR0tLS0tLS0tLS0tKy0tLS0tLS0tLTctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS03LS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAIBABAQEAAQQCAwAAAAAAAAAAAAERQRLB0fAhMQKBof/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgb/xAAZEQEBAQADAAAAAAAAAAAAAAAAEQEhMUH/2gAMAwEAAhEDEQA/AOoKRxDu0FAQi4AmqlAURQBFEDui6AAAAAAAACgLQEWGAFQF6hNECggKAAQAAoKACBT3+lAABBQEFBUFAQ0UQ0lQwFEKCiYAuIaCqmgC1AA0RQUQBRABUANVKUFEUAEoiggKIoFEAWEAUEURMF1ARQgp5EUApEBYAACUFAA0icLQFQBRKAKhQAAFQgi0AEVFAEwFAWggoCCwBBQEKpgJAUEFAEWACKCCKAgoCCgoimCIqKKmi/pCClAQEUCBoAAAAAAABQAoAAAAAAAAAGgAAGogVYqoAoaAERcIgFgAAAigAFAAAIAAQgAAAAAAAAJ0CoKCgiKgKsvw0wq1FVNXWuEMZq6iaoAyBAALeQgAi0AAAAAAACAAaCYNYC1kUAQAFEBQBAAAwAKAAIoIoAAAAAAAEAAKAwrXwC1APIAQBUUBKtRQRQBFARABVAEDEigCFBQQFAAAAABlV6UFoAAAAEABUBQBBBQEKopCgIAAgqCigIAAAAAoCGgqAoAAIoAigIAABQAAAAAAAIoIAAAAAAABgCqiiIKAAAAAIFCgAAAAAKAqIEAAAAAAAAABdDEARQUAggAAAoAAAAFVAUoUEFRAUFwJEaSruAijIIKCFUADUXgIT6BBSIKHCgCAAtL9gCFAFqXsANICh5SAyLPBEFGpx7yfkDW9IhAZVOGqgBCgeAAD/9k="
    }]
    const printChats = function () {
        for (let i = 0; i <= userChats.length; i++) {
            return <div className='chat'>
                <img src={userChats[i].picture}></img>
                <p className='contact-name'>{userChats[i].friend}</p>
                <p>{userChats[i].message}</p>
            </div>
        }
    }

    return (
        <div id='search-component'>
            <div id='synapse-header'>
                <h3>Synapse</h3>
            </div>
            <form>
                <FontAwesomeIcon id='search-icon' icon={faMagnifyingGlass} size='xl' />
                <input className={(inputValue !== "") ? "input-text-left" : ""} id='query' type='text' onChange={handleChange} value={inputValue} onFocus={() => { setPlaceholderValue("") }} onBlur={() => setPlaceholderValue("Search Here")} placeholder={placeholderValue}></input>
            </form>
            {printChats()}
        </div>
    )
}

export default Search
