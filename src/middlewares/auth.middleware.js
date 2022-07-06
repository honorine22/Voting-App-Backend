import { decode } from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) return res.status(401).send({
            success: false, message: "Unauthorized"
        })
        const decoded = decode(token, { key: process.env.JWT_KEY });
        if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized" });
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).send({ success: false, message: "Unauthorized" });
    }
}


export default authMiddleware