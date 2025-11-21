# Multi-Environment Application Deployment (Flask + React + Docker + MongoDB)

This project demonstrates a **complete multi-environment deployment** of a Ticket Management Application using Docker. It includes:

* **Frontend (React)** running on port **3000**
* **Backend Development API (Flask)** running on port **3001**
* **Backend Production API (Flask + Gunicorn)** running on port **3002**
* **MongoDB Database** running on port **27017**

Each component runs in its own Docker container, orchestrated using Docker Compose.

---

# 📁 Application Structure

```
multiEnv/
├── docker-compose.yml
├── backend/
│   ├── dev/
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── .env
│   └── prod/
│       ├── app.py
│       ├── requirements.txt
│       ├── Dockerfile
│       └── .env
└── frontend/
    ├── src/
    ├── public/
    ├── Dockerfile
    └── package.json
```
<img width="526" height="703" alt="image" src="https://github.com/user-attachments/assets/9965829f-5a01-4a15-bbd3-c4cb2b7f68ce" />

---

# 🐳 Dockerfile Configurations

## 🔹 Backend (Development)

```
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \ 
    build-essential \ 
 && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

EXPOSE 3001

CMD ["flask", "run", "--port=3001", "--host=0.0.0.0"]
```

---

## 🔹 Backend (Production)

```
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \ 
    build-essential \ 
    gcc \ 
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

ENV PORT=3002
EXPOSE 3002

CMD ["gunicorn", "--bind", "0.0.0.0:3002", "app:app", "--workers", "3", "--timeout", "120"]
```

---

## 🔹 Frontend (React)

```
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

# 🐙 docker-compose.yml

```
services:

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: frontend
    env_file:
      - ./frontend/.env
    ports:
      - "3000:3000"
    depends_on:
      - backend_dev
      - backend_prod
    networks:
      - multienv-net
    restart: unless-stopped

  backend_dev:
    build:
      context: ./backend/dev
      dockerfile: Dockerfile
    container_name: backend_dev
    env_file:
      - ./backend/dev/.env
    ports:
      - "3001:3001"
    depends_on:
      - mongo
    networks:
      - multienv-net
    restart: unless-stopped

  backend_prod:
    build:
      context: ./backend/prod
      dockerfile: Dockerfile
    container_name: backend_prod
    env_file:
      - ./backend/prod/.env
    ports:
      - "3002:3002"
    depends_on:
      - mongo
    networks:
      - multienv-net
    restart: unless-stopped

  mongo:
    image: mongo:6
    container_name: mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root123
    volumes:
      - mongo_data:/data/db
    networks:
      - multienv-net

networks:
  multienv-net:
    driver: bridge

volumes:
  mongo_data:
```

---

# 🧪 Testing the Deployment

### ▶ Start all containers

```
docker compose up --build -d
-<img width="889" height="95" alt="image" src="https://github.com/user-attachments/assets/e19b5849-0bde-4eba-bce7-21cc52858690" />

-<img width="820" height="404" alt="image" src="https://github.com/user-attachments/assets/d8673a7a-6789-4b10-b519-dffd69fb3aa6" />

```

### ▶ Verify running containers

```
docker ps

-<img width="902" height="169" alt="image" src="https://github.com/user-attachments/assets/1b7a6075-6c62-4bb2-beb8-3808866b408d" />

```

### Expected Output

* backend_dev → Running
* backend_prod → Running
* frontend → Running
* mongo → Running

### ▶ Access the Application

| Environment | URL                                                      |
| ----------- | -------------------------------------------------------- |
| Frontend    | [http://localhost:3000](http://localhost:3000)           |
| Development | [http://localhost:3000/dev](http://localhost:3000/dev)   |
| Production  | [http://localhost:3000/prod](http://localhost:3000/prod) |

---

# 📸 Application running in browser

* Frontend Homepage
  - <img width="940" height="196" alt="image" src="https://github.com/user-attachments/assets/b9a7b021-dcb5-469b-8966-620c713e188d" />

* Development Page
  - <img width="940" height="187" alt="image" src="https://github.com/user-attachments/assets/c6def8bc-084f-4071-8192-6eda9b16b621" />

* Production Page
  - <img width="940" height="178" alt="image" src="https://github.com/user-attachments/assets/6c40ed9c-821b-42d7-b80e-243e40bf07de" />



---

