# Alpha Extraction  
# Alpha Extraction  
  
* How do you make predictions?  
* How do you quantify prediction quality?  
* What data do you need?  
* How do you backtest a prediction model?  
* When is optimal time to begin trading in?  
* What is optimal way to trade in/out?  
* When is optimal to trade in/out?  
  
General process:  
* Expectations of future returns  
    * Observation and experience  
    * Alpha research  
    * Backtesting  
    * Alpha estimation  
* Portfolio construction  
    * Portfolio optimisation  
    * Hedging optimally  
        * Risk management  
[https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf](https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf) [http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf](http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf)  
[https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf](https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf) [http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf](http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf)  
[https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf](https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf) [http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf](http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf)  
[https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf](https://www.math.hkust.edu.hk/~maykwok/courses/ma362/07F/markowitz_JF.pdf) [http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf](http://cslt.riit.tsinghua.edu.cn/mediawiki/images/a/a7/Active_Portfolio_Management_-_A_quantitative_approach_for_providing_superior_treturn_and_controlling_risk.pdf)  
  
Model development  
* Choose indicators/independent variables  
* Get history for these variables  
* Construct the dependent variable (forward return over a period)  
* (trim middle of distribution +/- 1sd)  
* Fit your model on training data  
* Test your model on test data  
* Save coefficients & parameters to a local config yaml as part of refitting process (you are not constantly refitting the model)  
* Load the parameters into production for making new predictions  
* Take in data and make predictions  
