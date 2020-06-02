queue()
    .defer(d3.json,"https://sheet.best/api/sheets/b0eb5319-377e-419f-8c19-0a1bbc62a116")
    .await(makeGraphs);

function makeGraphs(error, gameData) {
    var ndx = crossfilter(gameData);

    gameData.forEach(function(d) {
        d.days_playing = parseInt(d.days_playing);
        d.hours_playing = parseInt(d["hours_playing"]);
        d.years_playing = parseInt(d["years_playing"]);
        d.monthly_budget = parseInt(d["monthly_budget"]);
        
     
    });


    
    show_gender_balance(ndx);
    show_age_dist(ndx);
    show_favourite_activity(ndx);
    show_games_played(ndx);
    show_playstyle(ndx);
 


    dc.renderAll();
}


function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('gender'));
    var group = dim.group();

    dc.barChart("#gender-balance")
        .width(350)
        .height(250)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
}

function show_age_dist(ndx){
    var dim = ndx.dimension(dc.pluck('age'));
    var group = dim.group();
    
    
    dc.barChart("#age-dist")
        .width(350)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Age")
        .yAxis().ticks(10);
}

function show_favourite_activity(ndx){
    var dim = ndx.dimension(dc.pluck('favourite_activity'));
    var group = dim.group();
    
    dc.barChart("#fav-activity")
        .width(350)
        .height(250)
        .margins({top: 30, right: 50, bottom: 80, left: 50})
        .renderlet(function (chart) {
                    chart.selectAll("g.x text")
                      .attr('dx', '-40')
                      .attr('transform', "rotate(-45)");
                })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Activity")
        .yAxis().ticks(10);
}

function show_playstyle(ndx){
     var dim = ndx.dimension(dc.pluck('play_style'));
    var group = dim.group();
    
    dc.barChart("#playstyle")
        .width(350)
        .height(250)
        .margins({top: 30, right: 50, bottom: 80, left: 50})
        .renderlet(function (chart) {
                    chart.selectAll("g.x text")
                      .attr('dx', '-40')
                      .attr('transform', "rotate(-45)");
                })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Activity")
        .yAxis().ticks(10);
}



function show_games_played(ndx){
    var dim = ndx.dimension(dc.pluck('games_played'));
    var group = dim.group();
    
    
    dc.pieChart("#games-played")
        .height(330)
        .radius(180)
        .transitionDuration(500)
        .group(group)
        .dimension(dim)
        
}

function show_gender_percentage(ndx, gender, element){
    
}