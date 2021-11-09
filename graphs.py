# Import the necessary modules
import matplotlib.pyplot as plt
import pandas as pd
import math

data = pd.read_csv("./stats.csv")

player = list(data.iloc[:, 0])
ppg = list(data.iloc[:, 1])

# Bar Graph	
fig, ax = plt.subplots(figsize=(12,4))

ax.barh(player, ppg, align='center')
ax.set_yticks(player)
ax.set_xticks(range(0, int(max(ppg))))
ax.invert_yaxis()
ax.set_xlabel("Points Per Game")
ax.set_ylabel("Player")
ax.set_title("Random Players PPG")


# plt.savefig("ppg-graph.png")

# Scatter Plot
fig2, ax2 = plt.subplots(figsize=(12,4))
plt.scatter(ppg, player)
plt.title("Random Player Data Sample - PPG")
plt.savefig("ppg-scatter.png")