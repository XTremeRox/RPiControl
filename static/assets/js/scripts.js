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
      mainswitch = $('ons-switch')[0];
      voltincpin = "10";
      voltinc = $('ons-switch')[1];
      memorypin = "4";
      memory = $('ons-switch')[2];
      htstartpin="9";
      htstart = $('ons-switch')[3];
      incvoltpin="27";
      incvolt = $('ons-switch')[4];
      decvoltpin="22";
      decvolt = $('ons-switch')[5];
      htstopin = "17"
      htstop = $('ons-switch')[6];
      testpin = "16";
      test = $('ons-switch')[7];

      memory.addEventListener('change', function(){
        load();
        obj = {secret : secret} ;
        $.ajax({
            url: 'http://'+hostname+':'+port+'/push',
            crossDomain: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(obj),
            async: true,
            success: function(data){
                if(!data.hasOwnProperty('err') && data.success == '1'){
                    loaded();
                    $('#reading').find('h1')[0].innerHTML=value;
                    $("#reading").toggle();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
      });
      mainswitch.addEventListener('change', function(){
        obj = {pin : mainswitch, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
    voltinc.addEventListener('change', function(){
        obj = {pin : voltincpin, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
    htstart.addEventListener('change', function(){
        obj = {pin : htstartpin, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
    incvolt.addEventListener('change', function(){
        obj = {pin : incvoltpin, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
    decvolt.addEventListener('change', function(){
        obj = {pin : decvoltpin, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
    htstop.addEventListener('change', function(){
        obj = {pin : htstopin, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
    test.addEventListener('change', function(){
        obj = {pin : testpin, secret : secret} ;
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
                    loaded();
                }else{
                    ons.notification.alert('Something went Wrong!');
                    loaded();
                }
            },
            error: function(error){
                 ons.notification.alert('Device is offline!');
            }
        });
    });
      pins = [11,10,4,9,27,22,17,16];
      //todo - $ajax-status of all switches
      $.ajax({
        url: 'http://'+hostname+':'+port+'/status',
        type: "GET",
        dataType: "json",
        contentType: 'application/json',
        async: true,
        success: function(data){
            for (var i = 0; i < pins.length; i++) {
                if(data[(pins[i].toString())] == "on"){
                    $('ons-switch')[i].checked = true;
                }else{
                    $('ons-switch')[i].checked = false;
                }
            }
            ons.notification.alert('Status Updated!');
        },
        error: function(error){
             ons.notification.alert('Unable to get status!');
        }
    });
    }
});

