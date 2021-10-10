
function init() {

    // Fetch the JSON data and console log it
    const belly_button = "./samples.json"

    d3.json(belly_button).then(function(belly_but_data) {
        console.log(belly_but_data);
        
        // Creating variable for the data
        var data = belly_but_data

        ///////////////////////////////////////////


        ///////////// Drop Down Menu /////////////


  
        // Initial selection for Drop Down Menu - Not compvared to take in value
        var selectedID = "940";

        var dataNames = data.names;
        var dropdownMenu = d3.select("#selDataset").on("change", optionChanged);

        // console.log("Test: ", dataNames[3])

        dataNames.forEach(function(obj) {
            dropdownMenu.append("option").text(obj).property("value", obj); });

        // Function called by DOM changes
        function optionChanged() {
            dropdownMenu = d3.select("selDataset");
            // Assign the value of the dropdown menu option to a variable
            var dataset = dropdownMenu.property("value");

            // selectedID = dataset
            // let dataNames = data.names;

            // function optionChanged(dataset) {
            //    selectedID = dataset 
            // };

            document.getElementById("selDataset").onChange = function(){
                var value = document.getElementById("selDataset").value;
                selectedID = value
             };
            
            selectedID = dataset;

            console.log("Test: ", selectedID)
            // for (var key3 in dataNames) {
            //     if (dataNames.hasOwnProperty(key3)) {
            //         test = dataset
            //     }
            //     };

            // for (let j = 0; j < students.length; j++) {
            //     console.log(students[j]);
            //       }


            // return selectedID
        };

        
            

        //////////// Demographic Info /////////////

        var item1 = data.metadata
        var demo = item1.filter((val) => val.id == selectedID)

        for (var key2 in demo) {
            if (demo.hasOwnProperty(key2)) {
            var demoID = demo[key2].id;
            var demoEthn = demo[key2].ethnicity
            var demoGen = demo[key2].gender
            var demoAge = demo[key2].age
            var demoLoc = demo[key2].location
            var demoBB = demo[key2].bbtype
            var demoWfreq = demo[key2].wfreq
            }
            };

        // Removing all data in metadata box before printing new data
        d3.select("#sample-metadata").selectAll("div").remove();

        // // Cereating a list of object in the User MetaData
        // var m_keys = Object.entries(demo[1]);

        // console.log("Test: ", m_keys)

        // Selecting MetaData HTML for data input
        d3.select("#sample-metadata");

        
        document.getElementById("sample-metadata").innerHTML = [
        `<table>
        <tbody>
        <tr> <td> id: ${demoID} </td> </tr>, 
        <tr> <td> ethnicity: ${demoEthn} </td> </tr>, 
        <tr> <td> gender: ${demoGen} </td> </tr>, 
        <tr> <td> age: ${demoAge} </td> </tr>, 
        <tr> <td> location: ${demoLoc} </td> </tr>, 
        <tr> <td> bbtype: ${demoBB} </td> </tr>, 
        <tr> <td> wfreq: ${demoWfreq} </td> </tr>
        </tbody>
        </table>`]

        // var table = d3.select('table')
        // table.attr("sample-metadata", "table table-striped");
        // var tbody = d3.select("tbody");
        // var row = tbody.append('tr')
        // row.append('td').text(`id: ${demoID}`)
        // var row2 = tbody.append('tr')
        // row2.append('td').text(`ethnicity: ${demoEthn}`)
        // var row3 = tbody.append('tr')
        // row3.append('td').text(`gender: ${demoGen}`)
        // var row4 = tbody.append('tr')
        // row4.append('td').text(`age: ${demoAge}`)
        // var row5 = tbody.append('tr')
        // row5.append('td').text(`location: ${demoLoc}`)
        // var row6 = tbody.append('tr')
        // row6.append('td').text(`bbtype: ${demoBB}`)
        // var row7 = tbody.append('tr')
        // row7.append('td').text(`wfreq: ${demoWfreq}`)


        // // Creating loop to input data in Demographic Info
        // m_keys.forEach(function(key, value){
        //     console.log("Test: ", key, value)
        //     meta_data.append("div").text(`${key[1]}: ${value[1]}`)
        // });

        // console.log("Test: ", table)

        ////////// Horizontal Bar Chart //////////


        // Creating variable for Samples Array
        var item = data.samples
            

        // Sort the data by sample values -  descending
        var sorted= item.sort((a, b) => b.sample_values - a.sample_values);

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
        // console.log("Subject: ", subject);
        // console.log("Sliced Data: ", samp, ids, labels);
        // console.log("Reversed Data: ", reversedSamp, reversedIds, reversedLabels);

        // Trace1 for the Sample Data
        var trace1 = {
            x: reversedSamp,
            y: reversedIds,
            text: reversedLabels,
            type: "bar",
            orientation: "h"
                    };
            
        // Setting variable to plot
        var traceData = [trace1];
            
            
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
          
          var traceData2 = [trace2];
          
        var layout ={
            xaxis: {
                title: 'OTU ID'}
        };
          
          Plotly.newPlot('bubble', traceData2, layout);
  });
  
}

init();


