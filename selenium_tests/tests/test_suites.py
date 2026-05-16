from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from utils.driver import create_driver
from selenium_tests.utils.constants import TEST_USER, TEST_PASSWORD, BASE_URL



#BASE_URL = "http://localhost:5173"

def test_register_and_login():
    driver = create_driver()
    wait = WebDriverWait(driver, 5)

    # Register
    driver.get(f"{BASE_URL}/register")

    wait.until(EC.visibility_of_element_located(
        (By.CSS_SELECTOR, '[data-cy="username-input"]')
    )).send_keys(TEST_USER)

    driver.find_element(By.CSS_SELECTOR, '[data-cy="password-input"]').send_keys(TEST_PASSWORD)
    driver.find_element(By.XPATH, '//button[text()="Register"]').click()
    print("URL after register:", driver.current_url)
    #print(driver.page_source)


   # Either login page OR home page is acceptable
    wait.until(
        lambda d: "/login" in d.current_url or d.current_url.rstrip("/") == BASE_URL
    )

    # Ensure no visible registration error
    assert not driver.find_elements(By.CLASS_NAME, "error")

    # Login
    driver.find_element(By.CSS_SELECTOR, '[data-cy="login-username"]').send_keys(TEST_USER)
    driver.find_element(By.CSS_SELECTOR, '[data-cy="login-password"]').send_keys(TEST_PASSWORD)
    driver.find_element(By.XPATH, '//button[text()="Login"]').click()

    wait.until(EC.url_to_be(BASE_URL + "/"))

    driver.quit()
