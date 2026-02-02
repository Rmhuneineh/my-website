---
title: "PyGRITbx - Tutorial Series Part 1"
date: 2026-01-31T15:13:13+02:00
author: "Ragheed"
excerpt: ""
description: "Gearbox configuration definition. Calculating forces."
draft: true
math: true
toc: true
categories: ["Mechanical Engineering", "Programming Tutorial"]
tags: ["Machine Design"]
---

## Outline
This blog post is the first part of a 3-part series. In this series, I would like to introduce you to my python toolbox with a tutorial based on a project given to mechanical engineering students following the course **"02SXJJM - Fundamentals of Machine Design"** at **Politecnico di Torino**. My best hope is that this series would serve as a guide for the reader in future projects concerning geargbox design validation. 

In this part, you will learn how to:
1) Install the toolbox along with the necessary tools.
2) Define the components inside the gearbox as python objects.
3) Configure the interactions between different components via shafts and meshes.
4) Calculate the reaction forces on the bearings based on the given operating point.

Please feel free to contribute by sharing your thoughts regarding either the tutorial itself, the toolbox, or both.

### Prerequisites
To follow this series, it's expected that the reader:
- has studied applied mechanics (or the like)
- has basic programming skills (python is used here)
- is aware of engineering terms like: *stress*, *static and fatigue verification*, *safety factor*, *stress concentration factors*, *Haigh diagram*
- is using **Visual Studio Code** with **Jupyter** and **Pylance** extensions installed 

## What is PyGRITbx?
[***Python-based Gearbox Realiability and Integriy Toolbox***](https://pypi.org/project/pygritbx/ "PyGritbx") assists mechanical engineering students (or even engineers) working on the design verification of a gearbox. Given an operating point as a boundary condition, the toolbox calculates the loads on the components constituting the gearbox (gears, shafts, and bearings), and verifies the design/choice of each component based on its defined properties. The toolbox is built and can only be used with python.

## How do I use it?
It's recommended to use the **Jupyter** extension within **Visual Studio Code** to define and analyze a specific gearbox configuration, as well as perform all the required analyses. The reason is that with **Jupyter**, the user can write the code in a series of blocks and run each block separately. In this specific context, this allows the user to perform step-by-step definitions and calculations in order to perform all the required analyses sequentially.

Having **Pylance** as yet another **Visual Studio Code** extension helps the user with recommendations while coding the problem at hand. For example, when defining components by their corresponding characteristics, **Pylance** will give recommendations on the characteristics that need to be defined based on the *Class* to which the specific component belongs. More on that in the next sections.

### Installation
To install the toolbox:
1) Install [**Python**](https://www.python.org/downloads/ "Python").
2) Open the ***Command Prompt*** (Windows) or ***Terminal*** (MacOS) (addressed as ***cmd*** in the rest of the tutorial).
3) If you don't use environments in your python devlepment, proceed to step **4**. If you use environments in your python development, either activate a desired environment or create a new one and activate it.
4) Type `pip install pygritbx` then hit the enter key.
5) Note that the toolbox relies on [**Numpy**](https://numpy.org/ "Numpy"), [**Matplotlib**](https://matplotlib.org/ "Matplotlib") and [**Scipy**](https://scipy.org/ "Scipy"). Therefore, make sure they are installed before proceeding to use the toolbox. In theory, these libraries will be installed automatically with the toolbox but it's better to make sure they're there before starting any project.
6) Make sure you have the latest version of the toolbox by first typing `python` into your ***cmd*** then hit enter. Once python is activated, type `import pygritbx as pgt` then hit enter. After that type `print(pgt.__version__)` and hit enter. This will print the version number of the toolbox that you have currently installed. Make sure it's the same version number as the one shown following this [**link**](https://pypi.org/project/pygritbx/ "PyGritbx").

To install **Visual Studio Code**, choose the right one based on your computer's operating system: [**VS Code**](https://code.visualstudio.com/download "VS Code")

### First Lines of Code as a Check
Create an empty folder and open it with **VS Code**. Create a new file and, for simplicity, let's call it **"project.ipynb"**. Open the file and add a new code block by pressing on **"+ Code"**. Inside the block, type the following:

```python
import numpy as np
import pygritbx as pgt
print(pgt.__version__)

# output example:
# 1.1.2
```
Making sure the block is selected you can press **Shift+Enter** to execute the code and show the output which in this case is the version number of the toolbox you have installed. In this block, we also import **Numpy** which we will use in the next block.

Add another block to define the reference frame that we will use in the project:
```python
i = np.array([1, 0, 0])
j = np.array([0, 1, 0])
k = np.array([0, 0, 1])
RF = np.array([i, j, k])
```
Make sure to press **Shift+Enter** to run the code in the block.

The unit vectors **i**, **'j'**, and **'k'**, correspond to the **'x'**, **'y'**, and **'z'** axes, respectively. You can think of **RF** as the reference frame holding the three unit vectors together.

To proceed with our project, we must first understand the characteristics of its underlying components. Therefore, in the next section, we will check how to define the necessary objects one by one.

## Gearbox Configuration
The gearbox we will attempt to analyze in this tutorial can be seen in [**Figure 1**](#figure-1). This is taken from the project of the academic year **2024/2025**. The gearbox is composed of:
1) Input shaft **A1** transmitting power from the input motor via key **L1** to gear **R1**. The shaft is supported by bearings **A** and **B**.
2) Gear mesh transmitting power from gear **R1** to gear **R2**. Denote it by **M1**.
3) Intermediate shaft transmitting power from gear **R2** to gear **R3** by spinning around the spindle **P**.
4) Gear mesh transmitting power from gear **R3** to gear **R4**. Denote it by **M2**.
5) Output shaft **A2** transmitting power from gear **R4** via key **L2** to the output user via the key **L3**. The shaft is supported by bearings **C** and **D**.

<figure id="figure-1">
    <img src="figure1_gearbox_assembly.png" alt="Gearbox Assembly">
    <figcaption>Figure 1 - Gearbox Assembly</figcaption>
</figure>

A simplified scheme can be seen in [**Figure 2**](#figure-2). In this scheme, we can see the orientation of the:
1) input angluar velocity
2) input torque
3) output load (forces and torque)
4) gear tooth inclination

with the respect to the given reference frame.

<figure id="figure-2">
    <img src="figure2_gearbox_scheme.png" alt="Gearbox Scheme">
    <figcaption>Figure 2 - Gearbox Scheme</figcaption>
</figure>

### Input Motor
Starting with the input motor, the given characteristics are shown in [**Table 1**](#table-1).

<table id="table-1"
       style="margin: 1.5rem auto; border-collapse: collapse;">
  <caption style="
      caption-side: bottom;
      text-align: center;
      font-size: 0.9rem;
      color: #666;
      margin-top: 0.5rem;">
    Table 1 - Input Motor Operating Point
  </caption>

  <thead>
    <tr>
      <th style="text-align: center;">Power [W]</th>
      <th style="text-align: center;">Speed [rpm]</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style="text-align: center;">6000</td>
      <td style="text-align: center;">2750</td>
    </tr>
  </tbody>
</table>

To define the input motor in our code:

```python
# Input Motor
input_motor = pgt.Motor(name="Input Motor", power=6e3, n=2750, axis=+k)
```

This defines the input motor object **input_motor** with the label **"Input Motor"**, power set to **"6000 [W]"**, rotational speed set to **"2750 [rpm]"**, and rotating around the **"z-axis"** in the positive direction.

Note that a **Motor** object is represented by the power equation which is the product of torque and rotational speed: 

$$
Power = Torque * Speed
$$

Therefore when defining a **Motor** object, it's necessary to provide at least 2 out of these 3 values and the toolbox will calculate the third.

In this particular case, we provide the object definition with **power** and **speed**; hence, the toolbox will automatically calculate the torque vector. This can be checked by executing the following:

```python
print(input_motor.ETs[0].torque)

# output
# [ 0.          0.         20.83482891]
```

By first converting the rotational speed unit to **[rad/s]**, the toolbox then divides the power by the converted speed value to get the torque as a vector acting in the same direction as the rotational speed.

### Gears

Next, we are the given the gears' characteristics which can be seen in [**Table 2**](#table-2).

<table id="table-2"
       style="margin: 1.5rem auto; border-collapse: collapse;">
  <caption style="
      caption-side: bottom;
      text-align: center;
      font-size: 0.9rem;
      color: #666;
      margin-top: 0.5rem;">
    Table 2 - Gears Characteristics
  </caption>

  <thead>
    <tr>
      <th style="text-align: center;">Property</th>
      <th style="text-align: center;">R1</th>
      <th style="text-align: center;">R2</th>
      <th style="text-align: center;">R3</th>
      <th style="text-align: center;">R4</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style="text-align: center;">Normal Module (m<sub>n</sub>) [mm]</td>
      <td style="text-align: center;">2.5</td>
      <td style="text-align: center;">2.5</td>
      <td style="text-align: center;">2.5</td>
      <td style="text-align: center;">2.5</td>
    </tr>
    <tr>
      <td style="text-align: center;">Number of teeth (z) [-]</td>
      <td style="text-align: center;">18</td>
      <td style="text-align: center;">73</td>
      <td style="text-align: center;">19</td>
      <td style="text-align: center;">51</td>
    </tr>
    <tr>
      <td style="text-align: center;">Helix Angle (&psi;) [&deg]</td>
      <td style="text-align: center;">20</td>
      <td style="text-align: center;">20</td>
      <td style="text-align: center;">20</td>
      <td style="text-align: center;">20</td>
    </tr>
    <tr>
      <td style="text-align: center;">Normal Pressure Angle (&Phi;<sub>n</sub>) [&deg]</td>
      <td style="text-align: center;">20</td>
      <td style="text-align: center;">20</td>
      <td style="text-align: center;">20</td>
      <td style="text-align: center;">20</td>
    </tr>
    <tr>
      <td style="text-align: center;">Transmission Accuracy Level (Q<sub>v</sub>) [-]</td>
      <td style="text-align: center;">7</td>
      <td style="text-align: center;">7</td>
      <td style="text-align: center;">7</td>
      <td style="text-align: center;">7</td>
    </tr>
    <tr>
      <td style="text-align: center;">Tooth Face Width [mm]</td>
      <td style="text-align: center;">30</td>
      <td style="text-align: center;">30</td>
      <td style="text-align: center;">30</td>
      <td style="text-align: center;">30</td>
    </tr>
    <tr>
      <td style="text-align: center;">Ultimate Strength (&sigma;<sub>u</sub>) [MPa]</td>
      <td style="text-align: center;">1060</td>
      <td style="text-align: center;">1950</td>
      <td style="text-align: center;">1950</td>
      <td style="text-align: center;">1060</td>
    </tr>
    <tr>
      <td style="text-align: center;">Yield Strength (&sigma;<sub>y</sub>) [MPa]</td>
      <td style="text-align: center;">950</td>
      <td style="text-align: center;">1400</td>
      <td style="text-align: center;">1400</td>
      <td style="text-align: center;">950</td>
    </tr>
        <tr>
      <td style="text-align: center;">Surface Hardness [HB]</td>
      <td style="text-align: center;">335</td>
      <td style="text-align: center;">560</td>
      <td style="text-align: center;">560</td>
      <td style="text-align: center;">335</td>
    </tr>
        <tr>
      <td style="text-align: center;">Bending Fatigue Strength (&sigma;<sub>FP</sub>) [MPa]</td>
      <td style="text-align: center;">320</td>
      <td style="text-align: center;">450</td>
      <td style="text-align: center;">450</td>
      <td style="text-align: center;">320</td>
    </tr>
        <tr>
      <td style="text-align: center;">Contact Fatigue Strength (&sigma;<sub>HP</sub>) [MPa]</td>
      <td style="text-align: center;">860</td>
      <td style="text-align: center;">1360</td>
      <td style="text-align: center;">1360</td>
      <td style="text-align: center;">860</td>
    </tr>
  </tbody>
</table>

Note that these properties can be classified into:
1) Gear Material Properties
2) Gear Physical Properties

In our definition, we will separate these 2 sets of properties. We can also see that gears **R1** and **R4** share the same material properties, while gear **R2** material properties match that of gear **R3**.

```python
# Gear Material Properties
R1R4_material = pgt.Material(name='Steel', sigma_u=1060, sigma_y=950, HB=335)
R2R3_material = pgt.Material(name='Steel', sigma_u=1950, sigma_y=1400, HB=560)
```

At this point, the object **R1R4_material** holds material properties for gears **R1** and **R4**, while **R2R3_material** holds material properties for gears **R2** and **R3**. These material objects will be used during the defintion of the gear objects as follows:

```python
# Gears
# R1
R1 = pgt.Gear(name="R1", axis=k, m_n=2.5, z=18, psi=20, phi_n=20, Q_v=7, FW=30, material=R1R4_material)
# R2
R2 = pgt.Gear(name="R2", axis=k, m_n=2.5, z=73, psi=-20, phi_n=20, Q_v=7, FW=30, material=R2R3_material)
# R3
R3 = pgt.Gear(name="R3", axis=k, m_n=2.5, z=19, psi=-20, phi_n=20, Q_v=7, FW=30, material=R2R3_material)
# R4
R4 = pgt.Gear(name="R4", axis=k, m_n=2.5, z=51, psi=20, phi_n=20, Q_v=7, FW=30, material=R1R4_material)
```

At this point, each gear object has a label, axis of rotation, normal module, number of teeth, helix angle, normal pressure angle, transmission accuracy level, tooth face width, and material properties defined.

### Bearings
Defining bearing objects isn't as straightforward as the previous definitions unfortunately. This is because bearings come with different types, each type with its own set of properties. However, some of these properties are shared within different types of bearings *(e.g. bearing width, internal diameter, reference speed, etc.)*. **PyGRITbx** supports only SKF bearings, and luckily, the [SKF Rolling Bearings](https://www.skf.com/group/products/rolling-bearings "SKF Roller Bearigns Catalogue") catalogue is freely available for anyone to download.

Using the catalogue, we will define bearing objects by their properties. Some additional properties related to the specific configuration of the gearbox will also be defined and explained in the following.

Bearings **A** and **B** are given as **SKF 30203 (Explorer)** bearings. By searching through the **SKF Catalogue**, we find their characteristics as shown in [Figure 3](#figure-3) and [Figure 4](#figure-4), in the row enclosed in the blue rectangle. 

<figure id="figure-3">
    <img src="figure3_30203_1.png" alt="SKF 30203 (Explorer) Specs 1">
    <figcaption>Figure 3 - SKF 30203 (Explorer) Specs 1</figcaption>
</figure>

<figure id="figure-4">
    <img src="figure4_30203_2.png" alt="SKF 30203 (Explorer) Specs 2">
    <figcaption>Figure 4 - SKF 30203 (Explorer) Specs 2</figcaption>
</figure>

Similarly, we can find bearings **C** and **D** which are designated by **SKF 30208 (Explorer)**. Their characteristics are shown in [Figure 5](#figure-5) and [Figure 6](#figure-6) in the row enclosed in the blue rectangle.

<figure id="figure-5">
    <img src="figure5_30208_1.png" alt="SKF 30208 (Explorer) Specs 1">
    <figcaption>Figure 3 - SKF 30208 (Explorer) Specs 1</figcaption>
</figure>

<figure id="figure-6">
    <img src="figure6_30208_2.png" alt="SKF 30208 (Explorer) Specs 2">
    <figcaption>Figure 4 - SKF 30208 (Explorer) Specs 2</figcaption>
</figure>

