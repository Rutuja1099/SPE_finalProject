FROM python:3.9

# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*
    

RUN wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.zip \
    && unzip ngrok-v3-stable-linux-amd64.zip \
    && mv ngrok /usr/local/bin/ 

RUN ngrok authtoken 2gp3cyrxBZpArImt9sQ2OIZrklD_7yF9khnhz6sxtkVkhvpN7


# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN pip install python-logstash-async

RUN apt-get update && apt-get install -y ffmpeg

# Copy the entire backend directory to the working directory
COPY . .

EXPOSE 5000

RUN echo "#!/bin/bash\n\
flask run -h 0.0.0.0 -p 5000 &\n\
sleep 20\n\
ngrok http --domain=civil-basically-bat.ngrok-free.app 5000\n" > start.sh


RUN chmod +x start.sh

CMD ["./start.sh"]
