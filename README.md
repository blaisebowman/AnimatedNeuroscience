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
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Before.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/After.png?raw=true)

## Features Implemented
### Introduction Page
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Introduction.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/Introduction.png?raw=true)
### Animation Category Page
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Category.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/Category.png?raw=true)

### Animation Page
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Animation.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/Animation.png?raw=true)

### Sign Up Page 
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/SignUp.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/SignUp.png?raw=true)

### Login Page
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Login.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/Login.png?raw=true)

### Member Settings Page
|Desktop | Mobile|
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Settings.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/Settings.png?raw=true)

### Member Animation Progress Tracking 
Within fullscreen on mobile, you scroll down to monitor your progress.

|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/ProgressAni.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/Scrolled.png?raw=true)

### Member Animation Category Progress Tracking
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Progress.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/STPor.png?raw=true)

### Forgot Password Request
|Desktop | Mobile |
|--------|--------|
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/ForgotPass.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/FP1.png?raw=true)
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/FP2.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/FP2.png?raw=true)
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/FP3.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/FP3.jpg?raw=true)
![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Desktop/Forgot4.png?raw=true)|![diagram](https://github.com/blaisebowman/AnimatedNeuroscience/blob/master/Screenshots/Mobile/FP4.jpg?raw=true)


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