import json
import os

FILE = "diary.json"


def get_entries():

    if not os.path.exists(FILE):
        return []

    with open(FILE, "r") as f:
        return json.load(f)


def save_entry(entry):

    data = get_entries()

    data.append(entry)

    with open(FILE, "w") as f:
        json.dump(data, f, indent=2)