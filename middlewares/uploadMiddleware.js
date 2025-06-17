import multer from 'multer';

const storage = multer.memoryStorage();

export const allowUpload = multer({ storage }).single('imagen');

export const allowMultipleUpload = multer({ storage }).array('imagenes', 5);