$(document).ready(function () {


    d3.csv("./static/data/characters.csv").then(chartBuilder);
    dc.config.defaultColors(d3.schemeRdBu[11]);

    function chartBuilder(swData) {
        var ndx = crossfilter(swData);
        let allData = ndx.groupAll();

        dc.dataCount("#total")
            .crossfilter(ndx)
            .groupAll(allData);


        swData.forEach(function (d) {
            d.height = parseInt(d.height);
            d.mass = parseInt(d.mass);
        });



        gender_selector(ndx, "#gender-selector", "gender");
        gender_selector(ndx, "#character-selector", "name");
        gender_selector(ndx, "#alligence-selector", "Alligence");
        gender_selector(ndx, "#film-selector", "film");




        show_alligence(ndx, "#alligence", "Alligence");
        
        
        
        
        show_weight(ndx, "#weight");



        dc.renderAll();
    }

    /*--------------SELECTORS START-----*/

    function gender_selector(ndx, divName, dimension) {
        var dim = ndx.dimension(dc.pluck(dimension));
        var group = dim.group();
        var genderSelect = dc.selectMenu(divName)

        genderSelect
            .dimension(dim)
            .group(group)
            .title(function (d) {
                return d.key
            });


    }

    function character_selector(ndx, divName, dimension) {
        var dim = ndx.dimension(dc.pluck(dimension));
        var group = dim.group();
        var characterSelect = dc.selectMenu(divName)

        characterSelect
            .dimension(dim)
            .group(group)
            .title(function (d) {
                return d.key
            });


    }

    function alligence_selector(ndx, divName, dimension) {
        var dim = ndx.dimension(dc.pluck(dimension));
        var group = dim.group();
        var alligenceSelect = dc.selectMenu(divName)

        alligenceSelect
            .dimension(dim)
            .group(group)
            .title(function (d) {
                return d.key
            });


    }
    function film_selector(ndx, divName, dimension) {
        var dim = ndx.dimension(dc.pluck(dimension));
        var group = dim.group();
        var filmSelect = dc.selectMenu(divName)

        filmSelect
            .dimension(dim)
            .group(group)
            .title(function (d) {
                return d.key
            });


    }


    /*------------SELECTORS END-------------*/

    /*----------------------PIE CHARTS START-----------*/

    /*------Pie chart formatting----*/

    function show_slice_percent(key, endAngle, startAngle) {
        var percent = dc.utils.printSingleValue((endAngle - startAngle) / (2 * Math.PI) * 100);

        if (percent > 9) {
            return key + ' | ' + Math.round(percent) + "%";
        }
        else {
            if (percent > 0) {
                return Math.round(percent) + '%';
            }
        }
    }

    function show_alligence(ndx, divName, dimension) {

        let gamesPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = dim.group();

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        gamesPiechart
            .width(500)
            .height(350)
            .radius(170)
            .cx(210)
            .transitionDuration(500)
            .on('pretransition', function (chart) {
                chart.selectAll('text.pie-slice').text(function (d) {
                    return show_slice_percent(d.data.key, d.endAngle, d.startAngle);

                });
            })
            .useViewBoxResizing(true)
            .group(group)
            .dimension(dim)
            .drawPaths(true)
            .minAngleForLabel(0)


    }
    /*----------PIE CHARTS END----------*/

    /*----------BAR CHARTS START--------*/
    function show_weight(ndx, divName) {
        var weightChart = dc.barChart(divName);
        var dim = ndx.dimension(function (d) {
            switch (true) {
                case (d.mass == 0):
                    return "0KG";
                case (d.mass < 60):
                    return "0kg to 59kg";
                case (d.mass < 90):
                    return "60kg to 89kg";
                case (d.mass < 120):
                    return "90 to 119Kg";
                case (d.mass >= 120):
                    return "over 120 kg";

            }
        });
        var group = dim.group();

        weightChart
            .width(500)
            .height(350)
            .x(d3.scaleLinear().domain([6, 20]))
            .brushOn(false)
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Weight")
            .yAxis().ticks(20);
    }



    /*--------------BAR CHARTS END-----------*/

});



