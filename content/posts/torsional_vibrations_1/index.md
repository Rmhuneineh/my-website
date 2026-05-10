
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

