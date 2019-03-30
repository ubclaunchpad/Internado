# Internado [![Travis](https://travis-ci.com/ubclaunchpad/Internado.svg?branch=master)](https://travis-ci.com/ubclaunchpad/Internado)
Find personalized internship opportunities based on your skills and interests

## :earth_americas: Links to in progress website
https://internado.ubclaunchpad.com/
https://internado.azurewebsites.net/

## :computer: Running Locally

### Running Job/Auth Servers
| Server         | IP        | PORT | Example                   |
|:----------------:|:-----------:|:------:|:---------------------------:|
| Job Search     | localhost | 5000 | http://localhost:5000/api |
| Authentication | localhost | 5050 | http://localhost:5050/api |

Install all necessary node files and places them in a node_modules root directory folder
```console
foo@bar:~$ npm install
```
Builds, Lints and Runs the corresponding server
```console
foo@bar:~$ npm start
```
#### Useful scripts
* clean : Clears dist folder (where ts files are transpiled into js)
```console
foo@bar:~$ npm run clean
```

* lint : Runs ts linter
```console
foo@bar:~$ npm run lint
```

* build : Builds ts files (found in src folder) into js (to be generated into dist folder) 
```console
foo@bar:~$ npm run build
```

* dev : Auto-builds ts files into js and runs server
```console
foo@bar:~$ npm run dev
```

* start : Builds , lints and starts server
```console
foo@bar:~$ npm start
```

* prepare : Builds and lints only
```console
foo@bar:~$ npm run prepare
```

### Running client
Install all necessary node files and places them in a node_modules root directory folder
```console
foo@bar:~$ npm install
```

Runs the client (currently on http://localhost:3000/)
```console
foo@bar:~$ npm start
```

### Running data_acquisition.py
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

## :whale: Running on Docker

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
|   server  |                    Job API (back-end)                    | 5000 |   [HOST]:5000/api  |
|   auth  |                    Auth API (back-end)                    | 5050 |   [HOST]:5050/api  |
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

## Swagger
The server project is configured to display the Swagger UI front end. This front end serves 
a kind of interactive documentation where you can test out the endpoints we have used. 
Swagger uses the OpenAPI format to specify the API, and this file is found at 
`server/swagger.json`. 

### How to access Swagger
1. Build and run the server
2. Access `localhost:[5000,5050]/swagger` in your browser
3. Explore the request and response templates of endpoints by clicking on them to expand them

### Using Swagger to hit API endpoints
1. Go to the swagger page in your browser
2. Select which endpoint you want to test by clicking it
3. Click 'Try it out'
4. Fill in the fields in the parameters with the values you want to test with
5. Click 'Execute'
6. View the response in the 'Responses' section below
