/*"use strict";
/*eslint no-undef: "error"*/
/*eslint-env node*/
/*global document, window, navigator*/
/*eslint no-console: ["error", { allow: ["log"] }] */
/*eslint no-unused-vars: "error"*/

/* github edition */
var video, videoSelect;

function UserChannel(socket){
    self = this;
    this.socket = {
        obj: socket,// /*0*/ add time stamp instead
        print: function(){
            console.log(self.socket.obj)
        }
    }
}

function gotDevices(deviceInfos) {
    videoSelect = document.getElementById("videoSource");
    for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement("option");
        option.value = deviceInfo.deviceId;

        console.log("["+i+"] "+deviceInfo.kind);

        if (deviceInfo.kind === "videoinput") {
            option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
            videoSelect.appendChild(option);
        }
        else {
           // console.log("Found one other kind of source/device: ", deviceInfo);
        }
    }
}

function getStream() {
    videoSelect = document.getElementById("videoSource");
    //console.log(videoSelect.value);

    if (window.stream) {
       // console.log("stream flowing my guy!!!");
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }

    var constraints = {
        video: {
            deviceId: {exact: videoSelect.value}
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    video.srcObject = stream;
    video.play();
}

function handleError(error) {
    console.log("Error: ", error);
}

function convertCanvasToImage(canvas) {// store the result of this function in a variable that will represent the file entered in line 57 above
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

var applicationClientManager = {
    focus: 0,
    menu: {
        currentlyOpen: -1, //=none; 0 = add/edit object; 1 = ; 2 = code;
    },
    builder: {
        orientation: null,
        addingModel: false,
        addModelFromSource: null,
        scale: null
    },
    entity: {
        id: "default-mask",
        geometry: {
            primitive: "sphere",
            radius: 0.5
        },
        position: "0 1 -5",
        material: "src: #floor-texture"
    },
    connection: null
};

function startWebCam(){ // starts the webcam or phone camera capture

    video = document.getElementById("video");
    videoSelect = document.querySelector("select#videoSource");
    // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
       navigator.mediaDevices.enumerateDevices().then(gotDevices).then(getStream).catch(handleError);

        videoSelect.onchange = getStream;
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.margin = "0"
        video.style.top = "0";
        video.style.left = "0";

        let scene = document.getElementById("experience-overlay-container");
        scene.style.width = "100%";
        scene.style.height = "100%";
        scene.style.margin = "0"
        scene.style.top = "0";
        scene.style.left = "0";

    }
}
