
// Display the default plot
function init() {
    // Fetch the JSON data and console log it
    const belly_button = "./samples.json"

    d3.json(belly_button).then(function(belly_but_data) {
        console.log(belly_but_data);
        
        // Creating variable for the data
        let data = belly_but_data

        ///////////////////////////////////////////

        // Selection from Drop Down Menu - Not completed to take in value
        let selectedID = "940";

        ////////// Horizontal Bar Chart //////////


        // Creating variable for Samples Array
        var item = data.samples
            

        // Sort the data by sample values -  descending
        let sorted= item.sort((a, b) => b.sample_values - a.sample_values);


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
        // console.log("Subject: ", subject);
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
    
  });
  }
  
  // On change to the DOM, call getData()
  d3.selectAll("#selDataset").on("change", getData);
  
  // Function called by DOM changes
  function getData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    var selectedID = dataset

    // Call function to update the chart
    return selectedID;
  }
  
  // Update the restyled plot's values
  function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
  }
  
  init();