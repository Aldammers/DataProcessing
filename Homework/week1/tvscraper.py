#!/usr/bin/env python
# Name: Alexander Dammers
# Student number: 10528415
# Having a lot of trouble with the error: 'unindent does not match any outer indentation level'. 
# Even retyping the code and getting rid of the tabs, doesn't seem to work.. So i cant get my code to 
# work or even to test.

"""
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    """
    Extract a list of highest rated TV series from DOM (of IMDB page).
    Each TV series entry should contain the following fields:
    - TV Title
    - Rating
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """
    
    # create empty list for info of series
    series = [] 
	
    # iterate through list of series
    for serie in tvseries:
	
        # create a single list for every serie
        serie_input = []
        
        # scrape the title of the serie
	    title = serie.h3.a.text
	    titles.append(title)
			
        # scrape rating of the serie
	    rating = float(serie.strong.text)
	    ratings.append(rating)
        
        # scrape the genres of the series
        genre = serie.p.find("span", class_ = "genre").text
        genres.append(genre)
		
        # scrape actors and actresses from series
        star = serie.find("p", "a").attrs['Stars'].split(',')       
        stars.append(star)
        
        #scrape the runtime
	    runtime = serie.find("span", class_= "runtime").text
        runtimes.append(runtime)
		
	    # extend info to single serie list
        serie_input.extend([titles, ratings, genres, stars, runtimes])
        
        # append all info in all series list
        series.append(serie_input)
	
	
	# return list
    return series


def save_csv(outfile, tvseries):
    """
    Output a CSV file containing highest rated TV-series.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
	
    for rows in range(len(tvseries)):
	    writer.writerow(tvseries[rows])


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, tvseries)
