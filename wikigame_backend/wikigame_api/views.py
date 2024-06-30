# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import unquote
# from django.http import JsonResponse
# from django.views.decorators.http import require_GET
# from django.core.exceptions import BadRequest

# # Constants
# WIKIPEDIA_RANDOM_URL = "https://en.wikipedia.org/wiki/Special:Random"
# ELEMENTS_TO_REMOVE = [
#     {"class": "mw-jump-link"},
#     {"class": "vector-header-container"},
#     {"class": "vector-settings"},
#     {"class": "mw-footer-container"},
#     {"class": "vector-column-start"},
#     {"class": "vector-page-toolbar"},
#     {"class": "vector-toc-landmark"},
#     {"id": "p-lang-btn"},
#     {"class": "vector-body-before-content"},
#     {"class": "printfooter"},
#     {"class": "mw-editsection"},
#     {"id": "External_links"},
#     {"class": "vector-pinnable-header-toggle-button vector-pinnable-header-pin-button"},
#     {"class": "vector-pinnable-header-toggle-button vector-pinnable-header-unpin-button"},
#     {"class": "vector-pinnable-header-label"},
#     {"class": "box-Unreferenced plainlinks metadata ambox ambox-content ambox-Unreferenced"},
#     {"class": "box-Expand_language plainlinks metadata ambox ambox-notice"},
#     {"class": "plainlinks metadata ambox mbox-small-left ambox-notice"},
#     {"class": "mw-hidden-catlinks mw-hidden-cats-hidden"},
#     {"class": "side-box-text plainlist"},
#     {"class": "box-Update plainlinks metadata ambox ambox-content ambox-Update"},
#     {"class": "box-Primary_sources plainlinks metadata ambox ambox-content ambox-Primary_sources"},
#     {"class": "metadata plainlinks asbox stub"},
#     {"class": "box-Empty_section plainlinks metadata ambox mbox-small-left ambox-content"},
#     {"class": "box-Improve_categories plainlinks metadata ambox ambox-style ambox-cat_improve"},
#     {"class": "side-box-flex"},
#     {"class": "side-box side-box-right plainlinks sistersitebox"},
#     {"class": "box-Multiple_issues"},
#     {"class": "ambox-notice"},
#     {"class": "ambox"},
#     {"class": "vector-column-end"},
# ]

# def clean_article_content(soup: BeautifulSoup, base_url: str) -> str:
#     # Remove unwanted elements
#     for elem in ELEMENTS_TO_REMOVE:
#         key, value = next(iter(elem.items()))
#         for tag in soup.find_all(attrs={key: value}):
#             tag.decompose()

#     # Update tags with attributes
#     for tag in soup.find_all(True):
#         if tag.has_attr("style"):
#             del tag["style"]
#         if tag.has_attr("src"):
#             tag["src"] = requests.compat.urljoin(base_url, tag["src"])
#         if tag.has_attr("href"):
#             tag["href"] = requests.compat.urljoin(base_url, tag["href"])
#             if not tag["href"].startswith("https://en.wikipedia.org/wiki/"):
#                 tag.replace_with(tag.get_text())

#     # Make images non-clickable
#     for img in soup.find_all("img"):
#         parent = img.parent
#         if parent.name == "a":
#             parent.replace_with(img)

#     # Remove external stylesheets
#     for link in soup.find_all("link", rel="stylesheet"):
#         link.decompose()

#     return str(soup)

# def get_article_content(url: str) -> str:
#     try:
#         response = requests.get(url)
#         response.raise_for_status()
#         soup = BeautifulSoup(response.text, "lxml")
#         return clean_article_content(soup, response.url)
#     except requests.RequestException as e:
#         return str(e)

# @require_GET
# def get_random_article(request):
#     try:
#         content = get_article_content(WIKIPEDIA_RANDOM_URL)
#         return JsonResponse({"content": content})
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)

# @require_GET
# def fetch_article(request):
#     try:
#         url = request.GET.get("url")
#         if not url:
#             raise BadRequest("No URL provided")
#         content = get_article_content(unquote(url))
#         return JsonResponse({"content": content})
#     except BadRequest as e:
#         return JsonResponse({"error": str(e)}, status=400)
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)

# @require_GET
# def get_random_articles(request):
#     try:
#         urls = [WIKIPEDIA_RANDOM_URL for _ in range(3)]
#         articles = [{"url": url, "content": get_article_content(url)} for url in urls]
#         return JsonResponse({
#             "start": articles[0],
#             "current": articles[0],
#             "goal": articles[2]
#         })
#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)

import requests
from bs4 import BeautifulSoup
from urllib.parse import unquote
from django.http import JsonResponse

def get_article_content(url):
    try:
        response = requests.get(url)
        content = response.text
        soup = BeautifulSoup(content, "lxml")

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
            {"id": "External_links"},
            {"class": "vector-pinnable-header-toggle-button vector-pinnable-header-pin-button"},
            {"class": "vector-pinnable-header-toggle-button vector-pinnable-header-unpin-button"},
            {"class": "vector-pinnable-header-label"},
            {"class": "box-Unreferenced plainlinks metadata ambox ambox-content ambox-Unreferenced"},
            {"class": "box-Expand_language plainlinks metadata ambox ambox-notice"},
            {"class": "plainlinks metadata ambox mbox-small-left ambox-notice"},
            {"class": "mw-hidden-catlinks mw-hidden-cats-hidden"},
            {"class": "side-box-text plainlist"},
            {"class": "box-Update plainlinks metadata ambox ambox-content ambox-Update"},
            {"class": "box-Primary_sources plainlinks metadata ambox ambox-content ambox-Primary_sources"},
            {"class": "metadata plainlinks asbox stub"},
            {"class": "box-Empty_section plainlinks metadata ambox mbox-small-left ambox-content"},
            {"class": "box-Improve_categories plainlinks metadata ambox ambox-style ambox-cat_improve"},
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
                tags = soup.find_all(attrs={key: value})
            else:
                tags = soup.find_all(elem)
            for tag in tags:
                tag.decompose()

        for tag in soup.find_all(True):
            if tag.has_attr("style"):
                del tag["style"]  # Remove all inline styles
            if tag.has_attr("src"):
                tag["src"] = requests.compat.urljoin(response.url, tag["src"])  # Relative url to absolute
            if tag.has_attr("href"):
                tag["href"] = requests.compat.urljoin(response.url, tag["href"])  # Relative url to absolute
                if not tag["href"].startswith("https://en.wikipedia.org/wiki/"):  # Check if the link is not from Wikipedia's article namespace
                    tag.replace_with(tag.get_text())  # Replace link with text

        # Make images non-clickable
        for img in soup.find_all("img"):
            parent = img.parent
            if parent.name == "a":
                parent.replace_with(img)  # Remove the link but keep the image

        for link in soup.find_all("link", rel="stylesheet"):
            link.decompose()

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
