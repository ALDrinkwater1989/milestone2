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


/*-------------------SELECTORS-------------*/
        multi_selector(ndx, "#gender-selector", "gender");
        multi_selector(ndx, "#character-selector", "name");
        multi_selector(ndx, "#alligence-selector", "Alligence");
        multi_selector(ndx, "#film-selector", "film");


/*----------GENDER PERCENT-------------*/

display_gender_percent(ndx, "Male", "#male-percent");
display_gender_percent(ndx, "Female", "#female-percent");
display_gender_percent(ndx, "Hermaphrodite", "#percent-hermaphrodite");
display_gender_percent(ndx, "None", "#percent-none");


/*------------PIE CHARTS-----------*/
        show_piecharts(ndx, "#alligence", "Alligence");
        show_piecharts(ndx, "#tpm", "the_phantom_menace")
        show_piecharts(ndx, "#atc", "the_attack_of_the_clones");
        show_piecharts(ndx, "#ros", "the_revenge_of_the_sith");
        show_piecharts(ndx, "#anh", "a_new_hope");
        show_piecharts(ndx, "#esb", "empire_strikes_back");
        show_piecharts(ndx, "#roj", "return_of_the_jedi");
        show_piecharts(ndx, "#tlj", "the_last_jedi");
        show_piecharts(ndx, "#tfa", "the_force_awakens");
        show_piecharts(ndx, "#skywalker", "the_rise_of_skywalker");
        show_piecharts(ndx, "#hair-colour", "hair_color");
        show_piecharts(ndx, "#eye-colour", "eye_color");
        
        
/*------------BAR CHARTS-----------*/        
        show_weight(ndx, "#weight");
        show_height(ndx, "#height");


        moreInformation(ndx, "#information", "number");



        dc.renderAll();
    }

    /*--------------SELECTORS START-----*/

    function multi_selector(ndx, divName, dimension) {
        var dim = ndx.dimension(dc.pluck(dimension));
        var group = dim.group();
        var multiSelect = dc.selectMenu(divName)

        multiSelect
            .dimension(dim)
            .group(group)
            .title(function (d) {
                return d.key
            });


    }
    /*------------SELECTORS END-------------*/
    
    /*------------GENDER PERCENT------------*/
        function display_gender_percent(ndx, gender, element){
            var genderPercent = ndx.groupAll().reduce(
                function(p,v){
                    p.total++;
                    if (v.gender === gender){
                        p.gender_count ++;
                    }
                    return p;
                },
                function(p, v){
                    p.total--;
                    if(v.gender === gender){
                        p.gender_count--;
                    }
                    return p;
                },
                function(){
                    return{total: 0, gender_count: 0};
                }
            );

            dc.numberDisplay(element)
                .formatNumber(d3.format('.2%'))
                .valueAccessor(function(d){
                    if (d.gender_count ==0){
                        return 0;
                    } else {
                        return (d.gender_count / d.total);
                    }
                })
                .group(genderPercent);

        }
    
    
    
    /*------------PIE CHARTS START----------*/
    
    
    /*------------PIE CHART FORMATTING------*/

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

        function show_piecharts(ndx, divName, dimension) {

        let moviePiechart = dc.pieChart(divName);
        let dim = ndx.dimension(dc.pluck(dimension));
        let group = remove_blanks(dim.group(), "");

        d3.selectAll("#resetPie").on("click", function () {
            gamesPiechart.filterAll();
            dc.redrawAll();
        })

        moviePiechart
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
           .legend(dc.legend().x(420).y(10).itemHeight(35).gap(8))
        .on('pretransition', function(chart) {
            chart.selectAll('text.pie-slice').text(function(d) {
                return show_slice_percent(d.data.key, d.endAngle, d.startAngle);
            });
        })


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
            .dimension(dim)
            .group(group)
            .renderLabel(true)
            .elasticY(true)
            .transitionDuration(500)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Height")
            .yAxis().ticks(4);
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
            .brushOn(false)
            .dimension(dim)
            .group(group)
            .renderLabel(true)
            .title(function(d) {
            return d.value + " Characters weigh " + d.key;
        })
            .transitionDuration(500)
            .x(d3.scaleBand())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Weight")
            .yAxis().ticks(5);
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
        .columns(["birth_year","homeworld","Job","Vehicles", "Starships"])
        .size(Infinity)
        .useViewBoxResizing(true)
        .sortBy(function(d){
            return d.name;
        })
        .order(d3.ascending);

}


});





