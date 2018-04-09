package cn.edu.nju.tickets.repository;

import cn.edu.nju.tickets.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    void deleteByOrder_Id(Long orderId);
    Optional<Ticket> findByRowAndColumn(int row, int column);
}
