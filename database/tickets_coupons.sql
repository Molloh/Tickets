CREATE TABLE tickets.coupons
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    created_at datetime DEFAULT 'NULL',
    updated_at datetime DEFAULT 'NULL',
    coupon_status int(11) DEFAULT 'NULL',
    coupon_strategy int(11) DEFAULT 'NULL',
    user_id bigint(20) NOT NULL,
    coupon_cost int(11) NOT NULL,
    discount double NOT NULL,
    CONSTRAINT FKhb27gggactdhu0i65fwiaxb0r FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE INDEX FKhb27gggactdhu0i65fwiaxb0r ON tickets.coupons (user_id);
INSERT INTO tickets.coupons (id, created_at, updated_at, coupon_status, coupon_strategy, user_id, coupon_cost, discount) VALUES (1, '2018-04-09 03:10:54', '2018-04-09 03:10:54', 1, null, 1, 100, 0.9);
INSERT INTO tickets.coupons (id, created_at, updated_at, coupon_status, coupon_strategy, user_id, coupon_cost, discount) VALUES (2, '2018-04-08 19:59:33', '2018-04-09 08:57:14', 0, null, 1, 100, 0.9);
INSERT INTO tickets.coupons (id, created_at, updated_at, coupon_status, coupon_strategy, user_id, coupon_cost, discount) VALUES (3, '2018-04-09 04:12:55', '2018-04-09 04:12:55', 1, null, 1, 100, 0.9);
INSERT INTO tickets.coupons (id, created_at, updated_at, coupon_status, coupon_strategy, user_id, coupon_cost, discount) VALUES (4, '2018-04-08 23:47:03', '2018-04-09 07:47:31', 0, null, 1, 100, 0.9);
INSERT INTO tickets.coupons (id, created_at, updated_at, coupon_status, coupon_strategy, user_id, coupon_cost, discount) VALUES (5, '2018-04-09 08:08:33', '2018-04-09 08:08:33', 1, null, 2, 100, 0.9);
INSERT INTO tickets.coupons (id, created_at, updated_at, coupon_status, coupon_strategy, user_id, coupon_cost, discount) VALUES (6, '2018-04-09 09:13:41', '2018-04-09 09:13:41', 1, null, 1, 100, 0.9);