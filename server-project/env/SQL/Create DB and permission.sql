 

-- ����� ���� ������
CREATE DATABASE tasksAngular;
GO

-- ����� ���� ������� ����
USE tasksAngular;
GO

-- ����� ����� ���� (login ���� ����)
CREATE LOGIN project WITH  PASSWORD = '1234';
GO

-- ����� ����� ���� ������� ���� (user ���� ���������)
CREATE USER project FOR LOGIN project;
GO

-- ��� ������ ������ (���� db_owner)
EXEC sp_addrolemember N'db_owner', N'project';
GO

SELECT name FROM sys.sql_logins WHERE name = 'project';

