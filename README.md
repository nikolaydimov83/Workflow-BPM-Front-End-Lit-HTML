# Getting Started with the app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Back-end Server

The server for this app listens to https://185.123.188.135

NOTE: THE SERVER IS USING SELF-SIGNED SERTIFICATE. 
IN ORDER YOUR BROWSER TO ACCEPT THE SELF SIGNED CERTIFICATE:

### YOU SHOULD FIRST ENTER: https://185.123.188.135/ IN YOUR BROWSER

You will receive warning "Your connection is not private". 
Go to advanced and click:"Proceed to 185.123.188.135 (unsafe)"
Once clicked - you will receive "message:"You are not logged! Please login in order to proceed"
With these steps you have accepted the selfsigned certifate of the server and may proceed to use the application functionality.

Note:The server is CORS configured to accept requests from https://radiant-harbor-40382-be0cb3589812.herokuapp.com and from
http://localhost:3000. If you try to send requests from different ports/addresses you will receive CORS Network Errors.

## Run the application

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
Note: If for some reason (for example you have existing process on port 3000) the application is opened on diffrent port t
he server will not accept the requests and you will receive Network Cors Errors.

### Builded app: https://radiant-harbor-40382-be0cb3589812.herokuapp.com

You can directly open the already builed app at https://radiant-harbor-40382-be0cb3589812.herokuapp.com

You can also use npm run build

## Application General Explanation

This application is a workflow - ticketing system. Users can create and edit workflows as well as handle tickets(requests) that go through already created workflows.

The app was created based on the real business need of my employeer to have a ticketing system where users - not developers can create and manage directly the business workflows. 

Simply explianed - there are 3 general types of users:

"Workflow" - this user can create user roles, statuses and assign them to workflows. 
A sample user of type workflow is parametrized email: ihristozova@postbank.bg, password:123

"Admin" - this user can create users. And assign the users specific role that has been already created by "Workflow" user and Branch information.
Please note that it is impossipble to register in the application, if your account has not first been created by the admin user.
A sample user of type workflow is parametrized email: rkostyaneva@postbank.bg, password:123

"Simple User" - this user can genereate tickets (requests), edit them, changed their status based on the Role that was assigned to him and based on the worklows logic created by the workflow user. You can see full list of already created users by logging in with admin role - rkostyaneva@postbank.bg. All users in the list are currently defined with password: 123 

"Guest" user sees only the home page, register and login pages.

All basic types of user see diffrent navigation based on their responsibilities.

### User register

The application registration is done in two steps. First existing Admin must create the account (you have sample admin account rkostyaneva@postbank.bg, pass:123). 
In the form that is opened you have to enter information about:

Branch Number - you must enter number between 1 and 999. Please consider a good practice for HO users to enter 101 as branch number. Although, any number would work

Branch Name - non empty string

Email - the email of the user you create. Please note that emails are in FORMAT: example123@postbank.bg

Role - you can choose a role from a list of roles that have already been created by workflow user. 

User Status - You can enter - Active, Inactive. If user is created or set to inactive - he/she is not able neither to register nor to login

When the user is created by the admin - he/she can register, by going to "Регистрация", entering email adress, password and re-password. Password is set for testing purposes to be at least 3 chars long

### User login

Only users that already registered and have User Status - Active can login. If user was marked by the admin as Inactive. He will not be able to login.

### Role, Status, Workflow, Subject

In order to proceed explaining the core functionality I have to explain how Workflows are created and assigned. As explained above - workflows are created by special user that has role "Workflow".

This user is able to:

1. Create role - inputing role name and whether this role is Branch role or HO (Head Office role). The role type is important for the logic of the dashboard since the users with role of type branch see only the requests of their branch, while the HO users see all the requests.

2. Create status - Status is created by: 
        a. Assigning name of the status
        b. Array of next statuses - these are the statuses that user will be able to choose to move the application on from this status 
        c. Role that sees the status - one of the roles created in point 1. 

Users see on their dashboard tickets(requests) with current status that have the same role of the status as the user role. With the addition that if the user role is of type branch - he would see statuses with role equal to his role but only for his branch. HO users would see all statuses with role equal to their role - no matter the branch.

3. Workflow - It is created by:
    a. choosing the initial status of the workflow. When the initial status is chosen - it has next statuses, the next statuses have their next statuses, etc. Thus workflow tree is enabled on the server
    b. Every workflow might have one or more super users - this is a role chosen for the workflow that gives the users with this role the following special abilities:
        i. A user that handles ticket request of workflow that has super user equal to his role - can edit the request. No one is allowed to edit the request
        ii. Super user can change the request status to one of the next statuses and to status of type "Приключен" even though the request is not on his screen
    It is not necessary to include super user in the workflow
4. Subjects - this is created to be able to assign diffrent names to one workflow. For example if you have a two different types of tickets that use the same statuses, super user, etc. It is more convinient to set one workflow and to assign it to 2 "Subjets", compared to creating two workflows. Consider Subject a decoration of the workflow that adds user friendly names. User sees the Subjects when creating a ticket, not the workflow. 

### Simple User Core functionality

When user is logged he is redirected to the Dashboard page upon successful login. Where all the pending tickets he/she is responsible to process are presented.

#### User Dashboard

If he has visitited another screen, he can always return to this screen by pressing 'Моите заявки' from the navigation. 

'На мой екран' button will also refresh the list of the pending requests of the specific user. Pending request for specific user is a request that is on current status that has role equal to the role of the user that is currently logged in. Please note that in addition, If the role is of type branch the request will be presented to the dashboard screen only if the request(ticket) Financial Center or Reffering Financial Center is equal to the user Financial Center. 

There are sever other buttons presented on the right part of the screen where the user migth see diffrent type of requests lists:

"ЗАБАВЕНИ" - Show all delayed requests that are relevant to the user. Includes not only pending requests but all requests with passed deadline date that are relevant to the user. Relevant means - the request is assigned to workflow, where at least on the of the statuses parametrized in the workflow has role equal to user role. If the user role is of type branch he/she would see only requests with Financial center or Reffering Financial Center equal to his/her Financial Center

"ВСИЧКИ АКТИВНИ" - Show all requests with current status that are not closed that are relevant to the user. Again Relevant means - the request is assigned to workflow, where at least on the of the statuses parametrized in the workflow has role equal to user role. Closed means that the current status has role with name "Closed". This is a special role. If the user role is of type branch he/she would see only requests with Financial center or Reffering Financial Center equal to his/her Financial Center

"ВСИЧКИ" - Will display ABSOLUTELY all requests for the HO user (not only the relevant). Created this button for easier testing of the server. For the user the rule of the Fin Center/Reffering Financial Center will apply.  

The context - in what mode is the presented information will be displayed as heading above the table of the information. For example, when you click on "ЗАБАВЕНИ" - a heading will apear "Забавени заявки", when you click "НА МОЙ ЕКРАН" the heading will be changed to "Заявки за изпълнение"

The Search Form in the top left part of the screen sends the serach string to the server. The server processes the data and returns back the relevant info. 

Please note that the server searches by: Създател, Апликация номер,	Име на клиента,	ЕГН/ЕИК, ФЦ, Рефериращ, Статус, Subject
The search by Създател, Апликация номер, ЕГН/ЕИК, ФЦ, Рефериращ returns only full match. And the server is able to understand what the user is seraching. For example:

If the user enters ndimov@postbank.bg or any email that matches the pattern of email for this app - the server will uderstand that the user is searching by creator and will return ONLY THE FULL MATCHES

If the user enters BL101 or any I apply Id that matches patern /^[A-Z]{2}[0-9]+$/ it will return all the requests that have full match for Iapply ID

If the user enters 9 or 10 string number in patern /^[0-9]{9,10}$/ (can start with zero) it will return all the requests that have full match for ЕГН/ЕИК

For pattern /^[0-9]{1,3}$/ the server will return all matching requests with ФЦ, Рефериращ equal to the string FULL Match

All other strings will be searched in Статус, Subject, Име на клиента and all results with PARTIAL MATCH will be returned


By using the filter input the user can filter out the already rendered requests that match his input. This does not send any requests to the server but filters out the already rendered data.

The excel button downloads the data displayed on the screen in excel.

Sorting is available by clicking on the respective th of the table - with one click you sort asc, 2nd click and sort desc, 3rd click will remove the sort

User can access the details of the specific request by clicking "Покажи"


### Request Details

When the user opens the request in the upper-left of the screen he/she sees the basic request status info:

Request Subject (That is acually the reffernce with which workflow the request is linked),Current Status, Deadline date

On the upper right screen the last comment is displayed.

Below them - in the left information initialy retrieved (upon request creation) from the bank's application system is displayed. 

In the center are the possible actions that are available to the comment

Смени статус: Will be displayed if the application is pending application for the user. This means that the user role is equal to the role of the current status of the application. If this is the case in the select above this button the possible statuses for choice (set as nextStatuses for the current status will appear). The user choose the status he wish the request to and press "Смени статус"

Смени статус button will also be visible for the user if his role is set as Super User Role in the Workflow that is handling the request. In this case the user will see the nextStatuses for the current status, but will also be able to choose between all statuses for the respective workflow with role "Closed". He is able to directly close the request.

Every user can write comment - no matter if the request is in his/her pending requests or even if it is closed.


### Edit Request

The user is able to edit the request, only if one of the super user roles of the workflow of the request matches his role as user. The only information the user is allowed to edit in the request is a new deadline date and it is compulsory to add comment upon submiting the edit form.

On the rigth is description of the request - informative field

Bellow are displayed all the comments for this request

### Create request

User goes to create request's form by clicking "Създай заявка" in the navigation. The form that opens needs the following data:

Iapply ID: The number of the application in the organizations's application's system. The format is /^[A-Z]{2}[0-9]+$/. Upon Blur the app sends request to the server and data is automatically retrieved. If the respective Iapply Id is not found - an error message will be displayed. If succefull - all fields, except "Краен срок" and "Описание" will be fulfilled.

"Краен срок" should be future date and "Описание" should be at least 15 chars long.

VERY IMPORTANT - From the Subject select field the user choses the Subject of the request that will actually set to which workflow the request is binded. The user will see only subjects that are connected to a workflow that has initial status with a role that is equal to the user role. If the user does not have at least one subject that is binded to a worklow with initial status that have a role equal to the role of the user - the select will be empty.

A request cannot be generated when Subject is not selected - the server will not approve it.

Upon successful creation the new request will be assigned with current status equal to the initial status of the workflow that is set to the subject of the request and the user will be send to the /dashboard

## Test Module

For the time being there is one testing module - in App.test.js that test the login form. Run test with npm test script

## PLEASE READ

Тъй като възможността потребител да създава заявки, да ги edit-ва и да ги движи по workflow е свъзано с параметризации от потребител със специални права, чиято функционалност още дописвам на React, обръщам внимание, че през лит версията съм напараметризирал няколко юзъра за удобство, ако проверяващите искат да разгледат:

User: ndimov@postbank.bg, pass:123 - потребител, който може да създава заявка със Subject "Учредяване на залог". Този потребител е Super потребител за заявки със Subject "Учредяване на залог". Какво означава супер потребител - в README.md :)

Потребители dsrangelova@postbank.bg, epaneva@postbank.bg, nnachev@postbank.bg - всички са част от процеса със Subject "Учредяване на залог". Всички използват pass 123. dsrangelova и epaneva са с роли на клон, nnachev е с роля на ЦУ

Потребител rkostyaneva@postbank.bg - отново pass:123 е user admin

Може да видите списък с текущите потребители и техните роли, да създадете нови и да променяте съществуващи. Молбата ми е, ако тествате промяната по данни на потребител да не го правите върху вече създадените, тъй като активно ги ползвам, за да тествам - по-добре създайте нов потребител и пробвайте с него промени.