---
title: Hash Sets and Organisation
author: Barney
date: 2021-07-12
tags: computer science
---

Some things are worth organising, while others are not. Think for a second about your own life, what do you organise? Your clothes? Books? Passwords? Emails? Chances are you implicitly follow something similar to the system I will talk about below, and if not then this should help you get a better idea of whether its worth doing so.

One note before I dive in, I will use "organise" and "sort" interchangebly in the rest of this essay. I am aware they are not the same at the fundamental level but the concept I'm getting acrossis the same with either action.

## When should we organise?

This is essentially the same question as why should we organise, and the answer is straightforward: Organise when doing so is less effort than searching through the unorganised version. I first read about this idea in Algorithms to Live By (Christian and Griffiths). In the book the authors talk about the trade-off between sorting and searching and explain, as I have done, that it is only worth organising your "stuff" if it takes a long time to search through all that stuff relative to the amount of time it would take to sort. The authors don't give an explicit law to follow unlike in other chapters (my favourite remains the solution to finding a partner being 1/e), however the idea is still legitimate. When the cost of searching exceeds the cost of sorting, we should sort (and vise versa).

Consider two situations: Firstly, when we can quickly sort something to make it much faster so search through, we should. Take your laundry for example. After washing your clothes, drying them, and taking them out of the drier, the cost to you of organising them then and there is much less than the cost of searching for the item you need when the time comes. On the other hand, when it takes a long time to sort something which is pretty easy to search even when unsorted, we shouldnt. In this case take your email inbox, there could be thousands of emails in there, but so long as you remember something about it such as who it was from or what was in the subject, then its not really worth spending the time to put each message into its respective folder.

## How should we organise?

Unorganised data is well represented by an Array. An Array is an ordered list of items (integers, strings, phone numbers, etc), and in some more modern programming languages such as Python they are called Lists. Arrays have an order but no separated organisation, and hence do well to represent the cost of disorganisation as follows: In order to check if an item is in the array you have no good strategy. Your best bet is just to check each item in any order that takes your fancy. This means that searching an Array twice as long will on average take you twice as long, the search algorithm is O(n).

However, if we organise our data, then we can vastly improve this search efficiency. In Computer Science, one way to represent organisation that I have recently found interesting is through HashSets. A HashSet is an array of "buckets" which uses a hash function to decide which bucket each item goes into (a bucket in turn being an array). The hash function takes an item as the input, runs some operation on it and produces a hashcode, a number that correlates to a bucket in the HashSet. For example, a hash function might take the string "Dog", calculate the length as 3 and hence put the string in the 3rd bucket. The benefit of the hash function is that it can be run on items that we are searching for too. If we want to find "Dog" we know that we only need to look in the 3rd bucket, if its not there then its not in the HashSet. Intuitively this is no different to organising your clothes, where you have a hash function that takes inputs like t-shirts, shorts, socks and outputs locations like wardrobe, top drawer and bottom drawer (or perhaps floor, floor and floor in some cases).

This improvement in search efficiency allows for us to find items with an complexity closer to O(1), compared to O(n) previously, depending on the average number of items per bucket (known as the load factor).

Put simply, you can find things faster if you know where you always put them.
