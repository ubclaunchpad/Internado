import requests
import os
import sys
import psycopg2
import getpass
import logging
import asyncio
from aiohttp import ClientSession

url_index = 2
id_index = 0

# Currently just makes a GET request to the URLs in the DB and returns true if the status code isn't 200
# TODO: read HTML for websites to see if they're expired even if the status code is 200
def job_is_expired(response):
  if response['response'].status != 200:
    return True
  else:
    return False

async def get_url_response(job, session):
  async with session.get(job[url_index]) as response:
    return {'job_id': job[id_index], 'response': response}

async def delete_expired_jobs(cur, con):
  tasks = []
  async with ClientSession() as session:
    for job in cur:
      task = asyncio.ensure_future(get_url_response(job, session))
      tasks.append(task)

    responses = await asyncio.gather(*tasks)

    for response in responses:
      if job_is_expired(response):
        cur.execute("DELETE FROM job WHERE id = %s", (response['job_id'],))

    con.commit()

# Gets all the jobs from the db and deletes the ones that are expired
def check_for_expired_jobs():
  # dbname, user, host, and password should match your database info in ormconfig.json
  con = psycopg2.connect(dbname='internado_db', user=getpass.getuser(), host='localhost', password='Pa55word')
  cur = con.cursor()
    
  # Get all jobs from db
  cur.execute("SELECT * FROM job")

  loop = asyncio.get_event_loop()
  future = asyncio.ensure_future(delete_expired_jobs(cur, con))
  loop.run_until_complete(future)

try:
  check_for_expired_jobs()  
except requests.ConnectionError:
  logging.info("You are not connected to the Internet")
  sys.exit(1)

