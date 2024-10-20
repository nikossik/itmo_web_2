const submitFieldsBtn = document.getElementById('submit_fields');
const errorDiv = document.getElementById('error_div');
const svg = document.getElementById('svg');
const form = document.getElementById('form');
const RField = document.getElementById('R_field');

let points = [];

const predefinedYValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

document.querySelectorAll("input[name='y_field']").forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        document.querySelectorAll("input[name='y_field']").forEach(cb => {
            if (cb !== this) cb.checked = false;
        });
    });
});

RField.addEventListener('change', function() {
    updateGraphLabels();
    redrawPoints();
});

submitFieldsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    errorDiv.innerHTML = '';

    const x = document.querySelector('input[name="x_field"]').value;
    const y = getYCheckboxValue();
    const R = RField.value;

    if (validateInput(x, y, R)) {
        plotPoint(x, y, R);
        sendFormData(x, y, R);
    }
});

svg.addEventListener('click', function(e) {
    const coords = getSVGCoordinates(e);
    const R = RField.value;
    const x = ((coords.x - 200) * R / 100).toFixed(2);
    let y = ((200 - coords.y) * R / 100).toFixed(2);

    y = findNearestYValue(y, predefinedYValues);

    if (validateInput(x, y, R, true)) {
        plotPoint(x, y, R);
        sendFormData(x, y, R);
    }
});

function getYCheckboxValue() {
    const checked = document.querySelector('input[name="y_field"]:checked');
    return checked ? checked.value : null;
}

function validateInput(x, y, R, fromGraph = false) {
    let valid = true;
    let messages = [];

    if (isNaN(x) || x < -3 || x > 5) {
        messages.push("X must be a number between -3 and 5.");
        valid = false;
    }

    if (isNaN(y) || !predefinedYValues.includes(parseFloat(y))) {
        messages.push("Y must be one of the predefined values.");
        valid = false;
    }

    if (isNaN(R) || R < 1 || R > 5) {
        messages.push("R must be a number between 1 and 5.");
        valid = false;
    }

    if (!fromGraph && y === null) {
        messages.push("Please select a Y value.");
        valid = false;
    }

    if (!valid) {
        showError(messages.join(' '));
    }

    return valid;
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function sendFormData(x, y, R) {
    const url = '/web_server-1.0-SNAPSHOT/controller';
    const data = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&R=${encodeURIComponent(R)}`;

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: data
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'result.jsp';
            } else {
                showError(`Error: ${response.statusText}`);
            }
        })
        .catch(() => {
            showError('Network error occurred.');
        });
}

function plotPoint(x, y, R) {
    const svgX = (x * 100 / R) + 200;
    const svgY = 200 - (y * 100 / R);

    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('cx', svgX);
    point.setAttribute('cy', svgY);
    point.setAttribute('r', 3);
    point.setAttribute('fill', 'red');
    svg.appendChild(point);
    points.push({ x, y, R, element: point });

    savePoints();
}

function updateGraphLabels() {
    const R = parseFloat(RField.value);

    document.querySelector('[data-dynamic-rx]').textContent = R / 2;
    document.querySelector('[data-dynamic-rxx]').textContent = R;
    document.querySelector('[data-dynamic-r-x]').textContent = -R / 2;
    document.querySelector('[data-dynamic-r-xx]').textContent = -R;
    document.querySelector('[data-dynamic-r-y]').textContent = R / 2;
    document.querySelector('[data-dynamic-r-yy]').textContent = R;
    document.querySelector('[data-dynamic-ry]').textContent = -R / 2;
    document.querySelector('[data-dynamic-ryy]').textContent = -R;
}

function redrawPoints() {
    points.forEach(pointData => {
        svg.removeChild(pointData.element);
    });
    points = [];
    loadPoints();
}

function savePoints() {
    localStorage.setItem('points', JSON.stringify(points));
}

function loadPoints() {
    const savedPoints = JSON.parse(localStorage.getItem('points') || '[]');
    points = [];
    savedPoints.forEach(pointData => {
        plotPoint(pointData.x, pointData.y, RField.value); 
    });
}

function getSVGCoordinates(event) {
    const rect = svg.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function findNearestYValue(y, yValues) {
    y = parseFloat(y);
    let nearestY = yValues[0];
    let minDiff = Math.abs(y - yValues[0]);
    for (let i = 1; i < yValues.length; i++) {
        let diff = Math.abs(y - yValues[i]);
        if (diff < minDiff) {
            minDiff = diff;
            nearestY = yValues[i];
        }
    }
    return nearestY;
}

window.addEventListener('load', () => {
    updateGraphLabels();
    loadPoints();
    restoreFormState();
});

function restoreFormState() {
    const savedX = localStorage.getItem('x_field');
    const savedY = localStorage.getItem('y_field');
    const savedR = localStorage.getItem('R_field');

    if (savedX) {
        document.querySelector('input[name="x_field"]').value = savedX;
    }
    if (savedY) {
        const yCheckbox = document.querySelector(`input[name="y_field"][value="${savedY}"]`);
        if (yCheckbox) yCheckbox.checked = true;
    }
    if (savedR) {
        RField.value = savedR;
    }
}

window.addEventListener('beforeunload', () => {
    localStorage.setItem('x_field', document.querySelector('input[name="x_field"]').value);
    const yChecked = document.querySelector('input[name="y_field"]:checked');
    localStorage.setItem('y_field', yChecked ? yChecked.value : '');
    localStorage.setItem('R_field', RField.value);
});