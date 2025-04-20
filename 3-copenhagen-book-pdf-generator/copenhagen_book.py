#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
from ebooklib import epub
import os
import subprocess
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def get_page_content(driver, url):
    try:
        driver.get(url)
        # Wait for the article to be present
        article = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "article"))
        )
        
        # Get the title
        try:
            title = article.find_element(By.TAG_NAME, "h1").text
        except:
            title = "Untitled"
            
        # Get the content
        content = article.get_attribute('outerHTML')
        return title, content
    except Exception as e:
        print(f"Error getting content for {url}: {str(e)}")
        return None, None

def scrape_book():
    base_url = "https://thecopenhagenbook.com"
    pages = [
        "/server-side-tokens",
        "/sessions",
        "/password-authentication",
        "/email-verification",
        "/password-reset",
        "/cryptography/ecdsa",
        "/oauth",
        "/webauthn",
        "/csrf",
        "/mfa",
        "/random-values"
    ]
    
    # Create EPUB book
    book = epub.EpubBook()
    book.set_title("The Copenhagen Book")
    book.set_language('en')
    
    # Setup Chrome driver
    print("Setting up Chrome driver...")
    driver = setup_driver()
    
    try:
        # Add chapters
        chapters = []
        
        print("Scraping pages...")
        for i, page in enumerate(pages):
            url = base_url + page
            print(f"Scraping {url}")
            
            title, content = get_page_content(driver, url)
            if not content:
                print(f"Failed to get content for {url}")
                continue
                
            # Create chapter
            c = epub.EpubHtml(title=title, file_name=f'chap_{i}.xhtml', lang='en')
            c.content = content
            book.add_item(c)
            chapters.append(c)
            
            # Be nice to the server
            time.sleep(1)
        
        print(f"\nFound {len(chapters)} chapters")
        
        # Add table of contents
        book.toc = chapters
        book.add_item(epub.EpubNcx())
        book.add_item(epub.EpubNav())
        
        # Define CSS
        style = '''
        @namespace epub "http://www.idpf.org/2007/ops";
        body {
            font-family: Cambria, Liberation Serif, Bitstream Vera Serif, Georgia, Times, Times New Roman, serif;
            margin: 2em;
        }
        h1, h2 {
            text-align: left;
            text-transform: uppercase;
            font-weight: 200;
        }
        pre {
            background-color: #f5f5f5;
            padding: 1em;
            border-radius: 4px;
            overflow-x: auto;
            white-space: pre-wrap;
        }
        code {
            font-family: monospace;
        }
        article {
            max-width: 100%;
        }
        '''
        
        # Add CSS
        nav_css = epub.EpubItem(uid="style_nav", file_name="style/nav.css", media_type="text/css", content=style)
        book.add_item(nav_css)
        
        # Create spine
        book.spine = ['nav'] + chapters
        
        # Save EPUB
        epub.write_epub('copenhagen_book.epub', book)
        
        # Convert to MOBI using Calibre
        try:
            subprocess.run(['/Applications/calibre.app/Contents/MacOS/ebook-convert', 'copenhagen_book.epub', 'copenhagen_book.mobi'], check=True)
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("Calibre not found. Please install it to convert to MOBI format.")
            print("The EPUB file has been created. You can convert it using Calibre.")
            
    finally:
        driver.quit()

if __name__ == "__main__":
    scrape_book() 