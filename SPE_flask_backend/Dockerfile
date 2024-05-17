# Use the official Python image as the base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
    
# RUN apt install python3-venv

# CMD python3 -m venv venv

# CMD source venv/bin/activate

# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["python3", "app.py"]
