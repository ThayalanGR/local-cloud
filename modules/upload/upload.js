document.addEventListener("DOMContentLoaded", function () {
    // alert(0)
    const fileBufferRef = document.getElementById("file-buffer")
    const progressBar = document.getElementById("progress-bar")
    const progress = document.getElementById("progress-notification")
    // progress.style.width = "100%"

    fileBufferRef.addEventListener("change", fireUpload)


    function fireUpload() {
        console.log(fileBufferRef.value.split("\\")[fileBufferRef.value.split("\\").length - 1])
        progress.style.zIndex = "5"
        progressBar.style.backgroundColor = "green"
        const fileBuffStorage = fileBufferRef.files[0]
        let formData = new FormData()
        formData.append("file1", fileBuffStorage)
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", "../../api/upload/uploadfiles.php");
        ajax.send(formData);
    }

    function progressHandler(event) {
        // _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
        var percent = (event.loaded / event.total) * 100;
        // _("progressBar").value = Math.round(percent);
        progressBar.style.width = `${Math.round(percent)}%`
        // _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
        progress.innerHTML =
            `uploading ${fileBufferRef.value.split("\\")[fileBufferRef.value.split("\\").length-1]} <br> ${Math.round(percent)}% <br> ${Math.ceil(event.loaded/Math.pow(2, 20))} MB / ${Math.ceil(event.total/Math.pow(2, 20))} MB `
    }

    function completeHandler(event) {
        // alert(event.target.responseText)

        progress.innerHTML = `${event.target.responseText} <br> Successfully Uploaded`
        // progressBar.style.backgroundColor = "red"
        setTimeout(function () {
            progress.style.zIndex = "2"
            fileBufferRef.value = ``
            progressBar.style.width = `0`
            progress.innerHTML = `Upload any files .. `
        }, 1000)


        // _("status").innerHTML = event.target.responseText;
        // _("progressBar").value = 0;
    }

    function errorHandler(event) {
        // _("status").innerHTML = "Upload Failed";
        progress.innerHTML = "Upload Failed"
        progressBar.style.backgroundColor = "red"
        setTimeout(function () {
            progress.style.zIndex = "2"
            fileBufferRef.value = ``
            progressBar.style.width = `0`
            progress.innerHTML = `Upload any files .. `
        }, 2000)
    }

    function abortHandler(event) {
        // _("status").innerHTML = "Upload Aborted";
        progress.innerHTML = "Upload Failed"
        progressBar.style.backgroundColor = "red"
        setTimeout(function () {
            progress.style.zIndex = "2"
            fileBufferRef.value = ``
            progressBar.style.width = `0`
            progress.innerHTML = `Upload any files .. `
        }, 2000)

    }

})