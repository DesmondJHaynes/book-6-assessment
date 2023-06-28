import { docSelect } from "../scripts/PenPals.js"

const dataStorage = 
{
    users:[],
    categories:[],
    letters:[],
    author: {},
    recipient: {},
    message : '',
    categoryId: null
}

// fetch handlers
export const fetchUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(res => res.json())
    .then((data) => dataStorage.users = data)
}

export const fetchCategories = () => {
    return fetch("http://localhost:8088/categories")
    .then(res => res.json())
    .then((data) => dataStorage.categories = data)
}

export const fetchletters = () => {
    return fetch("http://localhost:8088/letters")
    .then(res => res.json())
    .then((data)=> dataStorage.letters = data)
}

// post handlers


export const postLetter = (letterObj) => {
    const fetchOptions = 
    {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(letterObj)
    } 
    return fetch("http://localhost:8088/letters", fetchOptions)
        .then(res => res.json())
        .then(()=>document.dispatchEvent(new CustomEvent("updateLetters")))
    
}


//delete Handlers
export const deleteLetter = (id) => {
    return fetch(`http://localhost:8088/letters/${id}`, {method : "DELETE"})
        .then(() => console.log("delete"))
        .then(()=>document.dispatchEvent(new CustomEvent("updateLetters")))
}


// although you could technically create a function that can plug and play for whaterver data property in dataStorage you want...argumably a cleaner code set up as well as less room for error since if 1 works they should all work, but...after trying it out, I believe the method below is actually simpler, justt because of the autofill feature is visual studio. this way you don't have to remember what you actually named the property in datastorage...

// it does suck that it feels like i'm repeating myself though...
// get handlers
export const getUsers = () => {
    return dataStorage.users.map((user)=>({...user}))
}
export const getCategories = () => {
    return dataStorage.categories.map(category => ({...category}))
}
export const getLetters = () => {
    return dataStorage.letters.map((letter)=>({...letter}))
}
export const getAuthor = () => {
    return dataStorage.author
}




//In hindsight, intially I figured retrieving the entire author object that had been selected would provide for more versatility, but for producing the letters in the api and then displaying them, the author id associated with the letter is the only reference that will be getting used anyway so its kind of pointless to have the entire object vs just the id since i'll never refer back to any of it's other properties for this program...
//set handlers
export const setAuthor = (authorObj) => {
    return dataStorage.author = authorObj
}
export const setRecipient = (recipientObj) => {
    return dataStorage.recipient = recipientObj
}
export const setCategoryId = (categoryId) => {
    return dataStorage.categoryId = categoryId
}
export const setMessage = () => {
    return dataStorage.message = docSelect("textarea[name='textarea']").value
}

//temp-state...in retrospect I should've just created an empty object for the temporary state that holds all these variables instead of putting it all in data-storage... it just looks goofy.
// consider this seperation style "api temp dataStorage" and "inputs temp dataStorage"
export const generateLetterObj = () => {
    const date = new Date().toLocaleDateString()
    
    const letterObject = 
    {
        authorId : dataStorage.author.id,
        recipientId : dataStorage.recipient.id,
        message : dataStorage.message,
        categoryId : dataStorage.categoryId,
        date : date
    }
    return letterObject
}


export const resetDataStorage = () =>{
    dataStorage.author = {}
    dataStorage.recipient = {}
    dataStorage.message = null
    dataStorage.categoryId =null
    docSelect("textarea[name='textarea']").value = ''
}

// event listener to "submit/send" letter
document.addEventListener("click", event => {
    if (event.target.id === "sendLetter") {
        setMessage()

        if (dataStorage.author.id &&
            dataStorage.recipient.id &&
            dataStorage.message
            ) {
            console.log("letter sent")
            const letterObj = generateLetterObj()
            resetDataStorage()
            postLetter(letterObj)    
        }
    }
})

