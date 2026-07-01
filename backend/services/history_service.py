import json
import os

HISTORY_FILE = "data/history.json"


def get_history():

    if not os.path.exists(HISTORY_FILE):
        return []

    with open(HISTORY_FILE, "r") as f:
        return json.load(f)


def save_scan(scan):

    history = get_history()

    history.insert(0, scan)

    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)