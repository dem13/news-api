import express from "express";
import {NewsController} from "./news.controller.js";

export const newsRouter = () => {
  const router = express.Router();
  const controller = new NewsController();

  router.get('/', controller.get.bind(controller));

  return router;
}