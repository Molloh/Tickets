CREATE TABLE tickets.stadiums
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    created_at datetime DEFAULT 'NULL',
    updated_at datetime DEFAULT 'NULL',
    email varchar(40) DEFAULT 'NULL',
    noise varchar(255) DEFAULT 'NULL',
    password varchar(100) DEFAULT 'NULL',
    register_status varchar(60) DEFAULT 'NULL',
    stadium_code varchar(15) DEFAULT 'NULL'
);
CREATE UNIQUE INDEX UK_e0bml1di10kyka7pekwjln5s3 ON tickets.stadiums (email, register_status);
CREATE UNIQUE INDEX UK_dfdjvr2t3r3tuppava19uu8sq ON tickets.stadiums (email);
CREATE UNIQUE INDEX UK_ekl0dvx4dcf8l9mp255mbva41 ON tickets.stadiums (stadium_code);
INSERT INTO tickets.stadiums (id, created_at, updated_at, email, noise, password, register_status, stadium_code) VALUES (1, '2018-04-07 05:15:11', '2018-04-07 14:47:18', 'molloh@163.com', 'cca1d35ac14a41f19a78174e87d843e1', 'mao1997', 'STATUS_AWAKE', 'fortest');
INSERT INTO tickets.stadiums (id, created_at, updated_at, email, noise, password, register_status, stadium_code) VALUES (2, '2018-04-08 23:52:19', '2018-04-09 07:55:32', 'aa@11.com', '599d6babecef4b1b8f613ac28d82335a', '123456', 'STATUS_AWAKE', 'd7c0e46');
INSERT INTO tickets.stadiums (id, created_at, updated_at, email, noise, password, register_status, stadium_code) VALUES (3, '2018-04-09 08:45:06', '2018-04-09 08:45:24', 'aaaa@aa.com', '76c5b2d813ca49488650a8e6a5d6acd4', '123456', 'STATUS_AWAKE', 'cd08816');
INSERT INTO tickets.stadiums (id, created_at, updated_at, email, noise, password, register_status, stadium_code) VALUES (4, '2018-04-13 05:48:49', '2018-04-13 05:48:49', 'aa@aa.com', 'dea5d5b4b0a24facbfe6ef456d980784', 'asdasd', 'STATUS_SILENT', '57f8631');