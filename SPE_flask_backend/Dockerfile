# Use the official Python image as the base image
FROM python:3.9

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
    

# Install ngrok
RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip \
    && unzip ngrok-v3-stable-linux-amd64.zip \
    && mv ngrok /usr/local/bin/ 

RUN ngrok authtoken 2gp3cyrxBZpArImt9sQ2OIZrklD_7yF9khnhz6sxtkVkhvpN7
    # && rm ngrok-stable-linux-amd64.zip

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

# CMD nohup ngrok http --domain=civil-basically-bat.ngrok-free.app 5000 &
# CMD docker pull ngrok/ngrok
# CMD docker run --net=host -it -e NGROK_AUTHTOKEN=2gp3cyrxBZpArImt9sQ2OIZrklD_7yF9khnhz6sxtkVkhvpN7 ngrok/ngrok:latest http --domain=civil-basically-bat.ngrok-free.app 5000

# CMD sleep 20

# Command to run the app
# CMD ["python3", "app.py"]
# CMD flask run -h 0.0.0.0 -p 5000


# Create a script to start both Flask and Ngrok
RUN echo "#!/bin/bash\n\
flask run -h 0.0.0.0 -p 5000 &\n\
sleep 20\n\
ngrok http --domain=civil-basically-bat.ngrok-free.app 5000\n" > start.sh


RUN chmod +x start.sh

# Command to run the script
CMD ["./start.sh"]
