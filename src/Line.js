//Fixed plot
function Shot_Stat_Line(col, position) {
    const margin = { left: 80, right: 60, top: 20, bottom: 20 };

    const width = 750;
    const height = 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickPadding(10)
        .tickSize(5);

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)
        .tickPadding(15)
        .tickSize(5);

    var temp_g = d3.select("#" + position);

    temp_g.attr("width", width)
        .attr("height", height);
    const xAxisG = d3.select("#" + position).select("#x_axis")
        .attr("transform", `translate(${0}, ${innerHeight})`);
    const yAxisG = d3.select("#" + position).select("#y_axis")
        .attr("transform", `translate(${margin.left}, ${0})`);

    xAxisG.select("#x_label")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .style("fill", "black")
        .text("Year");

    yAxisG.select("#y_label")
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .attr("transform", `rotate(-90)`)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text(col);



    var line = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function(d) { return xScale(parseTime(d.Season.split("-")[0])) })
        .y(function(d) { return yScale(d.col) });


    d3.csv("data/stat.csv", data => {

        xScale
            .domain(d3.extent(data, d => parseTime(d.Season.split("-")[0])))
            .range([margin.left, innerWidth])
            .nice();

        yScale
            .domain(d3.extent(data, d => +d[col]))
            .range([innerHeight, margin.top])
            .nice();


        temp_data = data.map(function(d) { return { Season: d.Season, col: d[col] } })

        var path_made = temp_g.selectAll("#line_path").data([temp_data])
        path_made.exit().transition(t).remove();

        path_made.enter().append("path")
            .merge(path_made)
            .attr("id", "line_path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3)
            .transition(t)
            .attr("d", line(temp_data));

        var circles_made = temp_g.selectAll("#line_circle").data(data)
        circles_made.exit().transition(t).remove();


        circles_made
            .enter().append("circle")
            .style("fill", "black")
            .merge(circles_made)
            .attr("id", "line_circle")
            .attr("fill", "black")
            .attr("fill-opacity", 10)
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "top")
            .attr("data-original-title", d => d[col])
            .transition(t)
            .attr("cx", d => xScale(parseTime(d.Season.split("-")[0])))
            .attr("cy", d => yScale(d[col]))



        var stat_path = temp_g.selectAll("#avg_line").data([career_data])
        stat_path.exit().transition(t).remove();

        stat_path.enter().append("line")
            .merge(stat_path)
            .attr("id", "avg_line")
            .style("stroke", "black")
            .style("stroke-linecap", "round")
            .style("stroke-width", 3)
            .transition(t)
            .attr("x1", xScale(xScale.domain()[0]))
            .attr("y1", yScale(career_data[col]))
            .attr("x2", xScale(xScale.domain()[1]))
            .attr("y2", yScale(career_data[col]))
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "top")
            .attr("data-original-title", "Career Average:" + career_data[col] + " PPG")


        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    });

    var title_line1 = d3.select("#line1_caption");
    title_line1.text("Kobe Bryant " + col + " Per Season")
        .attr('x', margin.left)
        .attr('y', margin.top);

}

//Plot with general update
function Shot_Accu_Line(year, position) {

    var target_season = format(year) + "-" + (year.getFullYear() + 1).toString().substring(2, 4);
    const margin = { left: 80, right: 60, top: 20, bottom: 20 };

    const width = 750;
    const height = 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const parseTime = d3.timeParse("%Y%m%d");
    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickPadding(10)
        .tickSize(5);

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(15)
        .tickPadding(15)
        .tickSize(5);

    var temp_g = d3.select("#" + position);
    temp_g.attr("width", width)
        .attr("height", height);
    const xAxisG = d3.select("#" + position).select("#x_axis")
        .attr("transform", `translate(${0}, ${innerHeight})`);
    const yAxisG = d3.select("#" + position).select("#y_axis")
        .attr("transform", `translate(${margin.left}, ${0})`);

    xAxisG.select("#x_label")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .style("fill", "black")
        .text("Year");

    yAxisG.select("#y_label")
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .attr("transform", `rotate(-90)`)
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text("Accuracy");



    d3.csv("data/kobe.csv", data => {
        var temp_data = data.filter(d => d.season == target_season)

        temp_data = d3.nest()
            .key(function(d) { return d.game_date; })
            .key(function(d) { return d.shot_made_flag })
            .rollup(function(leaves) { return leaves.length; })
            .entries(temp_data);
        var made = 0;
        var miss = 0;

        for (i = 0; i < temp_data.length; i++) {
            if (temp_data[i].values[0]) {
                if (temp_data[i].values[0].key == "1") {
                    made = temp_data[i].values[0].value
                } else {
                    miss = temp_data[i].values[0].value
                }
            }

            if (temp_data[i].values[1]) {
                if (temp_data[i].values[1].key == "1") {
                    made = temp_data[i].values[1].value
                } else {
                    miss = temp_data[i].values[1].value
                }
            }
            temp_data[i].values = made / (miss + made)

        }
        var line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return xScale(parseTime(d.key)) })
            .y(function(d) { return yScale(d.values) });

        xScale
            .domain(d3.extent(temp_data, d => parseTime(d.key)))
            .range([margin.left, innerWidth])
            .nice();

        var height = d3.extent(temp_data, d => +d.values);
        yScale
            .domain(d3.extent(temp_data, d => +d.values))
            .range([innerHeight, margin.top])
            .nice();

        var path_made = temp_g.selectAll("#line_path").data([temp_data])
        path_made.exit().transition(t).remove();

        path_made
            .enter().append("path")
            .merge(path_made)
            .transition(t)
            .attr("id", "line_path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line(temp_data));


        var circles_made = temp_g.selectAll("#line_circle").data(temp_data)
        circles_made.exit().transition(t).remove();


        circles_made
            .enter().append("circle")
            .merge(circles_made)
            .attr("id", "line_circle")
            .attr("fill", "black")
            .attr("fill-opacity", 0.5)
            .attr("r", 4)
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "top")
            .attr("data-original-title", d => d.values.toPrecision(3))
            .on("mouseover", function(d) {
                d3.select("#line2").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "white").attr('r', 5)
                d3.select("#line3").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "white").attr('r', 5)
            })
            .on("mouseout", function(d) {
                d3.select("#line2").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "blue").attr('r', 3)
                d3.select("#line3").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "blue").attr('r', 3)
            })
            .transition(t)
            .attr("cx", d => xScale(parseTime(d.key)))
            .attr("cy", d => yScale(d.values))

        xAxisG.call(xAxis);
        yAxisG.call(yAxis);

    });

}


//Plot with general update
function Shot_Score_Line(year, position) {
    var format = d3.timeFormat("%Y");

    var target_season = format(year) + "-" + (year.getFullYear() + 1).toString().substring(2, 4);

    const margin = { left: 80, right: 60, top: 20, bottom: 20 };

    const width = 750;
    const height = 400;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const parseTime = d3.timeParse("%Y%m%d");
    const xScale = d3.scaleTime();
    const yScale = d3.scaleLinear();

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickPadding(10)
        .tickSize(5);

    const yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(10)
        .tickPadding(15)
        .tickSize(5);

    var temp_g = d3.select("#" + position);
    temp_g.attr("width", width)
        .attr("height", height);
    const xAxisG = d3.select("#" + position).select("#x_axis")
        .attr("transform", `translate(${0}, ${innerHeight})`);
    const yAxisG = d3.select("#" + position).select("#y_axis")
        .attr("transform", `translate(${margin.left}, ${0})`);

    xAxisG.select("#x_label")
        .attr("x", innerWidth / 2)
        .attr("y", 40)
        .text("Year");

    yAxisG.select("#y_label")
        .attr("x", -innerHeight / 2)
        .attr("y", -60)
        .attr("transform", `rotate(-90)`)
        .style("text-anchor", "middle")
        .text("Score");

    var t = d3.transition()
        .duration(750);


    d3.csv("data/kobe.csv", data => {
        var temp_data = data.filter(d => d.season == target_season)

        temp_data = d3.nest()
            .key(function(d) { return d.game_date; })
            .rollup(function(leaves) { return d3.sum(leaves, function(d) { return d.score; }) })
            .entries(temp_data);



        var line = d3.line()
            .curve(d3.curveMonotoneX)
            .x(function(d) { return xScale(parseTime(d.key)) })
            .y(function(d) { return yScale(d.value) });

        xScale
            .domain(d3.extent(temp_data, d => parseTime(d.key)))
            .range([margin.left, innerWidth])
            .nice();

        var height = d3.extent(temp_data, d => +d.value);

        yScale
            .domain(d3.extent(temp_data, d => +d.value))
            .range([innerHeight, margin.top])
            .nice();

        var path_made = temp_g.selectAll("#line_path").data([temp_data])
        path_made.exit().transition(t).remove();

        path_made
            .enter().append("path")
            .merge(path_made)
            .transition(t)
            .attr("id", "line_path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line(temp_data));

        var circles_made = temp_g.selectAll("#line_circle").data(temp_data)
        circles_made.exit().transition(t).remove();


        circles_made
            .enter().append("circle")
            .merge(circles_made)
            .attr("id", "line_circle")
            .attr("fill", "blue")
            .attr("fill-opacity", 0.6)
            .attr("r", 3)
            .attr("data-toggle", "tooltip")
            .attr("data-placement", "top")
            .attr("data-original-title", d => d.value)
            .on("mouseover", function(d) {
                d3.select("#line2").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "red").attr('r', 5)
                d3.select("#line3").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "red").attr('r', 5)
            })
            .on("mouseout", function(d) {
                d3.select("#line2").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "blue").attr('r', 3)
                d3.select("#line3").select('circle[cx="' + this.getAttribute("cx") + '"]').attr("fill", "blue").attr('r', 3)
            })
            .transition(t)
            .attr("cx", d => xScale(parseTime(d.key)))
            .attr("cy", d => yScale(d.value));


        d3.csv("data/injury.csv", data => {

            var temp_data = data.filter(d => d.season == target_season)
            var injury = temp_g.selectAll("#injury_line").data(temp_data)
            injury.exit().transition(t).remove();

            injury.enter().merge(injury).append("line")
                .attr("id", "injury_line")
                .style("stroke", "red")
                .style("stroke-linecap", "round")
                .style("stroke-width", 1.5)
                .transition(t)
                .attr("x1", function(d) {
                    if (parseTime(d.game_date) > xScale.domain()[1]) {
                        return xScale(xScale.domain()[1])
                    } else if (parseTime(d.game_date) < xScale.domain()[0]) {
                        return xScale(xScale.domain()[0])
                    } else {
                        return xScale(parseTime(d.game_date))
                    }
                })
                .attr("y1", yScale(yScale.domain()[0]))
                .attr("x2", function(d) {
                    if (parseTime(d.game_date) > xScale.domain()[1]) {
                        return xScale(xScale.domain()[1])
                    } else if (parseTime(d.game_date) < xScale.domain()[0]) {
                        return xScale(xScale.domain()[0])
                    } else {
                        return xScale(parseTime(d.game_date))
                    }
                })
                .attr("y2", yScale(yScale.domain()[1]))
                .attr("data-toggle", "tooltip")
                .attr("data-placement", "top")
                .attr("data-original-title", d => d.Notes)

        })


        xAxisG.call(xAxis);
        yAxisG.call(yAxis);



    });

};
