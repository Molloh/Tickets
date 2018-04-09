package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.constant.RegisterStatus;
import cn.edu.nju.tickets.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium, Long> {

    Optional<Stadium> findByStadiumCode(String stadiumCode);

    Optional<Stadium> findByStadiumCodeAndNoise(String stadiumCode, String noise);

    Boolean existsByStadiumCode(String stadiumCode);

    Boolean existsByEmail(String email);

    List<Stadium> findByRegisterStatus(RegisterStatus registerStatus);

}
