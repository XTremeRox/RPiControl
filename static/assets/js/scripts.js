function loaded(){ 
    document.getElementById("loading").style.display = "none" ;
}
function load(){
    document.getElementById("loading").style.display = "block" ;
}
document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.id === 'setup') {
      page.querySelector('#go-button').onclick = function() {
        var hostname = document.getElementById('hostname').value;
        var port = document.getElementById('port').value;
        var secret = document.getElementById('secret').value;
        var obj = {secret : secret} ;
        if (hostname && port && secret ) {
            $.ajax({
                url: 'http://'+hostname+':'+port+'/live',
                crossDomain: true,
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(obj),
                async: false,
                success: function(data){
                    if(data.status === 'alive'){
                        ons.notification.alert('Device Online!');
                        document.querySelector('#myNavigator').pushPage('dashboard.html', {data: {title: 'Dashboard'}});
                    }else{
                        console.log('http://'+hostname+':'+port+'/live');
                        ons.notification.alert('Wrong Code!');
                    }
                },
                error: function(error){
                     ons.notification.alert('Device is offline!');
                }
            });
        } else {
            ons.notification.alert('Please input something');
        }
      };
    } else if (page.id === 'dashboard') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
      var hostname = document.getElementById('hostname').value;
      var port = document.getElementById('port').value;
      var secret = document.getElementById('secret').value;
      //pin and DOM position
      mainswitchpin = "11";
      mainswitch = $('#ms');
      voltincmpin = "10";
      voltincm = $('#inc_volt_mode');
      voltincm.attr("disabled", true);
      memorypin = "5";
      memory = $('#memory_button');
      memory.attr("disabled", true);
      htstartpin="9";
      htstart = $('#ht_start');
      htstart.attr("disabled", true);
      incvoltpin="27";
      incvolt = $('#inc_volt');
      incvolt.attr("disabled", true);
      decvoltpin="22";
      decvolt = $('#dec_volt');
      decvolt.attr("disabled", true);
      htstopin = "17"
      htstop = $('#ht_stop');
      htstop.attr("disabled", true);
      testpin = "16";
      //status of switches
      switches = []
      //test = $('#led');
      memorychange = 0
      memory.on('click', function(){
        load();
        obj = {secret : secret} ;
        if(memorychange == 0){
            $.ajax({
                url: 'http://'+hostname+':'+port+'/push',
                crossDomain: true,
                type: "POST",
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(obj),
                async: true,
                success: function(data){
                    if(!data.hasOwnProperty('error') && data.reading){
                        loaded();
                        $('#reading').find('h1')[0].innerHTML=data.reading;
                        $("#reading").toggle();
                        memory.toggleClass("btntoggled"); 
                        memorychange = 1;
                    }else{
                        ons.notification.alert('Something went Wrong!');
                        loaded();
                    }
                },
                error: function(error){
                     ons.notification.alert('Device is offline!');
                     loaded();
                }
            });
        }else{
            memorychange = 0;
            $("#reading").toggle();
            memory.toggleClass("btntoggled"); 
            loaded();
        }
      });
      mainswitch.on('click', function(e){
        obj = {pin : mainswitchpin, secret : secret} ;
        load();
        $.ajax({
            url: 'http://'+hostname+':'+port+'/toggle',
            crossDomain: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(obj),
            async: true,
            success: function(data){
                if(!data.hasOwnProperty('err') && data.success == '1'){
                    $('#ms').toggleClass("btntoggled"); 
                    voltincm.attr("disabled", false);
                    memory.attr("disabled", false);
                    htstart.attr("disabled", false);
                    incvolt.attr("disabled", false);
                    decvolt.attr("disabled", false);
                    htstop.attr("disabled", false);
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
                 loaded();
            }
        });
        e.preventDefault();
    });
    
      pins = [11,10,5,9,27,22,17,16];
      //todo - $ajax-status of all switches
      //$.ajax({
        //url: 'http://'+hostname+':'+port+'/status',
        //type: "GET",
        //dataType: "json",
        //contentType: 'application/json',
        //async: true,
        //success: function(data){
            //for (var i = 0; i < pins.length; i++) {
                //if(data[(pins[i].toString())] == "on"){
                    //$('ons-switch')[i].checked = true;
                //}else{
                    //$('ons-switch')[i].checked = false;
                //}
            //}
            //ons.notification.alert('Status Updated!');
        //},
        //error: function(error){
             //ons.notification.alert('Unable to get status!');
        //}
    //});
    }
});

