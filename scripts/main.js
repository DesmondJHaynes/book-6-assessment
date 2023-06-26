import { fetchUsers } from "../api/dataAccess.js"
import { PenPals } from "./PenPals.js"

const renderHtml = () => {
    fetchUsers()
    .then(()=> PenPals())
}

renderHtml()


