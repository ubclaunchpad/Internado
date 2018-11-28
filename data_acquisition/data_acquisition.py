import requests
import os
import sys
import psycopg2
import getpass
import logging

# set up logging
logging.basicConfig(format='%(asctime)s - %(levelname)s @' +
                    '%(module)s-%(funcName)s : %(message)s',
                    level=logging.INFO)

# for connecting to remote database in the future
# conn = psycopg2.connect(database='yourdb', user='dbuser', password='abcd1234', host='server', port='5432', sslmode='require')

def request_ziprecruiter_jobs(page_num, api_key):
  url = "https://api.ziprecruiter.com/jobs/v1?search=internship%20Job&days_ago=1&page={page_num}&jobs_per_page=20&api_key={api_key}" \
  .format(page_num=page_num, api_key=api_key)
  response = requests.get(url).json()
  if response["success"]:
    # dbname, user, host, and password should match your database info in ormconfig.json
    con = psycopg2.connect(dbname='postgres', user=getpass.getuser(), host='localhost', password='Pa55word')
    cur = con.cursor()
    # parse ZipRecruiter's JSON response
    for job in response["jobs"]:
      job_title = job["name"]
      link = job["url"]
      description = job["snippet"]
      city = job["city"]
      state = job["state"]
      country = job["country"]
      company_name = job["hiring_company"]["name"]
      salary_min = job["salary_min"]
      # add to database
      cur.execute(
        "INSERT INTO Job VALUES(DEFAULT,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", \
        (job_title, link, description, city, state, country, 0.0, 0.0, company_name, None, salary_min) \
      )
    con.commit()
    cur.close()
    con.close()
    return response["num_paginable_jobs"]
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