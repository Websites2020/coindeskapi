$(document).ready(function(){

    /* CREATE DATES -- FUTURE: NEED TO CONDENSE INTO FOR LOOP */

        var d = new Date();
        var month = d.getMonth()+1;
        var year = d.getFullYear();

        var day = d.getDate()-1;
        var day2 = d.getDate()-2;
        var day3 = d.getDate()-3;
        var day4 = d.getDate()-4;
        var day5 = d.getDate()-5;
        var day6 = d.getDate()-6;
        var day7 = d.getDate()-7;
        var day8 = d.getDate()-8;
        var day9 = d.getDate()-9;
        
        var oldday = d.getDate()-2;

    /* IF/ELSE TO DETERMINE WHEN A 0 NEEDS TO BE ADDED TO THE BEGINING OF A MONTH */

    if (month < 10) {
        var date = year+"-"+"0"+month+"-"+day;
        var date2 = year+"-"+"0"+month+"-"+day2;
        var date3 = year+"-"+"0"+month+"-"+day3;
        var date4 = year+"-"+"0"+month+"-"+day4;
        var date5 = year+"-"+"0"+month+"-"+day5;
        var date6 = year+"-"+"0"+month+"-"+day6;
        var date7 = year+"-"+"0"+month+"-"+day7;
        var date8 = year+"-"+"0"+month+"-"+day8;
        var date9 = year+"-"+"0"+month+"-"+day9;
    } else {
        var date = year+"-"+month+"-"+day;
        var date2 = year+"-"+month+"-"+day2;
        var date3 = year+"-"+month+"-"+day3;
        var date4 = year+"-"+month+"-"+day4;
        var date5 = year+"-"+month+"-"+day5;
        var date6 = year+"-"+month+"-"+day6;
        var date7 = year+"-"+month+"-"+day7;
        var date8 = year+"-"+month+"-"+day8;
        var date9 = year+"-"+month+"-"+day9;
    }

    var oldDate = year+"-"+"0"+month+"-"+oldday;

    /* FUTURE CONTENT */
    /*--------------------------------------------------------*/

    // $("#today").html(month + "/" + day + "/" + year);
    // $("#yesterday").html(month + "/" + oldday + "/" + year);
    // $("#yesterday2").html(month + "/" + oldday + "/" + year)

    /*--------------------------------------------------------*/
        
    /* AJAX CALL */

    $.ajax({url: "/coindesk", success: function(result){
        
        var newData = result;

        /* IF/ELSE STATEMENT TO DETERMINE WHEN PRICE HAS GONE UP OR DOWN FROM PREVIOUS DAY */

        if (newData.bpi[date] > newData.bpi[oldDate]) {
            $("#price").addClass("up");
            $("#price").html("$" + (newData.bpi[date]).toFixed(2))
            $("#dolgainloss").addClass("up");
            $("#dolgainloss").html("+$"+((newData.bpi[date]-newData.bpi[oldDate])).toFixed(2));
            $("#pergainloss").addClass("up");
            $("#pergainloss").html("+"+((newData.bpi[date]-newData.bpi[oldDate])/(newData.bpi[date])*100).toFixed(2)+"%");
        } else {
            $("#price").addClass("down");
            $("#price").html("$" + (newData.bpi[date]).toFixed(2))
            $("#dolgainloss").addClass("down");
            $("#dolgainloss").html("$"+((newData.bpi[date]-newData.bpi[oldDate])).toFixed(2));
            $("#pergainloss").addClass("down");
            $("#pergainloss").html(((newData.bpi[date]-newData.bpi[oldDate])/(newData.bpi[date])*100)
            .toFixed(2)+"%");
        }           
        
    /* GOOGLE CHART */

    google.charts.load('current', {packages: ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawBackgroundColor);

    function drawBackgroundColor() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'date');
        data.addColumn('number', '$');

        /* DATA */

      data.addRows([
        [date9, newData.bpi[date9]],   [date8, newData.bpi[date8]],  [date7, newData.bpi[date7]],  [date6, newData.bpi[date6]],  [date5, newData.bpi[date5]],  [date4, newData.bpi[date4]],
        [date3, newData.bpi[date3]],  [date2, newData.bpi[date2]],  [date, newData.bpi[date]]
      ]);

      /* CHART OPTIONS */

      var options = {
        hAxis: {
          title: 'Date'
        },
        vAxis: {
          title: 'Price in U.S. Dollars'
        },
        'width':"100%",
        'height':300,
        backgroundColor: '#f1f8e9'
      };

      /* DRAW CHART */

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

    } // end drawbackgroundcolor function

 }}) // end ajax call

}); // end (document).ready