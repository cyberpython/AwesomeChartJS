$(document).ready(function(){
        drawDemoCharts();
});

function drawDemoCharts(){
    if(!!document.createElement('canvas').getContext){
    
        var title = "Worldwide browser market share: December 2010";
        var data = [51.62,31.3,10.06,4.27,1.96,0.78];
        var labels = ['IE','Firefox','Chrome','Safari','Opera','Other'];
        var colors = ['#006CFF', '#FF6600', '#34A038', '#945D59', '#93BBF4', '#F493B8'];
            
        var chart1 = new AwesomeChart('horBarChartDemo');
        chart1.title = title;
        chart1.data = data;
        chart1.labels = labels;
        chart1.draw();
        
        var chart2 = new AwesomeChart('horBarChartColorDemo');
        chart2.title = title;
        chart2.data = data;
        chart2.labels = labels;
        chart2.colors = colors;
        chart2.draw();
        
        var chart3 = new AwesomeChart('verBarChartDemo');
        chart3.chartType = "horizontal bars";
        chart3.title = title;
        chart3.data = data;
        chart3.labels = labels;
        chart3.draw();
        
        var chart4 = new AwesomeChart('verBarChartColorDemo');
        chart4.chartType = "horizontal bars";
        chart4.title = title;
        chart4.data = data;
        chart4.labels = labels;
        chart4.colors = colors;
        chart4.draw();
        
        var chart5 = new AwesomeChart('pieChartDemo');
        chart5.chartType = "pie";
        chart5.title = title;
        chart5.data = data;
        chart5.labels = labels;
        chart5.draw();
        
        var chart6 = new AwesomeChart('pieChartColorDemo');
        chart6.chartType = "pie";
        chart6.title = title;
        chart6.data = data;
        chart6.labels = labels;
        chart6.colors = colors;
        chart6.draw();
        
        var chart7 = new AwesomeChart('expPieChartDemo');
        chart7.chartType = "exploded pie";
        chart7.title = title;
        chart7.data = data;
        chart7.labels = labels;
        chart7.draw();
        
        var chart8 = new AwesomeChart('expPieChartColorDemo');
        chart8.chartType = "exploded pie";
        chart8.title = title;
        chart8.data = data;
        chart8.labels = labels;
        chart8.colors = colors;
        chart8.draw();
        
        var chart9 = new AwesomeChart('doughnutChartDemo');
        chart9.chartType = "ring";
        chart9.title = title;
        chart9.data = data;
        chart9.labels = labels;
        chart9.draw();
        
        var chart10 = new AwesomeChart('doughnutChartColorDemo');
        chart10.chartType = "ring";
        chart10.title = title;
        chart10.data = data;
        chart10.labels = labels;
        chart10.colors = colors;
        chart10.draw();
        
        var chart11 = new AwesomeChart('paretoChartDemo');
        chart11.chartType = "pareto";
        chart11.title = title;
        chart11.data = data;
        chart11.labels = labels;
        chart11.draw();
        
        var chart12 = new AwesomeChart('paretoChartColorDemo');
        chart12.chartType = "pareto";
        chart12.title = title;
        chart12.data = data;
        chart12.labels = labels;
        chart12.colors = colors;
        chart12.chartLineStrokeStyle = 'rgba(0, 0, 200, 0.5)';
        chart12.chartPointFillStyle = 'rgb(0, 0, 200)';
        chart12.draw();
    
    }
}
