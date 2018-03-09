import csv
import json

# open files and create empty file
csvfile = open('data_Russia&USA.csv', 'r')
jsonfile = open('data_Russia&USA.json', 'w')
data = []
fieldnames = ("Date", "ME_R", "ME_U", "EXP_R", "EXP_U", "IMP_R", "IMP_U")

# read csv 
reader = csv.DictReader(csvfile, fieldnames)

# get data array and fill with data
for row in reader:
    data.append(row)

# fill new json file 
json.dump(data, jsonfile, indent = 7)
