//data
var info = {
    10: {
        'id' : 10,
        'parent': null,
        'children': [100],
        'shortText': 'question',
        'fullText': 'question full text',
        'group': 'question'
    },
    100: {
        'id' : 100,
        'parent': 10,
        'children': [101, 102],
        'shortText': 'answer',
        'fullText': 'answer full text',
        'group': 'answer'
    },
    101: {
        'id' : 101,
        'parent': 100,
        'children': [1010, 1011, 1012, 1013],
        'shortText': 'blah1',
        'fullText': 'blah blah1',
        'group': 'supporting'
    },
    102: {
        'id' : 102,
        'parent': 100,
        'children': [1020, 1021, 1022],
        'shortText': 'blah2',
        'fullText': 'blah blah2',
        'group': 'disproving'
    },
    1010: {
        'id' : 1010,
        'parent': 101,
        'children': [10101, 10102, 10103],
        'shortText': 'blah1010',
        'fullText': 'blah blah10',
        'group': 'disproving'
    },
    1011: {
        'id' : 1011,
        'parent': 101,
        'children': [10111],
        'shortText': 'blah1011',
        'fullText': 'blah blah11',
        'group': 'supporting'
    },
    1012: {
        'id' : 1012,
        'parent': 101,
        'children': [10121],
        'shortText': 'blah1012',
        'fullText': 'blah blah12',
        'group': 'supporting'
    },
    1013: {
        'id' : 1013,
        'parent': 101,
        'children': [10131],
        'shortText': 'blah1013',
        'fullText': 'blah blah13',
        'group': 'supporting'
    },
    1020: {
        'id' : 1020,
        'parent': 102,
        'children': [10201],
        'shortText': 'blah20',
        'fullText': 'blah blah20',
        'group': 'supporting'
    },
    1021: {
        'id' : 1021,
        'parent': 102,
        'children': [10211],
        'shortText': 'blah21',
        'fullText': 'blah blah21',
        'group': 'disproving'
    },
    1022: {
        'id' : 1022,
        'parent': 102,
        'children': [10221],
        'shortText': 'blah22',
        'fullText': 'blah blah22',
        'group': 'supporting'
    }
};



var questionNode = info[10].shortText;
var selectedNode = info[101];
var parentNode = selectedNode.parent; //returns an id [100]
var childrenNodes = selectedNode.children; // returns one value or array [1010, 1011]
var selectedID = (selectedNode.id).toString();


var nodeData = [];
var edgeData = [];

// node data
var parent = {id: 'parent', label: info[parentNode].shortText, fullText: info[parentNode].fullText, group: info[parentNode].group};
var selected = {id: 'selected', label: selectedNode.shortText, fullText: selectedNode.fullText, group: 'selected'};

// edge datas
var parentEdge = {from: 'parent', to: 'selected', smooth: false};

// loop to create children node data and their edges
for (var i in childrenNodes){
    var childNode = childrenNodes[i];
    var childID = 'child' + selectedID;
    var edgeID = 'edge' + selectedID;
    window[childID+i] = {id: childID+i, label: info[childNode].shortText, fullText: info[childNode].fullText, group: info[childNode].group};
    nodeData.push(window[childID+i]);
    window[edgeID+i] = {from: 'selected', to: childID+i};
    edgeData.push(window[edgeID+i]);
};

console.log(edgeData);

nodeData.push(parent, selected);
edgeData.push(parentEdge);

// create dataSet from predefined data above
var nodes = new vis.DataSet(nodeData);
// create an array with edges
var edges = new vis.DataSet(edgeData);
// create a network
var container = document.getElementById('mynetwork');
// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

// option details
var options = {

    autoResize: true,
    height: '100%',

    // edges options and styles
    edges:{
        arrows: {
            to: {enabled: true, scaleFactor:0.7, type:'arrow'}
        },
        arrowStrikethrough: true,
        color: {
            inherit: 'to',
            opacity:1.0
        },
        physics: true,
        scaling:{
            min: 1,
            max: 15
        },
        smooth: {
            enabled: true,
            type: "curvedCW",
            roundness: 0.4
        },
        selectionWidth: 2,
        selfReferenceSize:20
    },

    // groups options and styles (like classes)
    groups: {
        selected: {color:{background: 'white', border: 'blue '}, font:{size: 20}, borderWidth: 2},
        supporting: {color:{background: 'white', border: 'blue'}},
        disproving: {color:{background: 'white', border: 'red'}},
        answer: {color:{background: 'white', border: 'black'}}
    },

    // mouse and touch events
    interaction: {
        dragNodes:false,
        dragView: false,
        navigationButtons: true,
        selectConnectedEdges: true,
        zoomView: true
    },

    // hierarchy
    layout:{
        improvedLayout:true,
        hierarchical: {
            enabled:true,
            levelSeparation: 300,
            nodeSpacing: 300,
            treeSpacing: 200,
            blockShifting: true,
            parentCentralization: true,
            direction: 'LR',        // UD, DU, LR, RL
            sortMethod: 'directed'   // hubsize, directed
        }
    },

    // nodes options and styles
    nodes:{
        font: {
            color: '#343434',
            size: 15, // px
            face: 'arial'
        },
        heightConstraint: {
            minimum: 70,
            valign: 'middle'
        },
        mass: 1,
        physics: true,
        scaling: {
            label: {
                enabled: true,
                min: 14,
                max: 15,
                maxVisible: 15,
                drawThreshold: 5
            }
        },
        shape: 'box',
        shapeProperties: {
            borderRadius: 6
        }
    },

    // movement of nodes and edges
    physics:{
        enabled: true,
        hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 300,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09
        }
    }
};


// initialize network
var network = new vis.Network(container, data, options);
network.setOptions(options);


// prep screen on load
$( document ).ready(function() {

    // heading text to page question
    $(".question").html(questionNode);

    // show full text of selected node
    // TODO: change from alert box to dialog box
    function showText(node){
        var text = nodes.get(node)[0].fullText;
        alert(text);
    }

    // change central node to selected node
    // TODO: need to switch all data around according
    // TODO: parent node changes to old selected
    function selectNode(node){
        var label = nodes.get(node)[0].label;
        var group = nodes.get(node)[0].group;
        nodes.update({id: 'selected', label: label, group: group });
    }

    network.on('hold', function(event){
        var node = event.nodes;
        showText(node);
    });
    network.on('doubleClick', function(event){
        var node = event.nodes;
        selectNode(node);
    });
});

