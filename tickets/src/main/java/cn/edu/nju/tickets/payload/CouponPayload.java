package cn.edu.nju.tickets.payload;

public class CouponPayload {
    private int couponCost;

    private double discount;

    public CouponPayload() {}

    public int getCouponCost() {
        return couponCost;
    }

    public void setCouponCost(int couponCost) {
        this.couponCost = couponCost;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
