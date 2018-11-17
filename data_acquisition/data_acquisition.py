import requests
import os
import psycopg2
import getpass

# for connecting to remote database
# conn = psycopg2.connect(database='yourdb', user='dbuser', password='abcd1234', host='server', port='5432', sslmode='require')
# for creating local database initially
# cur.execute("CREATE TABLE Jobs(Id SERIAL PRIMARY KEY, Title TEXT, Description TEXT, Company TEXT, Location TEXT, SalaryMin INTEGER, PostURL TEXT)")
# con.commit()

# make ZipRecruiter API call
API_KEY = os.getenv("ZIPRECRUITER_API_KEY")
if API_KEY != None:
  try:
    req = requests.get("https://api.ziprecruiter.com/jobs/v1?search=internship%20Job&days_ago=1&page=1&api_key=" + API_KEY)
    response = req.json()
    if response["success"]:
      # parse ZipRecruiter's JSON response
      for job in response["jobs"]:
          title = job["name"]
          description = job["snippet"]
          company = job["hiring_company"]["name"]
          location = job["location"]
          salaryMin = job["salary_min"]
          postUrl = job["url"]
          # add to database
          con = psycopg2.connect(dbname='postgres', user=getpass.getuser(), host='localhost', password='Pa55word')
          cur = con.cursor()
          cur.execute(
            "INSERT INTO Jobs VALUES(DEFAULT,'{title}','{description}','{company}','{location}',{salaryMin},'{postUrl}') " \
            .format(title=title, description=description, company=company, location=location, salaryMin=salaryMin, postUrl=postUrl) \
          )
          con.commit()
          cur.close()
          con.close()
  except requests.ConnectionError:
    print("You are not connected to the Internet")