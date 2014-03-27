
var editor = ace.edit("editor");
editor.setTheme("ace/theme/eclipse");
editor.getSession().setMode("ace/mode/c_cpp");

$(document).ready(function(){
  $("#buttonClear").click(function(){
	editor.selectAll();
	editor.removeLines();
  });
});

// Instance the tour
var tour = new Tour({
  steps: [
  {	
    element: "#editor",
    title: "Start here",
	placement: "top",
    content: "Place your codes here!"
  },
  {
    element: "#files",
    title: "Choose a file",
	placement: "bottom",
    content: "You can also upload an existing source code into the editor!"
  },
  {
    element: "#inputarea",
    title: "Input",
	placement: "top",
    content: "What are the inputs of your program? Place them here!"
  },
  {
    element: "#submit",
    title: "Submit your code",
    content: "Then wait for the visualization!"
  }
]});

tour.init();
tour.start();
tour.restart();

var control = document.getElementById("files"); 
    control.addEventListener("change", function(event){ 
        var reader = new FileReader();      
        reader.onload = function(event){
            var contents = event.target.result;     
            editor.setValue(contents);            
        };      
        reader.onerror = function(event){
            console.error("File could not be read! Code " + event.target.error.code);
        };      
        console.log("Filename: " + control.files[0].name);
        reader.readAsText(control.files[0]);        
    }, false);