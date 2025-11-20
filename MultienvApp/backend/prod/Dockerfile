# backend/prod/Dockerfile

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy application code (including templates)
COPY . .

ENV PORT=3002

EXPOSE 3002

# Start production server
CMD ["gunicorn", "--bind", "0.0.0.0:3002", "app:app", "--workers", "3", "--timeout", "120"]
