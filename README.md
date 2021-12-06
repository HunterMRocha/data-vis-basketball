# Introduction

This is the final project for CS360 Data Visualization. In this project, I hope to provide visualizations of players who have revolutionized the game of basketball through their shooting. The main player I will be visualizing is Kobe Bryant. I will try to achieve this by mapping out all of his shots throughout his careers.


![kobe](https://i.pinimg.com/originals/69/fc/d6/69fcd6c7584187612bd98cad1d978ffd.png)


# Data Source

1. Shot Dataset

   This is the main dataset using in this project. This data contains all of the shots information for Kobe Bryant. I used python and [Datavizardly](https://datavizardry.com/2020/01/28/nba-shot-charts-part-1/) for guidance on how to process the data properly

   The data is obtained from [NBA Stats](https://stats.nba.com/)

2. Injury Dataset

   Another data set that I use in this project is the Kobe Bryant injury transaction data. As we all know, as a professional sports player, the injury is one of the biggest factor to effect his performance. Combining the injury dataset with the other dataset will provide us an insight to how Injury influence Kobe's performance.

   The data is obtained from [Pro Sports Transactions](http://www.prosportstransactions.com/)

3. Season stats Dataset

   This data set is just seasonal data stats

   The data is obtained from [NBA Stats](https://stats.nba.com) as well

# Data Preprocessing

In this part, since injury dataset and season stats dataset have already been cleaned and well organized. All I have to deal with is the shot dataset from NBA stats. Unlike the dataset provided by Kaggle, the original data obtained via API had redundant information that we don't need for this project. So, in this phase, I deleted some columns that we won't use in future(e.g. the team name, player name, game id). In addition to that, I've added a new column to indicate the score this shot made based on the shot_made_flag attribute.

The remaining dataset will have the following columns,

- Describe shot zone and action type:
  - action_type, combined_shot_type
  - shot_zone_area, shot_zone_basic, shot_zone_range, shot_distance
  - Shot_distance, shot_made_flag, score
- Describe shots position on the court:
  - loc_x, loc_y
- Describe game info:
  - game_date, season, playoff
  - period, minutes_remaining, seconds_remaining
  - opponent

# Questions & Objectives

- How Kobe’s shooting accuracy varies in different seasons?
- What insights can we draw from Kobe's shooting visualizations? 
- Are there any spatial patterns of Kobe’s shot that he seems to shoot more than others? 



### Interactions

The main interaction is completed by using the slider and the four buttons: 'All Shots', 'Made', 'Missed', and 'Stat Types.' By clicking the button, the scatter plot and contour map will only display the kind of shot users want to see. By sliding the slider, users can change the default seaon. And the scatter plot, contour map and the line chart will be updated and displayed the data belongs to the season users choose. Additionally, users can choose specific stats they want to see under the 'Stat Types' Button


### References
[Stackoverflow Question](https://stackoverflow.com/questions/28773113/d3-event-is-null-inside-of-debounced-function) <br>
[Nadieh Bremer](http://bl.ocks.org/nbremer/21746a9668ffdf6d8242)<br>
[Basketball Court Dimensions & Measurements](http://www.courtdimensions.net/basketball-court/index.php)<br>
[Andrew Wang's](https://bl.ocks.org/wonga00) block [Chart Slider](https://bl.ocks.org/wonga00/1e2e28b19129637ff41b986cf0a05aba/68a0f03be6aeefb1f6d008041366fa20542862ed) <br>
[virajsanghvi/d3.basketball-shot-chart](https://github.com/virajsanghvi/d3.basketball-shot-chart)<br>





Category | Stats
------------ | -------------
Offense | Offensive Rebounds, Assists, Turnovers, Attempts and goals for Free Throws, Field Goals and 3-Point Field Goals
Defense | Defensive Rebounds, Steals, Blocks
Efficency | Minutes Played, Accuracy for Free Throws, Field Goals and 3-Point Field Goals

