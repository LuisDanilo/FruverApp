import { Catalog } from "../Models/catalog.js"

export const getCatalogs = async (req, res) => {
    try {
        const data = await Catalog.findAll()
        res.status(200).json(data)
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}