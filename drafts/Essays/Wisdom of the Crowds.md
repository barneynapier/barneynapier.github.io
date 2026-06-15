# Wisdom of the Crowds  
  
Book by James Surowiecki  
Francis Galton first noticed the phenomenon that is the wisdom of the crowds at a farmers fair in 1906. The fair had a competition in which everyone guessed the weight of an ox and the closest wins a prize. After the competition Galton looked into the guesses of all those that played, and found that the average not only would have won the competition, but was wrong by less than 0.1%.  
  
Why it works  
Suppose we have a group of people who put their heads together to make an estimate of something. As an example, lets use the jelly beans in a jar contest you see at school or a fair. Say Anna, Bruce and Chris are making a group estimate. Each of them has some good information that improves their estimate, and some bad information that worsens it.  
In this case, Anna has the same jars at home and so she knows exactly how much they can hold, but she also thinks jelly beans are much bigger than their actual size. Meanwhile Bruce eats jelly beans all the time, he's an expert in how they can be packed tightly and fit into a bag or a jar, but he has just come from Physics class where he learned that the earth is 150 million km from the sun, so he's anchored to a number that’s probably too high. Finally, Chris ...???  
Once they all have an estimate, they secretly write their number down and then take the arithmetic average of their predictions to come up with their submission to the contest.  
So each person has an estimate that can be expressed as:  
  
Under certain assumptions, the aggregate prediction of the group will (on average) be more accurate than the predictions of each individual group member. The key is what are the assumptions, which I'll get into now.  
You can see how, by definition, all correct information will point in the same direction (toward the right estimate). On the other hand all bad information points in a random direction (we'll elaborate on this assumption in a second). Provided this is true, the estimate of the group will be better than the estimate of any of the individuals, as their mistakes are expected to cancel out, while their successes all agree with each other.  
  
Assumptions  
There are two main assumptions here (three at a push), one about each of the above types of information.  
Firstly independence assumes all bad information is uncorrelated. This means the members of a group should have no tendency to make the same errors as one another, and as such there is no inbuilt bias in the group as a whole. I’m our example this means that errors in each persons estimate is equally likely to be an overestimate as it is an underestimate. If errors were not independent then - E(sum of errors) != 0 - CLT tells us that if n is large enough then the distribution of the sum of estimates will always be normal - Groupthink / feedback loops within team - Selection bias in the crowd  
Secondly, diversity assumes all good information is unique. Diversity fails when everyone is using the same good information, and so nobody has unique knowledge. When this is the case, that information can occupy too much weight in the "aggregate model", potentially over-estimateing the impact of the good information. Also, if all individuals are using the same good information but still have different sources of bad information then the ratio of randomnness to signal in the aggregate model will rise (their prediction will have higher variance).  
Finally Surowiecki also highlights the role of truth telling/trust among group members, which prevents an outcome where individuals use non truth tellling strategies when submitting their prediction, for example if Chris expects Anna to underestimate the number of jelly beans (relative to his estimate) he could increase his prediction above what he actually expects in order to balance out Anna’s prediction.  
  
Implications  
Diverse teams make better predictions  
Groupthink is real and costly  
Good individual decisions require many mental model  
* Superforecasting ('dragonflye-vision' / 'the crowd within')  
  
Aggregation  
In our example I glossed over how we get from individual estimates to a group estimate by simply saying we "take an average", but in reality we can do this a bunch of different ways. Sure, the arithmetic average is in most cases both sufficient and useful, but can it be improved on.  
An alternative is to weight each estimate according to individual knowledge and experience. Suppose in our example Bruce loves jelly beans so much he actually works at the sweet shop where the competition jar was bought, and his main job is packing the merchandise. Does it still make sense to value Anna and Chris' opinions as highly as Bruce's? Probably not.  
In his book Principles, Ray Dalio gives some insight into how decisions are made at Bridgewater (the hedge fund he founded). The company has a reputation for being difficult to adjust to as a new employee thanks to their uncomfortably meritocratic working culture. Dalio talks about how the main aggregation tool for decision making is a process of "believability weighting". This framework is similar to what I described above, but suppose we gave concrete percentage weights to each individual's estimate.  
  
Examples  
In addition to Bridgewater, there are many other interesting ways in which group prediction rears its head.  
* Financial markets / Prediction markets  
Finally, my favourite example is a company called [Numerai](https://numer.ai/). I think it’s one of the most exciting ideas in modern finance/prediction, and in a sense makes great use of the wisdom of its crowd.  
Finally, my favourite example is a company called [Numerai](https://numer.ai/). I think it’s one of the most exciting ideas in modern finance/prediction, and in a sense makes great use of the wisdom of its crowd.  
Finally, my favourite example is a company called [Numerai](https://numer.ai/). I think it’s one of the most exciting ideas in modern finance/prediction, and in a sense makes great use of the wisdom of its crowd.  
Numerai invites individuals to take part in its tournament by making predictions of stock returns. It provides anonymised, high quality data for participants to use however they like. All participants predictions as well as their historical accuracy go into its meta model to create an aggregated return forecasts for each stock. This set of predictions is then used to create a factor neutral portfolio which is managed in the Numerai hedge fund.  
Now, if there is ever an example of the wisdom of the crowds working it is this. Numerai has outperformed both its peers and a broader hedge fund index fairly consistently since inception, while exhibiting significantly lower volatility.  
It is essentially a decentralised version of the standard multi-manager hedge funds such as Millennium Management and ExodusPoint.  
