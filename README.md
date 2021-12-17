# Budgie

## `arealglitterboy`


### Description


Budgie is a react based web app for managing personal expenses and budgeting. By offering a suite of expense tracking, visual budgeting tools, sharable savings goals, and more, Budgie offers a simple and straight forward way to save money and analyse areas where you might be over spending.


![Budgie that colours for app were taken from](https://www.urbanroad.com.au/assets/full/UR_P_706.jpg?20211126071729)


#### Goals


- [ ] Add [Chart.js]() to graph expenses
- [x] Add testing framework
- [ ] Add styling
- [ ] Incorporate more tools into one suite of tools (with the expensify portion being only part of whole experience)
- [ ] Develop live version
- [ ] Get screenshots for GitHub
- [ ] Create branding/aesthetic for the web app


### Ideas


#### Components


##### Countdowns


* Could be used as savings countdown, you set a target amount and a target date and budgie will calculate how much money you need to deposit per day or per week.
  * When you miss a deposit, it will just recalculate to be a little bit more.
  * Maybe could be set to strict or lax amounts, ie. saving for a holiday would be hopeful for an amount, but less or more is ok, whereas saving for a car needs to be a set amount.



##### Bins

* Bins that show how much has been spent in certain areas.
* Could also be used for saving, ie. you can put money into bins which shows that you are comfortable spending $x$ amount on this specific thing(s).



##### Budget Bands

* Visual interactive graph that allows you to set the general proportion of your money on.
  * Could just be resizable `<div>`s with icons and colours
  * When you make a payment, then it will be added to the graph with its proportion of your total amount of money.
  * If you spent more on food than you were wanting to, it will burst its bounds, give a percentage larger than expected, ie. $\color{red}\sf+20\%$.



##### Expenses & Credits

* Merge expensify expense list with a credits list so that you can show all money going in and out.



#### Functionality

##### CSV Export

* Click a button and get a descriptive run down of your budgeting



##### PDF Export

* Click a button and get a visual breakdown of your budgeting



##### Share Target

* Maybe offer the ability to share a bin with someone.
* Creating a share link will make it available to anyone with a link.
  * Has option to send money to you to help reach goal?
