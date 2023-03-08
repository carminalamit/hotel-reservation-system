import { Buffer } from 'buffer';


export const convertImageData = (imageData) => {
    const buffer = Buffer.from(imageData, 'binary').toString('base64');
    return `data:image/png;base64,${buffer}`
}