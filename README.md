# Gomoku game

## Running the App

1. install dependencies: `yarn`
2. start the app: `yarn start`
3. go to [localhost:1234](http://localhost:1234)

## About this app

Gomoku is a two player board game where the objective is to get a line of 5
consecutive pieces of your colour. Players take turns placing a stone
anywhere on the board until a player wins or the board is full. Winning lines
may be in a row, column or diagonal.

## Notes for marker

Board is configurable, use the form elements below the game to select a size.
The numbers should be at least 5 rows or columns. The App should always render
at least 5 rows and at least 5 columns. You may need to press the reset button
to render a new size.

All required messages are displayed in the #messages div below the game board.
The next player, the winner, or notice of a draw will be displayed in this
area.

The reset button on the form will reset the game as required.

The criteria was to build a bare-bones implementation, I would like to qualify
for a bonus mark for making a relatively attractive page, game board with 3D
effects in css, and including a favicon, form elements to resize the board.
