import express from 'express';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import {newsRouter} from "./news/news.router.js";
import * as path from "path";

export class App {
  init() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    dotenv.config({
      path: path.join(__dirname, '..', '.env')
    })

    this.port = process.env.PORT || 3000;

    this.server = express();

    this.server.use('/news', newsRouter());

    return this;
  }

  run () {
    this.server.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
  }
}
