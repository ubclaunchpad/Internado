--
-- PostgreSQL database dump
--

-- Dumped from database version 11.1 (Ubuntu 11.1-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.1 (Ubuntu 11.1-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: pg_buffercache; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_buffercache WITH SCHEMA public;


--
-- Name: EXTENSION pg_buffercache; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_buffercache IS 'examine the shared buffer cache';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: job; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.job (
    id bigint NOT NULL,
    job_title character varying(256) NOT NULL,
    link text NOT NULL,
    description text,
    city character varying(256),
    country character varying(256),
    latitude double precision,
    longitude double precision,
    company_name character varying(256),
    start_date date,
    salary_min integer,
    state character varying(256)
);


ALTER TABLE public.job OWNER TO admin;

--
-- Name: job_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.job_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_id_seq OWNER TO admin;

--
-- Name: job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.job_id_seq OWNED BY public.job.id;


--
-- Name: mailing_list_entry; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.mailing_list_entry (
    email character varying(256) NOT NULL
);


ALTER TABLE public.mailing_list_entry OWNER TO admin;

--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    first_name character varying(256),
    last_name character varying(256),
    email character varying(256) NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: job id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.job_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.job (id, job_title, link, description, city, country, latitude, longitude, company_name, start_date, salary_min, state) FROM stdin;
6	Software Engineer Co-op / Intern (Blockchain Projects)	https://jobs.lever.co/axiomzen/98306b74-0d0d-403f-9677-4ea04f767dce	We're looking for Back-end and Front-end Engineering Co-op Students / Interns to join us in January 2019 for a 4 month work term, with opportunity for extension. You will help us create polished and delightful interactions for our products, all while learning from some of the industry’s best. Every member of our team shares a common vision: to create the future we want to live in. We need the right people to help us realize that vision. This position is based out of our Vancouver office.\n\nWe value that each candidate brings their own unique mix of skill and experience. We set a high bar for our team members, while ensuring they have the support and guidance not just to succeed, but to excel.\n\nA Little Bit About Us:\nCryptoKitties is the world's most successful blockchain game, accounting for 25% of the traffic on the Ethereum network upon launch. Unlike cryptocurrencies such as Bitcoin or ether, CryptoKitties are crypto collectibles that secure ownership of digital art via distributed ledger technology. Since launching, tens of millions of US dollars in transactions have been conducted on the platform, with some of the game’s most popular cats selling for the equivalent of over US$100,000. The cultural phenomenon has been featured by The Wall Street Journal, Forbes, The New York Times, and VICE.\n\nOur team combines creativity and experience to test new ground in game-making—our mission is to inspire delight with the goal of attracting the first billion consumers to the world of blockchain games and digital assets.\nThe opportunity:\nYou’ll get the chance to work with emerging technologies such as blockchain and learn best practices from some of the world’s top software engineers.\nOur engineering team thrives on solving user problems with the latest tools and techniques (some of which we’ve built ourselves!). Axioms hail from startups and tech leaders like Google, Apple, Baidu, EA, and Microsoft.\nCutting-edge technology: We use state-of-the-art machine learning techniques to build our own semantic analysis technology that helped the Timeline team put news in context.\nAmazing benefits! We want Axioms to be happy and thriving, and that’s why we offer a competitive salary, unlimited vacation, holistic initiatives, active speakers budget… and more!\nOur ideal candidate:\nShow us some of the projects you’ve worked on – we're serious about this, and we'll look for sample projects in your application.\nFamiliarity with agile software development methodologies.\nFamiliarity with blockchain.\nInterest or knowledge of UX and UI design principles.\nUp-to-date knowledge of the latest technologies and you get excited about pushing the boundaries of what's possible on the web, mobile, and other emerging platforms.\nA completed or nearly completed BS/MS in Computer Science, Computer Engineering, or equivalent experience.\nMore about CryptoKitties:\nAt CryptoKitties we recruit the best and foster an environment that enables our team. That means a workplace that is diverse, inclusive, and open-minded. We welcome applicants of all backgrounds, regardless of race, colour, religion, sexual orientation, gender identity, national origin, or disability.\n\nWe offer compensation commensurate with the high level of talent we seek, a dog-friendly office–our dogs are the cutest in the industry, and we won’t be told otherwise–extensive benefits, and flexible time off policy.	Vancouver	Canada	49.3232	-123.1032	Axiom Zen	\N	\N	BC
2	Software engineering internship	https://www.ubclaunchpad.com/	This internship is not real.	Victoria	Canada	48.428400000000003	-123.3656	UBC Launch Pad	2019-06-01	3000	BC
3	Software Development Co-op (8 Months)	https://ca.indeed.com/rc/clk?jk=85ea8981a9d0b676&from=vj&sjdu=i6xVERweJM_pVUvgf-Mzud6v7vx4W2vba62rTobId37jdYVDblTWM4PXKK2vOuE2&spon=1&pos=bottom	About Us\n\nVision Critical provides customer relationship intelligence software that enables large enterprises to be fast, responsive and customer-centric. With its unique, relationship-based approach, Vision Criticals Sparq platform lets brands directly interact with communities of opted-in customers. Unlike traditional voice of customer methods, Vision Critical unlocks the real-time feedback that companies need to build better products, deliver better services and achieve better business outcomes hand in hand with their own highly-engaged, well-profiled customers.\n\nHundreds of high-performing organizations across multiple industries use Vision Criticals technology, including BuzzFeed, Aurora Health Care, LinkedIn, and more. To learn more about Vision Critical, follow us on LinkedIn or visit us at www.visioncritical.com.\n\nEqually important to the success of our business are our people. We couldnt do what we do without our awesome VCers and look forward to welcoming a new VCer, you to our VC family. Come be great with us, #TheVCWay.\n\nWanted: Aspiring software developers who are fast learners and great communicators who want to join one of the Top Employers for Young People and one of top 5 SaaS companies in Canada!\n\nVision Critical provides a cloud-based customer intelligence platform that allows companies to build engaged, secure communities of customers they can use continuously, across the enterprise, for ongoing, real-time feedback and insight. Designed for todays always-on, social and mobile savvy customer, Vision Criticals technology helps large, customer-centric enterprises discover what their customers want so they can deliver what they need. Unlike traditional customer research, which is slow, expensive and gathers dust on a shelf, Vision Criticals customer intelligence platform replaces static data and cumbersome reports with real-time actionable customer intelligence that companies need to build better products, deliver better services and achieve better business outcomes.\nWho You Are\nA Computer Science or Engineering student wanting to prove yourself, test your limits, build great software, and be mentored by top notch developers\nA team player who will contribute to an Agile team as an engineer building our industry leading SaaS product suite\nDriven, focused and results-oriented always looking to learn cutting-edge technologies\nLooking to open doors and start your career with one of the Top SaaS companies in Canada\nVery confident with at least one modern programming language\nEnjoy learning from hands on experiences such as Hackathons\nSomeone who wants to embrace a work/life balance so you can enjoy all that Vancouver has to offer\nWhat Youll Learn: Develop using a variety of cutting edge tools and technologies\nLanguages: C#, HTML5, JavaScript UI Frameworks (JQuery, AngularJS, ReactJS), CSS3, NodeJS, Python, .NET Technologies\nDatabases: SQL Server, Oracle, PostgreSQL, Redshift\nTesting: NUnit, Selenium, Specflow\nAWS Services: Virtual Servers, Load Balancing, Lambda, S3, CloudFront, Redshift, API Gateway, Glue, Kinesis and many others\nFrameworks: Terraform and serverless.com\nWhat You'll Learn: Progessive development methodologies\nFast-paced agile environment with one week sprints\nContinuous integration, continuous delivery\nTest driven development, paired programming\nWant an insider's view of Vision Critical? Check out a day in the life of a software developer at VC!\nHere is the view from our Vancouver office: http://webcam.visioncritical.com/\nAt the end of the work term, if there is a great fit, Vision Critical may provide students with the opportunity to take on full-time positions!\nIf this sounds like the perfect opportunity for you, we invite you to apply online now. Please include your school transcripts with your resume or cover letter.\n\nReady to join our team?\nIf you are interested in helping Vision Critical deliver on its commitments and taking your career to the next level, we invite you to apply online now.\nPlease note that due to the high volume of applications received, only short-listed candidates will be contacted.\nThank you for your interest in Vision Critical.\nWe are proud to be an equal opportunity workplace committed to building a team culture that celebrates diversity and inclusion.\n\n#LI-HK	Vancouver	Canada	49.323399999999999	-123.1003	Vision Critical	2019-01-01	3500	BC
4	Co-Op Software Engineer	https://careers-here.icims.com/jobs/22729/co-op-software-engineer/job?utm_source=Indeed&utm_medium=organic&utm_campaign=Indeed	Who are we?\nEver checked in somewhere on social media? Ever tracked your online orders?” You might be using HERE Technologies every single day without even realizing it. You can find us everywhere: in vehicles, smartphones, drones or third-party apps. We believe that with the right people, we will continue to be a game-changer in the technology industry and improve the daily lives of people around the world. Find out more by clicking the video below or going HERE.\n\nWe are HERE Canada, Inc. and we do work that will shape a whole new generation of location services and devices built for how you live and what you care about.\n\nHERE is the world's first pure location cloud. We are focused on all of the ways that location factors into someone's life and we look at how to make those location-oriented connections easier to deliver for our users. We are an established operation yet have the heart and spirit of a start-up. We never get tired of delighting consumers. That is why we are passionate about our products and services; we know they can make a life more meaningful.\nWhat's the role?\nWe are looking for a Software Engineer intern with experience in the development of key internal and customer-facing web applications. The Software Engineer will work closely with product and project stakeholders, developers and data analysts in a fast paced environment including multiple cloud platforms, architectures and technologies.\n\nResponsibilities:\n\nDesigns and develops software for internal and customer-facing web applications\nMaintains and enhances the test automation framework for web applications\nUtilizes software engineering tools such as debuggers, configuration management systems, and continuous integration tools in the software development process\nCollaborates and adds value through participation in code reviews, providing comments and suggestions\nProvides reliable solutions to a variety of problems using sound problem solving techniques\nWorks collaboratively and professionally with other developers in cross functional teams\nKeeps himself/herself up-to-date with the development technology\nWho are you?\nBeing a strong candidate for this role means having solid programming skills. Your previous experience gives you the background and tools to confidently pick up a code base and start contributing to it. You also need to be self-motivated, creative and proactive, and should have a strong understanding of the software development processes and methodologies.\n\nThe cadidate has to be enrolled into a BS degree in Information Systems, Computer Science, Web Systems, Electrical Engineering, Mathematics or other related degree.\n\nEqual Opportunity Employer: Race/Color/Sex/Sexual Orientation/Gender Identity/Religion/National Origin/Disability/Vets.	Burnaby	Canada	49.248800000000003	-122.98050000000001	HERE Technologies	\N	4100	BC
5	Software Engineer (Co-op) - Canada	https://jobs.cisco.com/jobs/ProjectDetail/Software-Engineer-Co-op-Canada/1232457?	What You'll Do\n\nDesign, develop, troubleshoot and debug software programs for enhancements and new products\nDevelop software and tools in support of design, infrastructure and technology platforms, including operating systems, compilers, routers, networks, utilities, databases and Internet-related tools\nDetermine hardware compatibility and/or influences on hardware design\nWho You'll Work With\n\nPlay a crucial role in driving next-gen software innovations including cloud, mobile, desktop or security spaces. You'll build applications that make technology accessible to people on a variety of devices. Imagine, design, and create solutions that have real world impact.\nWho You Are\n\nCurrently enrolled in an accredited university co-op program pursuing a bachelor's or master's degree in Computer Science, Computer/Software/Electrical Engineering, or a related major such as Math or Physics\nMinimum of a 3.0 GPA or higher\nSolid understanding of computer science fundamentals and software engineering with an aptitude for learning new technologies\nStrong knowledge of programming and scripting languages\nPossess creative problem solving skills and excellent troubleshooting/debugging skills\nExperience in establishing and sustaining excellent relationships with the extended team\nExcellent verbal and written communication skills\n\nWhy Cisco\nAt Cisco, each person brings their own unique talents to work as a team and make a difference.\nYes, our technology changes the way the world works, lives, plays and learns, but our edge comes from our people.\nWe connect everything – people, process, data and things – and we use those connections to change our world for the better.\nWe innovate everywhere - From launching a new era of networking that adapts, learns and protects, to building Cisco Services that accelerate businesses and business results. Our technology powers entertainment, retail, healthcare, education and more – from Smart Cities to your everyday devices.\nWe benefit everyone - We do all of this while striving for a culture that empowers every person to be the difference, at work and in our communities.\n\nColorful hair? Don’t care. Tattoos? Show off your ink. Like polka dots? That’s cool. Pop culture geek? Many of us are. Be you, with us! #WeAreCisco\n#univsoftwarejobs #Engineering #SoftwareEngineer #ComputerScience @WeAreCisco\n\n\nStagiaire en génie logiciel\nVos tâches\n\nConcevoir, développer, dépanner et déboguer des programmes logiciels pour apporter des améliorations et proposer de nouveaux produits\nDévelopper des logiciels et des outils de prise en charge des plateformes de conception, d'infrastructure et de technologie, notamment des systèmes d'exploitation, des compilateurs, des routeurs, des réseaux, des utilitaires, des bases de données et des outils liés à Internet\nDéterminer la compatibilité matérielle et les influences sur la conception matérielle\nVos collaborateurs\n\nVous jouerez un rôle essentiel dans la stimulation des innovations logicielles dans les domaines de l'infonuagique, de la mobilité ou des environnements de bureau et de sécurité. Vous créerez des applications permettant aux gens d'accéder à la technologie depuis différents appareils. Imaginez, concevez et créez des solutions ayant des effets concrets.\nVotre profil\n\nVous êtes actuellement inscrit à un programme de formation coopératif auprès d'une université agréée pour l'obtention d'un baccalauréat ou d'une maîtrise en informatique, en génie informatique, logiciel ou électrique, ou avec une majeure dans un domaine connexe comme les mathématiques ou la physique.\nVous avez une moyenne pondérée cumulative d'au moins 3,0.\nVous avez de solides connaissances des principes fondamentaux de l'informatique et du génie logiciel avec une capacité à apprendre de nouvelles technologies.\nVous avez une bonne connaissance des langages de programmation et de script.\nVous êtes capable de résoudre les problèmes de façon créative et possédez d'excellentes compétences en dépannage et en débogage.\nVous avez de l'expérience en matière d'établissement et de maintien d'excellentes relations avec une équipe élargie.\nVous possédez d'excellentes compétences en communication orale et écrite.\nPourquoi choisir Cisco?\n\nNous connectons les personnes, les processus, les données et les objets. Nous innovons partout, prenant des risques audacieux pour modeler des technologies permettant de construire des villes intelligentes, des véhicules connectés et des appareils de poche donnant accès aux services hospitaliers. Et nous le faisons en beauté, avec l'aide de personnalités uniques qui n'ont pas peur de changer la façon dont les gens vivent, travaillent, se divertissent et apprennent.\nNous sommes des responsables avisés, des maniaques de la technologie, des passionnés de la culture pop, et nous avons même quelques vedettes du rock aux cheveux violets. Nous célébrons la créativité et la diversité qui soutiennent nos innovations. Nous sommes des rêveurs et des créateurs.\nNous sommes Cisco.	Vancouver	Canada	49.277799999999999	-122.99299999999999	Cisco	2019-01-08	2500	BC
8	Data Science & Machine Learning Co-op / Intern	https://jobs.lever.co/axiomzen/aa874820-4fcf-4594-9485-10444cf7ecf3	We're looking for a Data Science and Machine Learning Engineering Intern to to join us in January 2019 for a 4 month work term, with opportunity for extension. You will support our team with data science analyses while learning from some of the industry’s best in our Vancouver office. Every member of our team shares a common vision: to create the future we want to live in. We need the right people to help us realize that vision.\nWe value that each candidate brings their own unique mix of skill and experience. We set a high bar for our team members while ensuring they have the support and guidance not just to succeed, but excel.\n\nA Little Bit About Us:\nCryptoKitties is the world's most successful blockchain game, accounting at peak times for 25% of the traffic on the Ethereum network. Unlike cryptocurrencies such as Bitcoin or ether, CryptoKitties are cryptocollectibles that secure ownership of digital art via distributed ledger technology. Since launching, tens of millions of US dollars in transactions have been conducted on the platform, with some of the game’s most popular cats selling for over US$150,000. The cultural phenomenon has been featured by The Wall Street Journal, Forbes, The New York Times, and VICE.\n\nWe created CryptoKitties to explore the concept of digital scarcity and introduce blockchain technology to everyday consumers. Our team of 30+ world class engineers, designers, and product leads set industry standards and pioneer innovative blockchain advancements, including developing a new type of non-fungible token, ERC-721. Recent funding includes investments from leading firms Andreessen Horowitz and Union Square Ventures.\n\nOur team combines creativity and experience to test new ground in game-making—our mission is to inspire delight with the goal of attracting the first billion consumers to the world of blockchain games and digital assets.\nWhat we’ll accomplish together:\nSetup and execution of experiments and subsequent analyses.\nSupport setting up infrastructure for deployment of data science.\nContributions to data science and production pipeline components in Python.\nThe opportunity:\nExplore emerging tech: You’ll get the chance to work with emerging technologies (like blockchain) and learn best practices from some of the world’s top software engineers.\nCustom-built tools: Our engineering team thrives on solving user problems with the latest tools and techniques (some of which we’ve built ourselves!). Axiom Zen team members hail from startups and tech leaders like Google, Apple, Baidu, EA, and Microsoft.\nCutting-edge technology: We use state-of-the-art machine learning techniques to build our own semantic analysis technology that helped the Timeline team put news in context (and win a few Apple awards while they were at it).\nAmazing benefits! We want Axioms to be happy and thriving, and that’s why we offer a competitive salary, unlimited vacation, holistic initiatives, active speakers budget… and more!\nOur ideal candidate:\nStrong grasp of CS fundamentals, algorithms, data structures, and design patterns.\nStrong background of statistical modelling, data mining, and machine learning.\nExcellent coding skills and experience using Python (including NumPy, SciPy, pandas).\nComfortable writing complex SQL queries.\nOutstanding communication and presentation skills.\nBonus points for the following:\nFamiliarity and comfort with git and GitHub.\nHands-on experience in implementing a successful applied industrial software using ML techniques.\nProficiency in developing multidimensional data visualizations using modern Dashboard/Reporting/Analytics solutions.\nExperience with the application of machine learning for supervised, unsupervised, semi-supervised, or reinforcement learning tasks.\nMore about CryptoKitties:\nAt CryptoKitties we recruit the best and foster an environment that enables our team. That means a workplace that is diverse, inclusive, and open-minded. We welcome applicants of all backgrounds, regardless of race, colour, religion, sexual orientation, gender identity, national origin, or disability.\n\nWe offer compensation commensurate with the high level of talent we seek, a dog-friendly office–our dogs are the cutest in the industry, and we won’t be told otherwise–extensive benefits, and flexible time off policy.	Vancouver	Canada	49.3232	-123.1032	Axiom Zen	\N	3100	BC
10	Intern, Software Engineer	https://hire.withgoogle.com/public/jobs/loginradiuscom/view/P_AAAAAAEAAB7PoNOGvgww0k?trackingTag=indeedFeed&trackingTag=indeedFeed	About Us \n\nLoginRadius was established in 2012 with the mission to simplify the way in which businesses can effectively connect with their customers while ensuring data security and privacy. We have grown exponentially from a small startup to a multi-faceted, industry-leading customer identity and access management platform that is trusted by over 3,000 businesses worldwide. LoginRadius is headquartered in Vancouver, Canada and is a global company with clients in over 100 countries and offices in United States, United Kingdom, Australia and India. \n\nOur Culture \n\nWe embrace the startup vibe of being agile, with open communication and teamwork. We’ve created a work environment where you’ll learn, challenge status quo, let your creative juices flow, and have your voice heard. In short, we move fast, we learn from our mistakes and we enjoy hanging out. Come join us! Learn more about us at \nwww.loginradius.com [http://www.loginradius.com]! \n\nWe are looking for a Software Engineer Intern with an understanding in the field of software development. The candidate should be willing to work in start-up environment and take on new challenges. As an intern, you will be working with LoginRadius engineering team to learn and develop new features in the LoginRadius platform. \n\nYour Role... \n\nLearn to develop web applications and LoginRadius Dashboard\nDevelop integrations with 3rd party applications by connecting multiple REST APIs\nDemonstrate consistent improvement in your coding skills, issue-tracking and source control systems, and agile development mentality\nResponsible for application component development, maintenance, and support of existing applications\nTaking ownership of developing small modules while maintaining quality\nResponsible for development and maintenance of LoginRadius API libraries\nContribute to technical innovation within LoginRadius engineering team\nResponsible for testing existing web applications\nResponsible for creating and maintaining technical documentation\nWhat you will bring to the table... \n\nKnowledge of test driven development in NodeJS, expressJS, AngularJS, RequireJS\nGood knowledge in developing and testing REST APIs\nGood understanding of CSS, HTML, JavaScript\nMust have hands on knowledge in Object Oriented Programming and design and maintenance of Rest APIs\nWorking knowledge of Social APIs such Facebook, Google, Twitter, etc.\nExcellent communication skills and strong attention to detail\nExtremely well organized with an analytical mind\nGreat integrity and work ethic\nSoftware development with several side/school projects and may be in the open source community\nWorking towards a degree in computer science, computer engineering or a related field\nCompany Perks… \n\nCompetitive compensation\nFree daily breakfast and weekly catered lunches\nYou will learn more in your first 3 months than you probably ever have before\nGrowth is #1, that includes your career\nA fully stocked snack cupboard makes strategy sessions great\nFun company outings\nCasual dress code	Vancouver	Canada	49.2044	-123.12220000000001	LoginRadius	2019-01-02	2400	BC
1	Fake internship	https://github.com/ubclaunchpad/Internado/	This is a fake internship for testing purposes.	Vancouver	Canada	49.282699999999998	-123.1207	Internado	2019-01-02	4000	BC
7	Software Dev QA Co-op (CARD2366)	http://careers2.hiredesk.net/viewjobs/JobDetail.asp?Comp=fortinet&TP_ID=1&PROJ_ID={b1f386bd-9eb9-4e83-9123-cbcf711e3175}&bid=326&tid=x_73db82b2-0470-49f4-b896-21ce98fd134c&LAN=en-US	Fortinet is looking for a Software Dev QA Engineer to join our UI (User interface) Development team to focus on GUI testing. As a team member, you would be responsible for testing the FortiOS GUI for managing FortiGate firewall appliances. You will be working closely with the interface development team to verify new features, automate test cases and improve interface usability and performance.\nThis is an exciting opportunity to work with the latest in web application and networking technologies, such as Security Fabric, Next Generation Firewall, UTM security, cloud application control, VPN management, WiFi network topologies, and firewall monitoring.\n\nJob Responsibilities:\n\nExecute feature and bug fix testing for FortiOS GUI application using a combination of manual and automated\ntesting techniques. * Identify, document, and track software defects found during testing. * Automate front-end testing using automation tools such as Appium, Selenium. * Improve testing and development processes using various automation techniques. * Work closely with developers to ensure defects are correctly identified and fixed.\n\nJob Skills Required:\n\nSoftware testing experience including browser testing\nDemonstrated ability to logically and analytically troubleshoot mobile/web applications\nKnowledge of general QA procedures and methodologies, as well as software development fundamentals\nBasic networking knowledge (IP, NAT, Firewall, Routing)\nDemonstrated ability to write clear and reproducible problem reports, and test results\nExperience with automation testing tools is an asset\nExperience in code review systems and bug tracking services is an asset\nExperience working in a Linux environment\nDemonstrated skills in scripting languages such as Python, bash or Perl are considered assets\n\nEducational Requirements:\n\nA degree or technical diploma in Computer Science, Computer Technology, or related field	Burnaby	Canada	49.322299999999998	-123.02209999999999	Fortinet	\N	3900	BC
9	Software Dev QA Co-op	http://careers2.hiredesk.net/viewjobs/JobDetail.asp?Comp=Fortinet&sPERS_ID=&TP_ID=1&JB_ID=&PROJ_ID=%7BB1F386BD-9EB9-4E83-9123-CBCF711E3175%7D&LAN=en-US&BackUrl=viewjobs/Default.asp&ccuid=15792325325	Fortinet is looking for a Software Dev QA Engineer to join our UI (User interface) Development team to focus on GUI testing. As a team member, you would be responsible for testing the FortiOS GUI for managing FortiGate firewall appliances. You will be working closely with the interface development team to verify new features, automate test cases and improve interface usability and performance.\nThis is an exciting opportunity to work with the latest in web application and networking technologies, such as Security Fabric, Next Generation Firewall, UTM security, cloud application control, VPN management, WiFi network topologies, and firewall monitoring.\n\nJob Responsibilities:\n\nExecute feature and bug fix testing for FortiOS GUI application using a combination of manual and automated\ntesting techniques.\nIdentify, document, and track software defects found during testing.\nAutomate front-end testing using automation tools such as Appium, Selenium.\nImprove testing and development processes using various automation techniques.\nWork closely with developers to ensure defects are correctly identified and fixed.\n\nJob Skills Required:\n\nSoftware testing experience including browser testing\nDemonstrated ability to logically and analytically troubleshoot mobile/web applications\nKnowledge of general QA procedures and methodologies, as well as software development fundamentals\nBasic networking knowledge (IP, NAT, Firewall, Routing)\nDemonstrated ability to write clear and reproducible problem reports, and test results\nExperience with automation testing tools is an asset\nExperience in code review systems and bug tracking services is an asset\nExperience working in a Linux environment\nDemonstrated skills in scripting languages such as Python, bash or Perl are considered assets\n\nEducational Requirements:\n\nA degree or technical diploma in Computer Science, Computer Technology, or related field	Burnaby	Canada	49.322299999999998	-123.02209999999999	Fortinet	\N	3500	BC
\.

--
-- Data for Name: mailing_list_entry; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.mailing_list_entry (email) FROM stdin;
test@test.com
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, first_name, last_name, email, password) FROM stdin;
1	\N	\N	test@gmail.com	$2b$10$I8Eroo7zAoo/CmRvIs5IQOMm0XNYtghLAUiTM1y2.ViPCA6WpwN0y
\.


--
-- Name: job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.job_id_seq', 11, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: mailing_list_entry PK_fc74ee356fba380b89ed251ee78; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mailing_list_entry
    ADD CONSTRAINT "PK_fc74ee356fba380b89ed251ee78" PRIMARY KEY (email);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: job job_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);


--
-- Name: IDX_9cf9266afaef23aa87eb944133; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "IDX_9cf9266afaef23aa87eb944133" ON public.job USING btree (link);


--
-- PostgreSQL database dump complete
--

