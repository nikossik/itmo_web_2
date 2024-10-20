package web.servlets;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import web.utils.Result;
import web.utils.Checker;
import web.utils.Validator;

@WebServlet("/checkArea")
public class AreaCheckServlet  extends HttpServlet {

    List<Result> resultList = new ArrayList<>();

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float R = Float.parseFloat(request.getParameter("R"));
            if (Validator.validateX(x) && Validator.validateY(y) && Validator.validateR(R)) {
                Result result = new Result();
                double start = System.nanoTime();
                result.setValue(String.valueOf(Checker.hit(x, y, R)));
                result.setX(String.valueOf(x));
                result.setY(String.valueOf(y));
                result.setR(String.valueOf(R));
                result.setTime(String.valueOf(LocalDateTime.now().toLocalTime().withNano(0)));

                double execTime = Math.round(((System.nanoTime() - start) * 0.00001) * 100.0) / 100.0;
                result.setExecTime(String.valueOf(execTime));

                resultList.add(result);
                request.getServletContext().setAttribute("resultList", resultList);
                request.getRequestDispatcher("/result.jsp").forward(request, response);
            }
        } catch (Exception e) {
            request.setAttribute("error", e.toString());
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }
}
