localStorage.setItem("decideDeleteAll", 0)

document.addEventListener("DOMContentLoaded", function () {
    //    alert(0)

    initialAutoFire()


})

const deleteAllButtonRef = document.getElementById(`delete-all-button`)
let decideDeleteAll = true

function buildDomBody(response) {
    const downloadContainer = document.getElementById('downlaod-container')
    let output = ``
    downloadContainer.innerHTML = ``
    let count = 1
    response.forEach(element => {
        console.log(element[0].filename)
        output = `<div class="row">
                    <div class="col-1 text-danger font-weight-bold">${count} . </div>
                    <div class="col-7 text-success" id="download-content-${element[0].id}" style="overflow-wrap:break-word;"><b>${element[0].filename}</b> <br> <small class="text-dark"><b>Size</b> : ${Math.round(element[0].filesize/Math.pow(2, 20))}MB &nbsp;<b>Date</b> : ${element[0].date.split(" ")[0]}&nbsp; <b>Time </b>: ${element[0].date.split(" ")[1]}</small></div>
                    <div class="col-7 text-center" id="download-content-notification-${element[0].id}" style="overflow-wrap:break-word; position:relative; display:none;">
                        <div id="download-content-progress-${element[0].id}" style="position: absolute; height: 100%; width: 0%; background: green; z-index: 1; opacity: .40; "></div>
                        <div id="download-content-percentage-${element[0].id}" class="text-danger" style="font-size: 13px;"></div>
                    </div>
                    <div class="col-2"><a class="btn" id="download-button-${element[0].id}" onclick="downloadFile('${element[0].filename}', '${element[0].id}')" ><i class="fas fa-download  shadow text-primary fa-1x"></i></a></div>
                    <div class="col-2"><a class="btn" id="delete-button-${element[0].id}" onclick="deleteFile('${element[0].filename}')" ><i class="fas fa-trash-alt  shadow text-danger fa-1x"></i></a></div>
                </div>
                <hr>`
        downloadContainer.innerHTML += output
        count++
    })
}


function initialAutoFire() {

    const url = `../../api/download/fetchfiles.php`

    fetch(url)
        .then(data => data.json())
        .then(response => {
            // console.log(response)
            // console.log(response[1][0].filename)
            buildDomBody(response)
        })
        .catch(error => console.log(error))


}


function decideDeleteAllFunc(delVal) {

    if(delVal == localStorage.getItem("decideDeleteAll")) {
        // deleteAllButtonRef.classList.add("disabled")    
        deleteAllButtonRef.classList.remove("disabled")
        localStorage.setItem("decideDeleteAll", 0)
    } else {
    }

}


function downloadFile(fileName, fileId) {

    const downloadContentRef = document.getElementById(`download-content-${fileId}`)
    const downloadContentNotificationRef = document.getElementById(`download-content-notification-${fileId}`)
    const downloadContentProgressRef = document.getElementById(`download-content-progress-${fileId}`)
    const downloadContentPercentageRef = document.getElementById(`download-content-percentage-${fileId}`)
    const downloadbuttonRef = document.getElementById(`download-button-${fileId}`)
    const deletebuttonRef = document.getElementById(`delete-button-${fileId}`)

    // decideDeleteAll = false
    // deleteAllButtonRef.classList.remove("disabled")
    deleteAllButtonRef.classList.add("disabled")    

    let delVal = localStorage.getItem("decideDeleteAll") + 1
    localStorage.setItem("decideDeleteAll", delVal)
    // decideDeleteAllFunc(delVal)
    downloadbuttonRef.classList.add("disabled")
    deletebuttonRef.classList.add("disabled")

    downloadContentRef.style.display = "none"

    downloadContentNotificationRef.style.display = "block"




    console.log(fileName)
    const url = `../../api/download/downloadfile.php`
    var req = new XMLHttpRequest()
    let formData = new FormData()
    formData.append("fileName", fileName)
    req.open("POST", url, true)
    req.addEventListener("progress", function (event) {

        // _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
        var percent = (event.loaded / event.total) * 100;
        // console.log(percent)
        // _("progressBar").value = Math.round(percent);
        downloadContentProgressRef.style.width = `${Math.round(percent)}%`
        // _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
        downloadContentPercentageRef.innerHTML = `Downloading.. ${fileName} <br> ${Math.ceil(event.loaded/Math.pow(2, 20))} MB / ${Math.ceil(event.total/Math.pow(2, 20))} MB `
    }, false)
    req.responseType = "blob"
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            // var filename = $(that).data('filename');
            console.log("done")

            // decideDeleteAll = true
            decideDeleteAllFunc(delVal)

            downloadContentRef.style.display = "block"
            downloadContentNotificationRef.style.display = "none"
            downloadContentProgressRef.style.width = `0%`
            downloadContentPercentageRef.innerHTML = ``
            downloadbuttonRef.classList.remove("disabled")
            deletebuttonRef.classList.remove ("disabled")
        
        

            if (typeof window.chrome !== 'undefined') {
                // Chrome version
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(req.response);
                link.download = fileName;
                link.click();
            } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE version
                var blob = new Blob([req.response], {
                    type: 'application/force-download'
                });
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                // Firefox version
                var file = new File([req.response], fileName, {
                    type: 'application/force-download'
                });
                window.open(URL.createObjectURL(file));
            }
        }
    };
    req.send(formData)

}


function downloadProgressHandler(event, downloadContentPercentageRef, downloadContentProgressRef) {

    // _("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
    var percent = (event.loaded / event.total) * 100;
    console.log(percent)
    // _("progressBar").value = Math.round(percent);
    downloadContentProgressRef.style.width = `${Math.round(percent)}%`
    // _("status").innerHTML = Math.round(percent)+"% uploaded... please wait";
    downloadContentPercentageRef.innerHTML += `<br> ${Math.ceil(event.loaded/Math.pow(2, 20))} MB / ${Math.ceil(event.total/Math.pow(2, 20))} MB `
}



function deleteFile(fileName) {

    const decideDelete = confirm("Are u sure to delete the file ?")
    console.log(decideDelete)
    console.log(fileName)
    var formData = new FormData()
    formData.append("fileName", fileName)

    if (decideDelete) {
        const url = `../../api/download/deletefile.php`
        console.log(url)
        fetch(url, {
                method: 'POST',
                // headers: {
                //     "Content-Type": "multipart/form-data",
                //     "cache-control": "no-cache"
                // },
                body: formData
            })
            .then(data => data.json())
            .then(response => {
                console.log(response)
                initialAutoFire()
            })
            .catch(error => console.log(error))
    } else {
        console.log("done")
    }

}


function deleteAllFiles() {

    const downloadContainer = document.getElementById('downlaod-container')

    const decideDelete = confirm("Are u sure to delete the file ?")
    if(decideDelete) {
        const url = `../../api/download/deleteallfiles.php`
        fetch(url)
            .then(data => data.json())
            .then(response => {
                console.log(response)
                downloadContainer.innerHTML = '<div class="row"><div class="col text-center alert alert-success">All files Deleted Successfully</div></div>'
                setTimeout(function(){
                    downloadContainer.innerHTML = ``
                    initialAutoFire()
                }, 3000)

            })
            .catch(error => console.log(error))
    }else {
        let temp = downloadContainer.innerHTML
        downloadContainer.innerHTML = `<div class="row"><div class="col text-center alert alert-success">Delete sequence terminated</div></div>` + temp
        setTimeout(function(){
            // downloadContainer.innerHTML = temp
            initialAutoFire()
        }, 3000)
    }

}