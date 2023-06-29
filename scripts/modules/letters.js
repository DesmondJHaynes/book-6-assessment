import { deleteLetter, getCategories, getLetters, getUsers } from "../../api/dataAccess.js"

// letter list iterator
export const letters = () => {
    const letters = getLetters()

    const finalHtml = letters.map(letter => letterBuilder(letter)).join("")

    return finalHtml

}

// html builder
const letterBuilder = (letter) => {
    const users = getUsers()
    const categories = getCategories()

    let htmlString = `<div class="letter">`

    const recipient = users.find(user => user.id === letter.recipientId)
    const author = users.find(user => user.id === letter.authorId)
    const category = categories.find(cat => cat.id === letter.categoryId)
    
    if (category) {
        htmlString += `<div class="letterCategory">${category.topic}</div>`
    }
    htmlString += ` 
        <p class="message letterHead">Dear ${recipient.name},
        <br> <span class="email">(${recipient.email})</span></p>

        <p class="message letterBody">${letter.message}</p>

        <p class="message letterFoot">Sincerely, <br>${author.name} <br> <span class="email"> (${author.email})</span></p>
        <div class="delete-button-container">
        <button class="delete-button" id="letterDelete--${letter.id}">Delete</button></div>

        <p class="message letterDate">Sent on ${letter.date}</p>`
    

    htmlString += `</div>`

    return htmlString

}

// delete button event listener
document.addEventListener("click", event => {
    if (event.target.id.startsWith("letterDelete")) {
        const [,letterId] = event.target.id.split("--")

        console.log(letterId)
        deleteLetter(parseInt(letterId))
    }
})


// letterBuilder function with letter as it's parameter:
// ...should start with invoking getter functions to get the data we need...getUsers()
// ...next start with some base string, anthing unchanging to initialize things
// ...iterate through users
// ...if (letter.recipientId === user.id) 
//     { interpolate string with (user.name + user.email }
// ...interpolate letter.message
// ...if (letter.authorId === user.id) 
//     { interpolate string with (user.name + user.email }
// ...interpolate letter.date + letter.category

// return htmlString







/*
******Algo!
Our button click event listener has used the generateLetterObj() to build all the necessary componenets needed to build out our letter.
    {
        authorId,
        recipientId,
        message,
        categoryId,
        date : date
    }
We have a post function that may or may not work...sooo probably double check the syntax on that. also that function has been called by our click event listener as well.
-x

We should also go ahead and call for an update event for a complete re-render after psot OOOOOORRRRR we could keep experimenting and go for another specified render of just the messages section. Whichever.
Ensure that this is done within the post function though because of async interactions
-x

First we want to get our html structure down with what we envision the initial final product to look look like...
We'll do that on the index.html first as it leaves less room for error...
-x

Second we'll build the necessary html with JS. I'm thinking a seperate function specifically for html building..."buildLettersHtml"
referenced data includes:
    letter.recipientId => user.id (user.name + email)
    letter.message
    letter.authorId => user.id (user.name + email)
    letter.date
    letter.category


    //main letter() function:
    ...because we want to do this for literally every letter i'm thinking
    invoke the getLetters() function.
    ...Map through the array of letter objects and pass our letterbuilder function as an argument so that it acts on each letter. 


    //letterBuilder function with letter as it's parameter:
    ...should start with invoking getter functions to get the data we need...getUsers()
    ...next start with some base string, anthing unchanging to initialize things
    ...iterate through users
    ...if (letter.recipientId === user.id) 
        { interpolate string with (user.name + user.email }
    ...interpolate letter.message
    ...if (letter.authorId === user.id) 
        { interpolate string with (user.name + user.email }
    ...interpolate letter.date + letter.category

    return htmlString


    lets add a delete button!
    Alright because we know we're going to be deleting directly onto the api, we know we need a delete function that affects the api.
    ...create delete handler: deleteLetter() that fetch, options {method : DELETE}
    -x

    Now we need to call this function somewhere where it makes sense.
    ...Let's hit the html and create a button at the bottom of the letter (preferably start in index.html
    ...Add this html into the html builder function (be sure the button has a class or id that represents that specific letter's id. 
    -x
    
    Now we need an event listener.
    ...somewhere in the modules where it makes sense addEventlister to the document.
    ...specify the click and if the target clicked equals your button
    ...if so collect the id associated with the button (be sure to change string>int)
    ...we can then invoke our deleteLetter function passing in that specific id, and the rest should be magic.
    
*/
