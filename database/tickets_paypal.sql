CREATE TABLE tickets.paypal
(
    id bigint(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    account varchar(255) DEFAULT 'NULL',
    balance double NOT NULL,
    password varchar(255) DEFAULT 'NULL'
);
CREATE UNIQUE INDEX UK_io9jas164cyxaj8hohpi9yljc ON tickets.paypal (account);
INSERT INTO tickets.paypal (id, account, balance, password) VALUES (1, 'mao', 999987220, 'mao1997');