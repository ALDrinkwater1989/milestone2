$(document).ready(function () {


    d3.csv("./static/data/characters.csv").then(chartBuilder);
   /*  dc.config.defaultColors(d3.schemeRdBu[5]); */

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
        show_phantom_menace_characters(ndx, "#tpm", "the_phantom_menace")
        show_attack_of_clones_characters(ndx, "#atc", "the_attack_of_the_clones");
        show_revenge_of_sith_characters(ndx, "#ros", "the_revenge_of_the_sith");
        show_new_hope_characters(ndx, "#anh", "a_new_hope");
        show_empire_strikes_back_characters(ndx, "#esb", "empire_strikes_back");
        show_return_of_jedi_characters(ndx,"#roj", "return_of_the_jedi");
        show_last_jedi_characters(ndx, "#tlj", "the_last_jedi");
        show_force_awakens_characters(ndx, "#tfa", "the_force_awakens");
        show_rise_of_skywalker_characters(ndx, "#skywalker", "the_rise_of_skywalker");
        
        
        
        
        show_weight(ndx, "#weight");
        show_height(ndx, "#height");


        moreInformation(ndx, "#information", "number");



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


function remove_blanks(group, value_to_remove) {
    // Filter out specified values from passed group
    return {
        all: function() {
            return group.all().filter(function(d) {
                return d.key !== value_to_remove;
            });
        }
    };
}


    function show_alligence(ndx, divName, dimension) {

        let alligencePiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = dim.group();
      

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        alligencePiechart
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

        function show_phantom_menace_characters(ndx, divName, dimension) {

        let phantomPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        phantomPiechart
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

        function show_attack_of_clones_characters(ndx, divName, dimension) {

        let clonesPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        clonesPiechart
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


        function show_revenge_of_sith_characters(ndx, divName, dimension) {

        let revengePiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        revengePiechart
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


        function show_new_hope_characters(ndx, divName, dimension) {

        let hopePiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        hopePiechart
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


        function show_empire_strikes_back_characters(ndx, divName, dimension) {

        let empirePiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        empirePiechart
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


        function show_return_of_jedi_characters(ndx, divName, dimension) {

        let returnPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
       let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        returnPiechart
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

     function show_rise_of_skywalker_characters(ndx, divName, dimension) {

        let skywalkerPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        skywalkerPiechart
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

     function show_force_awakens_characters(ndx, divName, dimension) {

        let forcePiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        forcePiechart
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

     function show_last_jedi_characters(ndx, divName, dimension) {

        let jediPiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        jediPiechart
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


    function show_height(ndx, divName) {

        var heightChart = dc.barChart(divName);
        var dim = ndx.dimension(function (d) {
            switch (true) {
                case (d.height == 0):
                    return "0cm";
                case (d.height < 60):
                    return "0cm to 59cm";
                case (d.height < 90):
                    return "60cm to 89cm";
                case (d.height < 120):
                    return "90cm to 119cm";
                case (d.height >= 120):
                    return "over 120cm";

            }
        });
        var group = dim.group();

        heightChart
            .width(500)
            .height(350)
            .x(d3.scaleLinear().domain([6, 20]))
            .brushOn(false)
            .dimension(dim)
            .group(group)
            .transitionDuration(500)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Height")
            .yAxis().ticks(20);
    }

 function show_weight(ndx, divName) {

        var weightChart = dc.barChart(divName);
        var dim = ndx.dimension(function (d) {
            switch (true) {
                case (d.mass == 0):
                    return "0kg";
                case (d.mass < 60):
                    return "0kg to 59kg";
                case (d.mass < 90):
                    return "60kg to 89kg";
                case (d.mass < 120):
                    return "90kg to 119kg";
                case (d.mass >= 120):
                    return "over 120kg";

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

   /*----- INFORMATION TABLE-----*/

function moreInformation(ndx, divName, dimension){

    let dataTableName = dc.dataTable(divName);
    let dim = ndx.dimension(dc.pluck(dimension));


    dataTableName
        .dimension(dim)
        .section(function(d){
            return d.name;
        })
        .columns(["birth_year","homeworld","Job","Vehicles", "Startships"])
        .size(Infinity)
        .useViewBoxResizing(true)
        .sortBy(function(d){
            return d.name;
        })
        .order(d3.ascending);

}


});





