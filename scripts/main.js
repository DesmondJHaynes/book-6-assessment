import { fetchCategories, fetchUsers, generateLetterObj } from "../api/dataAccess.js"
import { PenPals } from "./PenPals.js"

const renderHtml = () => {
    fetchUsers()
    .then(()=> fetchCategories())
    .then(()=> PenPals())
}

renderHtml()


// event listener to "submit/send" letter
document.addEventListener("click", event => {
    if (event.target.id === "sendLetter") {
    
    console.log("letter sent")
    generateLetterObj()
    
    }
})
