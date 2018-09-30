document.addEventListener("DOMContentLoaded", function () {

    let fireUploadInstanceMirror = []

    let fireUploadInstance = []

    let fireUploadInstanceMirrorQueue = []

    let isUploadHandlerFree = true

    // alert(0)
    const fileBufferRef = document.getElementById("file-buffer")
    // const progressBar = document.getElementById("progress-bar")
    // const progress = document.getElementById("progress-notification")
    // progress.style.width = "100%"
    const uploadProgressContainer = document.getElementById("upload-progress-container")

    const uploadQueueContainer = document.getElementById("upload-queue-container")
    const progDispRef = document.getElementById("prog")
    const queDispRef = document.getElementById("que")

    // fileBufferRef.addEventListener("change", fireUpload)

    fileBufferRef.addEventListener("change", function () {

        if (isUploadHandlerFree) {
            progDispRef.style.display = "block"
            // console.log("hello")
            let filesInInput = fileBufferRef.files
            let totalFiles = filesInInput.length
            // console.log(totalFiles)

            // fileBufferRef.value = ``
            // console.log(filesInInput.files)
            // const arr = fileBufferRef.files

            for (let x = 0; x < totalFiles; x++) {

                // console.log(filesInInput[x].name)

                const fileName = filesInInput[x].name.replace('/ /g', '')
                let randomId =  fileName + Math.random()
                console.log(randomId)
                let constructUploadDom = `<div class="row" id="progress-id-${randomId}">
                                            <div class="col">
                                                <div class="row">
                                                    <div class="col-1 font-weight-bold text-primary  pt-2 pb-2"><i class="fa fa-angle-double-right text-primary shadow-lg"></i> </div>
                                                    <div class="col rounded ">
                                                        <div id="progress-bar-${randomId}" class="progress-bar rounded shadow"></div>
                                                        <div class="d-flex justify-content-center text-danger progress-notification  align-items-center" id="progress-notification-${randomId}">
                                                            ${randomId} awaiting in queue <i class="fa fa-spinner fa-spin"></i>
                                                        </div>
                                                    </div>
                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        <button class="btn btn-sm shadow-sm btn-outline-light rounded-circle" onClick="cancelDownload('${randomId}')"> <i class="fas text-danger fa-times"></i></button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col"><hr></div>
                                                </div>
                                            </div>
                                        </div>`

                uploadProgressContainer.innerHTML += constructUploadDom

                let tempObject = {
                    "fileName": randomId,
                    "fileData": filesInInput[x]
                }

                fireUploadInstanceMirror.push(tempObject)
                // fireUploadInstance.push(new FireUpload(fileName, filesInInput[x]))
                // console.log(fireUploadInstanceMirror)
            }
            fileBufferRef.value = ``
            asynchronusUploadHandler()

            // decideFire()
        } else {

            queDispRef.style.display = "block"
            // console.log("hello")
            let filesInInput = fileBufferRef.files
            let totalFiles = filesInInput.length
            console.log(totalFiles)

            // fileBufferRef.value = ``
            // console.log(filesInInput.files)
            // const arr = fileBufferRef.files

            for (let x = 0; x < totalFiles; x++) {

                // console.log(filesInInput[x].name)

                const fileName = filesInInput[x].name.replace('/ /g', '')

                let randomId =  fileName + Math.random()
                console.log(randomId)
                let constructUploadDom = `<div class="row" id="progress-id-${randomId}">
                                            <div class="col">
                                                <div class="row">
                                                    <div class="col-1 font-weight-bold text-primary  pt-2 pb-2"><i class="fa fa-angle-double-right text-primary shadow-lg"></i> </div>
                                                    <div class="col rounded ">
                                                        <div id="progress-bar-${randomId}" class="progress-bar rounded shadow"></div>
                                                        <div class="d-flex justify-content-center text-danger progress-notification  align-items-center" id="progress-notification-${randomId}">
                                                            ${randomId} awaiting in queue <i class="fa fa-spinner fa-spin"></i>
                                                        </div>
                                                    </div>
                                                    <div class="col-1 d-flex justify-content-center align-items-center">
                                                        <button class="btn btn-sm shadow-sm btn-outline-light rounded-circle" onClick="cancelDownload('${randomId}')"> <i class="fas text-danger fa-times"></i></button>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col"><hr></div>
                                                </div>
                                            </div>
                                        </div>`

                uploadQueueContainer.innerHTML += constructUploadDom

                let tempObject = {
                    "fileName": randomId,
                    "fileData": filesInInput[x]
                }

                fireUploadInstanceMirrorQueue.push(tempObject)
                // fireUploadInstance.push(new FireUpload(fileName, filesInInput[x]))
                console.log(fireUploadInstanceMirrorQueue)
            }
            fileBufferRef.value = ``

            decideFire()

        }



    })


    function decideFire() {
        // console.log("dec")
        if (isUploadHandlerFree) {
            // console.log("allowed")
            progDispRef.style.display = "block"

            console.log(fireUploadInstanceMirror)
            fireUploadInstanceMirror = fireUploadInstanceMirrorQueue
            console.log(fireUploadInstanceMirror)

            uploadProgressContainer.innerHTML = uploadQueueContainer.innerHTML

            uploadQueueContainer.innerHTML = ``

            queDispRef.style.display = "none"

            asynchronusUploadHandler()
            // innerUploadDecide()
        } else {
            setTimeout(function () {
                decideFire()
            }, 2000)
        }
    }

    // let uploadListener = null
    let currentUploadContainerCounter = 0

    function asynchronusUploadHandler() {

        if (isUploadHandlerFree) {
            // uploadListener.clearInterval()
            isUploadHandlerFree = false
            for (var i = 0; i < fireUploadInstanceMirror.length; i++) {
                // fireUploadInstance[i].process(i)
                fireUploadInstance.push(new FireUpload(fireUploadInstanceMirror[i].fileName, fireUploadInstanceMirror[i].fileData))
            }

            fireUploadInstanceMirror.length = 0

            currentUploadContainerCounter = fireUploadInstance.length

            for (var i = 0; i < fireUploadInstance.length; i++) {
                fireUploadInstance[i].process(i)
            }

            currentLoadListener()

        } else {
            setTimeout(function () {
                asynchronusUploadHandler()
            }, 2000)
        }

    }

    function currentLoadListener() {
        // console.log(currentUploadContainerCounter)
        if (currentUploadContainerCounter == 0) {
            isUploadHandlerFree = true
            if (uploadQueueContainer.innerHTML != '')
                progDispRef.style.display = "none"
        } else {
            setTimeout(function () {
                currentLoadListener()
            }, 1000)
        }
    }



    class FireUpload {
        // console.log(fileName)
        constructor(fileName, fileData) {
            console.log(fileData.name)
            console.log(fileData)
            this.fileName = fileName
            this.name = fileData.name
            this.progressId = document.getElementById(`progress-id-${fileName}`)
            this.progressBar = document.getElementById(`progress-bar-${fileName}`)
            this.progressNotifiation = document.getElementById(`progress-notification-${fileName}`)
            this.fileBuffStorage = fileData
            this.formData = new FormData()
            this.formData.append("fileData", this.fileBuffStorage)
        }

        async process(arrayIndex) {
            // console.log(this.fileName)
            var ajax = new XMLHttpRequest();
            var fileName = this.name
            var progressBar = document.getElementById(`progress-bar-${this.fileName}`)
            var progressId = document.getElementById(`progress-id-${this.fileName}`)
            var progressNotifiation = document.getElementById(`progress-notification-${this.fileName}`)
            await ajax.upload.addEventListener("progress", async function (event) {
                var percent = (event.loaded / event.total) * 100;
                progressBar.style.width = `${Math.round(percent)}%`
                progressNotifiation.innerHTML =
                    `${fileName}  ${Math.round(percent)}% <br> ${Math.ceil(event.loaded/Math.pow(2, 20))} MB / ${Math.ceil(event.total/Math.pow(2, 20))} MB `

            }, false);



            await ajax.addEventListener("load", async function (event) {
                progressNotifiation.innerHTML = `Successfully Uploaded`
                fireUploadInstance.splice(arrayIndex, 1)
                currentUploadContainerCounter--
                setTimeout(function () {
                    progressBar.style.width = `0`
                    removeElement(progressId)
                }, 1000)
            }, false);


            await ajax.addEventListener("error", async function (event) {
                progressNotifiation.innerHTML = "Upload Failed"
                progressBar.style.backgroundColor = "red"
                setTimeout(function () {
                    progressBar.style.width = `0`
                    removeElement(this.progressId)
                }, 2000)
            }, false);


            await ajax.addEventListener("abort", async function (event) {
                progressNotifiation.innerHTML = "Upload Failed"
                progressBar.style.backgroundColor = "red"
                setTimeout(function () {
                    progressBar.style.width = `0`
                    removeElement(progressId)
                }, 2000)

            }, false);
            await ajax.open("POST", "../../api/upload/uploadfiles.php");
            await ajax.send(this.formData);

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