import requests
import os
import psycopg2

# connect to database
# conn = psycopg2.connect(database='yourdb', user='dbuser', password='abcd1234', host='server', port='5432', sslmode='require')

# ZipRecruiter
API_KEY = os.getenv("ZIPRECRUITER_API_KEY")
req = requests.get("https://api.ziprecruiter.com/jobs/v1?search=internship%20Job&days_ago=1&page=1&api_key=" + API_KEY)
# print(req.json())
for job in req.json()["jobs"]:
    title = job["name"]
    description = job["snippet"]
    company = job["hiring_company"]["name"]
    location = job["location"]
    salaryMin = job["salary_min"]
    postUrl = job["url"]