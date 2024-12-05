document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const servicesValue = urlParams.get('services');
    const resultsContainer = document.getElementById("results");

    if (!servicesValue) {
        console.error('Service value is empty');
        return;
    }

    try {
        const response = await fetch(`employee.php?services=${servicesValue}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const employees = await response.json();

        resultsContainer.innerHTML = "";
        employees.forEach(employee => {
            const employeeDiv = document.createElement("div");
            employeeDiv.classList.add("employee-details");
            employeeDiv.innerHTML = `
                <h3>${employee.name}</h3>
                <p>${employee.email}</p>
                <h3>${employee.service}</h3>
                <p>${employee.phone}</p>
                <button onclick="bookService('${employee.id}')">Book Service</button>
            `;
            resultsContainer.appendChild(employeeDiv);
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

// async function bookService(employeeId) {
//     try {
//         const response = await fetch('book_service.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ employeeId })
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         alert(result.message);
//     } catch (error) {
//         console.error('There was a problem with the booking operation:', error);
//     }
// }