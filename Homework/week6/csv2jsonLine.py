import csv
import json

# names of csv- and json-file
INPUT_CSV = "data_linechart.csv"
OUTPUT_JSON = "data_linechart.json"
data = {}


with open(INPUT_CSV, "r") as csvfile, open(OUTPUT_JSON, "w") as jsonfile:
    reader = csv.reader(csvfile, delimiter=",", quotechar='"')
    headers = next(reader)

    # create list with years from header
    years = []
    for i in range(56):
        years.append(headers[4 + i][:4])

    # write json-file without headerinfo
    for row in reader:

        values = []
        for i in range(56):
            values.append({"year": years[i], "Age": row[4 + i]})

        # if not already exist, create country-seperated dictionary
        if not row[3] in data:
            data[row[3]] = []

        if row[1] == "Total":
            color = "#4daf4a"

        if row[1] == "Male":
            color = "#377eb8"

        if row[1] == "Female":
            color = "#e41a1c"

        # if not already exist, create serie-seperated dictionary
        if not row[1] in data[row[3]]:
            data[row[3]].append({"serie": row[1], "color": color, "values": values})

            # data[row[3]]["serie"] = row[1]
            # data[row[3]]["color"] = color
            # data[row[3]]["values"] = values

    # dump data into jsonfile
    json.dump(data, jsonfile, indent=4)
