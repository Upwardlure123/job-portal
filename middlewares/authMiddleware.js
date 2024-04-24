import JWT from "jsonwebtoken"

const userAuth = async (req, res, next) => {
    // header ka data authHeader mai save karke rakha hai
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) { // Check if header is missing or doesn't start with "Bearer"
        return next("Authorization Failed");
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next("Authorization Failed");
    }
}

export default userAuth;
