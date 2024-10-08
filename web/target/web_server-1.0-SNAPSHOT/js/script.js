let points = JSON.parse(localStorage.getItem('points')) || [];

document.querySelectorAll("input[name='y']").forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        document.querySelectorAll("input[name='y']").forEach(cb => {
            if (cb !== this) cb.checked = false;
        });
    });
});

document.getElementById('pointForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let x = document.getElementById('x').value.replace(',', '.');
    const yElements = document.querySelectorAll('input[name="y"]:checked');
    const r = document.getElementById('r').value;

    if (!/^-?\d+(\.\d+)?$/.test(x) || x < -3 || x > 5) {
        alert("Please enter a valid X coordinate between -3 and 5.");
        return;
    }

    if (yElements.length === 0) {
        alert("Please select a Y value.");
        return;
    }

    const y = Array.from(yElements).map(el => el.value);

    if (y.length !== 1) {
        alert('Please select exactly one Y coordinate.');
        return;
    }

    const data = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y[0])}&r=${encodeURIComponent(r)}`;

    fetch('web/controller', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(result => {
            points.push({ x: parseFloat(x), y: parseFloat(y[0]), r: parseFloat(r), result: result.result, currentTime: result.currentTime, executionTime: result.executionTime });
            localStorage.setItem('points', JSON.stringify(points));
            addPointToTable(x, y[0], r, result.result, result.currentTime, result.executionTime);
            drawGraph();
            drawAllPoints();
        })
        .catch(error => console.error('Error:', error));
});

function addPointToTable(x, y, r, result, currentTime, executionTime) {
    const resultBody = document.getElementById('resultBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${x}</td>
        <td>${y}</td>
        <td>${r}</td>
        <td>${result !== undefined ? (result ? 'true' : 'false') : 'undefined'}</td>
        <td>${currentTime !== undefined ? currentTime : 'undefined'}</td>
        <td>${executionTime !== undefined ? executionTime : 'undefined'}</td>
    `;
    resultBody.appendChild(newRow);
}

document.getElementById('canvas').addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const r = parseFloat(document.getElementById('r').value);

    const x = ((clickX - 400) / (100 / r) + 2 * r).toFixed(2);
    const y = ((200 - clickY) / (100 / r)).toFixed(2);

    const data = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(r)}`;

    fetch('web/controller', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(result => {
            points.push({ x: parseFloat(x), y: parseFloat(y), r: parseFloat(r), result: result.result, currentTime: result.currentTime, executionTime: result.executionTime });
            localStorage.setItem('points', JSON.stringify(points));
            drawGraph();
            drawAllPoints();
        })
        .catch(error => console.error('Error:', error));
});

function drawGraph() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const r = parseFloat(document.getElementById('r').value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 400; // X
    const centerY = 200; // Y
    const unit = 100 / r; // Масштаб

    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';

    // Прямоуг
    ctx.fillRect(centerX, centerY - unit * r, unit * r / 2, unit * r);

    // Сектор
    ctx.beginPath();
    ctx.arc(centerX, centerY, unit * r / 2, 0, Math.PI / 2);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    // Треуг
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + unit * r);
    ctx.lineTo(centerX - unit * r / 2, centerY);
    ctx.closePath();
    ctx.fill();

    // Отрисовка осей
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();

    // оси
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('-R', centerX - unit * r, centerY + 15);
    ctx.fillText('-R/2', centerX - unit * r / 2, centerY + 15);
    ctx.fillText('R/2', centerX + unit * r / 2, centerY + 15);
    ctx.fillText('R', centerX + unit * r, centerY + 15);
    ctx.fillText('R', centerX + 5, centerY - unit * r);
    ctx.fillText('R/2', centerX + 5, centerY - unit * r / 2);
    ctx.fillText('-R/2', centerX + 5, centerY + unit * r / 2);
    ctx.fillText('-R', centerX + 5, centerY + unit * r);
}

function drawAllPoints() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const r = parseFloat(document.getElementById('r').value);

    points.forEach(point => {
        const x = ((point.x - 2 * r) * (100 / r) + 400).toFixed(0);
        const y = (200 - (100 / r) * point.y).toFixed(0);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}

window.addEventListener('load', function() {
    points.forEach(point => {
        addPointToTable(point.x, point.y, point.r, point.result, point.currentTime, point.executionTime);
    });
    drawGraph();
    drawAllPoints();
});