import { Role } from "../Models/role.js"

export const getRoles = async (req, res) => {
    try {
        const data = await Role.findAll()
        res.status(200).json(data)
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}