import {createHash} from 'crypto';

import {FilesystemNewsRepository} from "./filesystem-news.repository.js";
import {NewsapiNewsRepository} from "./newsapi-news.repository.js";

export class NewsService {
  constructor() {
    this.localNewsRepo = new FilesystemNewsRepository();
    this.newsRepo = new NewsapiNewsRepository();
  }

  /**
   *
   * Get list of news items
   *
   * @param options
   * @returns {Promise<(null|*|{id: string, content: *, storedAt: string})[]>}
   */
  async find(options) {
    return Promise.all((await this.newsRepo.find(options)).map(async news => {
      news.id = this.generateNewsId(news);

      if(await this.localNewsRepo.exists(news.id)) {
        return await this.localNewsRepo.findById(news.id);
      }

      const localNews = {
        id: news.id,
        content: news.content,
        storedAt: new Date().toJSON(),
      };

      await this.localNewsRepo.save(localNews)

      return localNews;
    }));
  }

  /**
   * Generate news id
   *
   * @param news
   * @returns {string}
   */
  generateNewsId(news) {
    const timestamp = new Date(news.publishedAt).getTime();

    const uniqueString = news.url || news.title;

    return timestamp + '_' + createHash('md5').update(uniqueString).digest('hex');
  }
}