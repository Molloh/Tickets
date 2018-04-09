package cn.edu.nju.tickets.constant;

public enum CouponStrategy {
    STRATEGY_FIVE(10000, 0.5),
    STRATEGY_SENVEN(7000, 0.7),
    STRATEGY_NINE(3000, 0.9);

    private int cost;

    private double discount;

    CouponStrategy(int cost, double discount) {
        this.cost = cost;
        this.discount = discount;
    }

    public int getCost() {
        return cost;
    }

    public double getDiscount() {
        return discount;
    }
}
