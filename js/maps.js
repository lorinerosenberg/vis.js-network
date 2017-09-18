$(document).ready(function() {

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
    var questionNode = info[10].shortText;


    // heading text to page question
    $(".question").html(questionNode);
    getData(100);

    // mindmap functionality
    function getData(selectedID) {

        selectedNode = info[selectedID];
        parentNode = selectedNode.parent; //returns an id [100]
        childrenNodes = selectedNode.children; // returns one value or array [1010, 1011]
        nodeData = [];
        edgeData = [];

        // node data
        parent = {
            id: parentNode,
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

        // formatting and pushing childNode data into an array
        if (childrenNodes != null) {
            for (var i in childrenNodes) {
                var childNode = childrenNodes[i];
                var childID = selectedID;
                var edgeID = selectedID;

                window['child' + childID + i] = {
                    id: childID + i,
                    label: info[childNode].shortText,
                    fullText: info[childNode].fullText,
                    group: info[childNode].group,
                    children: info[childNode].children
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
        edgeData.push({from: parentNode, to: 'selected', smooth: false});

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
                selectionWidth: 2,
                selfReferenceSize: 20,
                smooth: {
                    enabled: true,
                    type: "curvedCW",
                    roundness: 0.5
                }
            },

            // groups options and styles (like classes)
            groups: {
                supporting: {color: {background: 'white', border: '#2100c4'}},
                disproving: {color: {background: 'white', border: '#fe2300'}},
                answer: {color: {background: '#f6f6f6', border: '#9e9e9e'}},
                question: {color: {background: '#f6f6f6', border: '#9e9e9e'}}
            },

            // mouse and touch events
            interaction: {
                dragNodes: true,
                dragView: true,
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
                    size: 18, // px
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
                        max: 18,
                        maxVisible: 18,
                        drawThreshold: 8
                    }
                },
                shape: 'box',
                shapeProperties: {
                    borderRadius: 6
                },
                chosen: false
            },

            // movement of nodes and edges
            physics: {
                enabled: true,
                hierarchicalRepulsion: {
                    centralGravity: 0,
                    springLength: 500,
                    springConstant: 0.05,
                    nodeDistance: 250,
                    damping: 0.09
                }
            }
        };

        // initialize network
        network = new vis.Network(container, data, options);
        network.setOptions(options);

        network.on('doubleClick', function (event) {
            var clickedNode = event.nodes;
            getData(clickedNode);
        });

        network.on('click', function (event) {
            var selectedNode = event.nodes;
            var nodeData = nodes.get(selectedNode)[0];
            var text = nodes.get(selectedNode)[0].fullText;
            var childNode = nodeData.children;
            var supporting = 0;
            var disproving = 0;
            getChildNum(text, childNode, supporting, disproving);
        })
    }

    function getChildNum(text, childNode, supporting, disproving){
        for (var i in childNode){
            var oneNode = childNode[i];
            var oneNodeData = info[oneNode];
            if (oneNodeData.group == 'supporting'){
                supporting = supporting + 1
            }
            else if (oneNodeData.group == 'disproving'){
                disproving = disproving + 1
            }
            else if (oneNodeData.group == null){
                return null
            }
        }
        getText(text, childNode, supporting, disproving);
    }

    function getText(text, childNode, supporting, disproving){
        if (childNode != null) {
            if (text != null) {
                $(".supporting").html(supporting);
                $(".disproving").html(disproving);
                $(".full-text").html(text)
            }
            else {
                $(".full-text").html('');
                $(".supporting").html(supporting);
                $(".disproving").html(disproving);
            }
        }
        else {
            if (text != null) {
                $(".supporting").html("0");
                $(".disproving").html("0");
                $(".full-text").html(text);
            }
            else {
                $(".full-text").html('');
                $(".supporting").html("0");
                $(".disproving").html("0");
            }
        }
    }


});