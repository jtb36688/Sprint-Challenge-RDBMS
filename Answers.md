1. Explain the difference between `RDBMS` and `SQL`.
RDBMS is software that is used to manage relational databases, and SQL is a computer language which allows for interaction with database management systems. SQL is a well-accepted standard and works for nearly all DBMS.

1. Why do tables need a `primary key`?
Primary keys provide a distinct way of identifying each record, which helps prevent data anamolies and gives us a column to refer to when creating foreign keys on other tables.

1. What is the name given to a table column that references the primary key on another table.
A foreign key refers to the primary key on another table.

1. What do we need in order to have a _many to many_ relationship between two tables.
When creating a many to many relationship, we need an extra table which holds two foreign keys that each point to one or the other related table. There will be a record on this table for each representation of relation between the two tables.
