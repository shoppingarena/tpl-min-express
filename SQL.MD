# SQL

## Enable foreign keys (important for enforcing relationships)

```sql
db.run("PRAGMA foreign_keys = ON");
```

## Create the users table (if not exist)

```sql
db.run('CREATE TABLE IF NOT EXIST users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    jwt TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )')
```

## Create the orders table with a foreign key to users.id

```sql
db.run('CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    product TEXT NOT NULL,
    price REAL,
    FOREIGN KEY (uer_id) REFERENCES users(id) ON DELTE CASCADE)',
    (err) => {
        if (err) {
            console.error('Error creating orders table:', err.message);
        } else {
            console.log('Orders table created successfully');
        }
    }
```

user_id INTEGER → Stores the user ID.
FOREIGN KEY (user_id) REFERENCES users(id) → Links orders.user_id to users.id.
ON DELETE CASCADE → If a user is deleted, their orders are automatically deleted.
