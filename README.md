# fresh project

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

Create DB:

```sh
docker-compose run -p 5432:5432 -d postgres

docker exec -it postgres /bin/sh
psql -h localhost -U postgres

docker exec -i CONTAINER_ID psql -U postgres -c "CREATE USER USER_NAME WITH PASSWORD 'PASSWORD'"
docker exec -i CONTAINER_ID psql -U postgres -c "CREATE DATABASE DATABASE_NAME"
docker exec -it CONTAINER_ID psql -U USER_NAME DATABASE


docker exec -i CONTAINER_ID psql -U postgres -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
docker exec -i CONTAINER_ID psql -U postgres -c "CREATE TABLE IF NOT EXISTS articles ( id uuid DEFAULT uuid_generate_v4 (), created_at TIMESTAMPTZ DEFAULT now(), title TEXT, content TEXT, PRIMARY KEY (id) )"
docker exec -i CONTAINER_ID psql -U postgres -c "INSERT INTO articles (title, content) VALUES ('Hello, fresh world', 'fresh is a web framework that works on deno');"

docker exec -i CONTAINER_ID psql -U postgres -c "CREATE TABLE IF NOT EXISTS user ( id uuid DEFAULT uuid_generate_v4 (), created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, username TEXT UNIQUE, password_hash TEXT, PRIMARY KEY (id) )"
docker exec -i CONTAINER_ID psql -U postgres -c "INSERT INTO users (username, password_hash) VALUES ('kody', '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u');"

docker exec -i CONTAINER_ID psql -U postgres -c "CREATE TABLE IF NOT EXISTS sessions ( id uuid DEFAULT uuid_generate_v4 (), created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, expires_at TIMESTAMPTZ, access_token TEXT UNIQUE, user_id TEXT, PRIMARY KEY (id) )"
```
