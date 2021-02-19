import {promises as fs} from 'fs';
import * as path from "path";
import {fileURLToPath} from "url";

export class FilesystemNewsRepository {
  constructor() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    this.path = path.join(__dirname, '../../storage/news/');
  }

  /**
   * Find news item by it's id
   *
   * @param id
   * @returns {Promise<null|any>}
   */
  async findById(id) {
    try {
      return JSON.parse((await fs.readFile(this.newsPath(id))).toString());
    } catch (err) {
      return null;
    }
  }

  /**
   * Check if news item with provided id exists
   *
   * @param id
   * @returns {Promise<boolean>}
   */
  async exists(id) {
    try {
      await fs.access(this.newsPath(id));
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Save news item
   *
   * @param news
   * @returns {Promise<void>}
   */
  async save(news) {
    return await fs.writeFile(this.newsPath(news.id), JSON.stringify(news));
  }

  /**
   * Returns news item file path
   *
   * @param id
   * @returns {string}
   */
  newsPath(id) {
    return path.join(this.path, id + '.json');
  }
}