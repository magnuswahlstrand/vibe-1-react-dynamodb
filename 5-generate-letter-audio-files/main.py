import os
import boto3
from config import *

def create_output_dir():
    os.makedirs('output/audio', exist_ok=True)

def load_letters():
    letters = {}
    with open('letters/swedish_letters.txt', 'r') as f:
        for line in f:
            letter, ipa = line.strip().split(':')
            letters[letter.upper()] = ipa  # Convert to uppercase for output files
    return letters

def generate_ssml(letter, ipa):
    return f"""
    <speak>
        <prosody rate="x-slow" volume="loud">
            <phoneme alphabet="ipa" ph="{ipa}">
                {letter}
            </phoneme>
        </prosody>
    </speak>
    """

def main():
    create_output_dir()
    letters = load_letters()
    
    session = boto3.Session(profile_name=AWS_PROFILE)
    polly = session.client('polly', region_name=AWS_REGION)
    
    for letter, ipa in letters.items():
        ssml = generate_ssml(letter, ipa)
        print(ssml.strip())
        
        response = polly.synthesize_speech(
            Text=ssml,
            TextType='ssml',
            VoiceId=VOICE_ID,
            OutputFormat=OUTPUT_FORMAT,
            Engine=ENGINE
        )
        
        output_file = f'output/audio/{letter}.mp3'
        with open(output_file, 'wb') as f:
            f.write(response['AudioStream'].read())

if __name__ == '__main__':
    main() 