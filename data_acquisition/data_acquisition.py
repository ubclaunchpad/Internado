import requests
import os
import sys
import psycopg2
import getpass
import logging

jobs_endpoint = "http://localhost:5000/jobs"

# set up logging
logging.basicConfig(format='%(asctime)s - %(levelname)s @' +
                    '%(module)s-%(funcName)s : %(message)s',
                    level=logging.INFO)

# for connecting to remote database in the future
# conn = psycopg2.connect(database='yourdb', user='dbuser', password='abcd1234', host='server', port='5432', sslmode='require')

# Very basic check to filter out non-internships
def is_internship(job):
  text = job["name"] + job["snippet"]
  text = text.lower()

  keywords = ["intern", "co-op"]

  contains_keywords = False

  for keyword in keywords:
    if keyword in text:
      contains_keywords = True

  return contains_keywords

def request_ziprecruiter_jobs(page_num, api_key):
  url = "https://api.ziprecruiter.com/jobs/v1?search=internship%20Job&days_ago=1&page={page_num}&jobs_per_page=20&api_key={api_key}" \
  .format(page_num=page_num, api_key=api_key)
  ziprecruiter_response = requests.get(url).json()
  if ziprecruiter_response["success"]:
    jobs_to_add = []
    # parse ZipRecruiter's JSON response
    for job in ziprecruiter_response["jobs"]:
      if not is_internship(job):
        continue

      current_job = {
        "job_title": job["name"],
        "link": job["url"],
        "description": job["snippet"],
        "city": job["city"],
        "state": job["state"],
        "country": job["country"],
        "latitude": 0.0,
        "longitude": 0.0,
        "company_name": job["hiring_company"]["name"],
        "start_date": None,
        "salary_min": job["salary_min"]
      }

      jobs_to_add.append(current_job)

    # make request to internado job server for adding jobs to database
    internado_response = requests.post(jobs_endpoint, json=jobs_to_add)
    logging.info(internado_response.status_code)
    return ziprecruiter_response["num_paginable_jobs"]
  else:
    return 0


# make ZipRecruiter API call
API_KEY = os.getenv("ZIPRECRUITER_API_KEY")
if API_KEY:
  try:
    count = 0
    page_num = 1
    num_jobs = request_ziprecruiter_jobs(page_num, API_KEY)
    # we're requesting 20 jobs per page
    count += 20
    page_num += 1
    while (count < num_jobs):
      request_ziprecruiter_jobs(page_num, API_KEY)
      count += 20
      page_num += 1
  except requests.ConnectionError:
    logging.info("You are not connected to the Internet")
    sys.exit(1)
else:
  logging.info("Make sure you have your ZipRecruiter API key in app-env")