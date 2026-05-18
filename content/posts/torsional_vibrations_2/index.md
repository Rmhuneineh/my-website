
---
title: "Torsional Vibrations - Modeling and Analysis (Part 2)"
date: 2026-05-17T12:54:13+02:00
author: "Ragheed"
excerpt: ""
description: "This series covers the fundamentals of torsional vibrations, including the derivation of equations of motion and the use of Python for numerical analysis. The application is specific to gearbox testing bench setups."
draft: true
math: true
toc: true
categories: ["Mechanical Engineering", "Programming Tutorial"]
tags: ["Machine Design"]
---

***This series covers the fundamentals of torsional vibrations, including the derivation of equations of motion and the use of Python for modeling and analysis. The application is specific to gearbox testing bench setups.***


## Introduction
In [**Part 1**](https://ragheedhuneineh.com/posts/torsional_vibrations_1/ "Part 1"), we introduced a systematic approach for modeling and analyzing torsional systems. We followed this approach to a limited extent by applying it to single degree of freedom (SDOF) torsional systems. This allowed us to study:
1. **Undamped Free Vibrations**: Solving the equation of motion under no load and calculating the natural frequency.
2. **Forced Vibrations**: Calculation of the system response to external excitation.

Using ***Python***, we developed a mini-solver to simulate the response of the SDOF system under various load conditions. The solver calculates the time response analytically for polynomial or harmonic excitations with the possibility to perform the calculation numerically for arbitrary excitation inputs such as measured signals.

The next step is to widen our perspective and apply the systematic approach on multiple degree of freedom (MDOF) torsional systems. In addition to the 2 studies mentioned earlier, we will have 2 additional studies to be performed in between:
1. **Identification of Excitation Sources**: Beyond the main load source(s), further excitation sources present in typical test bench setups must be identified (i.e gears, variable frequency drives, etc.).
2. **Campbell Diagram Analysis**: Identifying critical operating zones based on calculated natural frequencies and excitation sources.

In this part, we will start by deriving the equations of motion for a 2-degree of freedom torsional system. The system will be fixed to the wall; therefore, ***no rigid motion*** is allowed. We will calculate the natural frequencies (yes, we have more than just one) and their corresponding mode shapes while discussing in depth the insights that can be drawn from those results.

Then, we will see what happens once ***rigid motion*** in the form of complete rotation is permitted. We will take the chance to represent the system in matrix form and use matrix operations to simplify the calculation of the natural frequencies and the mode shapes.

After that, we will shift our focus to ***n-degree*** of freedom torsional systems. We will see how to divide the system into a set of elements, each element being a 2-degree of freedom system with its own matrix representation. This will allow us to then assemble the full matrix for the complete system and solve it accordingly to obtain the natural frequencies and the corresponding mode shapes.

Finally, we will analyze the case where an infinitely-rigid-inertialess adaption transmission is present in between elements. This will serve as an introduction to more complex test bench configurations where certain transformations are required to account for the gear ratio. It will also introduce a new source of excitation beyond the main load source(s) that should be accounted for in the analysis.