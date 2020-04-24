// import { render } from "ejs";

// function readUrl(input) {
//     if(input.files && input.files[0]) {
//         reader.onload = function(e) {
//             document.getElementById('proImage').src=e.target.value;
//         }
//         render.readAsDataURL(input.files[0]);
//     }
// }

// $("#file").change(function() {
//     readURL(file);
// });

{/* <input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/> */}

  var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
