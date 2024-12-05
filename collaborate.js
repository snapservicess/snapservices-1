document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        service: formData.get('service')
    };

    fetch('collaborate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}