import { docSelect } from "../scripts/PenPals.js"

const dataStorage = 
{
    users:[],
    letters:[],
    author: {},
    recipient: {},
    category : ""
}

// fetch handlers
export const fetchUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(res => res.json())
    .then((data) => dataStorage.users = data)
}

export const fetchletters = () => {
    return fetch("http://localhost:8088/letters")
    .then(res => res.json())
    .then((data)=> dataStorage.letters = data)
}




// although you could technically create a function that can plug and play for whaterver data property in dataStorage you want...argumably a cleaner code set up as well as less room for error since if 1 works they should all work, but...after trying it out, I believe the method below is actually simpler, justt because of the autofill feature is visual studio. this way you don't have to remember what you actually named the property in datastorage...

// it does suck that it feels like i'm repeating myself though...
// get handlers
export const getUsers = () => {
    return dataStorage.users.map((user)=>({...user}))
}
export const getLetters = () => {
    return dataStorage.letters.map((letter)=>({...letter}))
}
export const getAuthor = () => {
    return dataStorage.author
}



//set handlers
export const setAuthor = (authorObj) => {
    return dataStorage.author = authorObj
}

export const setRecipient = (recipientObj) => {
    return dataStorage.recipient = recipientObj
}

//temp-state...in retrospect I should've just created an empty object for the temporary state that holds all these variables instead of putting it all in data-storage... it just looks goofy.
// consider this seperation style "api temp dataStorage" and "inputs temp dataStorage"
export const generateLetterObj = () => {
    const letterObject = 
    {
        authorId : dataStorage.author.Id,
        recipientId : dataStorage.recipient.id,
        message : docSelect("textarea[name='textarea]").value,
        category : dataStorage.category.id,

    }

}