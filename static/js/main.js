document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const dropContent = document.getElementById('drop-content');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const fileNameTag = document.getElementById('file-name-tag');
    const btnRemove = document.getElementById('btn-remove');
    const btnSubmit = document.getElementById('btn-submit');
    const uploadForm = document.getElementById('upload-form');

    const emptyState = document.getElementById('empty-state');
    const resultContent = document.getElementById('result-content');
    const predictedCropTitle = document.getElementById('predicted-crop-title');
    const confidenceScore = document.getElementById('confidence-score');
    const probList = document.getElementById('prob-list');

    let selectedFile = null;

    // Drag & Drop Events
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropZone.classList.remove('dragover');
        });
    });

    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // File Input Change Event
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    // Handle Image Preview
    function handleFile(file) {
        if (!file.type.match('image.*')) {
            alert('Please select a valid image file (JPG, JPEG, PNG).');
            return;
        }

        selectedFile = file;
        fileNameTag.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            dropContent.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            btnSubmit.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // Remove Image / Reset
    btnRemove.addEventListener('click', (e) => {
        e.stopPropagation();
        resetUpload();
    });

    function resetUpload() {
        selectedFile = null;
        fileInput.value = '';
        imagePreview.src = '#';
        previewContainer.classList.add('hidden');
        dropContent.classList.remove('hidden');
        btnSubmit.disabled = true;
    }

    // Form Submit Event (AJAX Prediction Request)
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        // UI Loading state
        btnSubmit.disabled = true;
        const btnText = btnSubmit.querySelector('.btn-text');
        const btnLoader = btnSubmit.querySelector('.btn-loader');
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                displayResults(data);
            } else {
                alert('Prediction Error: ' + (data.error || 'Failed to predict image'));
            }
        } catch (error) {
            console.error('Error submitting prediction:', error);
            alert('Server error while predicting image.');
        } finally {
            // Restore button UI
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            btnSubmit.disabled = false;
        }
    });

    // Display Results Function
    function displayResults(data) {
        emptyState.classList.add('hidden');
        resultContent.classList.remove('hidden');

        // Winner Card
        predictedCropTitle.textContent = data.predicted_crop;
        confidenceScore.textContent = `${data.confidence}%`;

        // Top 3 Probabilities
        probList.innerHTML = '';
        data.top3.forEach(item => {
            const probItem = document.createElement('div');
            probItem.className = 'prob-item';
            probItem.innerHTML = `
                <div class="prob-header">
                    <span>${item.crop}</span>
                    <span>${item.confidence}%</span>
                </div>
                <div class="prob-bar-bg">
                    <div class="prob-bar-fill" style="width: 0%;"></div>
                </div>
            `;
            probList.appendChild(probItem);

            // Animate progress bar fill
            setTimeout(() => {
                const fillBar = probItem.querySelector('.prob-bar-fill');
                fillBar.style.width = `${item.confidence}%`;
            }, 100);
        });

        // Scroll to results on mobile view
        if (window.innerWidth <= 900) {
            resultContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
