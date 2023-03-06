CREATE TABLE [user] (
  [id] int PRIMARY KEY,
  [username] nvarchar(255),
  [email] nvarchar(255),
  [full_name] nvarchar(255),
  [password] nvarchar(255),
  [isAdmin] boolean
)
GO

CREATE TABLE [resort] (
  [id] int PRIMARY KEY,
  [resort_name] nvarchar(255),
  [resort_description] nvarchar(255),
  [resort_address] nvarchar(255),
  [resort_website] nvarchar(255),
  [city_id] int,
  [owner_id] int
)
GO

CREATE TABLE [review] (
  [id] int PRIMARY KEY,
  [review_description] nvarchar(255),
  [review_rating] int,
  [resort_id] int,
  [user_id] int
)
GO

CREATE TABLE [city] (
  [id] int PRIMARY KEY,
  [city_name] nvarchar(255)
)
GO

ALTER TABLE [user] ADD FOREIGN KEY ([id]) REFERENCES [resort] ([owner_id])
GO

ALTER TABLE [city] ADD FOREIGN KEY ([id]) REFERENCES [resort] ([city_id])
GO

CREATE TABLE [user_review] (
  [user_id] int,
  [review_user_id] int,
  PRIMARY KEY ([user_id], [review_user_id])
);
GO

ALTER TABLE [user_review] ADD FOREIGN KEY ([user_id]) REFERENCES [user] ([id]);
GO

ALTER TABLE [user_review] ADD FOREIGN KEY ([review_user_id]) REFERENCES [review] ([user_id]);
GO


CREATE TABLE [resort_review] (
  [resort_id] int,
  [review_resort_id] int,
  PRIMARY KEY ([resort_id], [review_resort_id])
);
GO

ALTER TABLE [resort_review] ADD FOREIGN KEY ([resort_id]) REFERENCES [resort] ([id]);
GO

ALTER TABLE [resort_review] ADD FOREIGN KEY ([review_resort_id]) REFERENCES [review] ([resort_id]);
GO

