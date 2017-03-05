#GameLink
Created by: Emile Fleming and Daniel Pencak

##Project Description

GameLink is a social network for gamers. It allows the user to connect or link with fellow gamers in the area.

###What problem does it solve?

I'd like an application that will allow me to connect with fellow gamers.

###Who has this problem?

Mark is 23 years old. He is an avid player of board games. He had a great game community. But Mark has moved away for a new job and he has lost the community he once had. He does not want to give up his hobby. He does not know anyone now who plays avidly and needs something that will allow him to find the gaming community in the area. He finds out about GameLink, creates an account and delves into the gaming community.

###Context:

Mark has just moved to Seattle for a new job. He has been in town for a few weeks. He is settling into his new job. He has a pile of board games in his closet. Before he moved he had a large gaming community that he was hooked into. Now the board games are collecting dust. He needs to connect to the gaming community in Seattle. He finds out about GameLink. He signs up on the site and explores. He finds an open session that is planning to play one of the games he enjoys. He sees that they don't have the board. He quickly joins and he is finally able to use the board games that were once collecting dust.

###How does the app solve this problem?

1. An application that allows users to create a new game session
2. An application that allows users to join an upcoming game session

###What was the biggest challenge to overcome?

The biggest challenge we faced during the development of this application was dealing with the flow of data with the React framework. The way we structured the application made it so that there was a long array of children with a lot of the data being stored in the state of the highest level parent. This created a structure that made it very difficult to keep track of where data lived as it was passed from one child to another. We learned that we need to have a better plan of attack going in, in regards to data flow. This means separating data that only is needed in one child to live in that child's state not the parent's.

##Features

[<img src="/public/assets/video-thumbnail.png">](https://vimeo.com/207008496)

Click here to watch a video demo of the app.

###Tech Stack

1. React
2. CSS
3. Node.js
4. ExpressJS
5. Knex.js
6. PostgreSQL
7. JavaScript
8. React-Bootstrap

##API's

1. Google Maps
2. Google Places
3. RoboHash
4. BoardGameGeek

##Future Development

1. Clean up edge cases.

  Do not show sessions that have expired.

  Allow the owner of the session to cancel a session.

  Update dashboard without page reload.

2. Add feature that will allow users to report players.

3. Add feature that will allow users to leave messages on the session page.

4. Add feature that will allow users to send private messages to another user.

5. Add feature that will allow users to add a game to the games table in the database.

6. Allow users to save their favorite games.
