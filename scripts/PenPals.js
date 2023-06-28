import { selectAuthor } from "./modules/selectAuthor.js"
import { selectRecipient } from "./modules/selectRecipient.js"
import { selectCategory } from "./modules/selectcategory.js"

export const docSelect = (element) => document.querySelector(element)

export const PenPals = () => {
    docSelect(".section--author").innerHTML = selectAuthor()
    docSelect(".section--recipient").innerHTML = selectRecipient()
    docSelect(".section--letterTopics").innerHTML = selectCategory()
}

document.addEventListener("updateRecipient", () => {
    docSelect(".section--recipient").innerHTML = selectRecipient()
})