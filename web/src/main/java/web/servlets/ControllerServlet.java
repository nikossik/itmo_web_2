package web.servlets;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import web.utils.Result;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet{

    private Result result;

    @Override
    public void init(){
        this.result = new Result();
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setAttribute("result", result);
            getServletContext().getRequestDispatcher("/checkArea").forward(request, response);
        } catch (Exception e) {
            request.setAttribute("error", e.toString());
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String errorMessage = "Возникла проблема при обработке запроса.";
        request.setAttribute("error", errorMessage);
        request.getRequestDispatcher("/error.jsp").forward(request, response);
    }
}