from playwright.sync_api import sync_playwright
import time

def test_django_homepage():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=False)  # Set to True for headless mode
        page = browser.new_page()
        
        # Navigate to Django app
        page.goto("http://localhost")
        
        # Wait for page to load
        page.wait_for_load_state("networkidle")
        
        # Take a screenshot
        page.screenshot(path="django_homepage.png")
        
        # Print page title
        print(f"Page title: {page.title()}")
        
        # Close browser
        browser.close()

if __name__ == "__main__":
    test_django_homepage()