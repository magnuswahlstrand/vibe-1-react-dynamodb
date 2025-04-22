import os
import boto3
from config import *

def create_output_dir():
    os.makedirs('output/audio', exist_ok=True)

def load_letters():
    letters = {}
    with open('letters/swedish_letters.txt', 'r') as f:
        for line in f:
            letter, ipa, voice = line.strip().split('|')
            letters[letter.upper()] = {
                'ipa': ipa,
                'voice': voice
            }
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
    
    for letter, data in letters.items():
        ssml = generate_ssml(letter, data['ipa'])
        print(ssml.strip())
        
        voice_id = 'Elin' if data['voice'] == 'elin' else 'Astrid'
        engine = 'neural' if data['voice'] == 'elin' else 'standard'
        
        response = polly.synthesize_speech(
            Text=ssml,
            TextType='ssml',
            VoiceId=voice_id,
            OutputFormat=OUTPUT_FORMAT,
            Engine=engine
        )
        
        output_file = f'output/audio/{letter}.mp3'
        with open(output_file, 'wb') as f:
            f.write(response['AudioStream'].read())

if __name__ == '__main__':
    main() 