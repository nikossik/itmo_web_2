package web.utils;

import static java.lang.Math.abs;

public class Checker {

    public static boolean hit(float x, float y, float r) {
        return inRect(x, y, r) || inTriangle(x, y, r) || inQuarterCircle(x, y, r);
    }

    private static boolean inRect(float x, float y, float r) {
        return x >= -r && x <= 0 && y >= 0 && y <= r;
    }

    private static boolean inTriangle(float x, float y, float r) {
        return x >= 0 && x <= r && y <= 0 && x <= r-abs(y);
    }

    private static boolean inQuarterCircle(float x, float y, float r) {
        return x >= 0 && y >= 0 && (x * x + y * y <= (r / 2) * (r / 2));
    }
}
