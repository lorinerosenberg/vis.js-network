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
    var supporting;
    var disproving;
    var nodeDataShortText;
    var currentNodeDataID
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
            parent: selectedNode.parent,
            id: 'selected',
            label: selectedNode.shortText,
            fullText: selectedNode.fullText,
            group: selectedNode.group,
            mass: 1
        };
        supporting = {
            id: 'supporting',
            group: 'supportingNode'
        };
        disproving = {
            id: 'disproving',
            group: 'disprovingNode'
        };

        // formatting and pushing childNode data into an array

            for (var i in childrenNodes) {
                var childNode = childrenNodes[i];
                var childID = selectedID;
                var edgeID = selectedID;
                var nodeGroup = info[childNode].group;

                window['child' + childID + i] = {
                    parent: info[childNode].parent,
                    id: childID + i,
                    label: info[childNode].shortText,
                    fullText: info[childNode].fullText,
                    group: nodeGroup,
                    children: info[childNode].children,
                };
                nodeData.push(window['child' + childID + i]);
                // TODO nodes only when it has children
                if (nodeGroup == 'supporting'){
                    window['edge' + edgeID + i] = {
                        id: edgeID + i,
                        from: 'supporting',
                        to: childID + i
                    };
                    edgeData.push(window['edge' + edgeID + i]);
                }
                else if (nodeGroup == 'disproving'){
                    window['edge' + edgeID + i] = {
                        id: edgeID + i,
                        from: 'disproving',
                        to: childID + i
                    };
                    edgeData.push(window['edge' + edgeID + i]);
                }
            }
        }
        else {
            return null;
        }

        nodeData.push(parent, selected, supporting, disproving);
        edgeData.push({from: parentNode, to: 'selected', physics: true, smooth: false, dashes: [10,10,10]},
            {from: 'selected', to: 'supporting', physics: false, smooth: false, arrows: {to: {enabled: false}}},
            {from: 'selected', to: 'disproving', physics: false, smooth: false, arrows: {to: {enabled: false}}});

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
                    to: {enabled: true, scaleFactor: 1, type: 'arrow'}
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
                    type: "dynamic"
                },
                width: 2
            },

            // groups options and styles (like classes)
            groups: {
                supporting: {color: {background: 'white', border: '#2100c4'}},
                disproving: {color: {background: 'white', border: '#fe2300'}},
                supportingNode: {color: {background: '#2100c4', border: '#2100c4'}, shape: 'dot'},
                disprovingNode: {color: {background: '#fe2300', border: '#fe2300'}, shape: 'dot'},
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
                    blockShifting: false,
                    edgeMinimization: false,
                    levelSeparation: 230,
                    nodeSpacing: 100,
                    sortMethod: "directed",
                    direction: 'UD'
                }
            },

            // nodes options and styles
            nodes: {
                font: {
                    color: '#343434',
                    size: 23, // px
                    face: 'arial',
                    multi: true,
                    bold: {
                        color: 'blue',
                        size: 30, // px
                        face: 'arial',
                        vadjust: 0,
                        mod: 'bold'
                    },
                    mono: {
                        color: 'red',
                        size: 30, // px
                        face: 'arial',
                        vadjust: 0,
                        mod: 'bold'
                    }
                },
                heightConstraint: {
                    minimum: 30,
                    valign: 'middle'
                },
                margin: 20,
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
                    springLength: 300,
                    springConstant: 0.001,
                    nodeDistance: 150,
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
        if (nodeSelected.group == 'supporting'){
            network.body.nodes[nodeSelected.id].setOptions({
                font: {
                    size: 28
                },
                color: {
                    background: '#a2adf2'
                }
            });
        }
        else if (nodeSelected.group == 'disproving'){
            network.body.nodes[nodeSelected.id].setOptions({
                font: {
                    size: 28
                },
                color: {
                    background: '#f9aca6'
                }
            });
        }


        // change data to selected
        network.on('doubleClick', function (event) {
            var clickedNode = event.nodes;
            var nodeData = nodes.get(clickedNode)[0];
            if (clickedNode.length != 0 && clickedNode != 'selected') {
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

        // full text on select
        network.on("selectNode", function (event) {
            var selectedNode = event.nodes;
            var nodeData = nodes.get(selectedNode)[0];
            currentNodeDataID = nodeData.id;
            if (nodeData){
                var text = nodeData.fullText;
                var childNode = nodeData.children;
            }
            var supporting = 0;
            var disproving = 0;
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
            nodeDataShortText = nodeData.label;


            if (currentNodeDataID == 'supporting' || currentNodeDataID == 'disproving'){
                return null
            }
            else if (currentNodeDataID != 'selected' && currentNodeDataID != parentNode){
                var nodeDataText = '<b>'+supporting +'    </b>'+'    <code>'+ disproving + '</code>'+'\n' + text;
                nodeDataText = nodeDataText.replace(/(\S(.{0,65}\S)?)\s+/g, '$1\n');
                nodes.update({id: currentNodeDataID, label: nodeDataText, shortText: nodeDataShortText, font: {size: 30} });
            }
            else{
                var nodeDataText = text;
                nodeDataText = nodeDataText.replace(/(\S(.{0,65}\S)?)\s+/g, '$1\n');
                nodes.update({id: currentNodeDataID, label: nodeDataText, shortText: nodeDataShortText, font: {size: 30} });
            }


        });

        network.on("deselectNode", function () {
            nodes.update({id: currentNodeDataID, label: nodeDataShortText, font: {size: 25} });
        });

        // cursor when mouse hovers on node
        network.on("hoverNode", function () {
            network.canvas.body.container.style.cursor = 'pointer'
        });

        network.on("blurNode", function () {
            network.canvas.body.container.style.cursor = 'default'
        });

    }


    // add node to navigation bar
    // TODO clear cache
    function addNodeMap(nodeData){
        // nodeData recieves data of selected node
        if(nodeData.children != null) {
            var nodeDataID = nodeData.id;
            nodeMapArray.push(nodeDataID.toString());
            var nodeDataGroup = nodeData.group;

            var nodeDiv = $("<div/>").addClass('node-map').addClass('col-md-2').attr('id', nodeDataID);
            $(".navigation-menu").append(nodeDiv);


            if(nodeDataGroup == "supporting"){
                $("#" + nodeDataID).addClass("node-map-supporting").html(nodeData.shortText);
            }
            else if(nodeDataGroup == "disproving"){
                $("#" + nodeDataID).addClass("node-map-disproving").html(nodeData.shortText);
            }
        }

        // navigation bar - navigate to clicked node
        $("#" + nodeDataID).on('click',function(event) {
            if (selectedNode.id != event.target.id) {
                getData(event.target.id);
                console.log(nodeData);
            }
        });
    }


});