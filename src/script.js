document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('patientForm');

    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');

    // Populate month options
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    months.forEach(function(month, index) {
        const option = document.createElement('option');
        option.value = index + 1; // Month values start from 1
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate day options (1 to 31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i < 10 ? "0" + i : i; // Add leading zero if necessary
        option.textContent = i < 10 ? "0" + i : i;
        daySelect.appendChild(option);
    }

    // Click action
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Collect form data
        const formData = new FormData(form);
        const patientData = {};
        formData.forEach(function(value, key) {
            patientData[key] = value;
        });

        // Validate all name fields
        if (!isValidName(patientData['nombre']) ||
            !isValidName(patientData['apellidoPaterno']) ||
            !isValidName(patientData['apellidoMaterno'])) {
            alert('Por favor ingresa nombres y apellidos válidos.');
            return;
        }

        // Send data to the server (you'll implement this later)
        sendDataToServer(patientData);
        console.log(typeof patientData['edad']);
    });
});

function isValidName(name) {
    // Regular expression to check if the name contains only letters and spaces
    const regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚüÜ]+$/;
    return regex.test(name);
}

function sendDataToServer(data) {
    // Here you'll send the data to your server using AJAX or fetch
    // For now, let's just log the data to the console
    console.log(data);
}