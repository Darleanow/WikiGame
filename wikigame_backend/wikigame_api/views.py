import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote
from django.http import JsonResponse

def get_article_content(url):
    try:
        response = requests.get(url)
        content = response.text

        soup = BeautifulSoup(content, "html.parser")

        # Remove unwanted elements
        elements_to_remove = [
            {"class": "mw-jump-link"},
            {"class": "vector-header-container"},
            {"class": "vector-settings"},
            {"class": "mw-footer-container"},
            {"class": "vector-column-start"},
            {"class": "vector-page-toolbar"},
            {"class": "vector-toc-landmark"},
            {"id": "p-lang-btn"},
            {"class": "vector-body-before-content"},
            {"class": "printfooter"},
            {"class": "mw-editsection"},
            {"id": "References"},
            {"class": "reflist"},
            {"class": "navbox"},
            {"id": "External_links"},
            {
                "class": "vector-pinnable-header-toggle-button vector-pinnable-header-pin-button"
            },
            {
                "class": "vector-pinnable-header-toggle-button vector-pinnable-header-unpin-button"
            },
            {"class": "vector-pinnable-header-label"},
            {
                "class": "box-Unreferenced plainlinks metadata ambox ambox-content ambox-Unreferenced"
            },
            {"class": "box-Expand_language plainlinks metadata ambox ambox-notice"},
            {"class": "plainlinks metadata ambox mbox-small-left ambox-notice"},
            {"class": "mw-hidden-catlinks mw-hidden-cats-hidden"},
            {"class": "side-box-text plainlist"},
            {
                "class": "box-Update plainlinks metadata ambox ambox-content ambox-Update"
            },
            {
                "class": "box-Primary_sources plainlinks metadata ambox ambox-content ambox-Primary_sources"
            },
            {"class": "metadata plainlinks asbox stub"},
            {
                "class": "box-Empty_section plainlinks metadata ambox mbox-small-left ambox-content"
            },
            {
                "class": "box-Improve_categories plainlinks metadata ambox ambox-style ambox-cat_improve"
            },
            {"class": "side-box-flex"},
            {"class": "side-box side-box-right plainlinks sistersitebox"},
            {"class": "box-Multiple_issues"},
            {"class": "ambox-notice"},
            {"class": "ambox"},
            {"class": "vector-column-end"},
        ]

        for elem in elements_to_remove:
            if isinstance(elem, dict):
                key, value = next(iter(elem.items()))
                for tag in soup.find_all(attrs={key: value}):
                    tag.decompose()
            else:
                for tag in soup.find_all(elem):
                    tag.decompose()

        # Remove all inline styles
        for tag in soup.find_all(True):
            if tag.has_attr("style"):
                del tag["style"]

        # Remove empty elements (except self-closing tags)
        for tag in soup.find_all(True):
            if not tag.name in ["hr", "br"] and not tag.get_text(strip=True) and not tag.find():
                tag.decompose()

        # Convert relative URLs to absolute URLs
        for tag in soup.find_all(["a"]):
            if tag.has_attr("src"):
                tag["src"] = requests.compat.urljoin(response.url, tag["src"])
            if tag.has_attr("href"):
                tag["href"] = requests.compat.urljoin(response.url, tag["href"])
                # Replace external links with plain text
                if not tag["href"].startswith("https://en.wikipedia.org/wiki/") and not tag["href"].startswith("http://en.wikipedia.org/wiki/"):
                    tag.string = tag.text if tag.text else tag["href"]
                    tag.attrs = {}

        for img_tag in soup.find_all("img"):
            if img_tag.parent.name == "a":
                img_tag.parent.unwrap()

        modified_content = str(soup)

        return modified_content
    except Exception as e:
        return str(e)

def get_random_article(request):
    try:
        url = "https://en.wikipedia.org/wiki/Special:Random"
        content = get_article_content(url)
        return JsonResponse({"content": content})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def fetch_article(request):
    try:
        url = request.GET.get("url")
        if not url:
            return JsonResponse({"error": "No URL provided"}, status=400)
        url = unquote(url)
        content = get_article_content(url)
        return JsonResponse({"content": content})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def get_random_articles(request):
    print("Here")
    try:
        urls = ["https://en.wikipedia.org/wiki/Special:Random" for _ in range(3)]
        articles = []
        for url in urls:
            articles.append({
                "url": url,
                "content": get_article_content(url)
            })
        return JsonResponse({
            "start": articles[0],
            "current": articles[0],
            "goal": articles[2]
        })
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
