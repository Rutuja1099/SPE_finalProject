# Use the official Python image as the base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

RUN apt install python3-venv

RUN python3 -m venv venv

RUN source venv/bin/activate

# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend directory to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["py", "app.py"]
