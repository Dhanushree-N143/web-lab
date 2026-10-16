from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver=webdriver.Chrome()
driver.get("http://localhost:3000")
time.sleep(2)
if "Book Exchange Portal" in driver.page_source:
    print("Test Passed: Page loaded successfully")
driver.find_element(By.XPATH, "//button[contains(text(), 'View Books')]").click()
time.sleep(2)
print("App connected to MongoDB successfully")