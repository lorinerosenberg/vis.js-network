// global variables for node labels

var parent = {label: 'General Principals...', fullText: "General Principals: Can we ensure that AI is transparent?", group: 'answer'};
var selected = {label: 'Etzioni (NB- Member of ...', fullText: "Etzioni (NB- Member of IEEE committee, LinkedIn )- yes - an A.I. system must clearly disclose that it is not human. As we have seen in the case of bots — computer programs that can engage in increasingly sophisticated dialogue with real people — society needs assurances that A.I. systems are clearly labeled as such. In 2016, a bot known as Jill Watson, which served as a teaching assistant for an online course at Georgia Tech, fooled students into thinking it was human. A more serious example is the widespread use of pro-Trump political bots on social media in the days leading up to the 2016 elections, according to researchers at Oxford.", group:'supporting'};
var child1 = {label:'If so then we should also have...', fullText: "If so then we should also have statutory labels whenever there is photoshop or comedic dubbing", group: 'supporting' };
var child2 = {label: 'That should also include ...', fullText: "That should also include automated transcripts from voice recognition on videos", group: 'supporting'};
var child3 = {label: 'Disagree. If we take the ..', fullText: "Disagree. If we take the example of photoshop, the regulation varies from country to country. Australia for example does not regulate whereas UK and Israel does. Even if Etzioni is right for bots, it does not mean we need to change the law for photoshop", group: 'disproving'}


// create an array with nodes
var nodes = new vis.DataSet([
    {id: 'parent', label: parent.label, group: parent.group, fullText: parent.fullText},
    {id: 'selected', label: selected.label, group: 'selected', fullText: selected.fullText},
    {id: 'child1', label: child1.label , group: child1.group, fullText: child1.fullText },
    {id: 'child2', label: child2.label, group: child2.group, fullText: child2.fullText },
    {id: 'child3', label: child3.label, group: child3.group, fullText: child3.fullText }
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
        }
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

    // show full text of selected node
    // TODO: change from alert box to dialog box
    function showText(node){
        var text = nodes.get(node)[0].fullText;
        alert(text);
    }

    // change central node to selected node
    // TODO: need to switch all data around according
    // TODO: parent node changes to old selected
    // TODO: child node numbers dependant
    function selectNode(node){
        var label = nodes.get(node)[0].label;
        var group = nodes.get(node)[0].group;
        nodes.update({id: 'selected', label: label, group: group });
    }

    network.on('click', function(event){
        var node = event.nodes;
        showText(node);
    });
    network.on('doubleClick', function(event){
        var node = event.nodes;
        selectNode(node);
    })


});

