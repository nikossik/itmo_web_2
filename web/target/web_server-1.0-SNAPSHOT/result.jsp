<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="web.utils.Result" %>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>--%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/style.css">
    </head>
<body>
    <h1>Результаты:</h1>

    <table>
        <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Время</th>
                <th>Время выполнения (с)</th>
            </tr>
        </thead>
        <tbody>
            <%
            List<Result> resultList;
                if (request.getServletContext().getAttribute("resultList") == null){
                    resultList = new ArrayList<>();
                }
                else{
                    resultList = request.getServletContext().getAttribute("resultList") instanceof List<?> ?
                            ((List<?>) request.getServletContext().getAttribute("resultList")).stream()
                                    .filter(item -> item instanceof Result)
                                    .map(item -> (Result) item)
                                    .toList()
                            : new ArrayList<>();
                }
            Result result = resultList.get(resultList.size()-1);
            %>
            <tr>
                <td><%= result.getX() %></td>
                <td><%= result.getY() %></td>
                <td><%= result.getR() %></td>
                <td><%= result.getValue() %></td>
                <td><%= result.getTime() %></td>
                <td><%= result.getExecTime() %></td>
            </tr>
        </tbody>
    </table>
    <button onclick="window.location.href = 'index.jsp'">Вернуться на главную</button>
</body>
</html>