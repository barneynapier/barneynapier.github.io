---
title: Monty Hall
date: 2020-09-05
tags: maths
---

I remember coming across a quote somewhere that went like this: “If you can’t explain something to a computer you don’t understand it well enough”. I’ve since been looking for an interesting use case for this and have found one to satisfy my little wants in a problem called the Monty Hall problem, whose solution can often be tricky to comprehend (like it was for me). I won’t bore you with an explanation of the problem however, I’ll let Kevin Spacey in the gambling film 21 do it for me [here](https://www.youtube.com/watch?v=Q5nCtgcL4jU).

Simply put, you choose a door out of the three available. A duff door is then opened, leaving you with two doors left, and you are asked if you want to swap your choice of door. The answer? Always.

Now when I first saw this problem, I don’t think I was alone in thinking that swapping doesn’t matter because each door has a 1 in 3 chance of containing the prize. However, in this case first glances are deceiving. So in an effort to better understand the rationale behind swapping doors I explained the problem to my computer.

The following little program simulates the Monty Hall problem 10,000 times, calculating the win probabilities of both switching and not switching. Running this code will tell you that the probability of getting a car if you change is 0.67, while if you don’t change its 0.33. As Ben tells us, you do in fact double your chances of getting a new car by switching.

Here's the code:

```
import numpy as np
import pandas as pd
def simulate_game():
    # Create 3 doors, one randomly containing a car and the other two containing goats
    door_list = ['rand1', 'rand2', 'rand3']
    door_list[door_list.index(np.random.choice(door_list))] = 'car'
    for i in range(len(door_list)):
        if door_list[i] != 'car':
            door_list[i] = 'goat'
    # Assume initially that the choice is made at random
    choice_initial = np.random.choice(door_list)
    # Host opens (removes) one goat
    door_list.remove('goat')
    # When given option: CHANGE
    # We know that the two doors left include 1 goat and 1 car
    final_choice_change = ''
    if choice_initial == 'goat':
        choice_change = 'car'
    else:
        choice_change = 'goat'
    # When given option: DONT CHANGE
    choice_nochange = choice_initial
    # Return binary success integers (1=win, 0=lose)
    return [(choice_change=='car')*1, (choice_nochange=='car')*1]
df = pd.DataFrame(columns=['Change', 'Dont Change'])
for i in range(10000):
    df.loc[len(df)] = simulate_game()
print(df.mean())
```
