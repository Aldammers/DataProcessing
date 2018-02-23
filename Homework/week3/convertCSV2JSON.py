# Alexander Dammers
# 10528415
# Converts csv file to JSON file

import csv
import json

file_csv = open('faillissement1.csv', 'r')
file_json = open('faillissementen.json', 'w')

read = csv.reader(file_csv)
filenames = next(read)
#print(filenames)

reader = csv.DictReader(file_csv, filenames)

for line in reader:
    json.dump(line, file_json)
    file_json.write('\n')
print("json file is created")
