function downloadVideo() {
    const url = document.getElementById('videoUrl').value;
    const messageElement = document.getElementById('message');
    const loadingElement = document.getElementById('loading');
 
    if (!url) {
        messageElement.textContent = 'Please enter a URL.';
        return;
    }

    // Show loading indicator
    loadingElement.classList.add('active');

    fetch(`http://localhost:8000/download?url=${encodeURIComponent(url)}`)
        .then(response => {
            // Hide loading indicator
            loadingElement.classList.remove('active');

            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Download failed');
            }
        })
        .then(text => {
            messageElement.textContent = text;
        })
        .catch(error => {
            messageElement.textContent = `Error: ${error.message}`;
        });
}
