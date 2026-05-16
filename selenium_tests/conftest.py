import sys
import os
import pytest
from selenium_tests.utils.api_helpers import delete_test_user, reset_messages

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, ROOT_DIR)


#@pytest.fixture(scope="session", autouse=True)
#def clean_test_user_before_tests():
    #delete_test_user()


@pytest.fixture(scope="session", autouse=True)
def clean_backend_state():
    delete_test_user()
    reset_messages()
    yield
