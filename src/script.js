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

        // Create and open the document
        createDocument(patientData);
    });
});

// Define monthSelect and daySelect globally
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');

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

// Function to create a document with patient data
function createDocument(patientData) {
    // Define the consent text
    const consentText = `Por medio de la presente, yo ${patientData.nombre} ${patientData.apellidoPaterno} ${patientData.apellidoMaterno} de ${patientData.edad} años de edad y con fecha de nacimiento el ${patientData.dia} de ${monthSelect.options[patientData.mes - 1].textContent}, sexo ${patientData.sexo} y género ${patientData.genero} tengo por ocupación ${patientData.ocupacion} y asisto a la presente consulta por ${patientData.motivo}.`;

    // Define the template document content
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Historia Clínica - ${patientData.nombre}</title>
        </head>
        <body>
            <h1>Historia Clínica</h1>
            <h2>Datos personales</h2>
            <p>${consentText}</p>
            <!-- Add more sections as needed -->
        </body>
        </html>
    `;

    // Create a new document and open it in a new tab
    const newWindow = window.open();
    newWindow.document.open();
    newWindow.document.write(template);
    newWindow.document.close();
}
