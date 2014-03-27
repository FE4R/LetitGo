
$(document).ready(function(){
	$("#submit").click(function(){
		document.getElementById("editorframe").contentWindow.visualize();
	});
});

var editor = ace.edit("editor");
editor.setTheme("ace/theme/eclipse");
editor.getSession().setMode("ace/mode/c_cpp");

$(document).ready(function(){
	$("#buttonClear").click(function(){
		var r=confirm("Are you sure?");
		console.log("HELLO WORLD");
		if (r==true)
		{
			editor.selectAll();
			editor.removeLines();
		}
	});
  
	$("inputarea").click(function(){
		$("inputarea").value = "";
	});s
});

// Instance the tour
var tour = new Tour({
	steps: [
	{	
		element: "#editor",
		title: "Start here",
		placement: "top",
		content: "Place your source codes here! However, we only accept C source codes!"
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
	},
	{
		element: "#visual",
		title: "Visualization",
		placement: "left",
		content: "Understand how your code works underneath!"
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
	
$(window).resize(function(){location.reload();});


var visualize = function(){ // on dom ready

	$('#visual').cytoscape({
		layout: {
			name: 'breadthfirst',
			fit: true, // whether to fit the viewport to the graph
			ready: undefined, // callback on layoutready
			stop: undefined, // callback on layoutstop
			directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
			padding: 30, // padding on fit
			circle: false, // put depths in concentric circles if true, put depths top down if false
			roots: undefined, // the roots of the trees
			maximalAdjustments: 0 // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
		},
	  
		style: cytoscape.stylesheet().selector('node').css({
			'shape': 'data(faveShape)',
			'width': 'mapData(weight, 40, 80, 20, 60)',
			'content': 'data(name)',
			'text-valign': 'center',
			'text-outline-width': 2,
			'text-outline-color': 'data(faveColor)',
			'background-color': 'data(faveColor)',
			'color': '#fff'
		})
		.selector(':selected').css({
			'border-width': 3,
			'border-color': '#333'
		})
		.selector('edge').css({
			'width': 'mapData(strength, 70, 100, 2, 6)',
			'target-arrow-shape': 'triangle',
			'line-color': 'data(faveColor)',
			'target-arrow-color': 'data(faveColor)'
		})
		.selector('.faded').css({
			'opacity': 0.25,
			'text-opacity': 0
		}),

		elements: {
			nodes: [
				{ data: { id: 'main', name: 'main()', weight: 100, faveColor: '#6FB1FC', faveShape: 'circle' } },
				{ data: { id: 'foo1', name: 'foo1(&x)', weight: 100, faveColor: '#6FB1FC', faveShape: 'circle' } },
				{ data: { id: 'foo1:ptr', name: 'int *ptr', weight: 100, faveColor: '#86B342', faveShape: 'rectangle' } },
				{ data: { id: 'foo1:x', name: 'int x', weight: 100, faveColor: '#86B342', faveShape: 'rectangle' } },
				{ data: { id: 'main:x', name: 'int x', weight: 100, faveColor: '#F5A45D', faveShape: 'rectangle' } },
				{ data: { id: 'main:y', name: 'int y', weight: 100, faveColor: '#F5A45D', faveShape: 'rectangle' } },
				{ data: { id: 'main:z', name: 'int z', weight: 100, faveColor: '#F5A45D', faveShape: 'rectangle' } }
			],
			edges: [
				{ data: { source: 'main', target: 'foo1', faveColor: '#6FB1FC', strength: 100 } },
				{ data: { source: 'main', target: 'main:x', faveColor: '#F5A45D', strength: 90 } },
				{ data: { source: 'main', target: 'main:y', faveColor: '#F5A45D', strength: 90 } },
				{ data: { source: 'main', target: 'main:z', faveColor: '#F5A45D', strength: 90 } },
				{ data: { source: 'foo1', target: 'foo1:ptr', faveColor: '#F5A45D', strength: 90 } },
				{ data: { source: 'foo1:ptr', target: 'main:x', faveColor: '#86B342', strength: 80 } },
				{ data: { source: 'foo1', target: 'foo1:x', faveColor: '#F5A45D', strength: 90 } },
			]
		},

		ready: function(){
			window.visual = this;
			// giddy ups
		}
	});
}; // on dom ready
