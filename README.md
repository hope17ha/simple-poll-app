Polling App

A simple Node.js & Express app for creating polls, voting, and viewing results. Uses Handlebars (hbs) for templating and stores poll data in a JSON file.

Features

View all polls on the homepage

Vote on poll options

See poll results with live vote counts

Setup

Clone the repo and install dependencies:

npm install


Ensure you have or downlaod the data/polls.json file with polls

Start the server:

node app.js


Visit http://localhost:3000

Project Structure
app.js           # Main app
data/polls.json  # Poll data
views/           # Handlebars templates
package.json     # Dependencies

Notes

Votes are saved directly to polls.json
