$(document).ready(function () {
    d3.json("https://sheet.best/api/sheets/b0eb5319-377e-419f-8c19-0a1bbc62a116").then(chartBuilder);
    dc.config.defaultColors(d3.schemePRGn[11]);

    function chartBuilder(gameData) {
        var ndx = crossfilter(gameData);
        let allData = ndx.groupAll();

        dc.dataCount("#total")
            .crossfilter(ndx)
            .groupAll(allData);


        gameData.forEach(function (d) {
            d.days_playing = parseInt(d.days_playing);
            d.hours_playing = parseInt(d["hours_playing"]);
            d.years_playing = parseInt(d["years_playing"]);
            d.monthly_budget = parseInt(d["monthly_budget"]);


        });


        show_favourite_activity(ndx), "#favourite-activity", "fav_activity";
        show_games_played(ndx, "#games-played", "games_played");
        show_gender_balance(ndx, "#gender-balance", "gender");
        show_age_dist(ndx, "#age-dist", "age");
        show_playstyle(ndx, "#playstyle", "play_style");
        show_months_budget(ndx, "#budget-scatter", "monthly_budget")


        dc.renderAll();
    }

    function show_games_played(ndx, divName, dimension) {

        let gamesPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = dim.group();

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        gamesPiechart
            .height(330)
            .radius(180)
            .transitionDuration(500)
            .useViewBoxResizing(true)
            .group(group)
            .dimension(dim)
            .externalLabels(50)
            .drawPaths(true)
            .minAngleForLabel(0)


    }

});

function show_gender_balance(ndx, divName, dimension) {
    var genderBarChart = dc.barChart(divName);
    var dim = ndx.dimension(dc.pluck(dimension));
    var group = dim.group();

    genderBarChart
        .width(350)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
}


function show_age_dist(ndx, divName, dimension) {
    var ageBarChart = dc.barChart(divName);
    var dim = ndx.dimension(dc.pluck(dimension));
    var group = dim.group();


    ageBarChart
        .width(350)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Age")
        .yAxis().ticks(10);
}


function show_favourite_activity(ndx) {
    var dim = ndx.dimension(dc.pluck('favourite_activity'));
    var group = dim.group();

    dc.barChart("#fav-activity")
        .width(350)
        .height(250)
        .margins({ top: 30, right: 50, bottom: 80, left: 50 })
        .renderlet(function (chart) {
            chart.selectAll("g.x text")
                .attr('dx', '-40')
                .attr('transform', "rotate(-45)");
        })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
         .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Activity")
        .yAxis().ticks(10);
}

function show_playstyle(ndx) {
    var dim = ndx.dimension(dc.pluck('play_style'));
    var group = dim.group();

    dc.barChart("#playstyle")
        .width(350)
        .height(250)
        .margins({ top: 30, right: 50, bottom: 80, left: 50 })
        .renderlet(function (chart) {
            chart.selectAll("g.x text")
                .attr('dx', '-40')
                .attr('transform', "rotate(-45)");
        })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
         .x(d3.scaleBand())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Activity")
        .yAxis().ticks(10);
}


function show_months_budget(ndx, divName, dimension) {
    var scatterPlot = dc.scatterPlot(divName);
    var dim = ndx.dimension(dc.pluck(dimension))
    var budgetDim = ndx.dimension(function (d) {
        return [d.years_playing, d.monthly_budget, d.gender, d.age];
    });

    var group = budgetDim.group()
    var minAge = dim.bottom(1)[0].years_playing;
    var maxAge = dim.top(1)[0].years_playing;

    scatterPlot
        .dimension(dim)
        .group(group)
        .width(800)
        .height(400)
        .x(d3.scaleLinear().domain([minAge, maxAge]))
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("Budget")
        .xAxisLabel("Years playing games")
        

    }