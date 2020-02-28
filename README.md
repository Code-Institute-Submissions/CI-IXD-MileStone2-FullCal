# Events Calendar for Venue/Arts Centre
Milestone Project Two: Interactive Frontend Development - Code Institute 

This project creates an Events Calendar using an existing [XML feed](https://wexfordartscentre.ticketsolve.com/shows.xml) from Wexford Arts Centre's Ticketing + Event System by [Ticketsolve](https://ticketsolve.com) and using the popular [FullCalendar](https://fullcalendar.io) library. The project is an experiment and while styled as an App, I envisage it as a component or sidebar feed on an Arts Centre website. 


## Demo
A live demo can be found [here](https://rozzah.github.io/CI-IXD-MileStone2-FullCal/)


## UX

### User stories

- As a tourist or visitor, I want to see what is happening when I visit - when I arrived or when I stay in a few weeks time. While the Ticketsolve system lists events in chronological order it does offer calendar views if you are organising a visit or inviting friends down to stay.

- As a regular customer, I know I can simply check the website and will quickly find out what's on this week. I know I can filter events by category to find something of interest. If I find something I like I have links to Buy Tickets, share with friends or save and review later.

- As a Box Office receptionist I know the events calendar is up to date and this weeks listing is displayed as Ticketsolve acts as a 'Single Source of Truth' <b>*</b>

<small>Component sketches:</small>
1. [Card Sketch A](./docs/cardA.jpg)
2. [Card Sketch B](./docs/cardB.jpg)
3. [Card Sketch C](./docs/cardC.jpg)


## Features

- The 'App' uses FullCalendar to handle 3 main date-range / calendar views on upcoming Events:
  - Month View
  - Week View
  - Month List : a listing view which 'Favourites' defaults to

- Titles change to reflect the current view and users can progress through each week, or month, date-range using Previous and Next Buttons

- A Favourites Toogle Switch flips between all event listings and saved 'Favourites' which uses localStorage on the User's browser to read/write saved events as <abbr title="Javascript Object Notation">JSON</abbr> objects into an array. Toggling the Switch turns all event type categories back on, in case a user might have saved an event under a category not turned on (checked).

- A row of Event Types can be filtered above the main calendar controls. The also shows the diverse range of events on at the Arts Centre.

- The Week List View shows events for the week and hints are their content using cards that can be expanded to read; <small>although unfortunately sometimes staff and promoters put too much information into Ticketsolve</small>.

- The Month View expands event names on hover and opens a Modal Card with links similar to the week view.

### Features Left to Implement

The Month Listing view is quite pared back, I would like to experiment whether 'mini cards' and maybe a switch or heart icon to toggle whether to keep or discard - but without it getting too cluttered. While just the beginnings of an App idea you could imagine cookie of saved 'settings' for event types the User is interested in and these being 'on' when the customer comes back.

## Technologies
1. HTML + CSS - using the [Bootstrap](https://getbootstrap.com/) <abbr title="User Interface">UI</abbr> framework as FullCalendar has been tightly bound to this (and JQuery).
2. Some Custom CSS to get <abbr title="FullCalendar">FC</abbr> controls to be responsive.
3. Plain 'Vanilla' Javascript for the most part and some [JQuery](https://jquery.com/) where appropriate.
4. [FullCalendar](https://fullcalendar.io) - a powerful Open Source Javascript Calendar 
5. [Bootstrap Toggle](https://www.bootstraptoggle.com/) - an open-source extension that generates a toggle 'Flip' switch.


## Testing
The App features were extensively tested during development - storing and reading 'favourite' events from localStorage proved unreliable - I'm not sure if it was because of caching on my local Live Server (VS Code), but I decided to test by displaying on a table below the calendar (now removed). I concentrated on functionality but used Developer tools to get the UI into shape - this helped enormously track down the competing, or compounding, css statements when dealing with both Bootstrap and FullCalendar.
<abbr title="Cross-Origin Resource Sharing">CORS</abbr> proved to be a bit of a headache and in 2020 you can't really fool the browser or the resource server by sending a edited Header Request so I have tested using a CORS proxy but I commented this out in the <b>Events.js</b> module and instead the App points to a local file saved from the [XML feed](https://wexfordartscentre.ticketsolve.com/shows.xml) on Friday 28<sup>th</sup> February 2020.

<b>*</b>NB: This brings me to the point raised above about a single source of truth - Ticketsolve allows users great flexibility in creating and tagging event types when I have saved the latest version of the XML file I discovered that new event categories had been created and so the 'categories checkboxes' increased so I decided to cleanse the data somewhat an reduce the categories - this would be a consideration if implementing as a feed or website component.

## Deployment
The project is simply deployed on GitHub pages using a <b>gh-pages</b> branch. I hope to start using <abbr title="Javascript">JS</abbr> package managers to create a package.json dependencies file soon.

To run locally, you can of course clone the repository and access the 'index.html' file.


## Reflections
I stretched myself on this project, while it may appear that little code was written, the FullCalendar library turned out to be a mixed blessing. I really had to dig in to the documentation and do a lot research and update previous solutions to match the newer v.4; I don't think I've used the **Stack Overflow** site as much as I have in the past month! I'm reasonably pleased with the structure of my code overall although I would like to seperate the use of JQuery and plain JS (my preference). While coding this project I was conscious of the need for testing or writing automated tests but I had to concentrate on getting the library to function as intended. I would like to write some tests for the checkbox generator.


## Credits

### Content
All content and images are sourced from the [Wexford Arts Centre](http://www.wexfordartscentre.ie) ticketing platform Ticketsolve system - see [current events](https://wexfordartscentre.ticketsolve.com/shows) 
This project is a purely educational exercise to gain experience in coding and Javascript in particular, the author is not promoting or selling any events in Wexford Arts Centre or at any other Ticketsolve site or venue.

### Acknowledgements

Code Institute's Neil McEwen gave a good introduction to Jquery and traversing the DOM and that was helpful; as was the introduction to using Browser Developer Tools by Matt Rudge in a previous module. 

I also learnt an enormous amount by doing the [Javascript Bootcamp](https://scrimba.com/g/gjavascript) by Reed Barger on **scrimba**. But when my reducer function got too much I went back to basics and used a [great short project](https://www.youtube.com/watch?v=JaMCxVWtW58) from Brad Traversy on his [Youtube ***Traversy Media*** Channel](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)



**This is for educational use ONLY.** 
