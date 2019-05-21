// Global Variables

var margin = {top: 0, right: 10, bottom: 20, left: 50};

var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    centered;

MAP_SELECTED = 0;

map_type = [1,2,3,4,5];
build_class = ['0'];
tax_class = ['1'];
dob_code = ['5'];

filters = []
filters.push("Current Filters:");
filters.push('<br/>');
filters.push('<br/>');
filters.push("BUILD_CLASS = 0");
filters.push('<br/>');
filters.push("TAX_CLASS = 1");
filters.push('<br/>');
filters.push("DOB_CLASS = 5");
filters.push('<br/>');
filters.push('<br/>');
filters.push("New Filters:");
filters.push('<br/>');
filters.push('<br/>');
document.getElementById("filters").innerHTML = filters;

var inputValue = null;
var year = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

var server = "http://127.0.0.1:5000/";
var filter_dict = {"filter":[map_type, build_class, tax_class, dob_code]};

function openSlideMenu() {
	document.getElementById('menu').style.width = '250px';
	document.getElementById('content').style.marginLeft = '250px';
}

function closeSlideMenu() {
	document.getElementById('menu').style.width = '0px';
	document.getElementById('content').style.marginLeft = '0px';
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function filter_variables() {
	filter_dict["filter"] = [map_type, build_class, tax_class, dob_code];
}

function send_data() {
	var appdir = "plot";
	filter_variables();
	$.ajax({
		type: "POST",
  		url:server+appdir,
  		data: JSON.stringify(filter_dict),
  		dataType: 'json'
	}).done(function(data) {
		console.log(data);
	});
}

function dashboard_func() {
    console.log("My Dashboard");
}

function update(value) {
	document.getElementById("range").innerHTML=year[value];
    inputValue = year[value];
    d3.selectAll(".incident")
        .attr("fill", yearMatch);
}

function yearMatch(data, value) {
	var y = data.properties.Years;
	var i;
	var flag  = 0;
	var years = [];
	var comp = [];

	years.push(Object.keys(y));

	for(i=0; i<years.length; i++) {
        if(years[i] == inputValue) {
            try {
                lien = data.properties["Years"][inputValue]["Lien"];
            } catch {
                lien = 0;
                flag = 1;
            }
            var c = data.properties["Years"][inputValue]["Complaints"];
            for(j=0; j<c.length; j++) {
                comp.push(c[j].Code);
            }
        flag = 1;
        break;
        }
    }
	if(flag == 0) {
		this.parentElement.appendChild(this);
        return "#03000000";
	}
	if(compare_arr(comp, dob_code) && (tax_class.includes(data.properties['Tax Class'])) && (map_type.includes(data.properties['Borough']))) {
		this.parentElement.appendChild(this);
        return "#D81010";
	}
	this.parentElement.appendChild(this);
    return "#03000000";
}

function compare_arr(a1, a2) {
    var i;
    var j;
    for(i=0; i<a1.length; i++) {
        for(j=0; j<a2.length; j++) {
            if (a1[i] == a2[j]) {
                return true;
            }
        }
    }
    return false;
}

function initialYear(data,i) {
	var y = data.properties["Years"];
	var i;
	var flag  = 0;
	var years = [];
	var comp = [];
	inputValue = '2011';

	years.push(Object.keys(y));
    
	for(i=0; i<years.length; i++) {
        if(years[i] == 2011) {  
            flag = 1;          
            try {
                lien = data.properties["Years"][2011]["Lien"];
            } catch {
                lien = 0;
                flag = 1;
            }
            var c = data.properties["Years"][inputValue]["Complaints"];
            for(j=0; j<c.length; j++) {
                comp.push(c[j].Code);
            }
        flag = 1;
        break;
        }
    }
    if(flag == 1) {
        if(compare_arr(comp, dob_code) && (tax_class.includes(data.properties['Tax Class'])) && (map_type.includes(data.properties['Borough']))) {
            this.parentElement.appendChild(this);
            return "#D81010";
        } else {
            this.parentElement.appendChild(this);
            return "#03000000";
        }
    } else if(flag == 0) {
		this.parentElement.appendChild(this);
        return "#03000000";
	}
	this.parentElement.appendChild(this);
    return "#03000000";
}

function myDashboard() {
    
    d3.select('#graph').remove();
    d3.select('#graph1').remove();

    width = 800;
    height = 400;

    var svg1 = d3.select("#b1")
        .append("svg")
        .attr('id', 'graph')
            .attr("width", width)
            .attr("height", height);
    
    var g1 = svg1.append("g")
            .attr("transform", "translate(" + 0 + "," + 80 + ")");

    var albersProjection = d3.geoMercator()
        .scale( 42000 )
        .rotate( [74.0060, 0] )
        .center( [0, 40.7128] )
        .translate( [width/2, height/3.4] );

    var geoPath = d3.geoPath()
        .projection(albersProjection);

    g1.selectAll("path")
        .data(nyc.features)
        .enter()
        .append("path") 
        .attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
        .attr("d", geoPath);
    

    var lien1 = svg1.append("g");

    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
        lien1.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", initialYear)
            .attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 0 + "," + 80 + ")")
            .attr( "d", geoPath )
            .attr( "class", "incident")
            .on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

                // d3.select("#add").text("Address - " + d.properties["Address"])
                d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                // d3.select("#add").text("")
                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });

    // *************************************************************

    // width = 800;
    // height = 320;
    // var svg = d3.select("#b3")
    //     .append("svg")
    //     .attr('id', 'graph1')
    //         .attr("width", width)
    //         .attr("height", height);
    
    // var x = d3.scaleBand()
    //         .range([0, width])
    //         .padding(0.1);
    // var y = d3.scaleLinear()
    //           .range([height, 0]);

    // d3.csv("/static/data/sales.csv", function(error, data) {
    //   if (error) throw error;

    //   // format the data
    //   data.forEach(function(d) {
    //     d.sales = +d.sales;
    //   });

    //   // Scale the range of the data in the domains
    //   x.domain(data.map(function(d) { return d.salesperson; }));
    //   y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    //   // append the rectangles for the bar chart
    //   svg.selectAll(".bar")
    //       .data(data)
    //     .enter().append("rect")
    //       .attr("class", "bar")
    //       .attr("x", function(d) { return x(d.salesperson); })
    //       .attr("width", x.bandwidth())
    //       .attr("y", function(d) { return y(d.sales); })
    //       .attr("height", function(d) { return 300 - y(d.sales); });

    //   // add the x Axis
    //   svg.append("g")
    //       .attr("transform", "translate(0," + 300 + ")")
    //       .call(d3.axisBottom(x));

    //   // add the y Axis
    //   svg.append("g")
    //     // .attr("transform", "translate(" + 0 + "," + height + ")")
    //       .call(d3.axisLeft(y));

    // });

    // *************************************************************
    var parseTime = d3.timeParse("%d-%b-%y");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    // define the 2nd line
    var valueline2 = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.open); });

    var svg = d3.select("#b4")
        .append("svg")
        .attr('id', 'graph1')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    

    // Get the data
    d3.csv("/static/data/data2.csv", function(error, data) {
      if (error) throw error;
      console.log(data);
      // format the data
      data.forEach(function(d) {
          d.date = parseTime(d.date);
          d.close = +d.close;
          d.open = +d.open;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain([0, d3.max(data, function(d) {
          return Math.max(d.close, d.open); })]);

      // Add the valueline path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .attr("d", valueline);

      // Add the valueline2 path.
      svg.append("path")
          .data([data])
          .attr("class", "line")
          .style("stroke", "red")
          .attr("d", valueline2);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

    });

    closeSlideMenu()
}

// MAP PLOTS
// Source : http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
function nycMapPlot(text) {

    // var x = document.getElementById("myTopnav");
    // x.style.display = "block";
    MAP_SELECTED = 0;
    var text = (text === undefined) ? "Zombie Houses in NYC" : text;
    console.log("NYC Plot func");
    map_type = [1,2,3,4,5];
    document.getElementById("plot_heading").innerHTML = text;

	d3.select('#graph').remove();
    // d3.select('#graph1').remove();
    d3.select('#b1').remove();
    d3.select('#b2').remove();
    d3.select('#b3').remove();
    d3.select('#b4').remove();
    d3.select('#con').remove();

	var svg = d3.select("body")
		.append("svg")
		.attr('id', 'graph')
			.attr("width", width + 700)
			.attr("height", height + 650);


	var g = svg.append("g")
            .attr("transform", "translate(" + 400 + "," + margin.top + ")");

	var albersProjection = d3.geoMercator()
    	.scale( 100000 )
    	.rotate( [74.0060, 0] )
    	.center( [0, 40.7128] )
    	.translate( [width/2, height/0.7] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    g.selectAll("path")
    	.data(nyc.features)
    	.enter()
    	.append("path") 
        .attr("fill", "#404040")
    	.attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.7)
    	.attr("d", geoPath);

    var lien = svg.append("g");

    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
    	lien.selectAll("path")
    		.data(json.features)
    		.enter()
    		.append("path")
    		.attr("fill", initialYear)
    		.attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 400 + "," + margin.top + ")")
    		.attr( "d", geoPath )
    		.attr( "class", "incident")
    		.on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

    		    // d3.select("#add").text("Address - " + d.properties["Address"])
    		    d3.select(this).attr("class","incident hover")
    		})
    		.on("mouseout", function(d){
    			// d3.select("#add").text("")
                d3.select('#tool').remove()

    			d3.select(this).attr("class","incident")
    	   })

        	d3.select("#timeslide").on("input", function() {
        	    update(+this.value);
    	})
    });

	closeSlideMenu()
}

function bronxMapPlot(text) {

    MAP_SELECTED = 2;
    map_type = [2];
    var text = (text === undefined) ? "Zombie Houses in Bronx" : text;
    document.getElementById("plot_heading").innerHTML = text;

	d3.select('#graph').remove();
	d3.select('#b1').remove();
    d3.select('#b2').remove();
    d3.select('#b3').remove();
    d3.select('#b4').remove();
    d3.select('#con').remove();

	var svg = d3.select("body")
		.append("svg")
		.attr('id', 'graph')
			.attr("width", width + 700)
			.attr("height", height + 650);


	var g = svg.append("g")
            .attr("transform", "translate(" + 500 + "," + margin.top + ")");

	var albersProjection = d3.geoMercator()
    	.scale( 270000 )
    	.rotate( [73.8648, 0] )
    	.center( [0, 40.8448] )
    	.translate( [width/2,height/0.7] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);


    g.selectAll("path")
    	.data(bronx.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
    	.attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.7)
    	.attr("d", geoPath);

    var lien = svg.append("g");

    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
        lien.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", initialYear)
            .attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 500 + "," + margin.top + ")")
            .attr( "d", geoPath )
            .attr( "class", "incident")
            .on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

                // d3.select("#add").text("Address - " + d.properties["Address"])
                d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                // d3.select("#add").text("")
                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });

    closeSlideMenu()

}

function brooklynMapPlot(text) {

    MAP_SELECTED = 3;
    map_type = [3];
    var text = (text === undefined) ? "Zombie Houses in Brooklyn" : text;
    document.getElementById("plot_heading").innerHTML = text;

    d3.select('#graph').remove();
    d3.select('#b1').remove();
    d3.select('#b2').remove();
    d3.select('#b3').remove();
    d3.select('#b4').remove();
    d3.select('#con').remove();

	var svg = d3.select("body")
        .append("svg")
        .attr('id', 'graph')
            .attr("width", width + 700)
            .attr("height", height + 650);


	var g = svg.append("g")
                .attr("transform", "translate(" + 500 + "," + margin.top + ")");

	var albersProjection = d3.geoMercator()
    	.scale( 220000 )
    	.rotate( [73.9442, 0] )
    	.center( [0, 40.6782] )
    	.translate( [width/2,height] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);


    g.selectAll("path")
    	.data(brooklyn.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.7)
    	.attr("d", geoPath);


    var lien = svg.append("g");

    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
        lien.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", initialYear)
            .attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 500 + "," + margin.top + ")")
            .attr( "d", geoPath )
            .attr( "class", "incident")
            .on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

                // d3.select("#add").text("Address - " + d.properties["Address"])
                d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                // d3.select("#add").text("")
                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });

    closeSlideMenu()
}

function manhattanMapPlot(text) {

    MAP_SELECTED = 1;
    map_type = [1];
    var text = (text === undefined) ? "Zombie Houses in Manhattan" : text;
    document.getElementById("plot_heading").innerHTML = text;

	d3.select('#graph').remove();
	d3.select('#b1').remove();
    d3.select('#b2').remove();
    d3.select('#b3').remove();
    d3.select('#b4').remove();
    d3.select('#con').remove();

	var svg = d3.select("body")
        .append("svg")
        .attr('id', 'graph')
            .attr("width", width + 700)
            .attr("height", height + 650);


    var g = svg.append("g")
                .attr("transform", "translate(" + 500 + "," + margin.top + ")");

	var albersProjection = d3.geoMercator()
    	.scale( 220000 )
    	.rotate( [73.9712, 0] )
    	.center( [0, 40.7831] )
    	.translate( [width/2,height/0.9] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);


    g.selectAll("path")
    	.data(manhattan.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.7)
    	.attr("d", geoPath);


    var lien = svg.append("g");

    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
        lien.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", initialYear)
            .attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 500 + "," + margin.top + ")")
            .attr( "d", geoPath )
            .attr( "class", "incident")
            .on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

                // d3.select("#add").text("Address - " + d.properties["Address"])
                d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                // d3.select("#add").text("")
                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });

    closeSlideMenu()
}

function statenMapPlot(text) {

    MAP_SELECTED = 5;
    map_type = [5];
    var text = (text === undefined) ? "Zombie Houses in Staten Island" : text;
    document.getElementById("plot_heading").innerHTML = text;

	d3.select('#graph').remove();
	d3.select('#b1').remove();
    d3.select('#b2').remove();
    d3.select('#b3').remove();
    d3.select('#b4').remove();
    d3.select('#con').remove();

	var svg = d3.select("body")
        .append("svg")
        .attr('id', 'graph')
            .attr("width", width + 700)
            .attr("height", height + 650);


    var g = svg.append("g")
                .attr("transform", "translate(" + 500 + "," + margin.top + ")");

	var albersProjection = d3.geoMercator()
    	.scale( 230000 )
    	.rotate( [74.1502, 0] )
    	.center( [0, 40.5795] )
    	.translate( [width/2,height/0.8] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    var lien = svg.append("g");

    g.selectAll("path")
    	.data(staten.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.7)
    	.attr("d", geoPath);


    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
        lien.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", initialYear)
            .attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 500 + "," + margin.top + ")")
            .attr( "d", geoPath )
            .attr( "class", "incident")
            .on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

                // d3.select("#add").text("Address - " + d.properties["Address"])
                d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                // d3.select("#add").text("")
                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });


    closeSlideMenu()
}

function queensMapPlot(text) {

    MAP_SELECTED = 4;
    map_type = [4];
    var text = (text === undefined) ? "Zombie Houses in Queens" : text;
    document.getElementById("plot_heading").innerHTML = text;

	d3.select('#graph').remove();
	d3.select('#b1').remove();
    d3.select('#b2').remove();
    d3.select('#b3').remove();
    d3.select('#b4').remove();
    d3.select('#con').remove();

	var svg = d3.select("body")
        .append("svg")
        .attr('id', 'graph')
            .attr("width", width + 700)
            .attr("height", height + 650);


    var g = svg.append("g")
                .attr("transform", "translate(" + 600 + "," + margin.top + ")");

	var albersProjection = d3.geoMercator()
    	.scale( 155000 )
    	.rotate( [73.7949, 0] )
    	.center( [0, 40.7282] )
    	.translate( [width/2,height/1.2] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);


    g.selectAll("path")
    	.data(queens.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.7)
    	.attr("d", geoPath);

    var lien = svg.append("g");

    d3.json("/static/data/liens_and_complaints.geojson", function(json) {
        lien.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("fill", initialYear)
            .attr( "stroke", "#00000000" )
            .attr("stroke-width", 1)
            .attr("transform", "translate(" + 600 + "," + margin.top + ")")
            .attr( "d", geoPath )
            .attr( "class", "incident")
            .on("mouseover", function(d){
                var arr = [];
                arr.push("-------------------------------------------------------------------");
                arr.push("Address" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Address"]);
                arr.push("Year Built" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Year Built"]);
                arr.push("Building Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Building Depth"]);
                arr.push("Building Frontage" + '\xa0 - ' + d.properties["Building Frontage"]);
                arr.push("Building Size" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Gross Square Feet"]);
                arr.push("No. of Stories" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Stories"]);
                arr.push("Lot Depth" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Depth"]);
                arr.push("Lot Frontage" + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 - ' + d.properties["Lot Frontage"]);            
                arr.push("-------------------------------------------------------------------");

                d3.select('body')
                    .append('p')
                    .attr('id', 'tool')
                    .html(arr.join('<br/>'))

                // d3.select("#add").text("Address - " + d.properties["Address"])
                d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                // d3.select("#add").text("")
                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });

    closeSlideMenu()
}

function plot_func() {
    if(MAP_SELECTED == 0) {
        nycMapPlot();
    }
    else if(MAP_SELECTED == 1) {
        manhattanMapPlot();
    }
}

function reset_func() {

    tax_class = [];
    dob_code = [];
    build_class = [];
    filters = [];

    filters.push("New Filters:");
    filters.push('<br/>');
    filters.push('<br/>');
    var x = document.getElementById("snackbar");
    x.innerHTML = "Removed all Filters!";
    show_snackbar();
    document.getElementById("filters").innerHTML = "";
}

function show_snackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function dob_code_func(code) {
	dob_code.push(code);
    send_data();

    var x = document.getElementById("snackbar");
    x.innerHTML = "Filter: DOB_CODE = " + code + ". Added Successfully!";
    show_snackbar();

    filters.push("DOB_CODE = "+ code);
    filters.push('<br/>');
    document.getElementById("filters").innerHTML = filters;
}

function tax_class_func(code) {
	tax_class.push(code);
    send_data();
    show_snackbar();

    var x = document.getElementById("snackbar");
    x.innerHTML = "Filter: TAX_CLASS = " + code + ". Added Successfully!";
    show_snackbar();

    filters.push("TAX_CLASS = "+ code);
    filters.push('<br/>');
    document.getElementById("filters").innerHTML = filters;
}