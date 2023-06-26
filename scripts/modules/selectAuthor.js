import { getUsers, setAuthor } from "../../api/dataAccess.js"


export const selectAuthor = () => {
    const users = getUsers()

    let html = 
    `<select name="author" id="selectAuthor">
    <option value="user--0">Select User</option>`
    
    users.map((user)=> {
        html += `<option value="user--${user.id})">${user.name}</option>`
    })

    html += `</select>`

    return html
}


document.addEventListener("change", event => {
    const users = getUsers()

    if (event.target.name === "author") {
        const [,userId] = event.target.value.split("--")

        let authorObj
        for (const user of users) {
            if (user.id === parseInt(userId))
                {authorObj = user}
        }
        setAuthor(authorObj)
        document.dispatchEvent(new CustomEvent("updateRecipient"))
    }
})
