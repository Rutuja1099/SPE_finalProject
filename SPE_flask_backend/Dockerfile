# Use the official Python image as the base image
FROM python:3.9-windowsservercore

# Set working directory
WORKDIR C:\app

# Install necessary system dependencies
RUN powershell -Command \
    Install-WindowsFeature NET-Framework-45-ASPNET; \
    Install-WindowsFeature Web-Asp-Net45
    
# RUN apt install python3-venv

# CMD python3 -m venv venv

# CMD source venv/bin/activate

# Copy and install requirements
COPY requirements.txt .
RUN python -m pip install --upgrade pip && python -m pip install -r requirements.txt


# Copy the entire backend directory to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the app
CMD ["python3", "app.py"]
