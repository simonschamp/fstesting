import requests
from selenium_tests.utils.constants import TEST_USER

BACKEND_URL = "http://localhost:8000"

def delete_test_user():
    try:
        response = requests.delete(
            f"{BACKEND_URL}/user/{TEST_USER}",
            timeout=5
        )
        # 200 = deleted, 404 = did not exist (both OK)
        if response.status_code not in (200, 404):
            print("Unexpected status:", response.status_code)
    except requests.RequestException as e:
        print("Could not delete test user:", e)


def reset_messages():
    try:
        requests.delete(f"{BACKEND_URL}/api/messages/reset", timeout=5)
    except requests.RequestException as e:
        print("Could not reset messages:", e)
