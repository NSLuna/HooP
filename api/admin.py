from django.contrib import admin
from django.db import models
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'assignee', 'status', 'due_date') # 화면에 보여줄 항목들