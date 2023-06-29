import { getAuthor, getUsers, setRecipient } from "../../api/dataAccess.js"

export const selectRecipient = () => {
    const authorObj = getAuthor()
    const users = getUsers()

    let html = ``

    if (authorObj.id) {
        html = 
        `<select class="select" name="recipient" id="selectRecipient">
        <option value="user--0">Select User</option>`
        
        users.map((user)=> {
            if (user.id !== authorObj.id)
            html += `<option value="user--${user.id})">${user.name}</option>`
        })
    
        html += `</select>` 
    } else {

        html = 
        `Please select an author first. <br><select class="pre-select" name="recipient" id="selectRecipient">
        <option value="user--0">Select User</option>
        </select>`

    }

    return html
}


document.addEventListener("change", event => {
    const users = getUsers()

    if (event.target.name === "recipient") {
        const [,userId] = event.target.value.split("--")

        let recipientObj
        for (const user of users) {
            if (user.id === parseInt(userId))
                {recipientObj = user}
        }
        
        setRecipient(recipientObj)
    }
})

