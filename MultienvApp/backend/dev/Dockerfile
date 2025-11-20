# backend/dev/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# install runtime deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

# copy code + requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

EXPOSE 3001

CMD ["flask", "run", "--port=3001", "--host=0.0.0.0"]