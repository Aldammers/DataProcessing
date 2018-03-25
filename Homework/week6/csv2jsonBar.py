# Alexander Dammers
# 10528415
# Converts csv file to JSON file


import csv
import json

# names of csv- and json-file
Input = "data_barchart2.csv"
output = "data_barchart.json"
data = {}


with open(input, "r") as csvfile, open(output, "w") as jsonfile:
    reader = csv.reader(csvfile, delimiter=",", quotechar='"')
    headers = next(reader)

    years = {}
    for x in range(56):
        series = []
        countries = []
        with open(input, "r") as csvfile, open(output, "w") as jsonfile:
            reader = csv.reader(csvfile, delimiter=",", quotechar='"')
            headers = next(reader)
            
            for row in reader:
                if row[4 + x] == "..":
                    row[4 + x] = 0
                else:
                    row[4 + x] = float(row[4 + x])

                if len(series) == 0:
                    series.append({"serie": row[1], "value": row[4 + x]})
                    continue

                elif row[1] == "Maternal Deaths":
                    countries.append({headers[2]: row[2], "country": series})
                    series = []
                    continue
                    
                series.append({"serie": row[1], "value": row[4 + x]})
                
            years[headers[4 + x][:4]] = countries

   with open(output, "w") as outfile:
        json.dump(years, outfile, indent=3)
