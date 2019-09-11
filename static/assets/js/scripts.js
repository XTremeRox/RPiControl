
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
                        ons.notification.alert('Device Alive!');
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
      mainswitch = $('ons-switch')[0];
      voltinc = $('ons-switch')[1];
      memory = $('ons-switch')[2];
      htstart = $('ons-switch')[3];
      incvolt = $('ons-switch')[4];
      decvolt = $('ons-switch')[5];
      htstop = $('ons-switch')[6];

      memory.addEventListener('change', function(){
          $("#reading").toggle();
      })
    }
});

