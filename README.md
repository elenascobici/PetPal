
![Group 2 (1)](https://github.com/elenascobici/PetPal/assets/95773832/a4b936db-a63a-4c2b-b9ea-568600588626)

**[PetPal](https://pet-pal-vercel.vercel.app/)** is a platform that simplifies pet adoption by connecting users with shelters and streamlining the adoption of various pets! This project was created with **React**, **HTML**, **CSS** (Bootstrap), **Javascript**, **Django** and **MySQL**.

https://github.com/elenascobici/PetPal/assets/95773832/a6cc563a-5ab6-4ba4-a04d-ca76d5b8c309

## Features

### Seekers
Seekers who are looking to adopt pets, can **sign up** as a seeker, **search** for pets, **view** pet profiles and **adopt** pets by filling out the adoption form. After submitting a form, seekers can **view** the status of all pets they applied for, **message** the shelter of the pet and receive **notifications** once the shelter has approved/denied the adoption request.

https://github.com/elenascobici/PetPal/assets/95773832/6f0c1976-742c-4184-8520-d05d83543c97

### Shelters
Shelter organizations who would like to offer pets for adoption, can **sign up** as a shelter, **create** new pets for adoption, **manage** pet adoption requests, **message** interested pet seekers and **notify** pet seekers on the status of their application.

https://github.com/elenascobici/PetPal/assets/95773832/65db024c-08e3-4da8-b295-9b31577fb2e6


### Pet Blog
Shelters and seekers can **view** the Blog page where they can **search**, **create**, **update** and **comment** on blogs through their **profile/account**.

https://github.com/elenascobici/PetPal/assets/95773832/2cd15293-50c7-4267-a8fb-14fc150295ac

## Setup and Installation
With `Python 3.12.` , `Django 5.0`, `React 18.2.0` and latest version of `MySQL` installed, **clone** this repository.

### Backend
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
### Frontend

Navigate to the frontend folder:
```bash
cd PetPal/P3/frontend
```

Install the required packages:
```bash
npm install 
```

Start the React development server:
```bash
npm start 
```

## University of Toronto
Programming on the Web (CSC309) <br>
Grade: 96%

## Authors
Malaikah Hussain, Cassandra Tin Kwon Yuen, Daelenia Susanto, Elena Scobici




