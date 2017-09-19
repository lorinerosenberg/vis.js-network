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
    var questionNode = info[1].shortText;
    var nodeMapArray = [];

    // heading text to page question
    $(".question").html(questionNode);
    // initialize selected data on load
    getData(100);
    addNodeMap(info[100]);

    // mindmap functionality
    function getData(selectedID) {

        selectedNode = info[selectedID];
        parentNode = selectedNode.parent; //returns an id [100]
        childrenNodes = selectedNode.children; // returns one value or array [1010, 1011]
        nodeData = [];
        edgeData = [];

        if (childrenNodes != null && parentNode != null) {
        // node data
        parent = {
            parent: info[parentNode].parent,
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

            for (var i in childrenNodes) {
                var childNode = childrenNodes[i];
                var childID = selectedID;
                var edgeID = selectedID;

                window['child' + childID + i] = {
                    parent: info[childNode].parent,
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
                selectionWidth: 3,
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
                hover: true,
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
                    size: 23, // px
                    face: 'arial'
                },
                heightConstraint: {
                    minimum: 70,
                    valign: 'middle'
                },
                mass: 1,
                physics: true,
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
                    centralGravity: 0.0,
                    springLength: 500,
                    springConstant: 0.007,
                    nodeDistance: 425,
                    damping: 0.09
                },
                solver: 'hierarchicalRepulsion'
            }
        };

        // initialize network
        network = new vis.Network(container, data, options);
        network.setOptions(options);

        // how to set options to individual node
        var nodeSelected = nodes.get('selected');
        network.body.nodes[nodeSelected.id].setOptions({
            font: {
                size: 25
            }
        });

        // change data to selected
        network.on('doubleClick', function (event) {
            var clickedNode = event.nodes;
            var nodeData = nodes.get(clickedNode)[0];
            if (clickedNode.length != 0) {
                if (nodeData.parent != null) {
                    getData(clickedNode);
                }

                var nodeDataIdString = (nodeData.id).toString();

                // only add node to map if it doesn't already exist
                if (nodeMapArray.includes(nodeDataIdString)) {
                    return null
                }
                else {
                    addNodeMap(nodeData);
                }
            }
        });

        // add node to map and get full text
        network.on('click', function (event) {
            var selectedNode = event.nodes;
            var nodeData = nodes.get(selectedNode)[0];

            if (nodeData){
                var text = nodes.get(selectedNode)[0].fullText;
                var childNode = nodeData.children;
            }
            var supporting = 0;
            var disproving = 0;
            getChildNum(text, childNode, supporting, disproving);

            // TODO collapsible nodes with full text
            // var nodeDataID = nodeData.id;
            // var nodeDataText = nodeData.fullText;
            // console.log(nodeDataID);
            // console.log(nodeDataText);
            // nodes.update({id: nodeDataID, label: nodeDataText});
        });

        // cursor when mouse hovers on node
        network.on("hoverNode", function (params) {
            network.canvas.body.container.style.cursor = 'pointer'
        });

        network.on("blurNode", function (params) {
            network.canvas.body.container.style.cursor = 'default'
        });

    }

    // adding counter to children (if supporting or disproving)
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

    // changing html text
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
        else if (childNode == null) {
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

    // add node to navigation bar
    function addNodeMap(nodeData){
        // nodeData recieves data of selected node
        if(nodeData.children != null) {
            var nodeDataID = nodeData.id;
            nodeMapArray.push(nodeDataID.toString());
            var nodeDataGroup = nodeData.group;
            var nodeDiv = $("<div/>").addClass('node-map').addClass('col-md-2').attr('id', nodeDataID);
            $(".navigation-menu").append(nodeDiv);
            if(nodeDataGroup == "supporting"){
                $("#" + nodeDataID).addClass("node-map-supporting").html("Supporting");
            }
            else if(nodeDataGroup == "disproving"){
                $("#" + nodeDataID).addClass("node-map-disproving").html("Disproving");
            }
        }

        // navigation bar - navigate to clicked node
        $("#" + nodeDataID).on('click',function(event) {
            if (selectedNode.id != event.target.id) {
                getData(event.target.id);
            }
        });
    }


});