CREATE SCHEMA [user]
GO

CREATE SCHEMA [resort]
GO

CREATE SCHEMA [location]
GO

CREATE TABLE [user].[account] (
  [id] int PRIMARY KEY,
  [username] nvarchar(255),
  [email] nvarchar(255),
  [full_name] nvarchar(255),
  [isAdmin] boolean,
  [created_at] timestamp
)
GO

CREATE TABLE [user].[password] (
  [id] int PRIMARY KEY,
  [password] nvarchar(255),
  [user_id] int,
  [created_at] timestamp
)
GO

CREATE TABLE [resort].[details] (
  [id] int PRIMARY KEY,
  [resort_name] nvarchar(255),
  [resort_description] nvarchar(255),
  [resort_address] nvarchar(255),
  [resort_website] nvarchar(255),
  [resort_rating] int,
  [city_id] int,
  [owner_id] int,
  [created_at] timestamp
)
GO

CREATE TABLE [review] (
  [id] int PRIMARY KEY,
  [review_details] nvarchar(255),
  [review_rating] int,
  [resort_id] int,
  [user_id] int,
  [created_at] timestamp
)
GO

CREATE TABLE [location].[city] (
  [id] int PRIMARY KEY,
  [city_name] nvarchar(255),
  [zipcode] int,
  [created_at] timestamp
)
GO

ALTER TABLE [user].[password] ADD FOREIGN KEY ([user_id]) REFERENCES [user].[account] ([id])
GO

CREATE TABLE [user].[account_review] (
  [account_id] int,
  [review_user_id] int,
  PRIMARY KEY ([account_id], [review_user_id])
);
GO

ALTER TABLE [user].[account_review] ADD FOREIGN KEY ([account_id]) REFERENCES [user].[account] ([id]);
GO

ALTER TABLE [user].[account_review] ADD FOREIGN KEY ([review_user_id]) REFERENCES [review] ([user_id]);
GO


ALTER TABLE [user].[account] ADD FOREIGN KEY ([id]) REFERENCES [resort].[details] ([owner_id])
GO

CREATE TABLE [resort].[details_review] (
  [details_id] int,
  [review_resort_id] int,
  PRIMARY KEY ([details_id], [review_resort_id])
);
GO

ALTER TABLE [resort].[details_review] ADD FOREIGN KEY ([details_id]) REFERENCES [resort].[details] ([id]);
GO

ALTER TABLE [resort].[details_review] ADD FOREIGN KEY ([review_resort_id]) REFERENCES [review] ([resort_id]);
GO


ALTER TABLE [location].[city] ADD FOREIGN KEY ([id]) REFERENCES [resort].[details] ([city_id])
GO
