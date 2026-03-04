from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)       # 업무 제목
    project = models.CharField(max_length=100)     # 프로젝트 이름
    assignee = models.CharField(max_length=50)      # 담당자 이름
    status = models.CharField(max_length=20, default='대기') # 상태
    due_date = models.CharField(max_length=50)      # 마감일
    
    def __str__(self):
        return self.title
