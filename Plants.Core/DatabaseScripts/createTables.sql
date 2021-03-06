﻿CREATE TABLE [dbo].[Product]
(
		[ID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
		[CategoryID] UNIQUEIDENTIFIER NOT NULL,
		[IsAvailable] BIT,
		[Name] NVARCHAR(MAX),
		[Description] NVARCHAR(MAX),
		[ImagePath] NVARCHAR(MAX),
		[Price] INT
)

CREATE TABLE [dbo].[Category]
(
	[ID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
	[Name] NVARCHAR(MAX),
	[Description] NVARCHAR(MAX),
	[ImagePath] NVARCHAR(MAX)
)

CREATE TABLE [dbo].[Admin]
(
	[ID] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
	[Login] NVARCHAR(MAX),
	[Password] NVARCHAR(MAX)
)