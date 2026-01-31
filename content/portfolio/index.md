---
title: "Portfolio"
date: 2026-01-10T21:24:13+02:00
author: "Ragheed"
excerpt: ""
description: "Portfolio"
draft: false
math: true
toc: true
categories: []
tags: []
---

# Portfolio

In the following, you can find a list of projects I worked on either during my academic or professional career. For academic projects, I'll link each to its GitHub repository. However, projects developed during my professional career are classified; therefore, I hope a comprehensive description would suffice.


# Professional Career Projects

## E-Axle Development & Testing ([Dana Graziano](https://www.dana.com/ "Dana Incorporated") | [Atesteo GmbH & Co. KG](https://atesteo.com/ "Atesteo GmbH & Co. KG"))

### Description
As a *Mechatronics Testing Engineer @ Dana Graziano*, my role in this project was to assist in the development and testing of an e-axle to a well-known OEM around the globe. The e-axle in subject consists of a housing encompassing 2 independent electric motors sharing one inverter, each linked to the rear wheel of the corresponding side of the car via a 2-stage speed-reducer.

### Duration
I worked on this project in the aforementioned role during the prototyping and design validation phases.

I'm still following this project in my current role as *Engineering Project Manager @ Atesteo* during the production process validation phase.

### Tasks
My main tasks are/were the following:
+ Disucss and modify test specifications with *Lead Testing Engineer* and *System Validation Engineer* based on stakeholder requirements.
+ Support *CAD Engineers* with the development of required fixtures for said tests (mechanical interface).
+ Support electricians with the development of required cables to power the e-axle and communicate with it (electrical and communication interface).
+ Supervise outsourced tests.
+ Supervise and/or execute internal tests.
+ Data post-processing, reporting, and presenting for all tests.
+ Corrective action analysis, development, and implementation in case of failures.
+ Software debugging with *Software Development Team*.

### Tests
The tests developed and executed on the e-axle are organized in 2 different categories:
1. Mechanical-based: where only mechanical components are concerned.
2. System-based: where the whole e-axle as a system is considered.

The list of tests is comprised of the following:
+ Oil Cump Characterization
+ Lubrication Evaluation
+ Gear Contact Pattern
+ Backlash and Torsional Stiffness Measurement
+ Mechanical and System Efficiency
+ Mechanical and System Durability
+ Mechanical Torque-to-Failure (TTF)
+ Scuffing Test
+ System Performance
+ System Environmental Tests
+ End-of-line (EOL)

### Tools Used
For handling the test development, execution, and reporting, the following tools were used:
+ ***CANape*** as a signal measurement and logging tool as well as diagnostic tool for XCP parameter calibration.
+ ***LabVIEW*** as an automation system development tool to control internal benches.
+ ***VBA for Excel*** for automated data post-processing and product certification.
+ ***MATLAB*** for virtual analysis on bench setup performance and data post-processing.
+ ***Python*** for creating data post-processing tools and generating them as executables (.exe) for distribution across team members.
+ ***JIRA*** for tracking different issues to implement corrective actions across the global team.
+ ***Siemens Polarion*** for tracking stakeholder requirements and linking them to the corresponding test cases and specifications.
+ ***Creo CAD*** for the development of mechanical interfaces and CAD handling.

---

## CFD Analysis for Aerodynamics Performance ([AEHRA](https://aehra.com/))

### Description
As a *CFD Analyst @ Aehra*, my role in this project was to evaluate the aerodynamics performance of 2 models by performing iterative CFD simulations and analyses. Working under the supervision of one of the top designers worldwide, I learnt a lot from this experience, especially when it comes to car shape design. The main challenge was to come up with an innovative design that would define the DNA of electric vehicles, taking advantage of luxurious ergonomics and maintaining high aerodynamics performance.

### Duration
I worked on this project for 1 year, during the prefeasibility study of the 2 models.

### Tasks
Working with 3 designers, I had the following responsibilities in this project:
+ CAD Cleaning
+ CFD Simulation & Analysis
+ CAD Modification
+ Reporting

### Tools Used
To achieve the tasks, the following tools were used:
+ ***Autodesk Alias*** for CAD cleaning and modification.
+ ***Simcenter Star-CCM+*** for CFD simulation and analysis.

---

## Masters Thesis ([General Motors](https://www.gm.com/ "General Motors"))
Although a masters thesis might seem like an academic project, I decided to put it under this section specifically because it was a paid internship concerning a case study for ***GM***. 

### Description 
Titled *"Global Engine Durability On Cylinder Head and Block Related to The Physical Test Duration"*, the thesis proposes an elaborate methodology to perform finite-element fatigue simulations on a combustion engine's head and block, highlighting the contribution of specific key factors for better accuracy.

To verify its claim of better acccuracy, the methodology was tested on an already existing engine by comparing the results with previous simulation methodologies. Moreover, the new methodology relies on a different fatigue algorithm that outputs the lifetime in hours, as opposed to the previous methodology, which only provided a safety factor. This latter point allowed for a direct comparison between simulation results and the results coming from the real physical test, which indeed showed that the new methodology is significantly accurate.

### Duration
I worked on this project for 6 months.

### Tasks
As a *CAE Intern*, the main tasks constituted of the following:
+ Understanding the topic of the thesis from a theoretical and technical perspective.
+ Research available literature for different proposals.
+ Learn how to operate used software for building model setups and running simulations.
+ Propose and discuss different alternatives with local (Italy) and global (North America) teams.
+ Continuous reporting on progress.
+ Writing the thesis and presenting it.

### Tools Used
To achieve this milestone, the following tools were used:
+ ***Altair HyperMesh*** as a finite element pre-processor with ***Abaqus*** as the non-linear thermo-structural finite element solver.
+ ***FE-Safe*** for fatigue analysis on finite element models.
+ ***MATLAB*** for comparing different fatigue algorithms on simplified models.
+ ***Python*** for defining a new durability cycle on ***FE-Safe*** based on the engine specs.
+ ***General Motors internal tools*** for precise material card modeling.

---

# Academic Career Projects

## PyGRITbx

### Description
"**[Python-based Gearbox Realiability and Integrity Toolbox](https://github.com/Rmhuneineh/pygritbx "PyGRITbx")**" is a comprehensive python toolbox based on a project that 3rd year mechanical engineering students seeking their bachelor degree at [Politecnico di Torino](https://www.polito.it/ "Politecnico di Torino") following the course *"Fundamentals of Machine Design"* must report.

### User's Tasks
To benefit from the toolbox, the user should perform the following:
+ Define a reference frame.
+ Define locations of gears and bearings on shafts with respect to the shafts' rotating axes.
+ Define object representing input motor.
+ Define material cards for shaft(s) and gear(s).
+ Define objects representing gears (spur, helical, or bevel).
+ Define objects representing bearings (only SKF bearings supported).
+ Define object representing output load.
+ Define gearbox configuration via shafts and gear meshes.
+ Define shaft(s) profile(s) with fillets.
+ Define sections of interest.
+ Define oil characteristics.

### Toolbox Capabilities
After having defined objects representing the gearbox components and their interaction, the user would proceed with exploiting the toolbox's solver to perform the following:
+ Use ***.solve()*** function on shafts to calculate reaction forces, and on gears to calculate forces on teeth.
+ Use ***.performStaticVerification()*** function on shafts to calculate internal loads and stresses across the shaft's profile; as well as, the static safety factor on the sections of interest.
+ Use ***.performFatigueVerification()*** function on shafts to plot Haigh Diagram and calculate fatigue safety factor on sections of interest.
+ Use ***.analyseGearToothBending()*** function on gears to calculate maximum gear tooth bending stress for fatigue and the gear tooth bending safety factor.
+ Use ***analyseGearToothPitting()*** function on gears to calculate maximum gear contact stress and the wear safety factor.
+ Use ***performLifeAnalysis()*** function on bearings to:
  1. Check minimum load condition.
  2. Calculate bearing's equivalent static load.
  3. Calculate static safety factor.
  4. Calculate reliability factor.
  5. Calculate equivalent dynamic load.
  6. Calculate contamination factor based on given conditions.
  7. Calculate bearing life.

### Future Plans & Contribution
Starting from excel, switching to MATLAB, and finishing with Python, I worked on this project for several years to have it polished in this latest version. However, the project has yet some potential in it that should be exploited and I would welcome any contributors with ideas or technical skills.
Specifically, I would like to implement the following in the near futur:
+ Hollow shafts profile definition with internal and external radii.
+ Discretize the shaft profile into a mesh of computational nodes holding values of internal loads and stresses to plot a contour representing them.
+ Bearing positioning optimization analysis.

---

## Use of a Fractal Model for Combustion Engine Prediction in a SI Engine Running on HCNG: Speed and Load Effect
### Description
This was my bachelor's degree thesis project under the supervision of [Professor Mirko Baratta](https://www.polito.it/en/staff?p=mirko.baratta). With the help of an already-developed fractal combustion model, I worked on ***GT-Suite*** to perform combustion simulations and verify the results with those coming from lab experiments. The aim was to verify the model's behaviour as engine speed and load changed.

---

## Dual-Clutch Transmission Output Shaft Design
### Description
Developed while following the course "*Powertrain Components Design*", we were separated into different teams, each responsible for the design of certain components to develop a DCT given the engine's characteristics. My team and I were responsible for the output shafts design. Instead of opting for conventional methods, we defined a new optimization methodology aiming at the reduction of material and thus the mass of the shafts by solving a 6th order polynomial at each increment along the shafts' axes for different gear engagements.

+ Feel free to check the MATLAB live script: [DCT_OutputShaft](https://github.com/Rmhuneineh/DCT_OutputShaft)

---

## WheelArch
### Description
Developed while following the course "*Car Body Design*", the task was to simply design the wheel arches for any car available alread on the market, for which the specs can be easily found online. Being the first step in the ergonomics study of a vehicle, wheel arch design is essential for the definition of the firewall which separates the passenger and the engine compartments. Once the firewall is placed, the pedals can be positioned and based on anthropomorphic data for different markets, the driver seat can be placed after which all the passengers can be positioned.

Although it might seem like a boring task, it would be if performed only for one car. However, I tried to make this project interesting by learning the GUI tool in MATLAB to develop an application/toolbox that can be downloaded by anyone having a MATLAB license. This then allowed me to verify its functionality by testing it on more than one car.

The tool can also perform a 2-degrees of freedom quarter car model analysis based on a chosen road grade and vehicle speed. An optimization of the damping coefficient for the damper can be performed.

+ GitHub link: [WheelArch](https://github.com/Rmhuneineh/WheelArch)
+ Mathworks link: [WheelArch](https://www.mathworks.com/matlabcentral/fileexchange/79508-wheelarch)

---

## Vehicle Longitudinal Dynamics, Acceleration Performance, and Fuel Consumption
### Description
Marking as my first serious project programmed in MATLAB, this project is the first out of 5 that we worked on while following the course "*Motor Vehicle Design*". Given a car's characteristics and an engine map containing specific fuel consumption and mean effective pressure as a function of engine rotational speed, we were asked to:
+ Calculate and plot the power needed for motion according to the car's specifications at different road inclinations.
+ Calculate and plot power available by the internal combustion engine.
+ Perform gradeability and initial choice of the transmission ratios.
+ Compute the maximum power that can be transferred by the tires to the ground.
+ Perform acceleration performance of the car when equipped with the given engine and after freezing transmission ratios.
+ Compute fuel consumptioni for the NEDC driving cycle.

*Note: I would like to rewrite the code in Python using POOP so as to generalize the code as much as possible.*
+ GitHub link: [MVD_Project-1](https://github.com/Rmhuneineh/MVD_Project-1/tree/master)

### Further Projects
The 4 remaining projects developed during this course can be found via the following links:
+ [**Linear and Non-linear Behaviour of Tires**](https://github.com/Rmhuneineh/MVD_Project-2)
+ [**Kinematic Behaviour of a Vehicle Front Suspension**](https://github.com/Rmhuneineh/MVD_Project-3)
+ [**Braking Analysis**](https://github.com/Rmhuneineh/MVD_Project-4)
+ [**Vehicle Lateral Dynamics**](https://github.com/Rmhuneineh/MVD_Project-5)