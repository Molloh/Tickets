package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.constant.RoleName;
import cn.edu.nju.tickets.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
