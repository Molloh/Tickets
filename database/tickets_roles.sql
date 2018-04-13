CREATE TABLE tickets.roles
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(60) DEFAULT 'NULL'
);
CREATE UNIQUE INDEX UK_nb4h0p6txrmfc0xbrd1kglp9t ON tickets.roles (name);
INSERT INTO tickets.roles (id, name) VALUES (3, 'ROLE_ADMIN');
INSERT INTO tickets.roles (id, name) VALUES (2, 'ROLE_STADIUM');
INSERT INTO tickets.roles (id, name) VALUES (1, 'ROLE_USER');