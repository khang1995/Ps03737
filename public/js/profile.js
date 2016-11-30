$(document).ready(function (e) {
		var listemail=[];
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		firebase.database().ref('/users').on('value',function(snapshot){
	        snapshot.forEach(function(childSnapshot) {
	            listemail.push(childSnapshot.val().email);
	        });
    	});
		$('.profilename').html(localStorage.getItem("name"));
		$('#left-col-name').html(localStorage.getItem("name"));
		$('#profilename1').html(localStorage.getItem("name"));
		$('#profilename').html(localStorage.getItem("name"));
		$('#openchooseimg').on('click', function() {
		    $('#theFile').trigger('click');
		});
		$("input[type=file]").bind("change", function() {
		    var selected_file_name = $(this).val();
		    if ( selected_file_name.length > 0 ) {
		    	$(".overlay").show();
		        var data;
				data = new FormData();
				data.append( 'name',localStorage.getItem("username"));
	    		data.append( 'file', $( '#theFile' )[0].files[0] );
				$.ajax({
						url: "http://quanlychitieu.info/upload.php",
						type: "POST",            
						data: data, 
						contentType: false,       
						cache: false,          
						processData:false,     
						success: function(data1)   
						{
							$(".overlay").hide();
							if(data1 =="Sai định dạng file")
								$.notify({ message: '<h4>Sai định dạng file hoặc ảnh quá lớn</h4>'},{ type: "danger", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 1000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
							else
							firebase.database().ref('users/'+localStorage.getItem('key')+'/avatar').set(data1);
						}
				});
		    }
		});
		var password;
		firebase.database().ref('users/'+localStorage.getItem('key')+'/password').on('value', function(snapshot) {
		 		password=snapshot.val();
		});
		firebase.database().ref('users/'+localStorage.getItem('key')+'/email').on('value', function(snapshot) {
				$('#email').html('Email:  '+snapshot.val());
		});
		$('#value').on('click',function(){
          $('.err').html('');
      	});
      	$('#oldpassword').keydown(function(e){
              if(e.keyCode == 13)
              {
                 $('#newpassword').focus();
                 $('#value').focus();
              }
        });
		$('#newpassword').keydown(function(e){
              if(e.keyCode == 13)
              {
                  $('#updatePassword').click();
              }
        });
		$('#value').keydown(function(e){
              if(e.keyCode == 13)
              {
                  $('#updateEmail').click();
              }
          });
		$('#logout').on('click',function(){
          localStorage.removeItem("key");
          localStorage.removeItem("name");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
         });
		$('#openpassword').on('click',function(){
			$('.err').html('');
			$('#showemail').hide();
			$('#showmatkhaumoi').show();
			$('#title').html('Thay đổi mật khẩu');
			$('#updatePassword').show();
			$('#updateEmail').hide();
			$('#oldpassword').val("");
			$('#newpassword').val('');
			$('#value').val('');
		});
		$('#openemail').on('click',function(){
			$('.err').html('');
			$('#showmatkhaumoi').hide();
			$('#showemail').show();
			$('#title').html('Thay đổi Email');
			$('#updatePassword').hide();
			$('#updateEmail').show();
			$('#oldpassword').val("");
			$('#newpassword').val('');
			$('#value').val('');
			
		});
		$('#myModal').on('shown.bs.modal', function () {
            $('#oldpassword').focus();
        }); 
		$('#updatePassword').on('click',function(){
			oldpassword=$('#oldpassword').val();
			data=$('#newpassword').val();
			if(data==""){
				$('.err').html('<ul><li style="color:#b72012">Mật khẩu không được trống</li</ul>');
			}else if(oldpassword!=password){
				$('.err').html('<ul><li style="color:#b72012">Mật khẩu cũ không đúng</li</ul>');
			}else if(data.length > 30 || data.length< 6){
             	$('.err').html('<ul><li style="color:#b72012;"><b>Mật khẩu mới quá dài hoặc quá ngắn</b></li></ul>');
        	}else if(password==data){
             	$('.err').html('<ul><li style="color:#b72012;"><b>Mật khẩu cũ không được giống mật khẩu mới</b></li></ul>');
        	}else{
        		firebase.database().ref('users/'+localStorage.getItem('key')+'/password').set(data);
        		localStorage.setItem("password", CryptoJS.AES.encrypt(data, "password"));
        		$('#myModal').modal('toggle');
        		$.notify({ message: '<h4>Cập nhật mật khẩu thành công</h4>'},{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 1000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
			}
		});
		$('#updateEmail').on('click',function(){
			isEmailUsed=false;
			oldpassword=$('#oldpassword').val();
			data=$('#value').val();
			for (var i = 0; i < listemail.length; i++) {
	            if(listemail[i]==data){
	                isEmailUsed=true;
	            }
        	}
        	if(oldpassword!=password){
				$('.err').html('<ul><li style="color:#b72012">Mật khẩu cũ không đúng</li</ul>');
			}else if(data == ""){
            	$('.err').html('<ul><li style="color:#b72012;"><b>Email không được trống</b></li></ul>');
	        }else if(!re.test(data)){
	            $('.err').html('<ul><li style="color:#b72012;"><b>Email không hợp lệ</b></li></ul>');
	        }else if(isEmailUsed){
	            $('.err').html('<ul><li style="color:#b72012;"><b>Email đã được sử dụng</b></li></ul>');
	        }else{
	        	firebase.database().ref('users/'+localStorage.getItem('key')+'/email').set(data);
	        	$('#myModal').modal('toggle');
	        		$.notify({ message: '<h4>Cập nhật email thành công</h4>'},{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 1000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
	        }
		});
});