var request =   require('request');
var _   =   {
    get:function(e,i){
				//Get rid of the self signed error 
				process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
				i	=	i||0;
        request({
					url:e.url,
					headers: {
						'User-Agent': 'Schedular.io Server'
					}
				}, function(error, response, body) {
          if (response==undefined || error || response.statusCode !== 200) {
							console.log('DEBUG URL: '+e.url);
							console.log('DEBUG ERROR: '+error);
							if(i>=3)
								return e.error&&e.error();
						
							setTimeout(function(){
								_.get(e,i+1);
							},1000)
              return;
          }
					e.done&&e.done(body);
        })
		}
}

module.exports	=	_;