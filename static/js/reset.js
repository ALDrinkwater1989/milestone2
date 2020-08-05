$('#reset-filters').click(function(){

    dc.filerAll();
    dc.renderAll();
});

$('.hide-content-btn').click(function(){
    $(this).parent().nextAll('.hide-content-toggle').slideToggle();
    $(this).parent().parent().parent().toggleClass('eq-column-height');
    $(this).toggleClass('fa-angle-down');
    $(this).toggleClass('fa-angle-up');
})