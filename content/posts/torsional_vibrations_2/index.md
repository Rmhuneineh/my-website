
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

In this part, we will start by deriving the equations of motion for a 2-degree of freedom torsional system. The system will **not** be fixed to the wall; therefore, ***rigid motion*** is allowed. We will calculate the natural frequencies (yes, we have more than just one) and their corresponding mode shapes while discussing in depth the insights that can be drawn from those results. We will then take the chance to represent the system in matrix form and use matrix operations to simplify the calculation of the natural frequencies and the mode shapes.

After that, we will shift our focus to ***n-degree*** of freedom torsional systems. We will see how to divide the system into a set of elements, each element being a 2-degree of freedom system with its own matrix representation. This will allow us to then assemble the full matrix for the complete system and solve it accordingly to obtain the natural frequencies and the corresponding mode shapes.

Finally, we will analyze the case where an infinitely-rigid-inertialess adaption transmission is present in between elements. This will serve as an introduction to more complex test bench configurations where certain transformations are required to account for the gear ratio. It will also introduce a new source of excitation beyond the main load source(s) that should be accounted for in the analysis.

## 2 Degrees of Freedom

### Undamped Free Vibrations

Consider the system shown in [**Figure 1**](#fig:2_degree_of_freedom_rigid_motion). It is composed of 2 rotating inertias, $\bold{I_1}$ and $\bold{I_2}$, connected with each other via the shaft with torsional stiffness $\bold{c}$. Assume that the system is supported by bearings allowing for rigid rotation along the shaft's axis and that the mass of the involved bodies isn't significant enough to cause the shaft to bend.

<figure id="fig:2_degree_of_freedom_rigid_motion">
    <img src="00_torVib.png" alt="2 Degree of Freedom System: No Rigid Motion">
    <figcaption>Figure 1 - 2 Degree of Freedom System</figcaption>
</figure>

When rotating under load, the intermediate shaft experiences torsional stress due to its finite stiffness. Similar to SDOF torsional systems, measurements documented in literature prove that 2-degree of freedom systems such as the one depicted indeed do contain a frequency component that persists regardless of the form the external load takes. Therefore, we'd need to find a way to calculate this ***natural frequency*** component to avoid resonance when attempting to excite the system.

The free body diagrams of the two rotating bodies are shown in [**Figure 2**](#fig:2_degree_of_freedom_rigid_motion_fbd). It has to be noted that the restoring torque from the shaft will only be present when the shaft is twisted. Practically, this means that the restoring torque will be present only when the two rotating bodies are oscillating out of phase. As a result, the resoring torque is proportional to the absolute difference between the 2 angular displacements: $\bold{|\theta_1 - \theta_2|}$.

<figure id="fig:2_degree_of_freedom_rigid_motion_fbd">
    <img src="01_torVib.png" alt="2 Degree of Freedom System: Free Body Diagram">
    <figcaption>Figure 1 - 2 Degree of Freedom System: Free Body Diagram</figcaption>
</figure>

The resulting set of equations of motion is:
$$I_1 \cdot \ddot{\theta}\_1 + c \cdot (\theta_1 - \theta_2) = 0$$
$$I_2 \cdot \ddot{\theta}\_2 + c \cdot (\theta_2 - \theta_1) = 0$$

Rearranging the terms so as to serparate $\bold{\theta_1}$ from $\bold{\theta_2}$:
$$I_1 \cdot \ddot{\theta}\_1 + c \cdot \theta_1 = c \cdot \theta_2$$
$$I_2 \cdot \ddot{\theta}\_2 + c \cdot \theta_2 = c \cdot \theta_1$$

## Appendix

### 2 Degrees of Freedom: No Rigid Motion

Take 2 single degree of freedom systems, mirror them with respect to each other, and connect the two rotating inertias with a third shaft. You get a simple 2 degree of freedom torsional system, the schematic of which can be seen in [**Figure 98**](#fig:2_degree_of_freedom_no_rigid_motion)

<figure id="fig:2_degree_of_freedom_no_rigid_motion">
    <img src="98_torVib.png" alt="2 Degree of Freedom System: No Rigid Motion">
    <figcaption>Figure 98 - 2 Degree of Freedom System: No Rigid Motion</figcaption>
</figure>

Each rotating body has two shafts connected to it, one on either side. When the 2 bodies are oscillating, the two shafts connected to the wall are guaranteed to undergo twisting and thus, procude a restoring torque. The intermediate shaft with torsional stiffness $\bold{c_2}$ however is twisting only if the two rotating inertias are oscillating out of phase. This means that the restoring torque produced by the intermediate shaft is proportional to the difference between the angular displacements of the two rotating bodies: $\bold{|\theta_1 - \theta_2|}$. Remembering that the torque produced by the shaft's torsional stiffness is a restoring torque that opposes the angular displacement from its equilibrium position, the freebody diagrams of the two rotating bodies are then represented as shown in [**Figure 99**](#fig:2_degree_of_freedom_no_rigid_motion_fbd).

<figure id="fig:2_degree_of_freedom_no_rigid_motion_fbd">
    <img src="99_torVib.png" alt="2 Degree of Freedom System: No Rigid Motion - Free Body Diagram">
    <figcaption>Figure 99 - 2 Degree of Freedom System: No Rigid Motion - Free Body Diagram</figcaption>
</figure>

The resulting set of equations of motion is:

$$I_1 \cdot \ddot{\theta}\_1 + c_1 \cdot \theta_1 + c_2 \cdot (\theta_1 - \theta_2) = 0$$

$$I_2 \cdot \ddot{\theta}\_2 + c_3 \cdot \theta_2 + c_2 \cdot (\theta_2 - \theta_1) = 0$$

Rearranging the terms to separate $\bold{\theta_1}$ from $\bold{\theta_2}$, we get:

$$I_1 \cdot \ddot{\theta}\_1 + (c_1 + c_2) \cdot \theta_1 = c_2 \cdot \theta_2$$

$$I_2 \cdot \ddot{\theta}\_2 + (c_2 + c_3) \cdot \theta_2 = c_2 \cdot \theta_1$$

This set of second order differential equations represents a coupled system, not to be mistaken for the forced vibrations discussed in [**Part 1**](https://ragheedhuneineh.com/posts/torsional_vibrations_1/#forced-vibration-analysis-theory "Part 1") of this series. The two equations are coupled together through the terms $\bold{c_2 \cdot \theta_2}$ and $\bold{c_2 \cdot \theta_1}$. This means that the motion of one body affects the motion of the other body, and vice versa. One could think of solving one of the equations considering it as a SDOF system undergoing forced vibrations, where the forcing term is the motion of the other body. However, this approach does not lead to a closed-form solution. Think of it as attempting to find the particular solution of one of the responses using the particular solution of the other as the external torque, but to get the particular solution of the other you'd need the particular solution of the first as an external torque: $\bold{\infty}$ **loop**.

Thus, for an attempt to solve the system of equations, we'd need to think of 2 functions, one for each response, that would satisfy the conditions presented. Reckon trigonometry or complex exponentials would answer our call this time as well? Opting for the trigonometric form, a solution would look like this:
$$\theta(t) = A \cdot sin(\omega t) + B \cdot cos(\omega t)$$

The second derivative is simply:
$$\ddot{\theta}(t) = -A \cdot \omega^2 \cdot sin(\omega t) - B \cdot \omega^2 \cdot cos(\omega t)$$

In essence, the second derivative is proportional to the solution itself:
$$\ddot{\theta}(t) = - \omega^2 \cdot \theta(t)$$

For simplicity, denote: $\bold{\Theta = \theta(t)}$

Substituting this in the set of equations derived earlier, we get:
$$-I_1 \cdot \omega^2 \cdot \Theta_1 + (c_1 + c_2) \cdot \Theta_1 = c_2 \cdot \Theta_2$$

$$-I_2 \cdot \omega^2 \cdot \Theta_2 + (c_2 + c_3) \cdot \Theta_2 = c_2 \cdot \Theta_1$$

From the first equation, we get:
$$\Theta2 = \frac{c_1 + c_2 - I_1 \cdot \omega^2}{c_2} \cdot \Theta_1  