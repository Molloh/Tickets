CREATE TABLE tickets.schedules
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    created_at datetime DEFAULT 'NULL',
    updated_at datetime DEFAULT 'NULL',
    discription varchar(255) DEFAULT 'NULL',
    schedule_name varchar(255) DEFAULT 'NULL',
    tickets_num int(11) DEFAULT 'NULL',
    unit_price double DEFAULT 'NULL',
    schedule_status int(11) DEFAULT 'NULL',
    stadium_id bigint(20) NOT NULL,
    end_date datetime DEFAULT 'NULL',
    start_date datetime DEFAULT 'NULL',
    CONSTRAINT FK2p4rjssoclj42j4ic30l4kmld FOREIGN KEY (stadium_id) REFERENCES stadiums (id)
);
CREATE INDEX FK2p4rjssoclj42j4ic30l4kmld ON tickets.schedules (stadium_id);
INSERT INTO tickets.schedules (id, created_at, updated_at, discription, schedule_name, tickets_num, unit_price, schedule_status, stadium_id, end_date, start_date) VALUES (5, '2018-04-03 00:40:25', '2018-04-09 08:50:51', 'commnet', 'Ti 8', 55, 1000, 0, 1, '2018-04-25 08:40:20', '2018-04-24 08:40:17');
INSERT INTO tickets.schedules (id, created_at, updated_at, discription, schedule_name, tickets_num, unit_price, schedule_status, stadium_id, end_date, start_date) VALUES (6, '2018-04-06 22:12:34', '2018-04-09 08:13:54', 'aaaa', 'DAC 亚洲邀请赛', 60, 1300, 2, 1, '2018-04-28 06:12:30', '2018-04-27 06:12:26');
INSERT INTO tickets.schedules (id, created_at, updated_at, discription, schedule_name, tickets_num, unit_price, schedule_status, stadium_id, end_date, start_date) VALUES (7, '2018-04-08 15:49:13', '2018-04-09 08:05:37', 'aaaaaa', 'AA', 96, 1222, 0, 1, '2018-04-29 23:49:01', '2018-04-27 23:49:00');
INSERT INTO tickets.schedules (id, created_at, updated_at, discription, schedule_name, tickets_num, unit_price, schedule_status, stadium_id, end_date, start_date) VALUES (8, '2018-04-08 08:48:31', '2018-04-09 09:16:24', '123456', 'asdddddd', 97, 1500, 4, 1, '2018-04-27 16:48:23', '2018-04-26 16:48:19');
INSERT INTO tickets.schedules (id, created_at, updated_at, discription, schedule_name, tickets_num, unit_price, schedule_status, stadium_id, end_date, start_date) VALUES (9, '2018-04-08 17:09:49', '2018-04-09 09:11:23', 'aaa', 'j2ee', 96, 1000, 0, 1, '2018-04-26 01:09:41', '2018-04-25 01:09:38');