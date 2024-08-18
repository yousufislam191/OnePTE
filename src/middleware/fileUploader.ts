import multer from 'multer';
import fs from 'fs';
import { HttpError } from './errorHandler';
import { HttpCode } from '../constants';

const uploadDirectory = 'uploads/audio/';

// Ensure the directory exists
if (!fs.existsSync(uploadDirectory)) {
	fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Setup multer for storing audio files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDirectory);
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
	},
});

const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype.startsWith('audio/')) {
		cb(null, true);
	} else {
		cb(
			new HttpError(HttpCode.BAD_REQUEST, 'Only audio files are allowed!'),
			false
		);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

const uploadMultiple = upload.fields([
	{ name: 'audio_files', maxCount: 5 }, // Maximum 5 audio files can be uploaded
]);

export { uploadMultiple };
