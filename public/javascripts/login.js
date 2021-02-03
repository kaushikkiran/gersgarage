const login = async() => 
{
  var userName = $('#userName').val();
  var password = $('#password').val();
  var url = '/api/v1/users/login';
  try
  {
    $.post(url, {userName: userName, password: password}, function(result){
      
      //document.cookie = result.userName + "_" + result.userRole;
      window.location = "/home";
    });
  }
  catch (err) {
    alert('error', err.response.data.message);
    //console.log('error', err.response.data.message);
  }
};


const logout = async () => {
  var url = '/api/v1/users/logout';
  try
  {
    $.get(url, function(result)
    {
      if (result.status === "success")
      {
        window.location = "/";
      }
    });
  }
  catch (err) {
    console.log('error', err.response.data.message);
  }
};
