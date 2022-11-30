import jwt from "jsonwebtoken";

import config from "../../config/config.js";

export default (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(403).json({ message: 'Benutzer ist nicht angemeldet!!!' });
		}
		const decodedDate = jwt.verify(token, config.secret)
		req.user = decodedDate;
		next();

	} catch (error) {
		return res.status(403).json({ message: 'Benutzer ist nicht angemeldet!!!' });
	}
}