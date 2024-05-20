
![Group 2 (1)](https://github.com/elenascobici/PetPal/assets/95773832/a4b936db-a63a-4c2b-b9ea-568600588626)

**[PetPal](https://pet-pal-vercel.vercel.app/)** is a platform that simplifies pet adoption by connecting users with shelters and streamlining the adoption of various pets! This project was created with **React**, **HTML**, **CSS** (Bootstrap) **Django** and **MySQL**.

### Landing Page

<p align="center">
  <img src="https://github.com/elenascobici/PetPal/assets/95773832/9db0ab0c-3563-4a5f-8e9d-0d76e5447306" alt="Description" />
</p>


#### Login
Users/ogranizations can choose to login as a seeker or shelter depending on whether they want to adopt a pet or want to make pets available for adoption.
<img width="1273" alt="image" src="https://github.com/elenascobici/PetPal/assets/95773832/efeac658-8fea-47f1-8f74-f74a365966c1">

#### Seeker
Signing up as a seeker, a user can search for pets of interest via the Find Pets page.
<img width="1271" alt="image" src="https://github.com/elenascobici/PetPal/assets/95773832/2260edd2-c936-41b8-a192-0340834d969f">


Sort pets by various filter and view they satus



Click on each pet to enter their profile or view shelter details

If available, adopt!

Fill out the General Pet Adoption Application

View the pet you submitted an aplication for in My Applications

Chat with the Shelter of the pet you want to adopt

Receive notifications once the Shelter has approved from the notifications center

### Shelter
Create a pet shelter account

### Other
Update or delete profile for both users

access the blog, make and view comments

### Setup and Installation
With Python, Node.js, npm and MySQL installed, **clone** this repository:
``` bash 
git clone <>
```

#### Backend
Navigate to **backend** folder:
```bash
cd PetPal/P3/backend
```

Create and activate the virtual environment
``` bash
python3 -m venv venv
.\venv\Scripts\activate  # On Windows
source venv/bin/activate  # On MacOS/Linux
```

Install the required packages
``` bash
pip install -r requirements.txt
```

Make migrations and migrate:
```bash
python manage.py makemigrations
python manage.py migrate
```

Run the backend server:
```bash
python manage.py runserver
```
#### Frontend

Navigate to the frontend folder:
```bash
cd ../frontend
```

Install the required packages:
```bash
npm install 
```

Start the React development server:
```bash
npm start 
```

**Signup** as a _seeker_ to adopt pets or _shelter_ to add pets for adoption!

### University of Toronto
Programming on the Web (CSC309) <br>
Grade: 96%

### Authors

Note: We are working on deploying this so you can access it without a hassle.





