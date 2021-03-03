[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=297385&assignment_repo_type=GroupAssignmentRepo)
# group-project-group-n
This is the GitHub repository for COMP3120 Group Assignment - Group N 

# Band Quest - (Band Booking Web App)

## Outline
Our site is a band booking website (named Band Quest) that allows amateur bands to receive requests to perform at events of event organisers and earn money doing it. Bands create a band account which allows them to accept or decline performance requests, performance reviews, upload performances from Youtube and update their details. Users and event organisers are able to book bands for their events, view the status of their bookings, submit reviews of bands and view any performance videos posted by bands.

## Target Users
Amateur bands who wish to earn money playing music at events.
Event organisers who would like to book performances at their event and support amateur bands.

## Implemented in MVP

### Week 1
During Week 1, we were able to fully implemented the authentication process both the backend and the frontend. We also talked more about how we wanted the project to look and feel like.
### Week 2
- We were able to implement the feature where band can now update their information about themselve. This includes title, description,
price..., etc.
- We were also able to implement a carousel system in the explore page where user can now explore for the band that they want to hire.

### Week 3
- This is the last week of the milestone. Only feature that we have left is for the user to make a request to the band regarding the performance price and the location. During this week, we were able to implement a fully functional request and accept system just like facebook.
- We also implemented a review system where user can now leave a review message and a rating for the band.




## Project source code
Our repository was separated into different directories being frontend and backend. 

## frontend
The frontend directory contains all the files and directories that are used to show the content on screen. It looks at the information stored in the backend and presents the information on the web application in a stylised way. Within the frontend directory is the `App.js` file. In this project, this file allows the routes to be initilised. This allows the directory's to work within the web application determining what type of page will open and what components will be presented on screen.

#### components directory
The components directory contains all of the sub-sections of the frontend through refactoring and cleaning up the code, all the directories and code located in this directory is used by `App.js` to direct the user between pages and present the information on the users screen. Within the components directory is `NavBar.js` and `NavBarBand.js`, these components are on its own in the components directory as its utilised on every page. Both these files determine how the navigation bar (at the top of the page) is presented and which routes (found in `App.js`) will be taken. There are two seperate versions of `NavBar` due to the different content the Bands and Event Organisers, specifically being Requested on the Event Organisers version of the site, and Requests on the Bands version of the site. 

Looking at an example of the code found in the `NavBar` files:
```          
<Nav.Link title="Home" as={NavLink} to="/explore">
    Explore
</Nav.Link>
```

`Nav.Link` is used to determine what content will be used as a link to direct the user throughout the site, in this case directing the user to the explore page. When the user clicks the text "Explore", it will direct the user to the Explore page. To do this, it finds the required route (which is found in `App.js`). 

```            
<Route exact path="/explore">
    <Main />
</Route>
```

This route will look at which component is named `Main`. It will then follow the given project directory to find the file required that has the information that will be presented to the user.

### Auth
In this folder, it mostly contains the user interface of the client side regarding the sign in, sign up and join component for the band registration. 
* **Sign In**: component to handle the client side login of the sign in page. This login includes authenticating to the server side using bearer authentication. 
* **Sign Up**: Component to handle the client side when a user wants to register as a user to look for a band. This component involves all the login regarding the password matching and hashing. If a user register succesfully, they will be routed to the profile page.
### Band Profile
* **Review Folder**: Contains two components that handle the login of reviewing a band. The user who is making the review can leave a message and also a rating for the band. Reviews component lists all the reviews. ReviewMessage component is the component for writing the review.
* **BandProfile**: This is the main component that contain the smaller sub component to display the band profile page. This includes the performances of the band, the info of the band and also the reviews of the band.
* **Performance**: Component for each performance. This includes the vdo, and title and the description of the performance.
* **PerformanceList**: The component to handle all the performances that listed by the band. It also responsible for making them responsive.
### Booking
* **BookingForm**: Component to handle the form including the calender and the price and the request message that the user want to sent to the band.

### Category
This Folder contains the component under the nav bar to navigate to each genre of the band. However, due to the time limit, we haven't been able to implement this feature yet.


### Dashboard
* **BandDashBoard**: Component that will display the dashboard to the band when they are logged in. Band can add more information and the link to their performance in this page.
* **BandDetailForm**: Form for the band to add the detail of their band including title, price and description of the band.
* **BandPerformanceForm**: Form for band to add their performance link, title, and description. 
### Explore
* **Carousel Folder**: Contains all the components that handle to make the carousel of the explore page work.
* EachSlide: Component that handles displaying each slide of the Carousel.
* MultiSlide: Handle all the slides that need to be display in the explore section. The Slide will display according to the data that has been pass in as a props to the state of this components.
* **Main**: Is the Main component for displaying all the components of the explore page.
### Home
The home directory contains the code that allows the home screen (with the address `\`) to be displayed to the user. The screen is a basic home screen that allows the user to know the main idea of the site being a band booking site allowing event organisers to request bands to perform at their events. The directory also contains the `.css` file that is for organising the look of the page. 

### Profile
* **Profile**: Component to display the information of the user. This includes all the information that the user has entered when, they first registered.

### Request
This Folder handle the main functionality of the request login of the client side. 
* **BandRequest.js**: Is the main component to handle the requests login regarding the band. This includes the all the pending requests and all the accepted requests of the band.
* **UserRequest.js**:Is the main component to handle the requests login regarding the user. This includes the all the pending requests and all the accepted requests of the user.
* **NavBar.js**: Component for navigation for the user
* **NavBarBand.js**: Component for navigation for the band


## backend
The backend directory contains the code that allows access to the database to get any stored event organiser and band information such as usernames, emails, passwords, band information etc.

For this project we are using MongoDB as our data store.

* More detail of each route are listed in each file.
### models
This folder contains all the models for the backend of the application
### Route Folder
This folder contains all the different routes for the client side to fetch from. In this folder there are many routes including the auth, moredetail,request, and review route.
#### auth.js
This files handle all the login of the backend that is related to the authentication of the app including the sign up and sign in.
The sign up used JWT to generate token for the client to authticate the user. The Sign in used bearer authentication scheme to authenticate the user using the toekn that was generated earlier.
#### moredetailroute.js
This file handles the logic for when the band wants to add more detail about the band and add vdo about the band. The client will send information to the backend and the server will handle the login to add information to the document of mongo db.
#### requests.js
This file handles all the login related to when the user is making a request/offer to the band to play at their event. The user will make a request, then the server will handle the login and record all the information needed for the band to accept the request.
#### reviews.js
THis files handles all the login related to when the user write a review to the band regarding their performance. The review contains the review message and a rating scheme for the user to rate their experience with the band.
### interface designs
This directory contains all the user interface designs that are planned to be used to assist in the look and what type of information will be presented for the users. It also contains the website logo designs that are used in the final implementation of the website. The interface designs are designed in Adobe Xd which required further learning on how to use the software during the project.

## Next steps (if continuing project)
Our next step will be to implement features that will help provide a better experience to the users (bands and event organisers). To do this, we would need to implement an email system whenever requests are handled. When a event organiser submits a request to a band, that band will receive an email notification (to the email used to sign up and requested at login) letting them know they have received a new performance request with information about who submitted the request, the date & time, cost, location, and description. This is to give the band an external reminder of the request sent to the band without needing to access the web application. When the band accepts or declines the request, an email is sent to the event organiser with a result to the request. Such a feature will require an npm package like nodemailer to implement and will require the entire group to read and learn about how to implement the feature.

## Roles and contributions
### Brendan
My role was to design the user interface of the web application. This involved using a web application or software dedicated to graphic and interface design. We looked at different ways to achieve this and came to the conclusion of using Adobe Xd, a popular software used to design user interface wireframes and storyboards. This involved learning how to use the software to develop the designs shown in the directory named “interface-designs”. After the second sprint report and receiving notice from Sam to work on some programming, I also worked on the front end code to design the home screen. 
I also took the role of the group lead, this involved looking at the GitHub regularly to make sure the group was making commits to the code the successfully worked and if not notified the team to resolve the issue. This role also involved me informing the team of what documentation we required to complete for submission.
I communicated with the group using our Facebook group chat and had all major features and changes to the project in seperate branches which was committed and pushed into the repository.

### James

Firstly, I was responsible for drawing the storyboards. I created a mock up for each forseeable view, by hand with pencil and paper. This was contintued by Brendan who finalised this using Adobe software.
 
I was then responsible for coding the css and to wire it up to the HTML. This included finding relevant images from royalty free websites, and properly attributing the source. I had to change the HTML markup in some small areas so that the css would work. I also styled the individual web pages using the react-bootstrap framework. I originally wanted to give this site a more punk rock, 'bad boy' feel, but it ended up with a more minimal, modern design.

I was also repsonsible for writing some of the frontend tests. The files I wrote tested the forms by creating mock calls to the server. It tested valid form input, by using a match function. I also tested if components were rendered correctly by calling onSubmit.


### Socheat
I was responsible for the backend and most of the frontend development of the project. 
#### BackEnd
The backend of this application used mongoDB with the help of Mongoose.
* **Auth**: Handling the user authentication process. The authenticating include features like JWT,Password Hashing, email verification, and bearer authentication scheme. Authentication is for two different types of user. One is for the normal user and the other one is the the band. For this I had to create two different schemas. One for the normal user and the other one for the band. When a user register whether as a band or a user, they will be required to use different username. They then will be able to log in using the sign in page of the client side.
* **Request**: Implement a request feature where user can make a request to the band. If the request hasn't been accepted, it will be in a pending state. User can also delete the request that they made. Band can accept the request and also decline the request. You can read more about the logic in the request route.

* **Review**: Implement a Review feature where user can leave a review message and a rating for the band.

#### FrontEnd
Responsible for the Logic, Routing and Styling of the frontend code. Brendon was responsible for the **HomePage**. 

* **Auth**: Built the signup, signin, join components to handle the client side logic of the app.
* **Explore Page**: Built the Carousel with the help of react-slick. The carousel display all the band and band sort by their genre. This page is the maon page for the user who wants to book a band to browse for the band.
* **Request**: The request logic of the front end code. This include the component for the request card. The dynamic component so show the pending request and accepted request.
* **DashBoard**: Built the dashboard for the band. The band can then add more detail and a link to their performance.
* **UserProfile & BandProfile**: Built a profile interface for the band and the user according to the user of my teammate. 

  