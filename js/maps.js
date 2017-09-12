// create an array with nodes
var nodes = new vis.DataSet([
    {id: 'parent', label: 'General Principals...', group: 'answer'},
    {id: 'selected', label: 'Etzioni (NB- Member of ...', group: 'selected'},
    {id: 'child1', label: 'If so then we should also have...', group: 'supporting'},
    {id: 'child2', label: 'That should also include ...', group: 'supporting'},
    {id: 'child3', label: 'Disagree. If we take the ..', group: 'disproving'}
]);


// create an array with edges
var edges = new vis.DataSet([
    {id: 1, from: 'parent', to: 'selected', smooth: false},
    {id: 2, from: 'selected', to: 'child1'},
    {id: 3, from: 'selected', to: 'child2'},
    {id: 4, from: 'selected', to: 'child3'}
]);


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
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true
    }
};


// initialize network
var network = new vis.Network(container, data, options);

network.setOptions(options);



// prep screen on load
$( document ).ready(function() {

    // heading text to page question
    var question = "General Principals: Can we ensure that AI is transparent?";
    $(".question").html(question);
});

