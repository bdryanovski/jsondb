
import fs from 'fs';
import path from 'path';

export class Database {
  private _db: Record<any, any> = {};
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this.readFromDisk();
  }

  private readFromDisk() {
    this._db = JSON.parse(
        fs.readFileSync(this._requestFile(), 'utf8')
    );
  }

  private _requestFile() {
    if (!fs.existsSync(path.join(this._name + '.json'))) {
      fs.writeFileSync(path.join(this._name + '.json'), JSON.stringify({}));
    }

    return path.join(this._name + '.json');
  }

  private _writeToDisk() {
    fs.writeFileSync(this._requestFile(), JSON.stringify(this._db));
    this.readFromDisk();
  }

  public collection(name: string) {
    return this._db[name] || (this._db[name] = []);
  }

  public sync() {
    this._writeToDisk();
  }

}
