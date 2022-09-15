# Discogs: The Greatest Albums Of All Time

## Introduction

This is a **sample-code project** I put together back in 2019 for demonstration purposes. Although the code [runs](#run) and the basic functionality works, it is not finished and will likely remain unfinished for all eternity 🥲

Note that the codebase is **intentionally over-engineered**. For example, in real developer life, I would not think to use Redux and Sagas on a project of this size.

Additionally, seeing as this project was put together a little while back and technology has since evolved, I **would probably use different libraries** now. I would have swapped out Enzyme for React Testing Library and Mock Service Worker, and Styled Components for Emotion, for example.

Also note that obviously the emphasis in this project is code, not aesthetics; I’m really not trying to convince any visual designers here.


## Functionality

This project lets its user assemble their own list of all-time-favorite music albums.

It has basic add/remove, routing and auto-complete functionality. It uses the [Discogs](https://discogs.com) API for querying data and (for simplicity’s sake) stores the user’s choices in local storage.


## Run

Install: `npm ci`<br/>
Run: `npm start`<br/>
Test: `npm test`<br/>

Life is easy.
