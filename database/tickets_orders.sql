CREATE TABLE tickets.orders
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    created_at datetime DEFAULT 'NULL',
    updated_at datetime DEFAULT 'NULL',
    order_status int(11) DEFAULT 'NULL',
    price_sum double NOT NULL,
    schedule_id bigint(20) NOT NULL,
    user_id bigint(20) NOT NULL,
    pay_account varchar(255) DEFAULT 'NULL',
    CONSTRAINT FKaut50u4a6gnbdnj8sdywm3cd6 FOREIGN KEY (schedule_id) REFERENCES schedules (id),
    CONSTRAINT FK32ql8ubntj5uh44ph9659tiih FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE INDEX FKaut50u4a6gnbdnj8sdywm3cd6 ON tickets.orders (schedule_id);
CREATE INDEX FK32ql8ubntj5uh44ph9659tiih ON tickets.orders (user_id);
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (20, '2018-04-08 15:32:01', '2018-04-09 09:12:22', 5, 1300, 6, 1, 'mao');
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (25, '2018-04-08 23:45:25', '2018-04-09 07:45:29', 5, 5000, 5, 1, null);
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (26, '2018-04-08 23:47:31', '2018-04-09 07:47:42', 4, 11700, 6, 1, 'mao');
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (27, '2018-04-09 07:48:35', '2018-04-09 07:48:35', 2, 3000, 5, 3, null);
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (28, '2018-04-09 07:50:22', '2018-04-09 07:50:22', 2, 4888, 7, 3, null);
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (31, '2018-04-09 00:50:51', '2018-04-09 08:51:06', 3, 4000, 5, 3, null);
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (32, '2018-04-08 16:56:44', '2018-04-09 09:12:04', 5, 3000, 8, 1, 'mao');
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (33, '2018-04-09 00:57:14', '2018-04-09 08:57:26', 4, 1080.0000000000002, 8, 1, 'mao');
INSERT INTO tickets.orders (id, created_at, updated_at, order_status, price_sum, schedule_id, user_id, pay_account) VALUES (34, '2018-04-09 09:10:02', '2018-04-09 09:10:02', 2, 2000, 9, 3, null);