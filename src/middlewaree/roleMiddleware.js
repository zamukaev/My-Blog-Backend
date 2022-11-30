import jwt from "jsonwebtoken";

import config from "../../config/config.js";

export default (roles) => {
	return (req, res, next) => {
		if (req.method === 'OPTIONS') {
			next();
		}
		try {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				return res.status(403).json({ message: 'Benutzer ist nicht angemeldet!!!' });
			}
			const { roles: userRoles } = jwt.verify(token, config.secret);
			let hasRole = false;
			userRoles.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true
				}
			});
			if (!hasRole) {
				return res.status(403).json({ message: 'Sie haben keine Zugang' })
			}
			next();

		} catch (error) {
			return res.status(403).json({ message: 'Benutzer ist nicht angemeldet!!!' });
		}
	}
}