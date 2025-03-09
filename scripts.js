// Add interactivity here later
// Video Player Controls
const videoPlayer = document.getElementById('videoPlayer');

function playPause() {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

function increaseVolume() {
    if (videoPlayer.volume < 1) {
        videoPlayer.volume += 0.1;
    }
}

function decreaseVolume() {
    if (videoPlayer.volume > 0) {
        videoPlayer.volume -= 0.1;
    }
}

// Photo Gallery Controls
const photos = [
    "images/ela.jpg",
    "images/sample1.jpg",
    "images/sample2.jpg",
    "images/sample3.jpg"
];
let currentPhotoIndex = 0;
const photoElement = document.getElementById('photo');

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    photoElement.src = photos[currentPhotoIndex];
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    photoElement.src = photos[currentPhotoIndex];
}
// Dynamic File Explorer
const fileExplorer = document.getElementById('fileExplorer');

const folders = [
    { name: 'Videos', path: 'videos/' },
    { name: 'Images', path: 'images/' }
];

function loadFiles(folder) {
    fileExplorer.innerHTML = ''; // Clear previous content

    fetch(folder.path)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const html = parser.parseFromString(data, 'text/html');
            const files = Array.from(html.querySelectorAll('a'))
                .map(link => link.href)
                .filter(href => !href.endsWith('/')); // Exclude subfolders

            files.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';

                const icon = document.createElement('img');
                icon.src = file.endsWith('.mp4') ? 'icons/video1.jpg' : 'icons/picture1.jpg';
                icon.className = 'icon';

                const link = document.createElement('a');
                link.href = file;
                link.textContent = file.split('/').pop(); // Get file name

                fileItem.appendChild(icon);
                fileItem.appendChild(link);
                fileExplorer.appendChild(fileItem);
            });
        })
        .catch(error => console.error('Error loading files:', error));
}

// Load files for the first folder by default
loadFiles(folders[0]);