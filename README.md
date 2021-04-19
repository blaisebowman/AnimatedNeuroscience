# An Animated Discovery of Neuroscience
An Animated Discovery of Neuroscience is a web application with the aim to provide computer science and math students with the interactive educational animations pertaining to biological sciences. Given the deprecation of Adobe Flash Player, and by extension, Adobe ActionScript, as of January 2021, the entire website was essentially unusable. The aims of this project were to create and recreate the educational content in HTML5 Canvas and JavaScript, along with creating a better UI/UX, and adding a backend. The web application utilizes the MERN stack, along with APIs and libraries, such as JQuery, Pug, and TypeScript, creating a pleasant user interface optimized for desktop and mobile devices. The web application’s backend utilizes MongoDB, and students can register for an account and monitor their progress for each animation in a visual format. 

## Quick Stats

- Lines of Code - 207,400 lines _(approx.)_ 
- Languages used - React JS, TypeScript, jQuery, JavaScript, Pug, CSS, and HTML.

## Demonstration Link
[https://animated-neuroscience.herokuapp.com/introduction](https://animated-neuroscience.herokuapp.com/introduction "Demonstration")

## Credit 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Before vs. After 
Prior to my intervention, website used CSS, JavaScript, HTML, Adobe ActionScript animations that were essentially broken, and the site had no backend. Now the web application uses the MERN stack, along with TypeScript, jQuery, JavaScript, and Pug, and the web application has a backend.


|Before | After|
|--------|--------|
![diagram](screenshots/Before.png)|![diagram](screenshots/After.png)




## Features Implemented
### Introduction Page
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/Introduction.png)|![diagram](screenshots/Mobile/Introduction.png)
### Animation Category Page
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/Category.png)|![diagram](screenshots/Mobile/Category.png)

### Animation Page
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/Animation.png)|![diagram](screenshots/Mobile/Animation.png)

### Sign Up Page 
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/SignUp.png)|![diagram](screenshots/Mobile/SignUp.png)

### Login Page
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/Login.png)|![diagram](screenshots/Mobile/Login.png)

### Member Settings Page
|Desktop | Mobile|
|--------|--------|
![diagram](screenshots/Desktop/Settings.png)|![diagram](screenshots/Mobile/Settings.png)

### Member Animation Progress Tracking 
Within fullscreen on mobile, you scroll down to monitor your progress.

|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/ProgressAni.png)|![diagram](screenshots/Mobile/Scrolled.png)

### Member Animation Category Progress Tracking
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/Progress.png)|![diagram](screenshots/Mobile/STPor.png)

### Forgot Password Request
|Desktop | Mobile |
|--------|--------|
![diagram](screenshots/Desktop/ForgotPass.png)|![diagram](screenshots/Mobile/FP1.png)
![diagram](screenshots/Desktop/FP2.png)|![diagram](screenshots/Mobile/FP2.png)
![diagram](screenshots/Desktop/FP3.png)|![diagram](screenshots/Mobile/FP3.jpg)
![diagram](screenshots/Desktop/Forgot4.png)|![diagram](screenshots/Mobile/FP4.jpg)


### Running the Project

Clone the repository 
```
git clone https://github.com/blaisebowman/AnimatedNeuroscience.git
```

Open a terminal, in the main directory run: 
```
npm install
```
Open a second terminal, run: 
```
cd frontend && npm install && yarn start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\

Open a third terminal, run: 
```
cd server && npm install && node server.js
```
Note: the database configuration files are sensitive and not included in this repo, so you will not be able to test backend functionality on your machine.