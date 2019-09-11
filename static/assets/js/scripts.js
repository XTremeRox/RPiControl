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
      mainswitch = $('ons-switch')[0];
      voltinc = $('ons-switch')[1];
      memory = $('ons-switch')[2];
      htstart = $('ons-switch')[3];
      incvolt = $('ons-switch')[4];
      decvolt = $('ons-switch')[5];
      htstop = $('ons-switch')[6];
      test = $('ons-switch')[7];

      memory.addEventListener('change', function(){
          $("#reading").toggle();
          //todo - $ajax.
      });
      mainswitch.addEventListener('change', function(){
        //todo - $ajax.
    });
    voltinc.addEventListener('change', function(){
        //todo - $ajax.
    });
    htstart.addEventListener('change', function(){
        //todo - $ajax.
    });
    incvolt.addEventListener('change', function(){
        //todo - $ajax.
    });
    decvolt.addEventListener('change', function(){
        //todo - $ajax.
    });
    htstop.addEventListener('change', function(){
        //todo - $ajax.
    });
    test.addEventListener('change', function(){
        obj = {pin : "16", secret : secret} ;
        load();
        $.ajax({
            url: 'http://'+hostname+':'+port+'/toggle',
            crossDomain: true,
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(obj),
            async: false,
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
        async: false,
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

