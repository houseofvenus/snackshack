
function init(){
  buildMarkup();
  console.log(`------------------------- \n SNACK SHACK \n -------------------------- \n a decentralized immersive application for autonomous delivery and late night convenience \n first published on the HOUSEOFVENUS pARk \n current version: 0.5.22`);

  applicationClientManager.connection = io.connect(location.host);

  applicationClientManager.connection.emit("requestDIAStream", {status: true, name: "SNACKSHACK"});

  applicationClientManager.connection.on("selectNewPage", function(data){
      var x = document.getElementsByClassName("application-asset");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].object3D.visible = false;
      }

      if(data.status){
          console.log(` fx] selectNewPage \n activate application assets for page ${data.page}`);

          let selection = parseInt(data.page, 10);

          var y = document.getElementsByClassName(`application-page-${selection}-asset`);
          var j;
          for(j = 0; j < y.length; j++){
              y[j].object3D.visible = true;
          }
      }
  });

  applicationClientManager.connection.on("clearInitialVideoFeed", function(data){
      var video = document.getElementById("video");
      let stream = video.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(function(track) {
          track.stop();
      });

      video.srcObject = null;
      //video.stop();
      video.style.display = "none";
  });

  applicationClientManager.connection.on("restartVideoFeed", function(data){
      getStream();
      //video.stop();
      video.style.display = "block";
  });

  applicationClientManager.connection.on("transitionToBuildView", function(data){
      $("#object-type-list-container").css({
          display: "block"
      }).animate({
          opacity: 1.0
      }, 500, function(){
          $("#object-type-list-container").on("change", function(){
              var value = document.querySelector("select#object-type-list-container").value;
              console.log(value);
          })
      });
  });

  applicationClientManager.connection.on("selectionMadeForDeliveryItem", function(data){
      let selection = data.selection;
      //let selectedPos = document.querySelector(selection).object3D.position;

      if(selection=="#menu-option-0"){
          document.querySelector("#selected-option").object3D.position.set(-2, 2.2, -4);
      }
      else if(selection=="#menu-option-1"){
          document.querySelector("#selected-option").object3D.position.set(2, 2.2, -4);
      }
      document.querySelector(selection).object3D.visible = false;
      //document.querySelector("#selected-option").object3D.position.set(selectedPos);
      document.querySelector("#selected-option").object3D.visible = true;
  });

  applicationClientManager.connection.on("paintCanvas", function(data){
      var arr = new Uint8ClampedArray(data.buf); //buffer

      const imgData = new ImageData(
        arr,
        data.cols,
        data.rows
      );
      // set canvas dimensions
      const canvas = document.getElementById("canvas");
      canvas.height = data.rows;
      canvas.width = data.cols;
      // set image data
      const ctx = canvas.getContext("2d");
      ctx.putImageData(imgData, 0, 0);/**/
  });

  setTimeout(function(){
      startWebCam();
  }, 50);

}

document.addEventListener("DOMContentLoaded", function(){
    init();
});
