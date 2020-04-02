CREATE TABLE record(
  recordid SERIAL PRIMARY KEY,
  clubname VARCHAR(30),
  points INTEGER,
  createdat TIMESTAMP
);

INSERT INTO record(clubname, points, createdat) 
VALUES('Arsenal', 0, now()),
('Chelsea', 0, now()),
('Liverpool', 0, now()),
('Man Utd', 0, now());