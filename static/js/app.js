
function init() {

    // Fetch the JSON data and console log it
    const belly_button = "./samples.json"

    d3.json(belly_button).then(function(belly_but_data) {
        console.log(belly_but_data);
        
        // Creating variable for the data
        let data = belly_but_data

        ///////////////////////////////////////////


        // Drop Down Menu
        let dataNames = data.names;
        var dropDownMenu = d3.select("#selDataset");
    
        dataNames.forEach(function (name) {
            dropDownMenu.append("option").text(name).property("value", name);
        });
    
        // Selection from Drop Down Menu - Not completed to take in value
        let selectedID = "940";

        // Creating variable for Samples Array
        var item = data.samples
        
        // Sort the data by sample values -  descending
        let sorted= item.sort((a, b) => b.sample_values - a.sample_values);

        // Filtering Sorted data to keep id equal to drop down selection
        let subject = sorted.filter((val) => val.id == selectedID);

        // Slice the first 10 objects for plotting
        let slicedData = sorted.slice(0, 10);


        // Reverse the array to accommodate Plotly's defaults
        let reversedData = slicedData.reverse();

        // Logging to console to check values
        console.log("Sorted: ", sorted);
        console.log("Subject: ", subject);
        console.log("Sliced Data: ", slicedData);
        console.log("Reversed Data: ", reversedData);

        // Trace1 for the Sample Data
        let trace1 = {
            x: reversedData.map(object => object.sample_values),
            y: reversedData.map(object => object.otu_ids),
            text: reversedData.map(object => object.otu_labels),
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
  });
  
}

init();

// // Fetch the JSON data and console log it
// let data = d3.json(belly_button).then(function(data) {
//     console.log(data);

//     var metadata = data.metadata;
//     var names = data.names;
//     var samples = data.samples;   

//       function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }
//   var data1 = [{
//     type: 'bar',
//     x: samples.sample_values,
//     y: samples.otu_ids,
//     orientation: 'h'}];

// Plotly.newPlot('bar', data1);

// console.log("Samples: ", data.samples);
// console.log("Names: ", data.names);
// console.log("Metadata: ", data.metadata);

//   });

