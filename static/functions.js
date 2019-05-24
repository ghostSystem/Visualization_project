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

var complaintCodes = ["1", "10", "12", "13", "14", "15", "16", "18", "1A", "1B", "1D", "1E", "1G", "1K", "1Z", "20", "21", "23", "29", "2A", "2B", "2C", "2D", "2E", "2F", "2G", "2J", "2L", "3", "30", "31", "35", "37", "3A", "4", "45", "49", "4A", "4B", "4C", "4D", "4F", "4G", "4J", "4K", "4L", "4M", "4N", "5", "50", "52", "53", "54", "55", "56", "58", "59", "5A", "5C", "5F", "5G", "6", "62", "63", "65", "66", "67", "6A", "71", "73", "74", "75", "76", "77", "78", "79", "80", "81", "83", "85", "86", "88", "89", "9", "90", "91", "92", "94"];
var descs = ["Accident - Construction/Plumbing", "Debris/Building -Falling or In Danger of Falling", "Demolition-Unsafe/Illegal/Mechanical Demo", "Elevator In (FDNY) Readiness-None", "Excavation - Undermining Adjacent Building", "Fence - None/Inadequate/Illegal", "Inadequate Support/Shoring", "Material Storage - Unsafe", "Illegal Conversion Commercial Building/Space to Dwelling Units", "Illegal Tree Removal/Topo. Change In SNAD", "Con Edison Referral", "Suspended (Hanging) Scaffolds- No Permit/License/Dangerous/Accident", "Stalled Construction Site", "Bowstring Truss Tracking Complaint", "Enforcement Work Order (DOB)", "Landmark Building - Illegal Work", "Safety Net/Guardrail-Damaged/Inadequate/None (over 6 Story/75 ft.)", "Sidewalk Shed/Supported Scaffold/Inadequate/Defective/None/No Permit/No Cert ", "Building - Vacant, Open and Unguarded", "Posted Notice or Order Removed/Tampered With", "Failure to Comply with Vacate Order", "Smoking Ban - Smoking on Construction Site", "Smoking Signs - No Smoking Signs- Not Observed on Construction Site", "Demolition Notification Received", "Building Under Structural Monitoring", "Advertising Sign/Billboard/Posters/Flexible Fabric - Illegal", "Sandy: Building Destroyed", "Facade (LL11/98) - Unsafe Notification", "Adjacent Buildings - Not Protected", "Building Shaking/Vibrating/Structural Stability Affected", "Certificate of Occupancy - None/Illegal/Contrary to Co", "Curb Cut/Driveway/Carport - Illegal", "Egress - Locked/Blocked/Improper/No Secondary Means", "Unlicensed/Illegal/Improper Electrical Work In Progress", "After Hours Work - Illegal", "Illegal Conversion", "Storefront or Business Sign/Awning/Marquee/Canopy - Illegal", "Illegal Hotel Rooms In Residential Buildings", "SEP - Professional Certification Compliance Audit", "Excavation Tracking Complaint", "Interior Demo Tracking Complaint", "SST Tracking Complaint", "Illegal Conversion No Access Follow-Up", "M.A.R.C.H. Program (Interagency)", "CSC - DM Tracking Complaint", "CSC - High-Rise Tracking Complaint", "CSC - Low-Rise Tracking Complaint", "Retaining Wall Tracking Complaint", "Permit - None (Building/PA/Demo etc.)", "Sign Falling - Danger/Sign Erection or Display In Progress - Illegal", "Sprinkler System - Inadequate", "Vent/Exhaust - Illegal/Improper", "Wall/Retaining Wall - Bulging/Cracked", "Zoning - Non-conforming", "Boiler - Fumes/Smoke/Carbon Monoxide", "Boiler - Defective/Non-operative/No Permit", "Electrical Wiring - Defective/Exposed, In Progress", "Request for Joint FDNY/DOB Inspection", "Structural Stability Impacted - New Building Under Construction", "Compliance Inspection", "Unlicensed/Illegal/Improper Work In Progress", "Construction - Change Grade/Change Watercourse", "Elevator-Danger Condition/Shaft Open/Unguarded", "Elevator-Danger Condition/Shaft Open/Unguarded", "Gas Hook-Up/Piping - Illegal or Defective", "Plumbing Work - Illegal/No Permit(Also Sprinkler/Standpipe)", "Crane - No Permit/License/Cert/Unsafe/Illegal", "Vesting Inspection", "SRO - Illegal Work/No Permit/Change In Occupancy Use", "Failure to Maintain", "Illegal Commercial/Manufacturing Use In Residential Zone", "Adult Establishment", "Unlicensed/Illegal/Improper Plumbing Work In Progress", "Contrary To Ll58/87 (Handicap Access)", "Privately Owned Public Space/Non-Compliance", "Lights from Parking Lot Shining on Building", "Elevator Not Inspected/Illegal/No Permit", "Elevator - Accident", "Construction - Contrary/Beyond Approved Plans/Permits", "Failure to Retain Water/Improper Drainage (LL103/89)", "Work Contrary to Stop Work Order", "Safety Net/Guard Rail-Dam/Inadequate/None(6fl.75ft. or less)", "Accident - Cranes/Derricks/Suspension", "Debris - Excessive", "Unlicensed/Illegal Activity", "Site Conditions Endangering Workers", "Illegal Conversion of Manufacturing/Industrial Space", "Plumbing-Defective/Leaking/Not Maintained"];

var dobDropdownText = "";
for (i=0; i<complaintCodes.length; i++){
    dobDropdownText += "<div><input type=\"checkbox\" name=\"dob\" id=\"" + complaintCodes[i] + "\" onclick=\"dob_code_func(\'" + complaintCodes[i] + "\')\"><label for=\"" + complaintCodes[i] + "\" class=\"tooltip\">" + complaintCodes[i] + "<span class=\"tooltext\">" + descs[i] + "</span></label></div>";
}

document.getElementById("dob_dd").innerHTML = dobDropdownText;

var taxClasses = ["1", "1A", "1B", "2", "2A", "2B", "2C"];

var taxDropdownText = "";
for (i=0; i<taxClasses.length; i++){
    taxDropdownText += "<div><input type=\"checkbox\" name=\"tax\" id=\"" + taxClasses[i] + "\" onclick=\"tax_class_func(\'" + taxClasses[i] + "\')\"><label for=\"" + taxClasses[i] + "\">" + taxClasses[i] + "</label></div>";
}
document.getElementById("tax_dd").innerHTML = taxDropdownText;

var bldgClasses = ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A9", "B1", "B2", "B3", "B9", "C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C9", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "E1", "E3", "E4", "E9", "R0", "R1", "R2", "R3", "R4", "R5", "R8", "R9", "S0", "S1", "S2", "S3", "S4", "S5", "S9", "V0", "V1", "V2", "V3", "V4", "V9"];

var bldgDropdownText = "";
for (i=0; i<bldgClasses.length; i++){
    bldgDropdownText += "<div><input type=\"checkbox\" name=\"bldg\" id=\"" + bldgClasses[i] + "\" onclick=\"bldg_class_func(\'" + bldgClasses[i] + "\')\"><label for=\"" + bldgClasses[i] + "\">" + bldgClasses[i] + "</label><span class=\"tooltext\">" + descs[i] + "</span></div>";
}
document.getElementById("bldg_dd").innerHTML = bldgDropdownText;

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

var inputValue = 2011;
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
    if(MAP_SELECTED == -1) {
        myDashboard();
    }
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


function grid4() {

    width = 800;
    height = 400;

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Manhattan); });

    // define the 2nd line
    var valueline2 = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Bronx); });

    var valueline3 = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Brooklyn); });

    var valueline4 = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Queens); });

    var valueline5 = d3.line()
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Staten_Island); });


    var svg = d3.select("#b4")
        .append("svg")
        .attr('id', 'graph1')
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Get the data
    d3.csv("/static/data/line_chart.csv", function(error, data) {
      if (error) throw error;
      // format the data
      data.forEach(function(d) {
          d.Year = +d.Year;
          d.Manhattan = +d.Manhattan;
          d.Bronx = +d.Bronx;
          d.Brooklyn = +d.Brooklyn;
          d.Queens = +d.Queens;
          d.Staten_Island = +d.Staten_Island;
      });


      var arr = ["Manhattan", "Bronx", "Brooklyn", "Queens", "Staten_Island"];
      var color = d3.scaleOrdinal(d3.schemeCategory10);

      svg.append("text")
            .attr("x", (width - 320))
            .attr("y", height - 350)
            .attr("class", "legend")
            .text(arr); 

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.Year; }));
      y.domain([0, d3.max(data, function(d) {
          return Math.max(d.Manhattan, d.Bronx, d.Brooklyn, d.Queens, d.Staten_Island); })]);

      // Add the valueline path.
      svg.append("path")
          .data([data])
          .attr("class", "line1")
          .attr("d", valueline);

      // Add the valueline2 path.
      svg.append("path")
          .data([data])
          .attr("class", "line2")
          .attr("d", valueline2);

      svg.append("path")
          .data([data])
          .attr("class", "line3")
          .attr("d", valueline3);

      svg.append("path")
          .data([data])
          .attr("class", "line4")
          .attr("d", valueline4);

      svg.append("path")
          .data([data])
          .attr("class", "line5")
          .attr("d", valueline5);

      // Add the X Axis
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
          .call(d3.axisLeft(y));

    });
}

function grid2() {
    width = 800;
    height = 400;

    var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

          var svg = d3.select("#b2")
          .append("svg")
          .attr('id', 'graph2')
    .attr("width", width + margin.left + margin.right + 20)
    .attr("height", height + margin.top + margin.bottom + 100)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");



d3.csv("/static/data/bldg_class_"+inputValue+".csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.Freq = +d.Freq;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Class; }));
  y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.Class); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Freq); })
      .attr("height", function(d) { return height - y(d.Freq); });

  // add the x Axis
  svg.append("g")

      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")  
        .style("text-anchor", "end")
        .style("font", "14px times")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
}

function grid3() {

    width = 800;
    height = 400;

    var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

          var svg = d3.select("#b3")
          .append("svg")
          .attr('id', 'graph3')
    .attr("width", width + margin.left + margin.right + 20)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("/static/data/dob_"+inputValue+".csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.Freq = +d.Freq;
  });

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Code; }));
  y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.Code); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Freq); })
      .attr("height", function(d) { return height - y(d.Freq); });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});
}

function myDashboard() {
    
    MAP_SELECTED = -1;
    d3.select('#graph').remove();
    d3.select('#graph1').remove();
    d3.select('#graph2').remove();
    d3.select('#graph3').remove();

    var x = document.getElementById("filters");
    x.style.display = "none";

    document.getElementById("plot_heading").innerHTML = "DASHBOARD - NYC - Zombie Houses";

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

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip_d")
            .style("opacity", 0);

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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")
            })
            .on("mouseout", function(d){
                div.transition()
                 .duration(500)
                 .style("opacity", 0);

                d3.select('#tool').remove()

                d3.select(this).attr("class","incident")
           })

            d3.select("#timeslide").on("input", function() {
                update(+this.value);
        })
    });

    // *************************************************************

    grid2();
    grid3();
    grid4();

    closeSlideMenu()
}

// MAP PLOTS
// Source : http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
function nycMapPlot(text) {

    var x = document.getElementById("filters");
    x.style.display = "block";

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

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip1")
            .style("opacity", 0);

	var albersProjection = d3.geoMercator()
    	.scale( 100000 )
    	.rotate( [74.0060, 0] )
    	.center( [0, 40.7128] )
    	.translate( [width/2, height/0.85] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    g.selectAll("path")
    	.data(nyc.features)
    	.enter()
    	.append("path") 
        .attr("fill", "#404040")
    	.attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")

    		})
    		.on("mouseout", function(d){
    			div.transition()
                 .duration(500)
                 .style("opacity", 0);

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

    var x = document.getElementById("filters");
    x.style.display = "block";

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
    	.translate( [width/2,height/0.85] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip1")
            .style("opacity", 0);

    g.selectAll("path")
    	.data(bronx.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
    	.attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")

            })
            .on("mouseout", function(d){
                div.transition()
                 .duration(500)
                 .style("opacity", 0);

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

    var x = document.getElementById("filters");
    x.style.display = "block";

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
    	.translate( [width/2,height/1.3] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip1")
            .style("opacity", 0);

    g.selectAll("path")
    	.data(brooklyn.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")

            })
            .on("mouseout", function(d){
                div.transition()
                 .duration(500)
                 .style("opacity", 0);

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

    var x = document.getElementById("filters");
    x.style.display = "block";

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
    	.translate( [width/2,height/1] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip1")
            .style("opacity", 0);

    g.selectAll("path")
    	.data(manhattan.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")

            })
            .on("mouseout", function(d){
                div.transition()
                 .duration(500)
                 .style("opacity", 0);

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

    var x = document.getElementById("filters");
    x.style.display = "block";

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
    	.translate( [width/2,height/1] );

    var geoPath = d3.geoPath()
    	.projection(albersProjection);

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip1")
            .style("opacity", 0);

    var lien = svg.append("g");

    g.selectAll("path")
    	.data(staten.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")

            })
            .on("mouseout", function(d){
                div.transition()
                 .duration(500)
                 .style("opacity", 0);

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

    var x = document.getElementById("filters");
    x.style.display = "block";

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
    	.translate( [width/2,height/1.3] );

    var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip1")
            .style("opacity", 0);

    var geoPath = d3.geoPath()
    	.projection(albersProjection);


    g.selectAll("path")
    	.data(queens.features)
    	.enter()
    	.append("path")
    	.attr("fill", "#404040")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .style("opacity", 0.6)
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
                div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 var arr = [];
                 arr.push("Address" + " - " + d.properties["Address"]);
                 arr.push("Year Built" + ' - ' + d.properties["Year Built"]);
                 arr.push("Building Depth" + ' - ' + d.properties["Building Depth"]);
                 arr.push("Building Frontage" + ' - ' + d.properties["Building Frontage"]);
                 arr.push("Building Size" + ' - ' + d.properties["Gross Square Feet"]);
                 arr.push("No. of Stories" + ' - ' + d.properties["Stories"]);
                 arr.push("Lot Depth" + ' - ' + d.properties["Lot Depth"]);
                 arr.push("Lot Frontage" + ' - ' + d.properties["Lot Frontage"]);
                 div.html(arr.join('<br/>'))
             .style("left", 200 + "px")
             .style("top", 200 + "px");

             d3.select(this).attr("class","incident hover")

            })
            .on("mouseout", function(d){
                div.transition()
                 .duration(500)
                 .style("opacity", 0);

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
    else if(MAP_SELECTED == 2) {
        brooklynMapPlot();
    }
    else if(MAP_SELECTED == 3) {
        brooklynMapPlot();
    }
    else if(MAP_SELECTED == 4) {
        queensMapPlot();
    }
    else if(MAP_SELECTED == 5) {
        statenMapPlot();
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

  var index = dob_code.indexOf(code);
  if(index > -1) {
    dob_code.splice(index, 1);
    var ind = filters.indexOf("DOB_CODE = "+code)
    if (ind > -1) {
      filters.splice(ind, 1);
      document.getElementById("filters").innerHTML = filters;
    }
  }
  else {
	dob_code.push(code);

    send_data();

    var x = document.getElementById("snackbar");
    x.innerHTML = "Filter: DOB_CODE = " + code + ". Added Successfully!";
    show_snackbar();

    filters.push("DOB_CODE = "+ code);
    filters.push('<br/>');
    document.getElementById("filters").innerHTML = filters;
  }
}

function bldg_class_func(code) {

  var index = build_class.indexOf(code);
  if(index > -1) {
    build_class.splice(index, 1);
    var ind = filters.indexOf("BUILD_CLASS = "+code)
    if (ind > -1) {
      filters.splice(ind, 1);
      document.getElementById("filters").innerHTML = filters;
    }
  }
  else {
  build_class.push(code);
    send_data();
    show_snackbar();

    var x = document.getElementById("snackbar");
    x.innerHTML = "Filter: BUILD_CLASS = " + code + ". Added Successfully!";
    show_snackbar();

    filters.push("BUILD_CLASS = "+ code);
    filters.push('<br/>');
    document.getElementById("filters").innerHTML = filters;
  }
}

function tax_class_func(code) {

  var index = tax_class.indexOf(code);
  if(index > -1) {
    tax_class.splice(index, 1);
    var ind = filters.indexOf("TAX_CLASS = "+code)
    if (ind > -1) {
      filters.splice(ind, 1);
      document.getElementById("filters").innerHTML = filters;
    }
  }
  else {
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
}





