# Star wars character data

## Introduction

A single page website that shows off details about characters within the Star Wars universe.

The site is built using the D3, DC and crossfilter.js libraries to present the data on screen in an interactive manner. 

## UX

The website was designed with people who wanted to view data on characters within the Star Wars universe with ease, and allow them to filter the data so that they can see key information about the characters.

the UI is developed in a responsive manner. it works on PC and mobile devices. 

### User Stories

* As a user, I want to be able to view information on characters within the Star Wars universe
* As a user, I want to be able to filter the data based on character.
* As a user, I want to view information such as alligence, birth planet height, and job.
* As a user, I want to have the ability to reset the filters.

### Mockups

## Features

### Existing Features

On this site you are able to do a number of this;

* Reset the filters on the top bar - as part of the functionality users are able to filer the data by a number of different factors, an easy way to reset these filters was needed.
* Look at more information of the characters that did not fit into a suitable graph, such as the type of vehicle the character owned, this is located in a Modal that is access through a button on the top bar.
* filter the data on a set of existing drope down menus.
* there are a number of pie charts that display verious different pieces of information, these are all interactive and can be clicked on to filter the rest of the data.
* there are 2 bar graphs that show height and weight of the characters.
* Each section can be collapsed and expanded.


### Future Implementations

* In the future I would like to implement an API connection to Google Sheets so that any new responses would automatically.
* I would like to update the colour profiles of the charts to make it feel more like "Star Wars."
* I Would like to fie the films section so that it collapsed fully, and not just individually.

## Technologies Used

The following technologies were used when designing and builing this website:

* HTML - used for the main body of the webpage
* CSS - used to style the webpages
* Javascript - used to write the code that handles the graphs the three libraries that were used are below:
    * DC.js
    * crossfilter.js
    * D3.js
* Gitpod - the IDE that was used to code the webpages
* Bootstrap - Used for the grid system it can apply
* github - Used for version control.
* Google fonts - Used for custom fonts.

## Testing

The webpage was tested using manual tests. 

The webpage was tested on numerous web browsers to confirm that there were no issues with the site on other web browsers.

As I use firefox as my main web browser I used the Firefox console to simulate difference device sizes, all of which worked as expected. 

## Known Bugs

As of writing this README, the only known bug is that the film section will not collapse all as one, but only individually. There is one small issue with the site on an Ipad Mini size where the alligence dropdown box expands out size of the background.

## Deployment

The website was developed using gitpod and a repository was saved on github for version control and development history. the final version of the website is hosted on github.

As of writing this there is no difference between the development version and deployed version.

you can find the website here: https://aldrinkwater1989.github.io/milestone2/. 

## Credits

### Content

- The site was designed and built by myself, and all commentary is mine and my own opinions.
- The dataset was obtained from Kaggle(Set found [here](https://www.kaggle.com/jsphyg/star-wars))
- I made some adjustments to the dataset; added in sequel characters, added the movies they appeared in, merged the vehicles and starships datasets with the characters as to give a more rich dataset to use.
### Media

The background image was found on google.

### Acknowledgements

Stack overflow for helping me find the answers to alot of questions.
[this](https://github.com/TravelTimN/dc-d3-top-eu-restaurants/blob/master/assets/js/script.js) repository for helping me see the new updated to DC.js

