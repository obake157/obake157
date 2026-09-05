import os

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


class IntegrationClient:
    def __init__(self) -> None:
        self.base_url = os.getenv("API_BASE_URL", "https://example.invalid").rstrip("/")
        self.token = os.getenv("API_TOKEN", "")

        retry = Retry(
            total=3,
            backoff_factor=0.5,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["GET", "PUT"],
        )

        self.session = requests.Session()
        self.session.mount("https://", HTTPAdapter(max_retries=retry))
        self.session.headers.update(
            {
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json",
            }
        )

    def upsert_employee(self, external_id: str, payload: dict) -> requests.Response:
        response = self.session.put(
            f"{self.base_url}/employees/{external_id}",
            json=payload,
            timeout=10,
        )
        response.raise_for_status()
        return response
