document.addEventListener("DOMContentLoaded", function () {

    let fireUploadInstance = []

    // alert(0)
    const fileBufferRef = document.getElementById("file-buffer")
    // const progressBar = document.getElementById("progress-bar")
    // const progress = document.getElementById("progress-notification")
    // progress.style.width = "100%"
    const uploadProgressContainer = document.getElementById("upload-progress-container")

    // fileBufferRef.addEventListener("change", fireUpload)

    fileBufferRef.addEventListener("change", function () {
        console.log("hello")
        let filesInInput = fileBufferRef.files
        let totalFiles = filesInInput.length
        console.log(totalFiles)

        // fileBufferRef.value = ``
        // console.log(filesInInput.files)
        // const arr = fileBufferRef.files

        for (let x = 0; x < totalFiles; x++) {

            // console.log(filesInInput[x].name)

            const fileName = filesInInput[x].name.replace('/ /g', '')

            // console.log(fileName)
            let constructUploadDom = `<div class="row" id="progress-id-${fileName}">
                                        <div class="col">
                                            <div class="row">
                                                <div class="col-1 font-weight-bold text-primary  pt-2 pb-2"><i class="fa fa-angle-double-right text-primary shadow-lg"></i> </div>
                                                <div class="col rounded ">
                                                    <div id="progress-bar-${fileName}" class="progress-bar rounded shadow"></div>
                                                    <div class="d-flex justify-content-center text-danger progress-notification  align-items-center" id="progress-notification-${fileName}"></div>
                                                </div>
                                                <div class="col-1 d-flex justify-content-center align-items-center">
                                                    <button class="btn btn-sm shadow-sm btn-outline-light rounded-circle" onClick="cancelDownload('${fileName}')"> <i class="fas text-danger fa-times"></i></button>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col"><hr></div>
                                            </div>
                                        </div>
                                    </div>`

            uploadProgressContainer.innerHTML += constructUploadDom
            fireUploadInstance.push(new FireUpload(fileName, filesInInput[x]))         
        }

        fileBufferRef.value = ``
        
        for(var i = 0; i < fireUploadInstance.length; i++) {
            fireUploadInstance[i].process()
            fireUploadInstance.splice(i, 1)
        }


        

    })



    class FireUpload {
        // console.log(fileName)
        constructor(fileName, fileData) {
            console.log(fileName)
            this.fileName = fileName
            this.progressId = document.getElementById(`progress-id-${fileName}`)
            this.progressBar = document.getElementById(`progress-bar-${fileName}`)
            this.progressNotifiation = document.getElementById(`progress-notification-${fileName}`)
            this.fileBuffStorage = fileData
            this.formData = new FormData()
            this.formData.append("fileData", this.fileBuffStorage)
            this.ajax = new XMLHttpRequest();
        }

        async process() {
            console.log(this.fileName)
            let fileName = this.fileName
            let progressBar = document.getElementById(`progress-bar-${this.fileName}`)
            let progressId = document.getElementById(`progress-id-${this.fileName}`)
            let progressNotifiation = document.getElementById(`progress-notification-${this.fileName}`)
            await this.ajax.upload.addEventListener("progress", function (event) {
                var percent = (event.loaded / event.total) * 100;
                progressBar.style.width = `${Math.round(percent)}%`
                progressNotifiation.innerHTML =
                    `${fileName}  ${Math.round(percent)}% <br> ${Math.ceil(event.loaded/Math.pow(2, 20))} MB / ${Math.ceil(event.total/Math.pow(2, 20))} MB `

            }, false);



            await this.ajax.addEventListener("load", function (event) {
                progressNotifiation.innerHTML = `Successfully Uploaded`
                setTimeout(function () {
                    progressBar.style.width = `0`
                    removeElement(progressId)
                }, 1000)
            }, false);


            await this.ajax.addEventListener("error", function (event) {
                progressNotifiation.innerHTML = "Upload Failed"
                progressBar.style.backgroundColor = "red"
                setTimeout(function () {
                    progressBar.style.width = `0`
                    removeElement(this.progressId)
                }, 2000)
            }, false);


            await this.ajax.addEventListener("abort",function (event) {
                    progressNotifiation.innerHTML = "Upload Failed"
                    progressBar.style.backgroundColor = "red"
                    setTimeout(function () {
                        progressBar.style.width = `0`
                        removeElement(progressId)
                    }, 2000)

                }, false);
            this.ajax.open("POST", "../../api/upload/uploadfiles.php");
            await this.ajax.send(this.formData);

        }


    }




    //remove completed upload progress bar
    function removeElement(elementId) {
        // Removes an element from the document
        elementId.parentNode.removeChild(elementId);
    }


    //old version
    function progressHandler(event) {
        // _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
        var percent = (event.loaded / event.total) * 100;
        // _("progressBar").value = Math.round(percent);
        progressBar.style.width = `${Math.round(percent)}%`
        // _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
        progress.innerHTML =
            `${fileBufferRef.value.split("\\")[fileBufferRef.value.split("\\").length-1]}  ${Math.round(percent)}% <br> ${Math.ceil(event.loaded/Math.pow(2, 20))} MB / ${Math.ceil(event.total/Math.pow(2, 20))} MB `
    }

    function completeHandler(event) {
        // alert(event.target.responseText)

        progress.innerHTML = `Successfully Uploaded`
        // progressBar.style.backgroundColor = "red"
        setTimeout(function () {
            // progress.style.zIndex = "2"
            // fileBufferRef.value = ``
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