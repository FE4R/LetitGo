$(window).resize(function(){location.reload();});

$(function (){ // on dom ready
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
				{ data: { id: 'foo2', name: 'foo2(&ptr)', weight: 100, faveColor: '#6FB1FC', faveShape: 'circle' } },
				{ data: { id: 'foo1:ptr', name: 'int *ptr', weight: 100, faveColor: '#86B342', faveShape: 'rectangle' } },
				{ data: { id: 'foo2:ptr', name: 'int **ptr', weight: 100, faveColor: '#86B342', faveShape: 'rectangle' } },
				{ data: { id: 'main:x', name: 'int x', weight: 100, faveColor: '#F5A45D', faveShape: 'rectangle' } }
			],
			edges: [
				{ data: { source: 'main', target: 'foo1', faveColor: '#6FB1FC', strength: 100 } },
				{ data: { source: 'foo1', target: 'foo2', faveColor: '#6FB1FC', strength: 100 } },	 
				{ data: { source: 'main', target: 'main:x', faveColor: '#F5A45D', strength: 100 } },
				{ data: { source: 'foo1', target: 'foo1:ptr', faveColor: '#F5A45D', strength: 100 } },
				{ data: { source: 'foo2', target: 'foo2:ptr', faveColor: '#F5A45D', strength: 100 } },
				{ data: { source: 'foo1:ptr', target: 'main:x', faveColor: '#86B342', strength: 100 } },
				{ data: { source: 'foo2:ptr', target: 'foo1:ptr', faveColor: '#86B342', strength: 100 } }
			]
		},

		ready: function(){
			window.visual = this;
			// giddy ups
		}
	});
}); // on dom ready
