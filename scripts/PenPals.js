import { selectAuthor } from "./modules/selectAuthor.js"
import { selectRecipient } from "./modules/selectRecipient.js"

export const docSelect = (element) => document.querySelector(element)

export const PenPals = () => {
    docSelect(".section--author").innerHTML = selectAuthor()
    docSelect(".section--recipient").innerHTML = selectRecipient()
}

document.addEventListener("updateRecipient", () => {
    docSelect(".section--recipient").innerHTML = selectRecipient()
})