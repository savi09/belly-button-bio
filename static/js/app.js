
function init() {

    // Fetch the JSON data and console log it
    const belly_button = "./samples.json"

    d3.json(belly_button).then(function(belly_but_data) {
        console.log(belly_but_data);
        
        // Creating variable for the data
        let data = belly_but_data

        ///////////////////////////////////////////


        ///////////// Drop Down Menu /////////////

        let dataNames = data.names;
        var dropDownMenu = d3.select("#selDataset");
  
        dataNames.forEach(function (name) {
            dropDownMenu.append("option").text(name).property("value", name);
        });


        // Selection from Drop Down Menu - Not completed to take in value
        let selectedID = "940";

        //////////// Demographic Info /////////////

        document.getElementById("sample-metadata").text = demoID;

        var item1 = data.metadata
        var demo = item1.filter((val) => val.id == selectedID)

        for (var key in demo) {
            if (demo.hasOwnProperty(key)) {
            var demoID = demo[key].id;
            var demoEthn = demo[key].ethnicity
            var demoGen = demo[key].gender
            var demoAge = demo[key].age
            var demoLoc = demo[key].location
            var demoBB = demo[key].bbtype
            var demoWfreq = demo[key].wfreq
            }
            };


        console.log("Test: ", demoID)

        ////////// Horizontal Bar Chart //////////


        // Creating variable for Samples Array
        var item = data.samples
            

        // Sort the data by sample values -  descending
        let sorted= item.sort((a, b) => b.sample_values - a.sample_values);

        // datapull(selectedID);

        // function datapull(selectedID)   {
        //     var subject = sorted.filter((val) => val.id == selectedID);
        // };

        // Filtering Sorted data to keep id equal to drop down selection
        var subject = sorted.filter((val) => val.id == selectedID);

        // Slice the first 10 objects for plotting
        for (var key in subject) {
            if (subject.hasOwnProperty(key)) {
            var samp = subject[key].sample_values.slice(0,10);
            var ids = subject[key].otu_ids.slice(0,10);
            var labels = subject[key].otu_labels.slice(0,10);
            }
            };


        // Reverse the array to accommodate Plotly's defaults
        var reversedSamp = samp.reverse();
        var reversedIds = ids.reverse();
        reversedIds = reversedIds.map(i => 'OTU ' + i);
        var reversedLabels = labels.reverse();

            

        // Logging to console to check values
        // console.log("Sorted: ", sorted);
        console.log("Subject: ", subject);
        // console.log("Sliced Data: ", samp, ids, labels);
        // console.log("Reversed Data: ", reversedSamp, reversedIds, reversedLabels);

        // Trace1 for the Sample Data
        let trace1 = {
            x: reversedSamp,
            y: reversedIds,
            text: reversedLabels,
            type: "bar",
            orientation: "h"
                    };
            
        // Setting variable to plot
        let traceData = [trace1];
            
            
        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", traceData);

        // console.log("sample_values: ", item.otu_ids);
        // console.log("otu_ids: ", item.sample_values);
        // console.log("otu_labels: ", item.otu_labels);

        ////////// Bubble Chart //////////
        
        for (var key1 in subject) {
            if (subject.hasOwnProperty(key1)) {
            var samp2 = subject[key1].sample_values;
            var ids2 = subject[key1].otu_ids;
            var labels2 = subject[key1].otu_labels;
            }
            };


        // Reverse the array to accommodate Plotly's defaults
        var reversedSamp2 = samp2.reverse();
        var reversedIds2 = ids2.reverse();
        var reversedLabels2 = labels2.reverse();


        var trace2 = {
            x: reversedIds2,
            y: reversedSamp2,
            text: reversedLabels2,
            mode: 'markers',
            marker: {
              color: reversedIds2,
              size: reversedSamp2
            }
          };
          
          let traceData2 = [trace2];
          
        var layout ={
            xaxis: {
                title: 'OTU ID'}
        };
          
          Plotly.newPlot('bubble', traceData2, layout);
  });
  
}

init();


