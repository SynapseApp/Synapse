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

    const getInput = document.getElementById("query")

    if (getInput.value === "") {
        getInput.classList.add = "center";
    }

    let userChats = [{ friend: "Aditya", message: "hello" }]
    const printChats = function () {
        for (let i = 0; i <= userChats.length; i++) {
            <div className='chat'>
                <h1>{userChats[i].friend}</h1>
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
                <input id='query' type='text' onChange={handleChange} value={inputValue} onFocus={() => { setPlaceholderValue("") }} onBlur={() => setPlaceholderValue("Search Here")} placeholder={placeholderValue}></input>
            </form>

        </div>
    )
}

export default Search
