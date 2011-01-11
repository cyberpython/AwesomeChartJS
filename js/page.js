var slides = new Array();
var currentSlide = -1;
var timeout = null;

$(document).ready(function(){
 
    drawCharts();
   
    $("#tabs>div .tab:first-of-type a").addClass('selected');
    $(".content").addClass('hidden');
    $("#home").removeClass('hidden');
    $("#demo_tab").css('display', 'block');
    
    $("#home_tab").click(function(e){
        e.preventDefault();
        $(".content").addClass('hidden');
        $("#tabs>div .tab a").removeClass('selected');
        
        $("#home").removeClass('hidden');
        $("#home_tab").addClass('selected');
    });

    $("#chart_types_tab").click(function(e){
        e.preventDefault();
        $(".content").addClass('hidden');
        $("#tabs>div .tab a").removeClass('selected');
        
        $("#chart_types").removeClass('hidden');
        $("#chart_types_tab").addClass('selected');
    });

    $("#spotlight_slider").children().each(function(){
        slides.push(this);
    });
    
    $(".slide").click(function (e) { 
        nextSlide();
    });
    
    $(".slide").css("cursor", "pointer");
    
   
    
    nextSlide();
              
});
 
function nextSlide(){
    clearTimeout(timeout);
    if(currentSlide>=0){
        $(slides[currentSlide]).fadeOut(1000, function() {
        });
    }
    currentSlide++;
    currentSlide = currentSlide % slides.length;
    $(slides[currentSlide]).fadeIn(1000, function() {
    });
    timeout = setTimeout(nextSlide, 10000);
}
 
function drawCharts(){
    if(!!document.createElement('canvas').getContext){
    
        var lingrad = document.getElementById('chartCanvas1').getContext('2d').createLinearGradient(0,0,0,200);
        lingrad.addColorStop(0.2, '#fdfdfd');
        lingrad.addColorStop(0.8, '#ededed');
        
        var chart1 = new AwesomeChart('chartCanvas1');
        chart1.chartType = 'exploded pie';
        chart1.data = [51.62,31.3,10.06,4.27,1.96,0.78];
        chart1.colors = ['#006CFF', '#FF6600', '#34A038', '#945D59', '#93BBF4', '#F493B8'];
        chart1.pieBorderWidth = 2;
        chart1.draw();
       
        var chart2 = new AwesomeChart('chartCanvas2');
        chart2.title = "Worldwide browser market share: December 2010";
        chart2.data = [51.62,31.3,10.06,4.27,1.96,0.78];
        chart2.labels = ['IE','Firefox','Chrome','Safari','Opera','Other'];
        chart2.backgroundFillStyle = lingrad;
        chart2.borderStrokeStyle = '#333';
        chart2.marginBottom = 1;
        chart2.draw();
    
    }
}

