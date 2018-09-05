# nutritionist
This project is a mutual project of Mey Akiva and me. 

Mey Akiva will present this project at Reversim Summit 2018 - https://summit2018.reversim.com/session/5b0d4dfc4b330d00147e3374

Project Architecture:
---------------------
<img width="952" alt="screen shot 2018-08-27 at 16 08 38" src="https://user-images.githubusercontent.com/19207742/44661491-7e9b2f00-aa13-11e8-9c6a-940fa736bfdc.png">


--------------------------------------------------------------------------------------

# Background

When was the last time you wrote an algorithm to plan your diet?

Genetic Algorithm is known for being able to solve Constraint Satifaction Problems.
Modeling our problem - what to eat in order to maintain a diat - as a Constraint Satifaction Problem
helped to better understand the use of Genetic Algorithm. 

<img width="1003" alt="screen shot 2018-08-27 at 16 13 20" src="https://user-images.githubusercontent.com/19207742/44661703-26186180-aa14-11e8-8ac5-0aec9f243dac.png">

After modeling our problem as CSP, we modeled the solutions as solutions of Genetic Algorithm: 

<img width="962" alt="screen shot 2018-08-27 at 16 15 24" src="https://user-images.githubusercontent.com/19207742/44661793-7394ce80-aa14-11e8-8214-f07116449bc6.png">


finally, this is our Genetic Algorithm flow: 

<img width="995" alt="screen shot 2018-08-27 at 15 50 04" src="https://user-images.githubusercontent.com/19207742/44660628-e603af80-aa10-11e8-918b-b3324469a082.png">


---------------------------------------------------------------------------------------

Activation: 
-----------
There are detailed activation instructions in each service Readme file.
Here I will elborate on activating and getting results from the service 'planner' 
since this is the service which activates the Genetic Algorithm.

1. Download / clone project
2. Build & run planner container  : 
        cd planner
       /planner $ scripts/run.sh build
       /planner $ scripts/run.sh up 
3. In order to make sure you did it all correctly go to the swaggerUI at this address: 
   http://localhost:9122/docs/#/ 
   
   screenshot of planner swaggerUI: 
   
   <img width="1440" alt="screen shot 2018-08-27 at 11 52 44" src="https://user-images.githubusercontent.com/19207742/44651064-015ec280-a9f1-11e8-803f-0da5000f63df.png">


For an example Activation - copy request from:
planner ->test->testData->request.json
and insert it to the swaggerUI. 
It should look like : 

<img width="1430" alt="screen shot 2018-08-27 at 13 57 03" src="https://user-images.githubusercontent.com/19207742/44656334-20fde700-aa01-11e8-9f57-6566888bb78b.png">


Then if everything works like expected your results should look like:

<img width="1397" alt="screen shot 2018-08-27 at 13 54 03" src="https://user-images.githubusercontent.com/19207742/44656215-bcdb2300-aa00-11e8-8ad1-464f865e0ca1.png">

