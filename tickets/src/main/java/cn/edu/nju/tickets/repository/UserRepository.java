package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.constant.RegisterStatus;
import cn.edu.nju.tickets.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findByUsernameAndNoise(String username, String noise);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<User> findByRegisterStatus(RegisterStatus registerStatus);

}
