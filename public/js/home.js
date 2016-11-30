var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
jQuery(document).ready(function() {
    //cấu hình firebase
    var listusername=[],listemail=[];
    var patt1 = /\s/g;
    
    var ref=firebase.database().ref('/users');
    //hiệu ứng
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    ref.on('value',function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            listusername.push(childSnapshot.val().username);
            listemail.push(childSnapshot.val().email);
        });
    });
    $('.login-form').on('keydown', 'input', function (event) {
        if (event.which == 13) {
            event.preventDefault();
            var $this = $(event.target);
            var index = parseFloat($this.attr('data-index-login'));
            $('[data-index-login="' + (index + 1).toString() + '"]').focus();
        }
    });
    $('.login-form').on('click', function(e) {
        $(this).find('input[type="text"], input[type="password"], textarea').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
    });
    $('.login-form').on('click', function(e) {
        $('.err').html('');
        
    });
    $('.registration-form').on('click', function(e) {
        $('.err2').html(' ');
        
    });
    $('#forgetemail').on('click', function(e) {
        $('.err2').html('');
    });
    //validate login
    
     $('#signin').on('click', function(e) {
        if($('#signinusername').val()==""){
             $('.err').html('<ul><li style="color:#b72012;"><b>Tài khoản không được trống</b></li></ul>');
        }else if($('#signinpassword').val()== ""){
             $('.err').html('<ul><li style="color:#b72012;"><b>Mật khẩu không được trống</b></li></ul>');
        }else{
            var $this = $(this);
            $this.button('loading');
            var flag=false;
            if(re.test($('#signinusername').val())){
                ref.orderByChild("email").equalTo($('#signinusername').val()).once("child_added", function(snapshot) {
                    flag=true;
                    var password=snapshot.val().password;
                    if(password!=$('#signinpassword').val()){
                        $('.err').html('<ul><li style="color:#b72012;"><b>Sai mật khẩu</b></li></ul>');
                    }else if(password==$('#signinpassword').val()){
                        localStorage.setItem("key", snapshot.key);
                        localStorage.setItem("name", snapshot.val().name);
                        localStorage.setItem("username", snapshot.val().username);
                        localStorage.setItem("password", CryptoJS.AES.encrypt(snapshot.val().password, "password"));
                        location='index.html';
                    }
                });
            }else{
                ref.orderByChild("username").equalTo($('#signinusername').val()).once("child_added", function(snapshot) {
                    flag=true;
                    var password=snapshot.val().password;
                    if(password!=$('#signinpassword').val()){
                        $('.err').html('<ul><li style="color:#b72012;"><b>Sai mật khẩu</b></li></ul>');
                    }else if(password==$('#signinpassword').val()){
                        localStorage.setItem("key", snapshot.key);
                        localStorage.setItem("name", snapshot.val().name);
                        localStorage.setItem("username", snapshot.val().username);
                        localStorage.setItem("password", CryptoJS.AES.encrypt(snapshot.val().password, "password"));
                        location='index.html';
                    }
                });
            }
            setTimeout(function(){ 
                $this.button('reset');
                if(!flag){
                    $('.err').html('<ul><li style="color:#b72012;"><b>Sai tài khoản</b></li></ul>');
                }
            }, 1000);
        }
    });
    $('#signinpassword').keydown(function(e){
        if(e.keyCode == 13)
        {
            $('#signin').click();
        }
    });
    
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    $('.registration-form').on('keydown', 'input', function (event) {
        if (event.which == 13) {
            event.preventDefault();
            var $this = $(event.target);
            var index = parseFloat($this.attr('data-index'));
            $('[data-index="' + (index + 1).toString() + '"]').focus();
        }
    });
    $('.registration-form').on('click', function(e) {
        $(this).find('input[type="text"],input[type="password"]').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
    });
    var ref1=firebase.database().ref('/users'); 
    $('#register').on('click', function(e) {
        var isEmailUsed=false,isUsernameUsed=false;
        for (var i = 0; i < listemail.length; i++) {
            if(listemail[i]==$('#registeremail').val()){
                isEmailUsed=true;
            }
        }
        for (var i = 0; i < listemail.length; i++) {
            if(listusername[i]==$('#registerusername').val()){
                isUsernameUsed=true;
            }
        }
        if($('#registername').val() == ""){
            $('.err2').html('<ul><li style="color:#b72012;"><b>Họ tên không được trống</b></li></ul>');
            return;
        }else if($('#registeremail').val() == ""){
            $('.err2').html('<ul><li style="color:#b72012;"><b>Email không được trống</b></li></ul>');
            return;
        }else if(!re.test($('#registeremail').val())){
            $('.err2').html('<ul><li style="color:#b72012;"><b>Email không hợp lệ</b></li></ul>');
            return;
        }else if(isEmailUsed){
            $('.err2').html('<ul><li style="color:#b72012;"><b>Email đã được sử dụng</b></li></ul>');
             return;
        }else if($('#registerusername').val()==""){
             $('.err2').html('<ul><li style="color:#b72012;"><b>Tài khoản không được trống</b></li></ul>');
             return;
        }else if(patt1.test( $('#registerusername').val())){
             $('.err2').html('<ul><li style="color:#b72012;"><b>Tài khoản không được có khoảng trắng</b></li></ul>');
             return;
        }else if($('#registerusername').val().length >20 ||$('#registerusername').val().length<6){
             $('.err2').html('<ul><li style="color:#b72012;"><b>Tài khoản quá dài hoặc qua ngắn</b></li></ul>');
             return;
        }else if(isUsernameUsed){
            $('.err2').html('<ul><li style="color:#b72012;"><b>Tài khoản đã được sử dụng</b></li></ul>');
             return;
        }else if($('#registerpass').val()== ""){
             $('.err2').html('<ul><li style="color:#b72012;"><b>Mật khẩu không được trống</b></li></ul>');
             return;
        }else if( $('#registerpass').val().length > 30 || $('#registerpass').val().length< 6){
             $('.err2').html('<ul><li style="color:#b72012;"><b>Mật khẩu quá dài hoặc quá ngắn</b></li></ul>');
             return;
        }else{
                ref1.push().set({
                      username:$('#registerusername').val(),
                      name:$('#registername').val(),
                      password:$('#registerpass').val(),
                      email:$('#registeremail').val()
                });
                $('.err2').html('');
                $('#registerusername').val('');
                $('#registeremail').val('');
                $('#registerpass').val('');
                $('#registername').val('');
                $.notify({ message: '<h4>Đăng ký thành công</h4>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 0, spacing: 20, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
        }
    });
    $('#registerpass').keydown(function(e){
        if(e.keyCode == 13)
        {
            $('#register').click();
        }
        });
    });
   (function(){
      emailjs.init("user_IBKZKU66fttwWDE8buSbk");
   })();

     $('#quenmk').on('click', function(e) {
        if($('#forgetemail').val() == ""){
            $('.err3').html('<b style="color:#b72012;float:left;margin-left:10px">Email không được trống</b>');
            
        }else if(!re.test($('#forgetemail').val())){
             $('.err3').html('<b style="color:#b72012;float:left;margin-left:10px">Email không hợp lệ</b>');

        }else{
           var $this = $(this);
           $this.button('loading');
           var flag=false;
           firebase.database().ref('/users').orderByChild("email").equalTo($('#forgetemail').val()).once("child_added", function(snapshot) {
                    var randompassword=Math.random().toString(24).substring(7);
                    flag=true;
                    $('#myModal').modal('toggle');
                    emailjs.send('default_service', 'template_otoQRGnk', {"send_to":$('#forgetemail').val(),"to_name":snapshot.val().name,"message_html":randompassword});
                    $.notify({ message: '<h4>Gửi email thành công</h4><br><p>Bạn vui lòng kiểm tra email để lấy lại mật khẩu</p>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 0, spacing: 20, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });                  
                    var postData;
                    if(snapshot.val().username=="khang1995"){
                        postData= {
                        password:randompassword,
                        name:snapshot.val().name,
                        tien:snapshot.val().tien,
                        phong:snapshot.val().phong,
                        username:snapshot.val().username,
                        tienphong:snapshot.val().tienphong,
                        email:snapshot.val().email,
                        };
                    }else{
                        postData = {
                        password:randompassword,
                        name:snapshot.val().name,
                        tien:snapshot.val().tien,
                        username:snapshot.val().username,
                        email:snapshot.val().email,
                        };
                    }
                    var updates = {};
                    updates['/users/'+ snapshot.key] = postData;
                    firebase.database().ref().update(updates);
            });
           setTimeout(function(){ 
                $this.button('reset');
                if(!flag){
                    $('.err3').html('<b style="color:#b72012;float:left;margin-left:10px">Email không tồn tại trên hệ thống</b>');
                }
            }, 1000);
         }
    });
