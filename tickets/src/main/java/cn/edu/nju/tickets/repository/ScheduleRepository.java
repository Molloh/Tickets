package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.constant.ScheduleStatus;
import cn.edu.nju.tickets.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findByScheduleNameAndStadium_StadiumCode(String scheduleName, String stadiumCode);
    List<Schedule> findByScheduleStatus(ScheduleStatus scheduleStatus);
    List<Schedule> findByScheduleName(String scheduleName);
}
