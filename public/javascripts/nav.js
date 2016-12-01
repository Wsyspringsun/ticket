$(function(){
    $('#nav a').click(function(){
        var me = $(this);
        var url = me.attr('href');
        if(url==='#'){
            me.down('ul').toggle();
        }
    });
});

