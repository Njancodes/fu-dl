
document.addEventListener("DOMContentLoaded", () => {
    const fileUpload = document.getElementById("real-file-upload")
    const fileUploadedName = document.getElementById("file-upload-content")

    const deleteButtons = document.body.getElementsByClassName('real-delete-button')

    document.querySelector('#upload-container').addEventListener('submit', function (e) {
        const fileInput = document.querySelector('input[type="file"]');
        if (!fileInput.files.length) {
            e.preventDefault(); // Stop form submission
            alert("Please select a file before submitting.");
        }
    });

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", async (ev) => {
            const resp = await fetch(`/?id=${ev.target.parentNode.id}`, {
                method: 'DELETE'
            })
            if (resp.ok) {
                ev.target.parentNode.remove()
            }
        })
    }

    fileUpload.addEventListener("change", (e) => {
        if (e.target.files[0]) {
            fileUploadedName.textContent = e.target.files[0].name
        }
    })
})

function deleteItem(id) {
    const listOfall = document.getElementById('list-of-files')
    const fileItem = document.getElementById(id)
    if (fileItem) {
        listOfall.removeChild(fileItem)
    }
}