$(document).ready(function(){

    /* CREATE DATES -- FUTURE: NEED TO CONDENSE INTO FOR LOOP */
        var day = [];
        var date=[]
        var d = new Date();
        var month = d.getMonth()+1;
        var year = d.getFullYear();

        for (var x = 1; x < 10; x++) {
            console.log(day[x]);
            day[x] = d.getDate()-x;
        }
        
        var oldday = d.getDate()-2;
        console.log(day[1])

    /* IF/ELSE TO DETERMINE WHEN A 0 NEEDS TO BE ADDED TO THE BEGINING OF A MONTH */
for (var i = 1; i< 10; i++) {
        if (month < 10 && day[i] < 10) {
            date[i] = year+"-"+"0"+month+"-"+"0"+day[i];
        } else if (month < 10 && day[i] > 9) {
            date[i] = year+"-"+"0"+month+"-"+day[i];
        } else if (month > 9 && day[i] < 10) {
            date[i] = year+"-"+month+"-"+"0"+day[i];
        } else if (month > 9 && day[i] > 9) {
            date[i] = year+"-"+month+"-"+day[i];
        }
    }

    if (month < 10) {
        if (oldday < 10) {
            var oldDate = year+"-"+"0"+month+"-"+"0"+oldday;
        } else {
            var oldDate = year+"-"+"0"+month+"-"+oldday;
        }
    } else {
        if (oldday < 10) {
            var oldDate = year+"-"+month+"-"+"0"+oldday;
        } else {
            var oldDate = year+"-"+month+"-"+oldday;
        }
    }
        
    /* AJAX CALL */

    $.ajax({url: "/coindesk", success: function(result){
        
        var newData = result;
        console.log(date[1])
        console.log(newData.bpi[date[1]])
        console.log(oldDate)
        console.log(newData.bpi[oldDate])

        /* IF/ELSE STATEMENT TO DETERMINE WHEN PRICE HAS GONE UP OR DOWN FROM PREVIOUS DAY */

        if (newData.bpi[date[1]] > newData.bpi[oldDate]) {
            $("#price").addClass("up");
            $("#price").html("$" + (newData.bpi[date[1]]).toFixed(2))
            $("#dolgainloss").addClass("up");
            $("#dolgainloss").html("+$"+((newData.bpi[date[1]]-newData.bpi[oldDate])).toFixed(2));
            $("#pergainloss").addClass("up");
            $("#pergainloss").html("+"+((newData.bpi[date[1]]-newData.bpi[oldDate])/(newData.bpi[date[1]])*100).toFixed(2)+"%");
        } else {
            $("#price").addClass("down");
            $("#price").html("$" + (newData.bpi[date[1]]).toFixed(2))
            $("#dolgainloss").addClass("down");
            $("#dolgainloss").html("$"+((newData.bpi[date[1]]-newData.bpi[oldDate])).toFixed(2));
            $("#pergainloss").addClass("down");
            $("#pergainloss").html(((newData.bpi[date[1]]-newData.bpi[oldDate])/(newData.bpi[date[1]])*100)
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
        [date[9], newData.bpi[date[9]]],   [date[8], newData.bpi[date[8]]],  [date[7], newData.bpi[date[7]]],  [date[6], newData.bpi[date[6]]],  [date[5], newData.bpi[date[5]]],  [date[4], newData.bpi[date[4]]],
        [date[3], newData.bpi[date[3]]],  [date[2], newData.bpi[date[2]]],  [date[1], newData.bpi[date[1]]]
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
        backgroundColor: '#f1f8e9',
        'title':'Bitcoin 9 day price',
      };

      /* DRAW CHART */

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);

    } // end drawbackgroundcolor function

 }}) // end ajax call

}); // end (document).ready