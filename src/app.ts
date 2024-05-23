import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import xss from "xss-clean";
import config from "./core/config/config";

import walletRoute from "./routes/wallet.route"
import userRoute from "./routes/user.route"

import notFoundRoute from './shared/middlewares/route.middleware';
import globalErrorHandler from './shared/utils/error-handler';

const app = express();

if (config.app_env === 'development') {
  app.use(morgan('dev'));
}

app.enable('trust proxy');

app.use(cors());
app.options('*', cors());

app.use(helmet());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(xss());

app.use(
  hpp({
    whitelist: [],
  })
);

app.use(compression());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Health OK From WALLET SERVICES API'
  })
});

app.use('/api/v1/wallet', walletRoute);
app.use('/api/v1/user', userRoute);

app.all('*', notFoundRoute);
app.use(globalErrorHandler);

export default app;
