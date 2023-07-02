import { UserSession } from "../Models/userSession.js"
import { User } from "../Models/user.js"

/**
 * Function that performs login.
 * Returns SessionId if success, otherwise handles error
 */
export const performLogin = async (req, res) => {
    try {
        // Retrieve login data
        const { username, password } = req.body
        // Search user
        const user = await User.findOne({
            where: { username, password }
        })
        if(!user) {
            throw new Error('User not found using given credentials')
        }
        // User exists, init new session
        const newSession = await UserSession.create({
            user_id: user.id, status: 'ACTIVE'
        })
        res.status(200).json({data: {sessionId: newSession.id}})
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}