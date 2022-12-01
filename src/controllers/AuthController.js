import User from '../models/User.js';
import Role from '../models/Role.js';

import bcrypt from 'bcrypt';

import Jwt from 'jsonwebtoken';

import { validationResult } from 'express-validator';

import config from '../config/config.js';



const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	return Jwt.sign(payload, config.secret, { expiresIn: '24h' })
}

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Bei Anmelden ist ein Fehler geschlagen!!!', errors });
			}
			const { username, password } = req.body;
			//prüfen ob der Benutzer in DB existiert 
			const candidate = await User.findOne({ username });
			if (candidate) {
				//wenn ja dann Fehler melden
				return res.status(400).json('Der Benutzer mit der Name schon existiert');
			}
			//wenn nicht, einen Benutzer erstellen
			// password haschieren
			const salt = bcrypt.genSaltSync(7);
			const passwordHash = bcrypt.hashSync(password, salt);
			// eine Role zu geben
			const userRoles = await Role.findOne({ value: 'ADMIN' });
			const user = new User({ username, password: passwordHash, roles: [userRoles.value] });
			//Benutzer speichern 
			await user.save();
			return res.status(200).json({ message: 'Der Benutzer ist Angemeldet' });
		} catch (error) {
			res.status(400).json({ message: 'Registrationsfehler!!!' });
		}

	}
	async login(req, res) {
		try {
			const username = req.body.username;
			const userPassword = req.body.password;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(400).json({ message: `Benutzer ${username} wurde nicht gefunden!!!` });
			}
			const validPassword = bcrypt.compareSync(userPassword, user.password);
			if (!validPassword) {
				return res.status(400).json({ message: `Password ist falsch!!!` });
			}
			const token = generateAccessToken(user._id, user.roles);
			const { password, ...userDate } = user._doc;
			return res.status(200).json({ token, ...userDate });

		} catch (error) {

		}
	}
	async authMe(req, res) {
		try {
			//! Erstellun der Role für Benutzer
			// const userRole = new Role();
			// const adminRole = new Role({ value: 'ADMIN' });
			// await userRole.save()
			// await adminRole.save()

			const user = await User.findById(req.user.id);
			if (!user) {
				return res.status(400).json('Sie sind nicht angelogt!');
			}
			const { password, ...userDate } = user._doc
			res.status(200).json(userDate);
		} catch (error) {
			return res.status(400).json(error.message);
		}
	}
}

export default new AuthController();