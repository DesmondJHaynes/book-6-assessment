import { getCategories, setCategoryId } from "../../api/dataAccess.js"


export const selectCategory = () => {
  const categories = getCategories()

  let html = ""

  for (const category of categories) {
    html += `<div class="radios"><input type="radio" name="letterTopics" id="letterTopics--${category.id}"/>${category.topic}</div>`
  }

  return html 
}


document.addEventListener("change", event => {
  if (event.target.name === "letterTopics") {

    const [,categoryId] = event.target.id.split("--")

    console.log(parseInt(categoryId))
    setCategoryId(parseInt(categoryId))
  }
} )