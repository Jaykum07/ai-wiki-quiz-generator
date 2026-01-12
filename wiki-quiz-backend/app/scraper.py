import requests
from bs4 import BeautifulSoup

def scrape_wikipedia(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; WikiQuizBot/1.0)"
    }

    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.find("h1").get_text(strip=True)

    paragraphs = soup.find_all("p")
    summary = " ".join(p.get_text(strip=True) for p in paragraphs[:5])

    return title, summary
