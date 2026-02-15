---
title: "PyGRITbx - Tutorial Series Part 2: No Pain No Gain, No Stress No Strain"
date: 2026-02-15T13:00:00+02:00
author: "Ragheed"
excerpt: ""
description: "Shaft Profile Definition. Static and fatigue verification for shaft design."
draft: true
math: true
toc: true
categories: ["Mechanical Engineering", "Programming Tutorial"]
tags: ["Machine Design"]
---

## Outline
Hello and welcome to the second part of this tutorial series. In the previous part, we learnt how to:
1) install **PyGRITbx** along with the tools required to work with it
2) define components that constitute a given gearbox
3) define interactions between components
4) calculate the forces exchanged between said components and the reaction forces produced by the bearings.

In this part, we will take our previous results to:
1) define a shaft profile based on the given technical drawing
2) calculate and plot internal loads and stresses on the defined shaft profile
3) perform static and fatigue verification by calculating the corresponding safety factors.

Without further talk, let's get down to business.

## Shaft Profile
Recall the configuration of the gearbox from [**Figure 1**](#figure-1).

<figure id="figure-1">
    <img src="figure1_gearbox_assembly.png"
    alt="Gearbox Assembly"
    style="max-width: 100%; height: auto;">
    <figcaption>Figure 1 - Gearbox Assembly</figcaption>
</figure>

Our goal is to define the profile of shaft **A2** to be able to calculate the internall stresses along the axis of the shaft after having computer the internal loads. To achieve this, we refer to the technical drawing of shaft **A2** as portrayed in [**Figure 2**](#figure-2).

<figure id="figure-2">
    <img src="figure2_shaftA2_technicalDrawing.png"
    alt="Shaft A2 Technical Drawing"
    style="max-width: 100%; height: auto;">
    <figcaption>Figure 2 - Shaft A2 Technical Drawing</figcaption>
</figure>

### Locating Corners

To define the shaft profile, we would need to know the radius of the shaft at every cross-section along its axis. Using the radius and axial location, we can specify the coordinates of certain points that we can locate on the technical drawing. These points would be the *corners* that define a radius change along the shaft's axis. For example, since **A2** rotates around the **z-axis** and this axis is pointing to the right, we start from the left most part of the shaft by locating the 4 points shown in [**Figure 3**](#figure-3).

<figure id="figure-3">
    <img src="figure3_shaftA2_zoomedInLeft.png"
    alt="Shaft A2 First Corners"
    style="max-width: 100%; height: auto;">
    <figcaption>Figure 3 - Shaft A2 First Corners</figcaption>
</figure>

**- P1**

It's clear that corner **P1** is located at location **0 [mm]** along the shaft's axis. What about the radius at which this corner is located? We can tell from section **D-D** ([**Figure 2**](#figure-2)) that the diameter corresponds to the notation **M 35**. This means that the diameter is equal to **35 [mm]**; thus, corresponding to a **17.5 [mm]** radius. However, this is true regarding corners **P2** and **P3** but not **P1** since there's a chamfer to get from corner **P1** to corner **P2**. The chamfer is specified to be of size **1 [mm]**. This means that corner **P1** is located at a radius equal to **16.5 [mm]**.

Therefore, **P1** is located at $\rArr (0, 16.5)$.

**- P2**

Due to the chamfer, the axial location of corner **P2** is equal to **1 [mm]**. The radius at which it's located has been explained earlier and is equal to **35 [mm]**.

Therefore, **P2** is located at $\rArr (1, 17.5)$.

**- P3**

Corner **P3** is located along the same radius as corner **P2**. The axial location however can be seen as a dimension on the technical drawing set to **46 [mm]**. However, since corner **P4** is also located at that axial location, we will offset corner **P3** by **0.1 [mm]** to the left so as to locate it axially at **45.9 [mm]**.

Therefore, **P3** is located at $\rArr (45.9, 17.5)$.

**- P4**

The axial location of corner **P4** is **46 [mm]** as specified by the axial dimension on the technical drawing. The diameter is also shown, **40 [mm]**, corresponding to a radius equal to **20 [mm]**.

Therefore, **P4** is located at $\rArr (46, 20)$.

By continuing in this manner, we can do 2 numpy arrays specifying all the points' axial locations and all their corresponding radii as shown in the following code block:

```python
# Define Radii and Axial Locations
radii = np.array([33, 35,    35, 40,    40,  34,    34,    32,   32,  31]) / 2 
alocs = np.array([ 0,  1,  45.9, 46, 132.9, 133, 158.4, 158.5,  222, 223])
```

To define and check the profile, you can run the following code:

```python
# Define a Shaft Profile for Trial
trial = pgt.ShaftProfile(name="trial", radii=radii, locs=alocs)

# Plot Defined Profile
from matplotlib import pyplot as plt
plt.plot(trail.locs, trial.radii, color="r")
plt.plot(trail.locs, -trail.radii, color="r")
plt.ylim([-100, 100])
plt.show()
```

This should produce the plot seen in [**Figure 4**](#figure-4).

<figure id="figure-4">
    <img src="figure4_shaftA2_trialProfile.png"
    alt="Shaft A2 Trial Profile"
    style="max-width: 100%; height: auto;">
    <figcaption>Figure 4 - Shaft A2 Trial Profile</figcaption>
</figure>

I would be more than happy to inform you that this is almost all it takes to define the *general* profile of the shaft. However, it's specified in this project that for **static verification**, sections where there's a keyseat should be considered with a diameter equal to the nominal diameter stated in the technical drawing minus the depth of the keyseat!

Hence, cross-sections present us with new corners and the proper radii and locations should be defined as follows:

```python
# Define Radii and Axial Locations with Keyseats
static_radii = np.array([33, 35,   35, 30,   30, 35,   35, 40,    40,  34,    34,    32,    32,    27,    27,    32,  32,  31]) / 2
static_alocs = np.array([ 0,  1, 11.9, 12, 39.9, 40, 45.9, 46, 132.9, 133, 158.4, 158.5, 178.4, 178.5, 208.4, 208.5, 222, 223])
```

We can then define and plot the **static_profile** similar to the previous definition of the trial profile.

```python
# Define a Shaft Profile for Static Verification
static_profile = pgt.ShaftProfile(name="Static Profile", radii=static_radii, locs=static_alocs)

# Plot Defined Profile
from matplotlib import pyplot as plt
plt.plot(static_profile.locs, static_profile.radii, color="r")
plt.plot(static_profile.locs, -static_profile.radii, color="r")
plt.ylim([-100, 100])
plt.show()
```

This will procduce the profile shown in [**Figure 5**](#figure-5).

<figure id="figure-5">
    <img src="figure5_shaftA2_staicProfile.png"
    alt="Shaft A2 Static Profile"
    style="max-width: 100%; height: auto;">
    <figcaption>Figure 5 - Shaft A2 Static Profile</figcaption>
</figure>

### Refinements and Fillets
Our current definition of the shaft profile is coarse. This means that any calculations performed along the shaft's axis won't be distributed properly along the axis but only on those *corners* that we have defined earlier. We need a fine profile with more points interpolated between the defined corners so that we can have a precise representation of the profile whenver we need it to perform certain calculations.

Luckily, **PyGRITbx** has the feature that refines a profile based on a given *delta* separating one point from another along the shaft's axis. Small values of *delta* allows for a finer profile with more precise calculations at the cost of memory and speed. By default, *delta* is set to **0.1 [mm]**. To refine the profile, use the code in the following block:

```python
# Refine Static Profile
static_profile_refined = static_profile.refineProfile(delta=0.1)
```

Now that we have a refined profile, we can add fillets as shown in the technical drawing. Why are fillets important? Because stresses are calculated based on the cross-sectional properties. If we don't take into consideration the chane in those properties due to the change in diameter, we would be missing out on valuable information regarding *how* the trend of these stresses changes along the shaft's axis.

To define a fillet, we need the following information:
1) **radius**: this is simply the radius of the filler and must be in **[mm]**
2) **zOff**: this is the axial location of the center of the circle the fillet is part of
3) **dOff**: this is the radial location of the center of the circle the fillet is part of
4) **quadrant**: an array specifying one or more quadrants of the circle the fillet is part of ([**Figure 6**](#figure-6))

<figure id="figure-6">
    <img src="figure6_filletQuadrants.png"
    alt="Fillet Quadrants"
    style="max-width: 60%; height: auto;">
    <figcaption>Figure 6 - Fillet Quadrants</figcaption>
</figure>

From detail **F-F** in [**Figure 2**](#figure-2), we can see that there's a fillet of radius **1 [mm]** belonging to quadrant **2** at an axial location equal to **45 [mm]** and a radial location equal to **18.5 [mm]**. Therefore we can simply add a fillet this fillet to the static profile using the following piece of code:

```python
# Add First Fillet to Static Profile
static_profile_refined.addFillet(radius=1, quadrant=[2], zOff=45, dOff=18.5)
```

Similarly we can locate the second fillet shown in detail **G-G** except that this one belongs to qudrant **1**:

```python
# Add Second Fillet to Static Profile
static_profile_refined.addFillet(radius=1, quadrant=[1], zOff=134, dOff=18)
```

Finally, we can add the profile to the shaft object:

```python
# Add Static Profile to Shaft A2
A2.addProfile(profile=static_profile_refined)
```