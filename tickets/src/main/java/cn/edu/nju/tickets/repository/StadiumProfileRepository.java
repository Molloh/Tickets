package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.entity.StadiumProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StadiumProfileRepository extends JpaRepository<StadiumProfile, Long> {
}
