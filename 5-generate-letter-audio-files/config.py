import os
from dotenv import load_dotenv

load_dotenv()

# Use profile if specified, otherwise fall back to access keys
AWS_PROFILE = os.getenv('AWS_PROFILE', 'default')  # Default to 'default' profile if not specified
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_REGION = 'eu-west-1'  # Ireland region supports Neural voices

# Polly settings
VOICE_ID = 'Astrid'  # Swedish female voice
OUTPUT_FORMAT = 'mp3'
ENGINE = 'standard'  # Astrid only supports standard engine 