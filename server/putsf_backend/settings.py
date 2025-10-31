# putsf_backend/settings.py

import os
from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv

# -----------------------------
# Base Directory
# -----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# -----------------------------
# Load environment variables
# -----------------------------
load_dotenv(BASE_DIR / ".env")           # main .env
load_dotenv(BASE_DIR / ".env.local", override=True)  # local overrides if exists

# -----------------------------
# Security
# -----------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key")
DEBUG = os.getenv("DEBUG", "False").lower() in ["true", "1", "yes"]

# ALLOWED_HOSTS
RENDER_EXTERNAL_HOSTNAME = os.getenv("RENDER_EXTERNAL_HOSTNAME")

ALLOWED_HOSTS = [
    "putsf1.onrender.com",            # backend domain
    "putsf1-frontend.onrender.com",   # frontend domain
    "localhost",
    "127.0.0.1",
]

if RENDER_EXTERNAL_HOSTNAME:  
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# -----------------------------
# Installed Apps
# -----------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',

    # Third-party
    'corsheaders',
    'rest_framework',

    # Local apps
    "putsf_backend.accounts",
    "putsf_backend.gallery",
    "putsf_backend.blog",
    "putsf_backend.banner",
    "putsf_backend.license",
    "putsf_backend.complaints",
]


# -----------------------------
# Middleware
# -----------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# -----------------------------
# URL Configuration
# -----------------------------
ROOT_URLCONF = 'putsf_backend.urls'

# -----------------------------
# Templates
# -----------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates", BASE_DIR / "putsf_backend" / "templates"],  # ✅ Add both paths
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# -----------------------------
# WSGI
# -----------------------------
WSGI_APPLICATION = 'putsf_backend.wsgi.application'

# -----------------------------
# Database
# -----------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# -----------------------------
# MongoDB Connection
# -----------------------------
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

_db = None

def get_db():
    global _db
    if _db is None:
        if MONGO_URI and MONGO_DB_NAME:
            try:
                client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
                client.admin.command('ping')  # Test connection
                _db = client[MONGO_DB_NAME]
                if DEBUG:
                    print(f"✅ Connected to MongoDB: {MONGO_DB_NAME}")
            except Exception as e:
                _db = None
                if DEBUG:
                    print(f"⚠️ MongoDB connection failed: {e}. Skipping MongoDB.")
        else:
            _db = None
            if DEBUG:
                print("⚠️ MONGO_URI or MONGO_DB_NAME not set. Skipping MongoDB.")
    return _db



from django.conf import settings as django_settings
django_settings.get_db = get_db



# -----------------------------
# Password Validation
# -----------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# -----------------------------
# Internationalization
# -----------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# -----------------------------
# Static & Media
# -----------------------------
# Static files (CSS, JavaScript, Images)
# -----------------------------
# Static & Media
# -----------------------------
# Static files
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "putsf_backend", "static")]
STATIC_ROOT = BASE_DIR / "staticfiles"

# Media files (user uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "media"  # Create a separate folder for media


# Full base URL for building absolute URLs
if not DEBUG:
    SITE_DOMAIN = "https://putsf1.onrender.com"
else:
    SITE_DOMAIN = "http://127.0.0.1:8000"

BASE_URL = SITE_DOMAIN




# -----------------------------
# CORS
# -----------------------------
CORS_ALLOW_ALL_ORIGINS = True

# -----------------------------
# Custom User Model
# -----------------------------
AUTH_USER_MODEL = "accounts.AdminUser"

# -----------------------------
# REST Framework
# -----------------------------
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # For login
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}


# -----------------------------
# Other settings
# -----------------------------
APPEND_SLASH = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -----------------------------
# Site domain
# -----------------------------
if not DEBUG:
    SITE_DOMAIN = "https://putsf1.onrender.com"
else:
    SITE_DOMAIN = "http://127.0.0.1:8000"

BASE_URL = SITE_DOMAIN


from django.conf import settings as django_settings
django_settings.get_db = get_db
