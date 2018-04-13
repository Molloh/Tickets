CREATE TABLE tickets.stadium_roles
(
    stadium_id bigint(20) NOT NULL,
    role_id bigint(20) NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (stadium_id, role_id),
    CONSTRAINT FKkb8c5dl2urt3apgc9uky6ybno FOREIGN KEY (stadium_id) REFERENCES stadiums (id),
    CONSTRAINT FKsxk56nqq1qyhx4cp4d7opcntu FOREIGN KEY (role_id) REFERENCES roles (id)
);
CREATE INDEX FKsxk56nqq1qyhx4cp4d7opcntu ON tickets.stadium_roles (role_id);
INSERT INTO tickets.stadium_roles (stadium_id, role_id) VALUES (1, 2);
INSERT INTO tickets.stadium_roles (stadium_id, role_id) VALUES (2, 2);
INSERT INTO tickets.stadium_roles (stadium_id, role_id) VALUES (3, 2);
INSERT INTO tickets.stadium_roles (stadium_id, role_id) VALUES (4, 2);