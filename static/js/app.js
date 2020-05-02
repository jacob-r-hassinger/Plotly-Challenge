d3.json("data/samples.json").then((data) => {
    var dataFile = data;
    
    var ids = data.names;
    
    //bar chart
    
    // citation: http://bl.ocks.org/jfreels/6734823 which was the skeleton I used to add the selection box. It infomred the syntax to add the options into the selection, append the values and text

var select = d3.select('select').on("change", idFilter)

var options = select
  .selectAll('option')
	.data(ids).enter()
	.append('option')
		.text(function (d) { return d; });
        
//now its time to build a function that detects a change to the selection box, selects the value of the box, and filters the dataset based on the value

function idFilter() {
    var idSelection = d3.select('select').property('value');
    var metaData = dataFile.metadata;
    for (i=0; i < metaData.length; i++) {
        if (metaData[i]["id"] === Number(idSelection)) {
            
            var filteredMetadata = metaData[i];
            var filterindex = i;
        };
    };
    
    var metainsert = d3.select('#sample-metadata')
    .html("")
    .append('ul')
    .append("li")
    .text("id: " + filteredMetadata["id"])
    .append("li")
    .text("age: " + filteredMetadata["age"])
    .append("li")
    .text("ethnicity: " + filteredMetadata["ethnicity"])
    .append("li")
    .text("gender: " + filteredMetadata["gender"])
    .append("li")
    .text("location: " + filteredMetadata["location"])
    .append("li")
    .text("wfreq: " + filteredMetadata["wfreq"]);

    otuIdlist = []
    otunumberslist = data.samples[filterindex].otu_ids.slice(0,9)
    for (i=0; i < otunumberslist.length; i++) {
            otuIdlist.push("OTU " + otunumberslist[i]);
    };
    var barTrace = {
        x: data.samples[filterindex].sample_values.slice(0,9),
        y: otuIdlist,
        type: "bar",
        orientation: "h"
    };

    var barData = [barTrace];

    var barLayout = {
        height: 400,
        width: 400,
        title: "10 of Subject's Belly Button Bacteria"
    };

    Plotly.newPlot("bar", barData, barLayout);


    //bubble chart
    var bubbleTrace = {
        y: data.samples[filterindex].sample_values,
        x: data.samples[filterindex].otu_ids,
        mode: 'markers',
        marker: {
            size: data.samples[filterindex].sample_values
        }
    };
  
    var bubbleData = [bubbleTrace];
  
    var bubbleLayout = {
        xaxis: {title: "OTU ID"},
        showlegend: true,
        height: 600,
        width: 1200
    };
  
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);



    //dial chart
    // find wash frequency for individual
    
    var washFreq = dataFile["metadata"][filterindex]["wfreq"];
    if (washFreq === null) {
        washFreq = 0
    };
    var dialdata = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: "Weekly Belly Button Scrub Frequency",
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: { range: [0, 9]},
                steps: [
                    {range: [0,1], color: "gray"},
                    {range: [2,3], color: "lightblue"},
                    {range: [4,5], color: "gray"},
                    {range: [6,7], color: "lightblue"},
                    {range: [8,9], color: "gray"}
                ]
        }   
        }
    ];
    
    var dialLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', dialdata, dialLayout);

};

idFilter()


   

    

    


    //plotly new plot do this here

    // console.log(data.metadata[0]);
    // var metaData = data.metadata[0];
    // console.log(metaData);
    // console.log(metaData.id);
    // d3.select("panel-body")
    //     .append("ul")
    //     .data(metaData)
    //     .html(function(i) {
    //         return `<li>${i.id}</li><li>${i.ethnicity}</li><li>${i.gender}</li><li>${i.age}</li><li>${i.location}</li>`;
    //     });

    // var sampleList = data.samples;
    // console.log(sampleList)
    // var otuLabels = data.samples.otu_labels;
    // var otuIds = data.samples.otu_ids;
});


//start the page 



//bar chart



//bubble chart



//dial chart

