import express from 'express';

export class App {
  port = process.env.PORT || 3000;

  init() {
    this.server = express();

    this.server.get('/', (req, res) => res.send('Hello, world!'))

    return this;
  }

  run () {
    this.server.listen(this.port, () => console.log(`Server is running on port ${this.port}`));
  }
}
