import express from "express";

const newsRouter = express.Router();

newsRouter.get('/', (req, res) => {
  res.send({
    data: [
      {content: 'Hello, world!'}
    ]
  })
});

export {newsRouter}