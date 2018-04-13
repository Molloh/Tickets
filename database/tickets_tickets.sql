CREATE TABLE tickets.tickets
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    created_at datetime DEFAULT 'NULL',
    updated_at datetime DEFAULT 'NULL',
    ticket_column int(11) DEFAULT 'NULL',
    price double NOT NULL,
    ticket_row int(11) DEFAULT 'NULL',
    order_id bigint(20) NOT NULL,
    CONSTRAINT FKqgi3sbv1u45s41wawh75ut8ph FOREIGN KEY (order_id) REFERENCES orders (id)
);
CREATE INDEX FKqgi3sbv1u45s41wawh75ut8ph ON tickets.tickets (order_id);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (82, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (83, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (84, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (85, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (86, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (87, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (88, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (89, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (90, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (91, '2018-04-09 07:47:31', '2018-04-09 07:47:31', -1, 1300, -1, 26);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (92, '2018-04-09 07:48:35', '2018-04-09 07:48:35', 7, 1000, 9, 27);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (93, '2018-04-09 07:48:35', '2018-04-09 07:48:35', 8, 1000, 9, 27);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (94, '2018-04-09 07:48:35', '2018-04-09 07:48:35', 9, 1000, 8, 27);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (95, '2018-04-09 07:50:22', '2018-04-09 07:50:22', 4, 1222, 1, 28);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (96, '2018-04-09 07:50:22', '2018-04-09 07:50:22', 2, 1222, 1, 28);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (97, '2018-04-09 07:50:22', '2018-04-09 07:50:22', 3, 1222, 1, 28);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (98, '2018-04-09 07:50:22', '2018-04-09 07:50:22', 5, 1222, 1, 28);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (108, '2018-04-09 08:50:51', '2018-04-09 08:50:51', 5, 1000, 2, 31);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (109, '2018-04-09 08:50:51', '2018-04-09 08:50:51', 1, 1080, 1, 31);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (110, '2018-04-09 08:50:51', '2018-04-09 08:50:51', 7, 1000, 1, 33);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (111, '2018-04-09 08:50:51', '2018-04-09 08:50:51', 9, 1000, 1, 31);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (114, '2018-04-09 08:57:14', '2018-04-09 08:57:14', -1, 1500, -1, 33);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (115, '2018-04-09 09:10:02', '2018-04-09 09:10:02', 9, 1000, 1, 34);
INSERT INTO tickets.tickets (id, created_at, updated_at, ticket_column, price, ticket_row, order_id) VALUES (116, '2018-04-09 09:10:02', '2018-04-09 09:10:02', 1, 1000, 1, 34);