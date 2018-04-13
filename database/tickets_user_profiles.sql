CREATE TABLE tickets.user_profiles
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    gender varchar(10) DEFAULT 'NULL',
    integration int(11) DEFAULT 'NULL',
    level int(11) DEFAULT 'NULL',
    phone_number varchar(15) DEFAULT 'NULL',
    user_id bigint(20) NOT NULL,
    CONSTRAINT FKjcad5nfve11khsnpwj1mv8frj FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE INDEX FKjcad5nfve11khsnpwj1mv8frj ON tickets.user_profiles (user_id);
INSERT INTO tickets.user_profiles (id, gender, integration, level, phone_number, user_id, total_pay) VALUES (13, 'SECRET', 9900, 0, '', 2, 0);
INSERT INTO tickets.user_profiles (id, gender, integration, level, phone_number, user_id, total_pay) VALUES (14, 'SECRET', 0, 0, '', 3, 0);
INSERT INTO tickets.user_profiles (id, gender, integration, level, phone_number, user_id, total_pay) VALUES (15, 'FEMALE', 12580, 12, '13852640706', 1, 12780);
INSERT INTO tickets.user_profiles (id, gender, integration, level, phone_number, user_id, total_pay) VALUES (16, 'SECRET', 0, 0, '', 4, 0);
INSERT INTO tickets.user_profiles (id, gender, integration, level, phone_number, user_id, total_pay) VALUES (18, 'MALE', 0, 0, '13852640706', 5, 0);