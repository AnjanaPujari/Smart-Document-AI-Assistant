const API_BASE_URL = "";

const fileInput = document.getElementById("fileInput");
const uploadBox = document.getElementById("uploadBox");

const fileName = document.getElementById("fileName");
const fileStatus = document.getElementById("fileStatus");

const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");

const answerContent = document.getElementById("answerContent");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

let documentUploaded = false;

/* FILE SELECTION */

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    uploadDocument(file);
});

/* UPLOAD DOCUMENT */

async function uploadDocument(file) {
    hideError();

    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
        showError("Only PDF and DOCX files are allowed.");

        fileInput.value = "";
        documentUploaded = false;

        fileName.textContent = "No document";
        fileStatus.textContent = "Upload a PDF or DOCX";

        return;
    }

    fileName.textContent = file.name;
    fileStatus.textContent = "Uploading...";

    documentUploaded = false;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(
            `${API_BASE_URL}/upload`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail ||
                data.error ||
                "Document upload failed."
            );
        }

        if (data.error) {
            throw new Error(data.error);
        }

        documentUploaded = true;

        fileStatus.textContent =
            `Uploaded successfully • ${data.number_of_chunks} chunks`;

        answerContent.innerHTML = `
            <p class="empty-answer">
                Document uploaded successfully.
                Ask a question above.
            </p>
        `;

    } catch (error) {
        documentUploaded = false;

        fileStatus.textContent = "Upload failed";

        showError(
            error.message ||
            "Something went wrong while uploading."
        );
    }
}

/* ASK QUESTION */

askButton.addEventListener(
    "click",
    askQuestion
);

async function askQuestion() {
    hideError();

    const question = questionInput.value.trim();

    if (!documentUploaded) {
        showError(
            "Please upload a document before asking a question."
        );

        return;
    }

    if (!question) {
        showError(
            "Please enter a question."
        );

        return;
    }

    askButton.disabled = true;
    loading.classList.add("show");

    answerContent.innerHTML = "";

    try {
        const response = await fetch(
            `${API_BASE_URL}/search?query=${encodeURIComponent(question)}`,
            {
                method: "POST"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.detail ||
                data.answer ||
                "Unable to get an answer."
            );
        }

        if (data.answer) {
            answerContent.textContent = data.answer;
        } else {
            answerContent.textContent =
                "Information not found in the document.";
        }

    } catch (error) {
        showError(
            error.message ||
            "Something went wrong while getting the answer."
        );

    } finally {
        askButton.disabled = false;
        loading.classList.remove("show");
    }
}

/* DRAG & DROP */

uploadBox.addEventListener(
    "dragover",
    (event) => {
        event.preventDefault();

        uploadBox.classList.add("dragging");
    }
);

uploadBox.addEventListener(
    "dragleave",
    () => {
        uploadBox.classList.remove("dragging");
    }
);

uploadBox.addEventListener(
    "drop",
    (event) => {
        event.preventDefault();

        uploadBox.classList.remove("dragging");

        const file = event.dataTransfer.files[0];

        if (file) {
            uploadDocument(file);
        }
    }
);

/* ERROR HANDLING */

function showError(message) {
    errorMessage.textContent = message;

    errorMessage.classList.add("show");
}

function hideError() {
    errorMessage.textContent = "";

    errorMessage.classList.remove("show");
}