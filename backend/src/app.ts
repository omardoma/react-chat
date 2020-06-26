import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

export default app;
