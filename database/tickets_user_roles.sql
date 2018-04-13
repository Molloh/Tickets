CREATE TABLE tickets.user_roles
(
    user_id bigint(20) NOT NULL,
    role_id bigint(20) NOT NULL,
    CONSTRAINT `PRIMARY` PRIMARY KEY (user_id, role_id),
    CONSTRAINT FKhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT FKh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id) REFERENCES roles (id)
);
CREATE INDEX FKh8ciramu9cc9q3qcqiv4ue8a6 ON tickets.user_roles (role_id);
INSERT INTO tickets.user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO tickets.user_roles (user_id, role_id) VALUES (2, 1);
INSERT INTO tickets.user_roles (user_id, role_id) VALUES (3, 1);
INSERT INTO tickets.user_roles (user_id, role_id) VALUES (4, 1);
INSERT INTO tickets.user_roles (user_id, role_id) VALUES (5, 1);