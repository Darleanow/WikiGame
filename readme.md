# Wikigame

## Setup instructions

### Setting up the backend

```bash
# Go into the wikigame backend folder
cd wikigame_backend
```

```bash
# Install required packages
pip install -r requirements.txt

# Make a migration to ensure you have the latest version
python .\manage.py migrate

# Run the server, it will be available at localhost:8000
python .\manage.py runserver
```

### Setting up the frontend

```bash
# Go into the wikigame frontend folder
cd wikigame_frontend

# Install required packages
npm install

# Run the dev version, it will be accessible at localhost:3000
npm run dev
```
