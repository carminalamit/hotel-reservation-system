import express, {json} from 'express';
import cors from 'cors';
import usersRouter from './routes/users-routes.js';
import roomRouter from './routes/room-routes.js';
import bookingRouter from './routes/booking-routes.js';
import authRouter from './routes/auth-routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(process.env.IMAGE_FOLDER_PATH)

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/auth',authRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


app.listen(PORT, ()=> {
  console.log(`Server is listening on port:${PORT}`);
})
