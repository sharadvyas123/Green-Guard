from sentinelhub import SHConfig
import os
from dotenv import load_dotenv

load_dotenv()

def get_sentinel_config():
    config = SHConfig()
    config.sh_client_id = os.getenv("CLIENT_ID")
    config.sh_client_secret = os.getenv("CLIENT_SECRET")
    return config
