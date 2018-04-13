CREATE TABLE tickets.users
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    created_at datetime DEFAULT 'NULL',
    updated_at datetime DEFAULT 'NULL',
    email varchar(40) DEFAULT 'NULL',
    noise varchar(255) DEFAULT 'NULL',
    password varchar(100) DEFAULT 'NULL',
    register_status varchar(60) DEFAULT 'NULL',
    username varchar(15) DEFAULT 'NULL'
);
CREATE UNIQUE INDEX UK_sx468g52bpetvlad2j9y0lptc ON tickets.users (email, register_status);
CREATE UNIQUE INDEX UK_6dotkott2kjsp8vw4d0m25fb7 ON tickets.users (email);
CREATE UNIQUE INDEX UK_r43af9ap4edm43mmtq01oddj6 ON tickets.users (username);
INSERT INTO tickets.users (id, created_at, updated_at, email, noise, password, register_status, username) VALUES (1, '2018-04-01 04:51:34', '2018-04-01 13:07:46', 'Molloh@163.com', '9009c73fe9534db195490186ffe5d899', 'mao1997', 'STATUS_AWAKE', 'Molloh');
INSERT INTO tickets.users (id, created_at, updated_at, email, noise, password, register_status, username) VALUES (2, '2018-04-06 21:39:09', '2018-04-07 05:40:11', 'mollohchiao@hotmail.com', '8f09c038a5a74eb09fca50dd1dfc876f', 'mao1997', 'STATUS_AWAKE', 'chiao');
INSERT INTO tickets.users (id, created_at, updated_at, email, noise, password, register_status, username) VALUES (3, '2018-04-09 05:32:20', '2018-04-09 05:32:40', 'default@default.com', '7c113b064e5643bbac30aecc160fd11f', 'mao1997', 'STATUS_AWAKE', 'default');
INSERT INTO tickets.users (id, created_at, updated_at, email, noise, password, register_status, username) VALUES (4, '2018-04-08 23:53:17', '2018-04-09 08:11:40', 'aa@aa.com', '9119d9324822463c988ca6ecda074852', 'mao1997', 'STATUS_ABOLISHED', 'mao');
INSERT INTO tickets.users (id, created_at, updated_at, email, noise, password, register_status, username) VALUES (5, '2018-04-09 08:43:47', '2018-04-09 08:44:15', '151250073@smail.nju.edu.cn', 'd4e55ee53fd14cfc9e186c9ceee989e3', 'mao1997', 'STATUS_AWAKE', 'maomao');