import NewsAPI from 'newsapi';

export class NewsapiNewsRepository {
  constructor() {
    this.newapi = new NewsAPI(process.env.NEWSAPI_API_KEY)
  }

  async find(options) {
    let articles = [];

    const limit = options.limit || 20;

    let page = 1;

    do {
      const news = await this.newapi.v2.everything(options);

      articles = articles.concat(news.articles);

      options.page = ++page;

      if (articles.length === news.totalResults) {
        break;
      }
    } while (articles.length < limit)

    return articles.slice(0, limit);
  }
}