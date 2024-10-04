package web.servlets;

import web.utils.Checker;
import web.utils.Result;
import web.utils.Validator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {

    List<Result> resultList = new ArrayList<>();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float r = Float.parseFloat(request.getParameter("r"));

            if (Validator.validateX(x) & Validator.validateY(y) & Validator.validateR(r)) {
                Result result = new Result();

                double start = System.nanoTime();

                result.setValue(String.valueOf(Checker.hit(x, y, r)));

                result.setX(String.valueOf(x));
                result.setY(String.valueOf(y));
                result.setR(String.valueOf(r));
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
