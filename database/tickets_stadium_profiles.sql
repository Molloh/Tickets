CREATE TABLE tickets.stadium_profiles
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    address varchar(100) DEFAULT 'NULL',
    phone_number varchar(15) DEFAULT 'NULL',
    stadium_name varchar(255) DEFAULT 'NULL',
    stadium_id bigint(20) NOT NULL,
    CONSTRAINT FKh1o2crtvcjwpuncpc5ji5tcfr FOREIGN KEY (stadium_id) REFERENCES stadiums (id)
);
CREATE INDEX FKh1o2crtvcjwpuncpc5ji5tcfr ON tickets.stadium_profiles (stadium_id);
INSERT INTO tickets.stadium_profiles (id, address, phone_number, stadium_name, stadium_id) VALUES (1, '北京', '13852640706', 'jlq123', 1);
INSERT INTO tickets.stadium_profiles (id, address, phone_number, stadium_name, stadium_id) VALUES (2, 'sdssss', '1354687', 'aaaaa', 2);
INSERT INTO tickets.stadium_profiles (id, address, phone_number, stadium_name, stadium_id) VALUES (3, 'basjdi', '1384658', 'jlqaaa', 3);
INSERT INTO tickets.stadium_profiles (id, address, phone_number, stadium_name, stadium_id) VALUES (4, 'basjdiss', '1384658', 'asss', 3);
INSERT INTO tickets.stadium_profiles (id, address, phone_number, stadium_name, stadium_id) VALUES (5, 'aaaa', '416813', '注册确认', 4);