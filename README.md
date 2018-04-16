# Galaxy Go

## A SWAPI Console Application

This application provides a basic CLI that fetches all the star ships from the Star Wars API and determines how many re-fueling stops each ship has to make to cover a certain distance.

## What's inside

* [Node.js](http://nodejs.org/)
* [Jest](https://facebook.github.io/jest/)
* [ESlint](https://eslint.org/)
* [Prettier](https://prettier.io/)

## Dependencies

* chalk - colorizes the output
* clear - clears the terminal screen
* clui — draws command-line tables, gauges and spinners
* figlet — creates ASCII art from text
* inquirer — creates interactive command-line user interface

## Installation Steps

1.  Clone / download
2.  Run `npm install`
3.  Run `npm run galaxy-go`

![Galaxy Go Loading](http://res.cloudinary.com/tinavanschelt/image/upload/v1523424502/galaxy-go-example.png)

It loads all the Star Ships from the paginated API first, so that it doesn't have to do this every time the user enters a distance.

## Linting

Run `npm run lint`

## Testing

Run `npm run test`
