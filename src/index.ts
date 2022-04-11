
import fs from 'fs';
import path from 'path';

export type DatabaseOptions = {
  databaseExtension?: string;
}

const DatabaseDefaults: DatabaseOptions = {
  databaseExtension: '.json',
}

export class Database {
  private _db: Record<any, any> = {};
  private _options: DatabaseOptions;
  private _name: string;

  constructor(name: string, options: DatabaseOptions = DatabaseDefaults) {
    this._name = name;
    this._options = options;
    this.readFromDisk();
  }

  private readFromDisk() {
    this._db = JSON.parse(
        fs.readFileSync(this._requestFile(), 'utf8')
    );
  }

  private _requestFile() {
    const filename = path.join(this._name + this._options.databaseExtension);

    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, JSON.stringify({}));
    }

    return filename;
  }

  private _writeToDisk() {
    fs.writeFileSync(this._requestFile(), JSON.stringify(this._db));
    this.readFromDisk();
  }

  /**
   * Public API
   */

  public databaseFile() {
    return this._requestFile();
  }

  public collection(name: string) {
    return this._db[name] || (this._db[name] = []);
  }

  public sync() {
    this._writeToDisk();
  }

}
