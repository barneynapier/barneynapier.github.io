---
title: Monty Hall
date: 2020-09-05
tags: maths
---

I remember coming across a quote somewhere that went like this: “If you can’t explain something to a computer you don’t understand it well enough”. I’ve since been looking for an interesting use case for this and have found one to satisfy my little wants in a problem called the Monty Hall problem, whose solution can often be tricky to comprehend (like it was for me). I won’t bore you with an explanation of the problem however, I’ll let Kevin Spacey do it for me [here](https://www.youtube.com/watch?v=Q5nCtgcL4jU).

Simply put, you choose a door out of the three available. A duff door is then opened, leaving you with two doors left, and you are asked if you want to swap your choice of door. The answer? Always.

Now when I first saw this problem, I don’t think I was alone in thinking that swapping doesn’t matter because each door has a 1 in 3 chance of containing the prize. However, in this case first glances are deceiving. So in an effort to better understand the rationale behind swapping doors I explained the problem to my computer.

I wrote a program to simulate the Monty Hall problem 10,000 times, calculating the win probabilities of both switching and not switching. Running this code will tell you that the probability of getting a car if you change is 0.67, while if you don’t change its 0.33. As Mr Spacey tells us, you do in fact double your chances of getting a new car by switching.

Trust in Kevin.

Have a go yourself and run the [simulation program](https://github.com/barneynapier/monty-hall/blob/main/simulation.py) on my Github
