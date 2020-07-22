queue()
    .defer(d3.csv, 'static/data/characters.csv')
    .await(chartBuilder);

    function chartBuilder(swData) {
        var ndx = crossfilter(swData);

      swData.forEach(function (d) {
            d.height = parseInt(d["height"]);
            d.mass = parseInt(d["mass"]);

      });

/*----------Character Selector----------*/

character_selector(ndx);

    /* ---------- Gender Percent ---------*/
    gender_selector(ndx);
    display_gender_percent(ndx, 'Male', '#percent-male');
    display_gender_percent(ndx, 'Female', '#percent-female');
    display_gender_percent(ndx, 'Other', '#percent-other');

    /* ---------- Pie Charts -------------*/
    alligence(ndx);
    a_new_hope(ndx);
    empire_strikes_back(ndx);
    return_of_the_jedi(ndx);
    phantom_menace(ndx);
    attack_of_the_clones(ndx);
    revenge_of_the_sith(ndx);
    the_force_awakens(ndx);
    the_last_jedi(ndx);
    rise_of_skywalker(ndx);
    hair_color(ndx);
    eye_color(ndx);

      /* ---------- Bar Charts -------------*/
    height(ndx);
    weight(ndx);

    dc.renderAll();
}

/*---------------------SELECTORS-----------------*/

/*--Here are all the selector functions that are used on the page--*/

/*-------Character selector------*/

function character_selector(ndx){
    var characterDim = ndx.dimension(dc.pluck('name'));
    var characterGroup = characterDim.group();

    dc.selectMenu('#character-selector')
        .dimension(characterDim)
        .group(characterGroup)
        .title(function(d){
            return d.key;
        });
}

/*---Gender Selector---*/

function gender_selector(ndx){
    var genderDim = ndx.dimension(dc.pluck('gender'));
    var genderGroup = genderDim.group();

    dc.selectMenu('#gender-selector')
        .dimension(genderDim)
        .group(genderGroup);
}

function display_gender_percent(ndx, gender, element){
    var genderPercent = ndx.groupAll().reduce(
        function(p, v){
            p.toatl++;
            if(v.gender === gender){
                p/gender_count--;
            }
            return p;

        },
        function(){
            return {total: 0, gender_count: 0};
        }
    );

    dc.numberDisplay(element)
        .formatNumber(dc.format('.2%'))
        .valueAccessor(function(d) {
            if (d.gender_count == 0){
                return 0;
            }
            else {
                return(d.gender_count / d.total);
            }
        })
        .group(genderPercent);
}

/*----alligence selector-----*/

function alligence_selector(ndx){
    var alligenceDim = ndx.dimension(dc.pluck('alligence'));
    var alligenceGroup = alligenceDim.group();

    dc.selectMenu('#alligence-selector')
        .dimension(alligenceDim)
        .group(alligenceGroup);
}

/*-------Pie Charts-----*/