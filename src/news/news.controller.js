import {NewsService} from "./news.service.js";
import {HttpException} from "../exceptions/http.exception.js";

export class NewsController {
  constructor() {
    this.newsService = new NewsService();
  }

  /**
   * Display list of news items
   *
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async get(req, res) {
    try {
      const news = (await this.newsService.find({
        q: req.query.q,
        from: req.query.from,
        limit: req.query.limit
      }));

      res.send({
        data: news
      })
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}