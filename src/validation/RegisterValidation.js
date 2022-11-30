import { body } from 'express-validator';

const registerValidation = [
	body('username', 'Das Feld Benutzername kann nicht leer sein!!!').notEmpty(),
	body('password', ' Das password muss mindestens 4 Simbol haben!!!').isLength({ min: 4 }),
];

export default registerValidation;