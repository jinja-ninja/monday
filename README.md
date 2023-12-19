# Funday - pixel perfect, E2E clone of Monday (React + Node.js). 

Funday is a full stack web application inspired by Monday that replicates the core functionalities of Monday.

[Live demo here](https://funday-k1un.onrender.com/ "Funday link")
## This project is built using React, Redux, NodeJS, ExpressJS, MongoDB, SASS, and Sockets.


For those of you who are already familliar with Monday, we added some intersting and unique [features](#application-features).
If you are not familliar with the App, read about it [here](#funday-description).
And if you are tired and just want to see some images of the website, [scroll to the bottom...](#showcase)

![Main board image](/src/assets/img/FundayBoard.png "Board-main-page")

___

### Table of Contents
- [Funday Description](#funday-description)
- [Application Features](#application-features)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Showcase](#showcase)

## Funday Description
Funday (Monday clone) is a work operating system and project management platform designed to help teams collaborate and manage tasks. It provides a visual and customizable interface for planning, tracking, and organizing work, allowing teams to streamline their workflows, communicate effectively, and stay organized. Funday is used by businesses and teams of various sizes to enhance project management and team collaboration.

## Application Features
- Create ***Boards*** and manage projects: Utilize ***Drag and Drop (D&D)*** functionality to seamlessly create, remove, and update groups and tasks.
- Create, edit and archive ***Task*** to the deepest level: Labels, Due date, Timeline, Members, Files, Activity log and more.
- ***Side Menu:*** - Filter boards by text/favorites, edit boards and switch between them.!
- Users system, along with regular authentication which is encrypted and safe.
- Live updates with ***Web Sockets*** .
- Visualize your project using the Kanban mode and dashboard.
- Introducing an ***AI helper*** with a voice assistant capable of accepting vocal commands. Record a task, and let it be broken down into smaller tasks by chatGPT.
- And a lot more exciting things - check it out [Live demo here](https://funday-k1un.onrender.com/ "Funday link").


## Technologies

The technology stack we used was MERN - MongoDB, Express, React, Node.js.
The app uses webSockets to update the board in real-time.
The API calls to the backend are done with the REST API method , and we used middlewares to authenticate and authorize actions.

We have used many thirs side libraries for many goals, such as the cloudinary, monday-ui-style ,react-particles-js, D&D and more.
The layout and pixel-perfect were made with SASS (functions, mixins, variables). 

## Getting started

Head to the repository on top and clone the project or download the files.

```
git clone https://github.com/galbarcessat/funday.git
git clone https://github.com/galbarcessat/funday-backend.git
```

Enter the backend folder and make sure you have node_modules installed. After that we will initiate the server with 'npm start':

```
npm i 
npm start
```

You should get a console ouput that the server is up and running at port 3030.
Enter the frontend folder and repeat the same process.

```
npm i 
npm run dev
```

You shuold get a console ouput that the server is up and running at localhost:5173.

That's it! The App should be opened automatically, enjoy!

## Showcase

### Homepage
The landing page in which the user can sign up / login, or press the call to action button to start demo if the are limited with time.

![Homepage image](src/assets/img/FundayHomePage.png "Home-page")

### Workspace
All of the user's boards. Navigate between boards.

![Workspace image](src/assets/img/FundayBoardIndex.png "Workspace-page")

### Board
All the functionality that you have in Monday. D&D, live-updates, editing tasks to the deepest level, side-menu, editing board members and much more - just  [Check it out](https://funday-k1un.onrender.com/ "Funday link").

![Main board image](/src/assets/img/FundayBoard.png "Board-main-page")

### Signup
We created an e2e authentication flow, including encrypting the users' details, middlewears.

![Login image](/src/assets/img/FundayLogin.png "login-page")

### Task details
Here, users can review task details, engage in a chat to allow members to leave comments on task progress, monitor the activity log, and attach files relevant to the task.
![Task details image](/src/assets/img/FundayTaskDetails.png "task-details")


### Kanban view
You can view your project/board in a Kanban format, where tasks are presented in lists, with each list representing the status of the tasks within it. Edit tasks and Drag & Drop (D&D) functionality are seamlessly integrated into the Kanban view.

![Kanban view image](/src/assets/img/FundayKanban.png "kanban-details")

### Some mobile!
Just a taste of the mobile experience. We used different **mixins** and **conditional rendering**. 
<img src="/src/assets/img/FundayHomeMobile.png" width="25%" style="float: left"/><img src="/src/assets/img/FundayBoardMobile.png" width="25%" style="float: left;"/><img src="/src/assets/img/FundayTaskDetailsMobile.png" width="25%" style="float: left;"/><img src="/src/assets/img/FundayDashboardMobile.png" width="25%" style="float: left;"/>


### Authors
 - [Gal Ben Natan](https://github.com/galbarcessat)
 - [Nati Feldbaum](https://github.com/omervered)
 - [Omer Vered](https://github.com/jinja-ninja)
