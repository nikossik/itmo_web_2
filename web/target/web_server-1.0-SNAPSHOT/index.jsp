<%@page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.List" %>
<%@ page import="web.utils.Result" %>
<%@ page import="java.util.ArrayList" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LabWork</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <header>
        <div id="student-info">
            <h1>Григорьев Никита Александрович | Группа: P3224 | Вариант: 408490</h1>
        </div>
    </header>

    <main>
        <div id="left-panel">
            <form id="pointForm">
                <div class="input-group">
                    <label for="x">X Coordinate (-3 to 5):</label>
                    <input type="number" id="x" name="x" min="-3" max="5" step="0.1">
                </div>
                <div class="input-group">
                    <label>Y Coordinate:</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" name="y" value="-2"> -2</label>
                        <label><input type="checkbox" name="y" value="-1.5"> -1.5</label>
                        <label><input type="checkbox" name="y" value="-1"> -1</label>
                        <label><input type="checkbox" name="y" value="-0.5"> -0.5</label>
                        <label><input type="checkbox" name="y" value="0"> 0</label>
                        <label><input type="checkbox" name="y" value="0.5"> 0.5</label>
                        <label><input type="checkbox" name="y" value="1"> 1</label>
                        <label><input type="checkbox" name="y" value="1.5"> 1.5</label>
                        <label><input type="checkbox" name="y" value="2"> 2</label>
                    </div>
                </div>
                <div class="input-group">
                    <label for="r">R:</label>
                    <select id="r" name="r">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <button type="submit">Check Point</button>
            </form>

            <table id="resultTable">
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                        <th>Current Time</th>
                        <th>Script Execution Time</th>
                    </tr>
                </thead>
                <tbody id="resultBody">
                <%
                    List<Result> resultList = request.getServletContext().getAttribute("resultList") instanceof List<?> ?
                            ((List<?>) request.getServletContext().getAttribute("resultList")).stream()
                                    .filter(item -> item instanceof Result)
                                    .map(item -> (Result) item)
                                    .toList()
                            : new ArrayList<>();
                    if (!resultList.isEmpty()) {
                        for (Result result : resultList) {
                %>
                    <tr>
                        <td><%= result.getX() %></td>
                        <td><%= result.getY() %></td>
                        <td><%= result.getR() %></td>
                        <td><%= result.getValue() %></td>
                        <td><%= result.getTime() %></td>
                        <td><%= result.getExecTime() %></td>
                    </tr>
                    <%
                            }
                        }
                    %>
                </tbody>
            </table>
        </div>

        <div id="right-panel">
            <canvas id="graphCanvas" width="800" height="800"></canvas>
        </div>
    </main>

    <script src="js/script.js"></script>
</body>
</html>