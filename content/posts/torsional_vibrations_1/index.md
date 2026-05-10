
---
title: "Torsional Vibrations - Modeling and Analysis (Part 1)"
date: 2026-05-07T20:31:13+02:00
author: "Ragheed"
excerpt: ""
description: "This post covers the fundamentals of torsional vibrations, including the derivation of equations of motion and the use of Python for numerical analysis. The application is specific to gearbox testing bench setups."
draft: true
math: true
toc: true
categories: ["Mechanical Engineering", "Programming Tutorial"]
tags: ["Machine Design"]
---

## Introduction
The subject of torsional vibrations is crucial in the design and analysis of rotating machinery, particularly in applications such as gearboxes. This post aims to provide a comprehensive overview of torsional vibrations, including the derivation of equations of motion and the use of Python for numerical analysis. The focus will be on practical applications, specifically in the context of gearbox testing bench setups. (Don't worry, we'll start with the basics and build up to more complex concepts, so you can follow along even if you're new to this topic.)

Unlike linear vibrations, torsional vibrations involve the twisting of a shaft or a system of shafts. This type of vibration can lead to significant issues such as fatigue failure, noise, and reduced performance if not properly analyzed and mitigated. On test bench setups in particular, understanding torsional vibrations is essential for accurate testing and validation of gearbox designs. This is due to the fact that the test bench itself can introduce additional dynamics that may affect the results.

A typical example of how the test bench can introduce additional dynamics is through the use of adaption transmissions. Adaption transmissions are often used to connect the input and/or output of the gearbox to the dynos with the aim of matching the speed and torque requirements that otherwise would not be met by connecting the gearbox directly to the dynos. However, these adaption transmissions can introduce modes of excitation that are not present in the actual application, and may lead to inaccurate results, such as premature failure of the gearbox or inaccurate estimation of its performance, if not properly accounted for in the analysis. Hence, it is but imperative to understand the dynamics of torsional vibrations in the context of test bench setups, and to use appropriate modeling and analysis techniques to ensure accurate results.

In this part, we will start by deriving the equations of motion for a single degree of freedom (SDOF) torsional system, and then we will extend the analysis to multi-degree of freedom (MDOF) systems, both subject to undamped free vibration. Deriving these equations of motion will allow us to understand the underlying physics of torsional vibrations; solving them will enable us to predict the behavior of the system under various conditions and to identify the natural frequencies along with their corresponding mode shapes. For MDOF systems, we will use Python to perform the necessary calculations. We will finish off by studying the case where an infinitely rigid adaption transmission with negligible inertia is used; thus, accounting for the gear ratio between two rotating shafts in the development of the model.

In the next part, we will see how to make use of the natural frequencies obtained in this part to identify possible sources of excitation within our speed range and what modes they excite. This will be achieved by plotting the Campbell diagram of the system, a powerful tool for visualizing and identifying potential resonance conditions.

## Single Degree of Freedom (SDOF) Torsional System

### Free Body Diagram
Let's start with the simplest case of a single degree of freedom (SDOF) torsional system. Consider an ideal rotating body with finite inertia (**I**) and negligible torsional stiffness, connected to an ideal shaft with finite torsional stiffness (**c**) and negligible inertia. The other end of the shaft is connected to the wall as depicted in [**Figure 1**](#fig:sdof).

<figure id="fig:sdof">
    <img src="00_torVib.png" alt="Inertia-Shaft System">
    <figcaption>Figure 1 - SDOF Torsional System</figcaption>
</figure>

The system is analogous to a mass-spring system in linear vibrations, where the inertia (**I**) plays the role of the mass and the torsional stiffness (**c**) plays the role of the spring constant. Just like a mass-spring system would exhibit oscillatory motion along a *linear path*, this torsional system will exhibit oscillatory motion in the form of *angular displacements* around the shaft's axis of rotation; <u>thus, the single degree of freedom in this case is the angular displacement of the rotating body.</u>

Therefore, to derive the equation of motion of the rotating body, we rely on the free body diagram shown in [**Figure 2**](#fig:free_body).

<figure id="fig:free_body">
    <img src="01_torVib.png" alt="Free Body Diagram of SDOF Torsional System">
    <figcaption>Figure 2 - Free Body Diagram of SDOF Torsional System</figcaption>
</figure>

Where:
- $\theta$ is the angular displacement of the rotating body,
- $\dot{\theta}$ is the angular velocity of the rotating body, and
- $\ddot{\theta}$ is the angular acceleration of the rotating body

around the shaft's axis of rotation.

Note that the free body diagram concerns the rotating body only, and not the shaft. Here, the shaft is represented by its torsional stiffness which produces a restoring torque on the rotating body that opposes its angular displacement. The inertia of the rotating body resists changes in its angular velocity, and thus, it's represented as a torque that opposes the angular acceleration.

### Equation of Motion

We can now apply Newton's second law for rotational motion to the free body diagram, which states that the sum of the external torques acting on the rotating body is equal to the product of its inertia and angular acceleration. Mathematically, this can be expressed as:
$$\sum \tau = I \ddot{\theta}$$

Recalling that we're analyzing the case of undamped free vibration, the only external torque acting on the rotating body is the restoring torque produced by the torsional stiffness of the shaft, which can be expressed as:
$$\tau = -c \theta$$

Substituting this expression for the torque into Newton's second law gives us the equation of motion for the SDOF torsional system:
$$-c \theta = I \ddot{\theta}$$

Rearranging this equation, we can express it in the standard form of a second-order ordinary differential equation:
$$I \ddot{\theta} + c \theta = 0$$

This is the equation of motion for the SDOF torsional system. It describes how the angular displacement of the rotating body evolves over time under the influence of the restoring torque from the shaft's torsional stiffness, given a set of initial conditions. The solution to this equation will allow us to determine the natural frequency of the system and its mode shape, which are essential for understanding its vibrational behavior.

To solve this equation means to find a function $\bold{\theta(t)}$ that satisfies the equation for all time $\bold{t}$. Therefore, one must search for a mathematical function that, when substituted into the equation, yields a true statement. In other words, we need to find a function whose second derivative with respect to time is proportional to the negative of the function itself.

### Trigonometry for The Rescue

What first comes to mind is the sine and cosine functions, as they are well-known for their oscillatory behavior and their second derivatives are indeed proportional to the negative of the original function. Therefore, we can propose a solution of the form:
$$\theta(t) = A \cos(\omega t) + B \sin(\omega t)$$

Where:
- $\bold{A}$ is the initial angular displacement, expressed in $\bold{[rad]}$.
- $\bold{B}$ is the initial angular velocity divided by $\bold{\omega}$, expressed in $\bold{[rad]}$.
- $\bold{\omega}$ is the angular frequency of the oscillation, which we will determine by substituting this proposed solution into the equation of motion, expressed in $\bold{[rad/s]}$.

Substituting the proposed solution into the equation of motion requires us first to compute the second derivative of $\theta(t)$ with respect to time:
$$\dot{\theta}(t) = -A \omega \sin(\omega t) + B \omega \cos(\omega t)$$
$$\ddot{\theta}(t) = -A \omega^2 \cos(\omega t) - B \omega^2 \sin(\omega t)$$

Now, we can substitute $\theta(t)$ and $\ddot{\theta}(t)$ into the equation of motion:
$$I (-A \omega^2 \cos(\omega t) - B \omega^2 \sin(\omega t)) + c (A \cos(\omega t) + B \sin(\omega t)) = 0$$

Rearranging this equation, we can group the terms involving $\cos(\omega t)$ and $\sin(\omega t)$ together:
$$(-I A \omega^2 + c A) \cos(\omega t) + (-I B \omega^2 + c B) \sin(\omega t) = 0$$

For this equation to hold true for all time $\bold{t}$, the coefficients of both $\cos(\omega t)$ and $\sin(\omega t)$ must be equal to zero. This gives us two equations:
$$-I A \omega^2 + c A = 0$$
$$-I B \omega^2 + c B = 0$$

From either of these equations, we can factor out $A$ or $B$:
$$A(-I \omega^2 + c) = 0$$
$$B(-I \omega^2 + c) = 0$$

For non-trivial solutions (where $\bold{A}$ and $\bold{B}$ are not both zero), we must have:
$$-I \omega^2 + c = 0$$

Rearranging this equation gives us the expression for the natural frequency of the system:
$$\omega = \sqrt{\frac{c}{I}}$$

This natural frequency $\mathbf{\omega}$ represents the frequency at which the system will oscillate when it is undergoing undamped free vibration. The corresponding mode shape for this SDOF system is simply the angular displacement $\theta(t)$, which can be expressed as:
$$\theta(t) = A \cos(\sqrt{\frac{c}{I}} t) + B \sin(\sqrt{\frac{c}{I}} t)$$

### Exponentials: I Know You Love Them

Another mathematical function that isn't so easy to intuit is the exponential function. Yes, the exponential function isn't periodic and its second derivative isn't proportional to the negative of the original function, but one form of it exhibits both of these properties. This form is the complex exponential function, which can be expressed as:
$$\theta(t) = C e^{j \omega t} + D e^{-j \omega t}$$

Where:
- $\bold{C}$ is the initial angular displacement, expressed in $\bold{[rad]}$.
- $\bold{D}$ is the initial angular velocity divided by $\bold{\omega}$, expressed in $\bold{[rad]}$.
- $\bold{j}$ is the imaginary unit, defined as: $\bold{j}^2 = -1$.
- $\bold{\omega}$ is the angular frequency of the oscillation, which we will determine by substituting this proposed solution into the equation of motion, expressed in $\bold{[rad/s]}$.

Substituting the proposed solution into the equation of motion requires us first to compute the second derivative of $\theta(t)$ with respect to time:
$$\dot{\theta}(t) = j \omega C e^{j \omega t} - j \omega D e^{-j \omega t}$$
$$\ddot{\theta}(t) = -\omega^2 C e^{j \omega t} - \omega^2 D e^{-j \omega t}$$

Now, we can substitute $\theta(t)$ and $\ddot{\theta}(t)$ into the equation of motion:
$$I (-\omega^2 C e^{j \omega t} - \omega^2 D e^{-j \omega t}) + c (C e^{j \omega t} + D e^{-j \omega t}) = 0$$

Rearranging this equation, we can group the terms involving $e^{j \omega t}$ and $e^{-j \omega t}$ together:
$$(-I \omega^2 C + c C) e^{j \omega t} + (-I \omega^2 D + c D) e^{-j \omega t} = 0$$

For this equation to hold true for all time $\bold{t}$, the coefficients of both $e^{j \omega t}$ and $e^{-j \omega t}$ must be equal to zero. This gives us two equations:
$$-I \omega^2 C + c C = 0$$
$$-I \omega^2 D + c D = 0$$

From either of these equations, we can factor out $C$ or $D$:
$$C(-I \omega^2 + c) = 0$$
$$D(-I \omega^2 + c) = 0$$

For non-trivial solutions (where $\bold{C}$ and $\bold{D}$ are not both zero), we must have:
$$-I \omega^2 + c = 0$$

Rearranging this equation gives us the same expression for the natural frequency of the system:
$$\omega = \sqrt{\frac{c}{I}}$$

The corresponding mode shape for this SDOF system can be expressed in terms of the complex exponential function as:
$$\theta(t) = C e^{j \sqrt{\frac{c}{I}} t} + D e^{-j \sqrt{\frac{c}{I}} t}$$

### Simple Python Code

To illustrate the concepts we've discussed and get a hint of the coding style we will use to implement them in Python, we'll write a simple code snippet that calculates the natural frequency of a SDOF torsional system given its inertia and torsional stiffness. Moreover, we will simulate the time response of the system for a given set of initial conditions.

First, we will start by importing the necessary libraries:

```python
# Importing necessary libraries
import numpy as np
import matplotlib.pyplot as plt
```

Second, we will define the parameters of our SDOF torsional system:

```python
# Parameters of the SDOF torsional system
I = 0.1  # Inertia in [kg*m^2]
c = 10   # Torsional stiffness in [N*m/rad]
```

Next, we will define a python Class to represent our SDOF torsional system, which will include methods to calculate the natural frequency and to simulate the time response:

```python
class SDOFTorsionalSystem:

    # Constructor to initialize the system parameters
    def __init__(self, inertia=0, stiffness=0):
        self.I = inertia
        self.c = stiffness
        if self.I > 0 and self.c > 0:
            self.omega_n = self.calculate_natural_frequency()
        else:
            self.omega_n = None

    # Method to calculate the natural frequency of the system
    def calculate_natural_frequency(self):
        return np.sqrt(self.c / self.I)

    # Method to simulate the time response of the system
    def simulate_time_response(self, initial_angle=0, initial_velocity=0, time_span=10):
        if self.omega_n is None:
            raise ValueError("Natural frequency is not defined. Please set inertia and stiffness.")
        
        # Time array
        t = np.linspace(0, time_span, 1000)
        # Natural frequency
        omega_n = self.omega_n
        # Calculate the constants A and B based on initial conditions
        A = initial_angle
        B = initial_velocity / omega_n
        # Time response using the analytical solution
        theta_t = (A * np.cos(omega_n * t) + B * np.sin(omega_n * t))
        return t, theta_t
```

Now, we can create an instance of our SDOF torsional system and simulate its time response for given initial conditions:

```python
# Create an instance of the SDOF torsional system
S = SDOFTorsionalSystem(inertia=I, stiffness=c)

# Initial conditions
initial_angle = 0.1  # Initial angular displacement in [rad]
initial_velocity = 0.0  # Initial angular velocity in [rad/s]

# Simulate time response
time_span = 10  # Time span for simulation in [s]
t, theta_t = S.simulate_time_response(initial_angle, initial_velocity, time_span)

# Plotting the time response
fig, axes = plt.subplots(3, 1, figsize=(10, 8))
fig.suptitle('Time Response of SDOF Torsional System', fontsize=16)
# Angular Displacement vs Time
axes[0].plot(t, theta_t, label='Angular Displacement')
axes[0].set_xlabel('Time [s]')
axes[0].set_ylabel('Angular Displacement [rad]')
axes[0].set_title('Angular Displacement vs Time')
axes[0].grid(True)

# Angular Velocity vs Time
angular_velocity = np.gradient(theta_t, t)
axes[1].plot(t, angular_velocity, label='Angular Velocity', color='orange')
axes[1].set_xlabel('Time [s]')
axes[1].set_ylabel('Angular Velocity [rad/s]')
axes[1].set_title('Angular Velocity vs Time')
axes[1].grid(True)

# Angular Acceleration vs Time
angular_acceleration = np.gradient(angular_velocity, t)
axes[2].plot(t, angular_acceleration, label='Angular Acceleration', color='green')
axes[2].set_xlabel('Time [s]')
axes[2].set_ylabel('Angular Acceleration [rad/s^2]')
axes[2].set_title('Angular Acceleration vs Time')
axes[2].grid(True)
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
```

The above code will create the plot shown in [**Figure 3**](#fig:time_response), which illustrates the time response of the SDOF torsional system in terms of angular displacement, angular velocity, and angular acceleration.

<figure id="fig:time_response">
    <img src="02_torVib.png" alt="Time Response of SDOF Torsional System">
    <figcaption>Figure 3 - Time Response of SDOF Torsional System</figcaption>
</figure>

### Conclusion

In summary, we have derived the equation of motion for a single degree of freedom torsional system undergoing undamped free vibration and found that the natural frequency of the system is given by $\omega = \sqrt{\frac{c}{I}}$, based on two different approaches. The mode shape of the system is represented by the angular displacement $\theta(t)$, which oscillates at this natural frequency. This analysis provides a fundamental understanding of torsional vibrations in SDOF systems, which will serve as a basis for analyzing more complex multi-degree of freedom systems in the next section.