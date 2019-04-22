$(document).ready(function(){
    $("button").click(function(){
        var d = new Date();
        var month = d.getMonth()+1;
        var year = d.getFullYear();
        var day = d.getDate()-1;
        var oldday = d.getDate()-2;
        if (month < 10) {
            var date = year+"-"+"0"+month+"-"+day;
        } else {
            var date = year+"-"+month+"-"+day;
        }
        var oldDate = year+"-"+"0"+month+"-"+oldday;
        
        console.log(date);
        $.ajax({url: "https://api.coindesk.com/v1/bpi/historical/close.json", success: function(result){
            var newData = JSON.parse(result);
            console.log(newData.bpi[date]);
            console.log(newData.bpi[oldDate]);
            if (newData.bpi[date] > newData.bpi[oldDate]) {
                $("#price").addClass("up");
                $("#price").html("$" + newData.bpi[date])
                $("#dolgainloss").addClass("up");
                $("#dolgainloss").html("+$"+((newData.bpi[date]-newData.bpi[oldDate])).toFixed(2));
                $("#pergainloss").addClass("up");
                $("#pergainloss").html("+"+((newData.bpi[date]-newData.bpi[oldDate])/(newData.bpi[date])*100).toFixed(2)+"%");
            } else {
                $("#price").addClass("down");
                $("#price").html("$" + newData.bpi[date])
                $("#dolgainloss").addClass("down");
                $("#dolgainloss").html("$"+((newData.bpi[date]-newData.bpi[oldDate])).toFixed(2));
                $("#pergainloss").addClass("down");
                $("#pergainloss").html(((newData.bpi[date]-newData.bpi[oldDate])/(newData.bpi[date])*100)
                .toFixed(2)+"%");
            }           
        }});
    });

});