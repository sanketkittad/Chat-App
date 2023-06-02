from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login as ulogin
from . import models

# Create your views here.
rid=""
def setRoom():
    return rid

def index(request):
    
    return render(request,'main/index.html')
# @login_required
def roominit(request,room_name):
    
    return render(request,'main/room.html',{

        'room_name':room_name
    })