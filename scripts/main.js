import { fetchCategories, fetchUsers, fetchletters} from "../api/dataAccess.js"
import { PenPals } from "./PenPals.js"

const renderHtml = () => {
    fetchUsers()
    .then(()=> fetchCategories())
    .then(()=> fetchletters())
    .then(()=> PenPals())
}

renderHtml()

document.addEventListener("updateLetters", () => {
    renderHtml()
})

