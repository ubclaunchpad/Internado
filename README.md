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

In a different tab, navigate to the `data_acquisition` directory.

Use [pipenv](https://pipenv.readthedocs.io/en/latest/), a Python dependency manager, to install any missing requirements. Note that we're using Python 3.
```console
foo@bar:~$ pip install pipenv
foo@bar:~$ pipenv install
```

You'll have to add the ZipRecruiter API key as an environment variable. This isn't the **most** secure way of storing it, but better than putting it directly in the code.

To get access to the shell for the managed environment:
```console
foo@bar:~$ pipenv shell
```

Then open its `.env` file:
```console
(data_acquisition) foo@bar:~$ vim .env
```

add `export ZIPRECRUITER_API_KEY="blahblahblah"` to the file. Message Sherry for the key. Save the file.

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
  Make sure docker is installed. This is only currently useful for single container development purposes. Docker Compose can be used to streamline the process when deploying multiple containers.
### Setup
  1. `docker build internado .` while you are in the same directory of `Dockerfile`
  2. `docker run -p 8080:5000 -d internado` 
  3. The container should now be running in the background and can be accessed at port 8080. We can curl the docker container that runs in the background now
### Useful commands
  * `docker ps` lists the status  and ID of current containers
  * `docker logs -f <Container ID>` displays real-time logs of the running docker container
  * `docker run -p 8080:5000 -d internado` to map the port 5000 to 8080; can access the app at localhost:8080
  * `docker exec -it <Container ID> /bin/bash` allows you to go inside the container
### Docker Compose
  * `docker-compose up` builds and spins up containers according to docker-compose.yml. Will only build for the first time
  * `docker-compose up --build` for spinning up containers with updated code.
### Testing
  Run `curl -i localhost:5000/api` to check if your container is online
