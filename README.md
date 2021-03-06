## JSON Database

Simple JSON database to store and retrieve data from disk.

### Usage

```
npm install jsondb
```


```ts
import { JSONDatabase as Database } from 'jsondb';

const db = new Database('/path/to/db');

// Add data
db.collection('users').push({ data: 'something'});

// or 
const posts = db.collection('posts');

posts.push({ data: 'something'});
```

`collection` is a method that returns a collection object that is array so all array methods will work just fine.


You need to call `sync` on the database to save the data to disk. This is something that must be done manually.

```ts
db.sync();
```

To destroy the database, you can call `destroy` on the database. This will remove the database file from disk.

```ts
db.destroy();
```

### Notice

This is experimental and not fully tested.
