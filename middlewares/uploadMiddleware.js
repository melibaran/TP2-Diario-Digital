import multer from 'multer';

const storage = multer.memoryStorage();

export const allowUpload = multer({ storage }).single('imagen');

// Middleware flexible que acepta cualquier campo de archivo
export const allowAnyFile = multer({ storage }).any();

export const allowMultipleUpload = multer({ storage }).array('imagenes', 5);