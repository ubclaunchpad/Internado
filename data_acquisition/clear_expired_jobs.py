import requests
import os
import sys
import psycopg2
import getpass
import logging

url_index = 2
id_index = 0

# Currently just makes a GET request to the URLs in the DB and returns true if the status code is 200
# TODO: read HTML for websites to see if they're expired even if the status code is 200
def check_expired(job):
  url = job[url_index]
  if(url):
    response = requests.get(url)
    if(response.status_code != 200):
      return True
    else:
      return False

  else:
    print("No URL")
    return False

# Gets all the jobs from the db and deletes the ones that are expired
def check_for_expired_jobs():
  # dbname, user, host, and password should match your database info in ormconfig.json
  con = psycopg2.connect(dbname='internado_db', user=getpass.getuser(), host='localhost', password='Pa55word')
  cur = con.cursor()
    
  # Get all jobs from db
  cur.execute("SELECT * FROM job")

  # Go through all of the jobs from the db and check if they're expired
  expired_job_ids = []
  for job in cur:
    expired = check_expired(job)
    if(expired):
      expired_job_ids.append(job[id_index])

  # Go through all of the expired jobs and delete them from the db
  for job_id in expired_job_ids:
    cur.execute("DELETE FROM job WHERE id = %s", (job_id,))
  
  con.commit()

try:
  check_for_expired_jobs()  
except requests.ConnectionError:
  logging.info("You are not connected to the Internet")
  sys.exit(1)

