
document.addEventListener("DOMContentLoaded", () => {
    const fileUploadBtn = document.getElementById("real-file-upload-button")
    const fileUpload = document.getElementById("real-file-upload")
    const fileUploadedName = document.getElementById("file-upload-content")

    fileUpload.addEventListener("change", (e) => {
        if (e.target.files[0]) {
            fileUploadedName.textContent = e.target.files[0].name
        }
    })
})