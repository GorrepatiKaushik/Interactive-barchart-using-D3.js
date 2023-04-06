var h = 500, w = 800; //height and width of the svg 

//data which is being displayed as series of bars
var dataset = [{"no": 1, "name" : "Robert", "weight" : 100},
        {"no": 2, "name" : "Albert", "weight" : 200},
        {"no": 3, "name" : "Mike", "weight" : 180},
        {"no": 4, "name" : "Kathy", "weight" : 300},
        {"no": 5, "name" : "Richard", "weight" : 215},
        {"no": 6, "name" : "Marie", "weight" : 150},
        {"no": 7, "name" : "Glory", "weight" : 170},
        {"no": 8, "name" : "Karl", "weight" : 350},
        {"no": 9, "name" : "Brian", "weight" : 159},
        {"no": 10, "name" : "Steve", "weight" : 140}];

//variable to hold the names of members 
var memberNames = dataset.map(function(d){
            return d.name;
        })

//To create a scale for horizontal axis
var bandScale = d3.scaleBand()
                  .domain(memberNames)
                  .range([100,700])
                  .padding(0.08);
        
//To create a scale for vertical axis                
var heightScale = d3.scaleLinear()
                    .domain([0,350])
                    .range([50, 450]);

var svg = d3.select("#vis")
            .append("svg");

//To set a svg element on the page
svg.attr("width", w)
    .attr("height", h);

//To add rectangles into the svg, with static width and a height that varies with weight variable
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i){
            return bandScale(d.name) + i;
           })
    .attr("y", function(d){
               return h - heightScale(d.weight);
           })
    .attr("width", function(d){
                return bandScale.bandwidth();
           })
    .attr("height", function(d){
               return heightScale(d.weight);
           })
    .attr("fill", "#A9A9A9")
    .append("title")
    .text( function(d){
               return d.name;
           });
           

//To add functionality of ascending sort on to the shortest bar
svg.selectAll("rect")
    .filter(function(d){
                  return d.weight == 100;
              })
    .attr("fill", "#7FFFD4")
    .on("dblclick", myAscendSort)
    .on("mouseover", function(d) {
        d3.select(this).attr("r", 10).style("fill", "#65CCA9");
      })                  
      .on("mouseout", function(d) {
        d3.select(this).attr("r", 5.5).style("fill", "#7FFFD4");
      });


//To add functionality of descending sort on to the longest bar
svg.selectAll("rect")
    .filter(function(d){
                  return d.name == "Karl";
              })
    .attr("fill", "#F08080")
    .on("dblclick", myDescendSort)
    .on("mouseover", function(d) {
        d3.select(this).attr("r", 10).style("fill", "#C06666");
      })                  
      .on("mouseout", function(d) {
        d3.select(this).attr("r", 5.5).style("fill", "#F08080");
      });


//To add functionality of resetting to orginal order when clicking on any other bar(grey bars)
svg.selectAll("rect")
    .filter(function(d){
                return (d.name != "Karl" && d.weight != 100);
              
              })
    .attr("fill", "#A9A9A9")
    .on("dblclick", originalSort)
    .on("mouseover", function(d) {
        d3.select(this).attr("r", 10).style("fill", "#878787");
      })                  
      .on("mouseout", function(d) {
        d3.select(this).attr("r", 5.5).style("fill", "#A9A9A9");
      });

            
//function to sort bars in ascending order 
function myAscendSort(){

var sortComparer;
sortComparer = function(a,b){
                return a.weight - b.weight;
            }

dataset.sort(sortComparer);

ascendOrder = dataset.map(function(d){
                return d.name;
            })

bandScale.domain(ascendOrder);

svg.transition()
    .selectAll("rect")
    .attr("x", function(d){
                   return bandScale(d.name);
               })
    .delay(function(d,i){
                   return i * 100;
               });
}


//function to sort bars in descending order 
function myDescendSort(){
            
var sortComparer;
sortComparer = function(a,b){
                return b.weight - a.weight;
            }

dataset.sort(sortComparer);

descendOrder = dataset.map(function(d){
                return d.name;
            })

bandScale.domain(descendOrder);

svg.transition()
    .selectAll("rect")
    .attr("x", function(d){
                   return bandScale(d.name);
               })
    .delay(function(d,i){
                   return i * 100;
               });
}


//function to reset the bars in original order
function originalSort(){
            
var sortComparer;
sortComparer = function(a,b){
                return a.no - b.no;
            }

dataset.sort(sortComparer);

originalOrder = dataset.map(function(d){
                return d.name;
            })

bandScale.domain(originalOrder);

svg.transition()
    .selectAll("rect")
    .attr("x", function(d){
                   return bandScale(d.name);
               })
    .delay(function(d,i){
                   return i * 100;
               });
}