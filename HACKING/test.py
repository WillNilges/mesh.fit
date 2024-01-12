import requests
import argparse
import urllib.parse

def create_service(title, name):
    base_service = {
      "name": title,
      "times": [
        "1300-0",
        "1400-0",
        "1500-0",
        "1600-0",
        "1700-0",
        "1800-0",
        "1900-0",
        "2000-0",
        "2100-0",
        "2200-0",
        "2300-0",
        "0000-1",
        "1300-1",
        "1400-1",
        "1500-1",
        "1600-1",
        "1700-1",
        "1800-1",
        "1900-1",
        "2000-1",
        "2100-1",
        "2200-1",
        "2300-1",
        "0000-2",
        "1300-2",
        "1400-2",
        "1500-2",
        "1600-2",
        "1700-2",
        "1800-2",
        "1900-2",
        "2000-2",
        "2100-2",
        "2200-2",
        "2300-2",
        "0000-3",
        "1300-3",
        "1400-3",
        "1500-3",
        "1600-3",
        "1700-3",
        "1800-3",
        "1900-3",
        "2000-3",
        "2100-3",
        "2200-3",
        "2300-3",
        "0000-4",
        "1300-4",
        "1400-4",
        "1500-4",
        "1600-4",
        "1700-4",
        "1800-4",
        "1900-4",
        "2000-4",
        "2100-4",
        "2200-4",
        "2300-4",
        "0000-5",
        "1300-5",
        "1400-5",
        "1500-5",
        "1600-5",
        "1700-5",
        "1800-5",
        "1900-5",
        "2000-5",
        "2100-5",
        "2200-5",
        "2300-5",
        "0000-6",
        "1300-6",
        "1400-6",
        "1500-6",
        "1600-6",
        "1700-6",
        "1800-6",
        "1900-6",
        "2000-6",
        "2100-6",
        "2200-6",
        "2300-6",
        "0000-0"
      ],
      "timezone": "America/New_York"
    }
    r = requests.post("http://localhost:3000/event", json=base_service)
    id = r.json()['id']
    params = {'uname': name}
    print(f"http://localhost:1234/{id}?{urllib.parse.urlencode(params)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-n', '--name', required=True)
    parser.add_argument('-i', '--install-number', required=True)
    args = parser.parse_args()
    service_title = f"Install - {args.name} #{args.install_number}"
    create_service(service_title, args.name)

