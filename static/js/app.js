d3.json("data/samples.json").then((data) => {
    var dataFile = data;
    console.log(dataFile)
    var ids = data.names;
    console.log(ids)
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
    console.log(typeof idSelection);
    var metaData = dataFile.metadata;
    console.log(typeof metaData[0]["id"]);
    for (i=0; i < metaData.length; i++) {
        if (metaData[i]["id"] === Number(idSelection)) {
            console.log(metaData[i]["id"]);
            var filteredMetadata = metaData[i];
        };
    };
    console.log(filteredMetadata);
    var metatable = d3.select("panel-body").selectAll("p").data(filteredMetadata).enter().append("p").text(function (a) { return a; })
    };

idFilter()


    var barTrace = {
        x: data.samples[0].sample_values,
        y: data.samples[0].otu_ids,
        type: "bar",
        orientation: "h"
    };

    var barData = [barTrace];

    var barLayout = {
        height: 400,
        width: 400
    };

    Plotly.newPlot("bar", barData, barLayout);

    //bubble chart
    var bubbleTrace = {
        y: data.samples[0].sample_values,
        x: data.samples[0].otu_ids,
        mode: 'markers',
        marker: {
            size: data.samples[0].sample_values
        }
    };
  
    var bubbleData = [bubbleTrace];
  
    var bubbleLayout = {
        title: "OTU ID",
        showlegend: true,
        height: 600,
        width: 1200
    };
  
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    //dial chart
    // find avg wash frequency for dataset
    var washList = []
    for (i = 0; i < dataFile["metadata"].length; i++) {
        if (dataFile["metadata"][i]["wfreq"] != null) {
            washList.push(dataFile["metadata"][i]["wfreq"]);
        };   
    };
    console.log(washList);

    var sumWashFreq =  0
    
    for (i=0; i < washList.length; i++) {
        sumWashFreq += washList[i];
    };

    var avgWashFreq = sumWashFreq/washList.length;

    console.log(avgWashFreq);

    var dialdata = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: avgWashFreq,
            title: "Average Belly Button Scrub Frequency",
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


    //plotly new plot do this here

    console.log(data.metadata[0]);
    var metaData = data.metadata[0];
    console.log(metaData);
    console.log(metaData.id);
    d3.select("panel-body")
        .append("ul")
        .data(metaData)
        .html(function(i) {
            return `<li>${i.id}</li><li>${i.ethnicity}</li><li>${i.gender}</li><li>${i.age}</li><li>${i.location}</li>`;
        });

    var sampleList = data.samples;
    console.log(sampleList)
    var otuLabels = data.samples.otu_labels;
    var otuIds = data.samples.otu_ids;
});


//start the page 



//bar chart



//bubble chart



//dial chart

