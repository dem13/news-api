import express from 'express';
import {newsRouter} from "./news/news.router.js";

export class App {
  port = process.env.PORT || 3000;

  init() {
    this.server = express();

    this.server.use('/news', newsRouter);

    return this;
  }

  run () {
    this.server.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
  }
}
