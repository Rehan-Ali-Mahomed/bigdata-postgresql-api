## This app is a simple API for a PostgreSQL database

### 🛠️ Manual Installation

#### Prerequisites
- npm >= 9.2.0
- node >= 18.13.0

#### Install dependencies
```bash
npm install
```

#### Run API server
```bash
npm start
# or
node index.js
```

---

### ✨ Installation with Docker

#### Containers network

The command below will create a network to be used by our API server and PostgreSQL database. This also enbable DNS resolution for containers within the network.

```bash
docker network create postgresql-api-app
```

#### PostgreSQL database

In the command below, replace the volume `/data` with the local directory of your choice.

```bash
docker run --name postgresql_db -e POSTGRES_USER=admin \
-e POSTGRES_PASSWORD=adminadmin \
--network postgresql-api-app --network-alias postgresql_db \
-v /data:/var/lib/postgresql/data -d totofunku/sql-cours
```

#### Node.js API
```bash
docker run --name postgresql-api --network postgresql-api-app \
-p 8080:8080 -d rehanalimahomed/postgresql-api
```

---
### 🤖 Installation with docker-compose
```bash
docker-compose up

# Run as deamon (in backgroud)
docker-compose up -d
```

## 🚀 Usage
```bash
curl http://localhost:8080/films

# Get film with id 950
curl http://localhost:8080/films/950

# Add film to database
curl http://localhost:8080/films -H "content-type:application/json" -d '{"name":"Harry Potter 5","description":"Harry Potter et l'Ordre du Phénix"}'
```

## 👤 Rehan Ali-Mahomed

- Github: [@Rehan-Ali-Mahomed](https://github.com/Rehan-Ali-Mahomed)

- Date : 09/27/2023
