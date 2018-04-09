package cn.edu.nju.tickets.payload;

public class ScheduleRequest {
    private String stadiumCode;

    private String scheduleName;

    private String discription;

    private String startDate;

    private String endDate;

    private double unitPrice;

    private int ticketsNum;

    public ScheduleRequest() {}


    public String getStadiumCode() {
        return stadiumCode;
    }

    public void setStadiumCode(String stadiumCode) {
        this.stadiumCode = stadiumCode;
    }

    public String getScheduleName() {
        return scheduleName;
    }

    public void setScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getTicketsNum() {
        return ticketsNum;
    }

    public void setTicketsNum(int ticketsNum) {
        this.ticketsNum = ticketsNum;
    }
}
