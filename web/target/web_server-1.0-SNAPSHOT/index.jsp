<%@page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="web.utils.Result" %>
<%
    List<Result> resultList;
    Result resultR;
    String R="R";
    if (request.getServletContext().getAttribute("resultList") == null){
        resultList = new ArrayList<>();
    }
    else{
        resultList = (List<Result>) request.getServletContext().getAttribute("resultList");
        resultR = resultList.get(resultList.size()-1);
        R=String.valueOf(resultR.getR());
    }
%>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/design.css">
</head>

<body>
<script src="./js/script.js" async defer></script>
<header>
    Григорьев Никита 408490
</header>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <th width="30%">
            <form id="form">
                <br>
                <div>
                    <label for="x_field">x:</label>
                    <br>
                    <input type="text" name="x_field" placeholder="Enter x (-3 to 5)" pattern="-?[0-5]" required>
                    <br>
                    <label for="y_field">y:</label>
                    <br>
                    <input type="checkbox" name="y_field" value="-2">-2
                    <input type="checkbox" name="y_field" value="-1.5">-1.5
                    <input type="checkbox" name="y_field" value="-1">-1
                    <input type="checkbox" name="y_field" value="-0.5">-0.5
                    <input type="checkbox" name="y_field" value="0">0
                    <input type="checkbox" name="y_field" value="0.5">0.5
                    <input type="checkbox" name="y_field" value="1">1
                    <input type="checkbox" name="y_field" value="1.5">1.5
                    <input type="checkbox" name="y_field" value="2">2
                    <br>
                    <label for="R_field">R</label>
                    <br>
                    <select name="R_field" id="R_field" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <br>
                    <button class="submitBtn" name="submit" type="submit" id="submit_fields">Send</button>
                </div>
            </form>
            <div id="error_div"></div>
            <div id="graph">
                <svg
                        height="400"
                        width="400"
                        xmlns="http://www.w3.org/2000/svg"
                        id="svg"
                        class="no-select">

                    <line stroke="black" x1="50" x2="350" y1="200" y2="200"></line>
                    <line stroke="black" x1="200" x2="200" y1="50" y2="350"></line>

                    <line stroke="black" x1="250" x2="250" y1="205" y2="195"></line>
                    <line stroke="black" x1="300" x2="300" y1="205" y2="195"></line>
                    <line stroke="black" x1="100" x2="100" y1="205" y2="195"></line>
                    <line stroke="black" x1="150" x2="150" y1="205" y2="195"></line>
                    <line stroke="black" x1="195" x2="205" y1="150" y2="150"></line>
                    <line stroke="black" x1="195" x2="205" y1="100" y2="100"></line>
                    <line stroke="black" x1="195" x2="205" y1="250" y2="250"></line>
                    <line stroke="black" x1="195" x2="205" y1="300" y2="300"></line>

                    <text fill="black" x="245" y="190" data-dynamic-rx>R/2</text>
                    <text fill="black" x="298" y="190" data-dynamic-rxx>R</text>
                    <text fill="black" x="90" y="190" data-dynamic-r-xx>-R</text>
                    <text fill="black" x="140" y="190" data-dynamic-r-x>-R/2</text>
                    <text fill="black" x="210" y="155" data-dynamic-r-y>R/2</text>
                    <text fill="black" x="210" y="105" data-dynamic-r-yy>R</text>
                    <text fill="black" x="210" y="255" data-dynamic-ry>-R/2</text>
                    <text fill="black" x="210" y="305" data-dynamic-ryy>-R</text>

                    <path d="M200 100 L100 100 L100 200 L200 200 Z" fill="blue" fill-opacity="0.5"></path>

                    <path d="M 200 200 L 200 150 A 50 50 0 0 1 250 200 Z" fill="blue" fill-opacity="0.5"></path>

                    <path d="M200 200 L300 200 L200 300 Z" fill="blue" fill-opacity="0.5"></path>

                    <polygon points="350,200 340,195 340,205" fill="black"></polygon>
                    <polygon points="200,50 195,60 205,60" fill="black"></polygon>

                    <text fill="black" x="360" y="190">X</text>
                    <text fill="black" x="210" y="40">Y</text>
                </svg>
            </div>
        </th>
        <div>
            <th width="70%">
                <table id="result-table" width="100%">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Value</th>
                        <th>Execution Time</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <% for (Result result : resultList) { %>
                    <tr>
                        <td><%= result.getX() %></td>
                        <td><%= result.getY() %></td>
                        <td><%= result.getR() %></td>
                        <td><%= result.getValue() %></td>
                        <td><%= result.getExecTime() %></td>
                        <td><%= result.getTime() %></td>
                    </tr>
                    <% } %>
                    </tbody>
                </table>
            </th>
        </div>
    </tr>
</table>
</body>

</html>