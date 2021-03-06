BEGIN;

  drop table if exists customer, record, customer_account
  CASCADE;

create table customer
(
  id serial primary key,
  name varchar(100) unique,
  email text ,
  password text ,
  img text,
  phone varchar(14),
  type int,
  note text
);

create table record
(
  id serial primary key,
  date DATE,
  amount FLOAT,
  description text,
  branch int2 not NULL,
  customer_name varchar(100)
);

create table customer_account
(
  id serial primary key,
  customer_id INTEGER,
  FOREIGN KEY
(customer_id) REFERENCES customer (id)
);

CREATE TABLE IF NOT EXISTS customer_url
(
  url varchar(7) primary key,
  customer_name varchar(100) unique
);

COMMIT;



-- BEGIN;

--   drop table if exists customer,record, customer_account
--   CASCADE;

-- create table customer
-- (
--   id serial primary key,
--   name varchar(100) not null,
--   email text not null,
--   password text not null,
--   img text,
--   phone varchar(14),
--   type int
-- );

-- create table record
-- (
--   id serial primary key,
--   date DATE,
--   amount FLOAT,
--   description text,
--   customer_id INTEGER,
--   FOREIGN KEY
--   (customer_id) REFERENCES customer
--   (id)
-- );

-- create table customer_account
-- (
--   id serial primary key,
--   customer_id INTEGER,
--   FOREIGN KEY
-- (customer_id) REFERENCES customer (id)
-- );


-- COMMIT;



