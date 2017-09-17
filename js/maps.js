//data
var info = {
    1: {
        'id' : 1,
        'parent': null,
        'children': [100],
        'shortText': 'question',
        'fullText': 'question full text',
        'group': 'question'
    },
    10: {
        'id' : 10,
        'parent': 1,
        'children': [100, 101, 102],
        'shortText': 'answer',
        'fullText': 'answer full text',
        'group': 'answer'
    },
    100: {
        'id' : 100,
        'parent': 10,
        'children': [1001, 1001, 1002, 1003],
        'shortText': 'blah1',
        'fullText': 'blah blah1',
        'group': 'supporting'
    },
    101: {
        'id' : 101,
        'parent': 10,
        'children': [1010, 1011, 1012],
        'shortText': 'blah2',
        'fullText': 'blah blah2',
        'group': 'disproving'
    },
    102: {
        'id' : 102,
        'parent': 10,
        'children': [1020, 1021, 1022],
        'shortText': 'blah2',
        'fullText': 'blah blah2',
        'group': 'disproving'
    },
    1010: {
        'id' : 1010,
        'parent': 101,
        'children': [10100, 10101, 10102],
        'shortText': 'blah1010',
        'fullText': 'blah blah10',
        'group': 'disproving'
    },
    1011: {
        'id' : 1011,
        'parent': 101,
        'children': [10110],
        'shortText': 'blah1011',
        'fullText': 'blah blah11',
        'group': 'supporting'
    },
    1012: {
        'id' : 1012,
        'parent': 101,
        'children': [10120],
        'shortText': 'blah1012',
        'fullText': 'blah blah12',
        'group': 'supporting'
    },
    1013: {
        'id' : 1013,
        'parent': 101,
        'children': [10130],
        'shortText': 'blah1013',
        'fullText': 'blah blah13',
        'group': 'supporting'
    },
    1020: {
        'id' : 1020,
        'parent': 102,
        'children': [10200],
        'shortText': 'blah20',
        'fullText': 'blah blah20',
        'group': 'supporting'
    },
    1021: {
        'id' : 1021,
        'parent': 102,
        'children': [10210],
        'shortText': 'blah21',
        'fullText': 'blah blah21',
        'group': 'disproving'
    },
    1022: {
        'id' : 1022,
        'parent': 102,
        'children': [10220],
        'shortText': 'blah22',
        'fullText': 'blah blah22',
        'group': 'supporting'
    },
    10220: {
        'id' : 10220,
        'parent': 1022,
        'children': null,
        'shortText': 'blah22',
        'fullText': 'blah blah22',
        'group': 'supporting'
    }
};

$(document).ready(function() {

    var questionNode = info[10].shortText;
    var parentEdge = {from: 'parent', to: 'selected', smooth: false};
    var container;
    var nodes;
    var edges;
    var data;
    var network;
    var selectedNode;
    var parentNode;
    var childrenNodes;
    var nodeData;
    var edgeData;
    var parent;
    var selected;


// loop to create children node data and their edges
    function getData(selectedID) {

        selectedNode = info[selectedID];
        parentNode = selectedNode.parent; //returns an id [100]
        childrenNodes = selectedNode.children; // returns one value or array [1010, 1011]
        nodeData = [];
        edgeData = [];

        // node data
        parent = {
            id: 'parent',
            label: info[parentNode].shortText,
            fullText: info[parentNode].fullText,
            group: info[parentNode].group
        };
        selected = {
            id: 'selected',
            label: selectedNode.shortText,
            fullText: selectedNode.fullText,
            group: selectedNode.group
        };


        if (childrenNodes != null && parentNode != null) {
            for (var i in childrenNodes) {
                var childNode = childrenNodes[i];
                var childID = selectedID;
                var edgeID = selectedID;

                window['child' + childID + i] = {
                    id: childID + i,
                    label: info[childNode].shortText,
                    fullText: info[childNode].fullText,
                    group: info[childNode].group
                };
                nodeData.push(window['child' + childID + i]);
                window['edge' + edgeID + i] = {
                    id: edgeID + i,
                    from: 'selected',
                    to: childID + i
                };
                edgeData.push(window['edge' + edgeID + i]);
            }
        }
        else {
            return null;
        }

        nodeData.push(parent, selected);
        edgeData.push(parentEdge);

        // create dataSet from predefined data above
        nodes = new vis.DataSet(nodeData);
        // create an array with edges
        edges = new vis.DataSet(edgeData);
        // create a network
        container = document.getElementById('mynetwork');
        // provide the data in the vis format
        data = {
            nodes: nodes,
            edges: edges
        };

        // initialize network
        network = new vis.Network(container, data, options);
        network.setOptions(options);

        network.on('doubleClick', function (event) {
            console.log('clicked');
            var clickedNode = event.nodes;
            getData(clickedNode);
        });

    }


// option details
    var options = {

        autoResize: true,
        height: '100%',

        // edges options and styles
        edges: {
            arrows: {
                to: {enabled: true, scaleFactor: 0.7, type: 'arrow'}
            },
            arrowStrikethrough: true,
            color: {
                inherit: 'to',
                opacity: 1.0
            },
            physics: true,
            scaling: {
                min: 1,
                max: 15
            },
            smooth: {
                enabled: true,
                type: "curvedCW",
                roundness: 0.4
            },
            selectionWidth: 2,
            selfReferenceSize: 20
        },

        // groups options and styles (like classes)
        groups: {
            selected: {color: {background: 'white', border: 'blue '}, font: {size: 20}, borderWidth: 2},
            supporting: {color: {background: 'white', border: 'blue'}},
            disproving: {color: {background: 'white', border: 'red'}},
            answer: {color: {background: 'white', border: 'black'}}
        },

        // mouse and touch events
        interaction: {
            dragNodes: false,
            dragView: false,
            navigationButtons: true,
            selectConnectedEdges: true,
            zoomView: true
        },

        // hierarchy
        layout: {
            improvedLayout: true,
            hierarchical: {
                enabled: true,
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
        nodes: {
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
        physics: {
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


// heading text to page question
    $(".question").html(questionNode);
    getData(10);

// show full text of selected node
// TODO: change from alert box to dialog box
    function showText(node) {
        var text = nodes.get(node)[0].fullText;
        alert(text);
    }

});