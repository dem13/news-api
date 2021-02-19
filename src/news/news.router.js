import express from "express";
import asyncHandler from 'express-async-handler';
import {NewsController} from "./news.controller.js";

export const newsRouter = () => {
  const router = express.Router();
  const controller = new NewsController();

  router.get('/', asyncHandler(controller.get.bind(controller)));

  return router;
}