# Interval Timer app

<h2>Description</h2>
<span>This is a hybrid mobile application made by using HTML/CSS/JS programming languages and the Cordova mobile application development framework.</span>

<h2>Platforms</h2>
<span>This repository contains the .apk file of the app which can be installed on Android devices. The content of the /www directory can be started inside a browser as a web application.</span>

 <h2>Functionality</h2>
 <span>This application allows the user to input his/her's desired work and rest interval duration and the number of sets(repetitions).</span>
  
  <h2>GUI</h2>
  
![alt text](https://user-images.githubusercontent.com/56841259/103142030-d807eb80-46fd-11eb-9fe8-524f7bed8453.png)
![alt text](https://user-images.githubusercontent.com/56841259/103142097-3f25a000-46fe-11eb-8526-9a37594d518c.png)
![alt text](https://user-images.githubusercontent.com/56841259/103142099-4351bd80-46fe-11eb-843d-ed824f907521.png)
  
<h2>Instalation</h2>
  <h4>Android</h4>
  
   <span>Run `app-debug.apk` on your Android device to install the application. To find the .apk file go to  `.../platforms/android/app/build/outputs/apk/debug`.</span>
  
  <h4>Offline Desktop/Add to website</h4>
  
   <span>The web source code is inside the `/www` directory. To run the app offline on a PC just open the `index.html` file inside an internet browser.</span>
  
<h2>Code explanation</h2>

<h4>DOM elements</h4>

<span>All of the DOM elements are generated in the Javascript code except the `main_container` div who is a child of the body element and the parent of all other generated elements. There are 3 classes I made to quickly add new customized DOM elements : `fbutton`,`containers` and `input_field`. The argument of their constructor is their **id**.</span>

<h4>fbutton class</h4>

<span>The class is written in a way in which the argument of the constructor dictates which `onclick` function is asssigned to the button. It also assigns the proper label of the button.</span>

<h4>input_field class</h4>

<span></span>


