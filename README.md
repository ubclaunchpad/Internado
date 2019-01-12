# Internado [![Travis](https://travis-ci.com/ubclaunchpad/Internado.svg?branch=master)](https://travis-ci.com/ubclaunchpad/Internado)
Find personalized internship opportunities based on your skills and interests

## Link to in progress website
https://internado.azurewebsites.net/

## Todo (Not in order)
  * Docker
  * Travis CI
  * Skeleton for backend
  * Skeleton for frontend
  * Unit tests
  * Integration test
  * Eslint?
  * Simple scrapy application for single website
  * NoSQL and SQL database setup
  * User authentication

## User Stories
  1. As a university student, I want a personalized job board so that I can find relevant and interesting internships
  2. As a user I want to set notification for job postings based on specific criteria, so that I get notified about new opportunities and job posting deadline

## MVP
1. Database for storing user info and caching some internship opportunities
2. Scraping single website for a list of internships
3. User login (?)
4. Personalized internship suggestions based on users

## Stretch Goals
  1. Autogenerate personal websites based on users information
  2. Schedueling system to manage interviewe

## Non-Functional Requirements
  1. Handle large number of requests
  2. Perioritize job posting based on user interest and deadline


## Risks and Mitigation
  1. Algorithm for finding internships could be very complex
  2. Could be difficult to extend to more job sites due to different formatting


## Technology Stack (Options)
- Database: 
  - NoSQL, MySQL
- Web scraping: 
  - Scrappy Framework
- Backend
  - **Node.js**, Django
- Frontend
  - React Framework, Vue.js
  
[Link](https://docs.google.com/document/d/1M_syK8BHccfClnu4WLILoqCn1f8J8E3rloAbwVER1dY/edit) to project MVP

## Running the Local Project
Install all necessary node files and places them in a node_modules root directory folder
```console
foo@bar:~$ npm install
```
Builds the project and places the necesary files in a dist root directory folder
```console
foo@bar:~$ npm run build
```
Runs the project (currently on http://localhost:3000/)
```console
foo@bar:~$ npm start
```

<b>Sidenote:</b> use the following command rimraf command to clean the project (clears both the node_modules and dist folders)
```console
foo@bar:~$ npm run clean
```

## Running data_acquisition.py
If you don't have a local instance of the PostgreSQL table yet, navigate to the `server` directory and run
```console
foo@bar:~$ npm start
```
to create an empty `job` table.
Make sure con = psycopg2.connect(dbname='postgres', user=getpass.getuser(), host='localhost', password='Pa55word')
In a different terminal, navigate to the `data_acquisition` directory.

Use [pipenv](https://pipenv.readthedocs.io/en/latest/), a Python dependency and environment manager, to install any missing requirements. Note that we're using Python 3. Pipenv will install the correct version of Python based on the Pipfile, but make sure you're using a Python 3 pip.
```console
foo@bar:~$ pip install pipenv
foo@bar:~$ pipenv install
```

The next few steps covers adding the ZipRecruiter API key as an environment variable. Message Sherry for the actual API key. This isn't the **most** secure way of storing it, but better than putting it directly in the code.

To get access to the shell for the managed environment:
```console
foo@bar:~$ pipenv shell
```

Then add the API key into `.env`:
```console
(data_acquisition) foo@bar:~$ echo "export ZIPRECRUITER_API_KEY=blahblah" >> .env
```

Exit the shell using:
```console
(data_acquisition) foo@bar:~$ exit
```

To run the script: 
```console
foo@bar:~$ pipenv run python data_acquisition.py
```

Now check your `job` table again, it should be populated with data.

## Docker

### Getting Started

#### Download & Install Docker

* For Mac/Windows Editions > Pro follow this [tutorial](https://docs.docker.com/docker-for-windows/install/)
* Otherwise , you will need a VM , install Docker ToolBox which handles all of this for you , follow this [tutorial](https://docs.docker.com/toolbox/toolbox_install_windows/) 
After setting up docker run the following commands in the root directory of this project

#### Build & Run Internado

Run the following cmd which builds all docker containers but does not run them
<br>
<b>Sidenote:</b> running docker build the first time takes a lot of time , however subsequent calls will run much faster as docker caches alot of the repeated steps
```console
foo@bar:~$ docker-compose build
```

Runs all of the containers that were built above. 
```console
foo@bar:~$ docker-compose up
```
Now you can perform your request to any of the running containers much like how you would do it locally on your machine
Currently there are 4 containers that are setup to run

If you are running Docker ToolBox you will need your docker machine ip for the [HOST] which you can get by running
```console
foo@bar:~$ docker-machine ip
```
Otherwise , you can just refer to the container's name as the [HOST]

| Container Name|                      Description                     | Port |             Example             |
|:---------:|:----------------------------------------------------:|:----:|:-------------------------------:|
|   server  |                    API (back-end)                    | 5000 |   [HOST]:5000/api  |
|  postgres |                     Database                     | 5432 | use adminer/cmd line to  access |
|  adminer  |  GUI that helps you manipulate the database  | 8080 |     [HOST]:8080    |
|   client  |                   React (front-end)                  | 3000 |     [HOST]:3000    |

Regarding the db you can use the following identification parameters to connect to it through any of the
above containers

| Parameter |   Value   |
|:---------:|:---------:|
|    Host   |  [HOST] |
|  Db name  | internado |
|  Username |   admin   |
|  Password |   admin   |
|    Port   |    5432   |

### How to dump data into postgres's container 
#### Step 1 : First create the dump file
#### Step 2 : Delete all the current containers 
```console
foo@bar:~$ docker-compose down -v
```
#### Step 3 : Replace data in script found in database_config/init.sql with your dump data
#### Step 4 : Build and Run 


### Useful psql commands
* `psql -h <Host> -U <Username> <Db name>`
### Useful Docker Compose commands
  * `docker-compose ps -v`  List containers
  * `docker-compose down -v` Stop and remove containers, networks, images, and volumes
  * `docker-compose kill -v` Kill containers
  * `docker-compose logs -v` View output from containers
### Useful Docker commands
  * `docker ps` lists the status  and ID of current containers
  * `docker logs -f <Container ID>` displays real-time logs of the running docker container
  * `docker run -p 8080:5000 -d internado` to map the port 5000 to 8080; can access the app at localhost:8080
  * `docker exec -it <Container ID> /bin/bash` allows you to go inside the container

### Testing
  Run `curl -i localhost:5000/api` to check if your container is online
