python3 -m venv venv
source venv/bin/activate
pip install pip==23.3.1
pip install django==4.2
pip install pillow==10.0
pip install djangorestframework
pip install django-filter
pip install djangorestframework-simplejwt
python manage.py makemigrations
python manage.py migrate