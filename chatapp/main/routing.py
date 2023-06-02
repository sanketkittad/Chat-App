from django.urls import re_path
from . import consumers
from . import views
rid=views.setRoom()
websocket_urlpatterns=[
    re_path(r'ws/main/(?P<room_name>\w+)/$',consumers.chatRoomConsumer.as_asgi())
]