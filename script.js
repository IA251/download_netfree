function downloadVideo() {
  const url = document.getElementById('videoUrl').value;
  const messageElement = document.getElementById('message');
  const loadingElement = document.getElementById('loading');
  const downloadLink = document.getElementById('downloadLink');

  if (!url) {
      messageElement.textContent = 'Please enter a URL.';
      return;
  }

  // Show loading indicator
  loadingElement.classList.add('active');
  messageElement.textContent = '';  // Reset message

  fetch(`https://download-server-bmzh.onrender.com/download?url=${encodeURIComponent(url)}`)
      .then(response => {
          // Hide loading indicator
          loadingElement.classList.remove('active');

          if (response.ok) {
              return response.blob();
          } else {
              throw new Error('Download failed');
          }
      })
      .then(blob => {
          // Create a downloadable link
          const url = window.URL.createObjectURL(blob);
          downloadLink.href = url;
          downloadLink.style.display = 'block';  // Show the download link
          messageElement.textContent = 'Download ready!';
      })
      .catch(error => {
          loadingElement.classList.remove('active');
          messageElement.textContent = `Error: ${error.message}`;
      });
}
