package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    void deleteByUser_Username(String username);
}