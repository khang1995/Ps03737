    if (sessionStorage.clickcount==1) {
        $('#thunhapactive').attr('class','active');
        $('#chitieuactive').attr('class','');
        $('#chuyenactive').attr('class','');
        $('#tab_content2').attr('class','tab-pane active in fade');
        $('#tab_content1').attr('class','tab-pane fade');
        $('#tab_content3').attr('class','tab-pane fade');
    }else if (sessionStorage.clickcount==2) {
        $('#thunhapactive').attr('class','');
        $('#chitieuactive').attr('class','');
        $('#chuyenactive').attr('class','active');
        $('#tab_content1').attr('class','tab-pane  fade');
        $('#tab_content2').attr('class','tab-pane  fade');
        $('#tab_content3').attr('class','tab-pane active in fade');
    }
    sessionStorage.IsLogin = 1;
    var magd;
    var taikhoanbandau;
    var key;
    var sothebandau;
    var sothe=[];
    var k=0,n=0,l=0;
    var sotienbandau=0;
    var sotienmathientai=0,sotientietkiemhientai=0;
    var ref=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanchi').orderByChild('ngaythang');
    var ref1=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanthu').orderByChild('ngaythang');
    var datatable,datatable1,datatable2;
    var ref_lichsu=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat');
    var ref_lichsu1=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard');
    var ref_lichsu2=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutietkiem');
    var reftienmat=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/tienmat');
    var reftietkiem=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/tientietkiem');
    var refkhoanchuyen=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanchuyen');
    reftienmat.on('value', function(snapshot) {
        sotienmathientai= Number(snapshot.val());
    });
    reftietkiem.on('value', function(snapshot) {
        sotientietkiemhientai= Number(snapshot.val());
    });
    var lichsudata=[],lichsudata1=[],lichsudata2=[];
    ref_lichsu.on("value", function(snapshot, prevChildKey) {
      lichsudata=[];
      snapshot.forEach(function(childSnapshot) {
          lichsudata.push({magd:childSnapshot.val().magd,sotien:childSnapshot.val().sotien,key:childSnapshot.key,sodu:childSnapshot.val().sodu,ngaythang:childSnapshot.val().ngaythang,trangthai:childSnapshot.val().trangthai});
      });
    });
    
    ref_lichsu1.on("value", function(snapshot, prevChildKey) {
      lichsudata1=[];
      snapshot.forEach(function(childSnapshot) {
          lichsudata1.push({magd:childSnapshot.val().magd,sotien:childSnapshot.val().sotien,key:childSnapshot.key,sodu:childSnapshot.val().sodu,sothe:childSnapshot.val().sothe,ngaythang:childSnapshot.val().ngaythang,trangthai:childSnapshot.val().trangthai});
      });
    });

    ref_lichsu2.on("value", function(snapshot, prevChildKey) {
      lichsudata2=[];
      snapshot.forEach(function(childSnapshot) {
          lichsudata2.push({magd:childSnapshot.val().magd,loaichuyen:childSnapshot.val().loaichuyen,sotien:childSnapshot.val().sotien,key:childSnapshot.key,sodu:childSnapshot.val().sodu,sothe:childSnapshot.val().sothe,ngaythang:childSnapshot.val().ngaythang});
      });
    });

    var chedochuyen,opttm,opttd,opttk;
    var refdanhsachthe=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/danhsachthe');
        refdanhsachthe.on('value', function(snapshot) {
          if(snapshot.val()==null){
            $('#divthe').html('Bạn không có thẻ nào');
            $('#chonhide').hide();
            dkchonhide=false;
          }else{
            sothe=[];
            $('#divthe').html('');
            dem=0;
            chedochuyen='';
            opttm='';
            opttd='';
            opttk='';
            $(".chedochuyen").html('');
          }
            snapshot.forEach(function(childSnapshot) {
              sothe.push({sothe:childSnapshot.val().sothe,idthe:"the"+dem,sotien:childSnapshot.val().sotien,tenthe:childSnapshot.val().tenthe,key:childSnapshot.key});
              if(dem==0)
                $('#divthe').append('<label  style="width: 100%"><input id="the'+dem+'" type="radio" checked="checked" name="chonthe" value="'+ childSnapshot.val().sothe +'"><b style="margin-left: 15px">'+childSnapshot.val().tenthe+' ('+ childSnapshot.val().sothe +')</b></label>');
              else
                $('#divthe').append('<label style="width: 100%"><input id="the'+dem+'" type="radio" name="chonthe" value="'+ childSnapshot.val().sothe +'"><b style="margin-left: 15px">'+childSnapshot.val().tenthe+' ('+ childSnapshot.val().sothe +')</b></label>');
                dem++;
                opttm += '<option data-chedochuyen="Tiền mặt -> Thẻ" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'" >Tiền mặt -> Thẻ('+childSnapshot.val().tenthe+')</option>';
                opttk += '<option data-chedochuyen="Tiền tiết kiệm -> Thẻ" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'">Tiền tiết kiệm -> Thẻ('+childSnapshot.val().tenthe+')</option>';
                opttd += '<option data-chedochuyen="Thẻ -> Tiền mặt" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'">Thẻ('+childSnapshot.val().tenthe+') -> Tiền mặt</option><option data-chedochuyen="Thẻ -> Tiền tiết kiệm" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'">Thẻ('+childSnapshot.val().tenthe+') -> Tiền tiết kiệm</option>';
            });
            chedochuyen='<select><option disabled selected value="default"> -- Chọn chế độ -- </option><optgroup label="Tiền mặt"><option data-chedochuyen="Tiền mặt -> Tiền tiết kiệm">Tiền mặt -> Tiền tiết kiệm</option>'+opttm+'</optgroup><optgroup label="Tín dụng">'+opttd+'</optgroup><optgroup label="Tiền tiết kiệm"> <option data-chedochuyen="Tiền tiết kiệm -> Tiền mặt">Tiền tiết kiệm -> Tiền mặt</option>'+opttk+'</optgroup></select>';
            $(".chedochuyen").append(chedochuyen);
            $('select option:not(:selected)');
            $('select').change(function(){
              chedo=$(this).find(':selected').data('chedochuyen');
              sothechuyen=$(this).find(':selected').data('sothe');
              isnull=true;
              if(sothechuyen!=null){
                  isnull=false;
                  sotienchuyen= $(this).find(':selected').data('sotien');
                  tenthechuyen=$(this).find(':selected').data('tenthe');  
                  keychuyen=$(this).find(':selected').data('key');
              }
            });
        });
    $(function() {
        $(".tab-content").swiperight(function() {
            var $tab = $('#tablist .active').prev();
            if ($tab.length > 0)
                $tab.find('a').tab('show');
        });
        $(".tab-content").swipeleft(function() {
            var $tab = $('#tablist .active').next();
            if ($tab.length > 0)
                $tab.find('a').tab('show');
        });
      });

    $(document).ready(function() {
        NProgress.start();
        //Set name
        $('.profilename').html(localStorage.getItem("name"));
        $('#left-col-name').html(localStorage.getItem("name"));
        //Load data
        ref.on("value", function(snapshot, prevChildKey) {
              var data=[];
              snapshot.forEach(function(childSnapshot) {
                  tongtien=childSnapshot.val().sotien;
                  if (tongtien.toString().length==4){
                  tongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3);
                  }else if (tongtien.toString().length==5){
                      tongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,4);
                  }else if (tongtien.toString().length==6){
                      tongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,5);
                  }else if (tongtien.toString().length==7){
                      tongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3)+"."+tongtien.toString().substr(4,6);
                  }else if (tongtien.toString().length==8){
                      tongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,3)+"."+tongtien.toString().substr(5,7);
                  }else if (tongtien.toString().length==9){
                      tongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,3)+"."+tongtien.toString().substr(6,8);
                  }
                  var ngay=childSnapshot.val().ngaythang.split(' ');
                  var date= ngay[0].split('-');
                  var format=date[2]+'-'+date[1]+'-'+date[0];
                  var stringngaythang="<span>"+format+"</span>"+childSnapshot.val().ngaythang;
                  var hanhdong='<a href="#" data-sothe="'+childSnapshot.val().sothe+'" data-magd="'+childSnapshot.val().magd+'" data-st="'+childSnapshot.val().sotien+'" data-sotien="'+tongtien+'" data-loaichitieu="'+childSnapshot.val().loaichitieu+'" data-taikhoan="'+childSnapshot.val().taikhoan+'" data-key="'+childSnapshot.key+'" data-mota="'+childSnapshot.val().mota+'" data-ngaythang="'+childSnapshot.val().ngaythang+'" class="openModal" data-toggle="modal" data-target="#myModal"><i class="fa fa-pencil-square-o"></i></a><a  href="#" data-mota="'+childSnapshot.val().mota+'" data-magd="'+childSnapshot.val().magd+'" data-sothe="'+childSnapshot.val().sothe+'" data-sotien="'+tongtien+'" class="openModal1" data-toggle="modal" data-target="#myModal1" data-st="'+childSnapshot.val().sotien+'" data-taikhoan="'+childSnapshot.val().taikhoan+'" data-key="'+childSnapshot.key+'"><i class="fa fa-times" style="padding-left:10px"></i></a>';
                  if(childSnapshot.val().taikhoan == "Card"){
                    for (var i = 0; i < sothe.length; i++) {
                      if(childSnapshot.val().sothe==sothe[i].sothe){
                        data.push({'loaichitieu':childSnapshot.val().loaichitieu,'tongtien':tongtien,'ngaythang':stringngaythang,'mota':childSnapshot.val().mota,'taikhoan':childSnapshot.val().taikhoan+" ("+sothe[i].tenthe+")",'hanhdong':hanhdong});
                      }
                    }
                  }
                  else
                    data.push({'loaichitieu':childSnapshot.val().loaichitieu,'tongtien':tongtien,'ngaythang':stringngaythang,'mota':childSnapshot.val().mota,'taikhoan':childSnapshot.val().taikhoan,'hanhdong':hanhdong});
              });
              
              if(k==0){
                k=1;
                datatable=$('.datatable').DataTable({
                    data:data,
                    columns : [
                        { 'data' : 'loaichitieu'},
                        { 'data' : 'taikhoan'},
                        { 'data' : 'tongtien'},
                        { 'data' : 'ngaythang'},
                        { 'data' : 'mota'},
                        { 'data' : 'hanhdong'},
                    ],
                    'order': [[ 3, 'desc' ]]
                });
              }else
              datatable.clear().rows.add(data).draw(false);
              NProgress.done();
        });
        ref1.on("value", function(snapshot, prevChildKey) {
              var data=[];
              snapshot.forEach(function(childSnapshot) {
                tongtien=childSnapshot.val().sotien;
                if (tongtien.toString().length==4){
                  tongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3);
                  }else if (tongtien.toString().length==5){
                      tongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,4);
                  }else if (tongtien.toString().length==6){
                      tongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,5);
                  }else if (tongtien.toString().length==7){
                      tongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3)+"."+tongtien.toString().substr(4,6);
                  }else if (tongtien.toString().length==8){
                      tongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,3)+"."+tongtien.toString().substr(5,7);
                  }else if (tongtien.toString().length==9){
                      tongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,3)+"."+tongtien.toString().substr(6,8);
                  }
                var ngay=childSnapshot.val().ngaythang.split(' ');
                var date= ngay[0].split('-');
                var format=date[2]+'-'+date[1]+'-'+date[0];
                var stringngaythang="<span>"+format+"</span>"+childSnapshot.val().ngaythang;
                var hanhdong='<a href="#" data-magd="'+childSnapshot.val().magd+'" data-st="'+childSnapshot.val().sotien+'" data-sotien="'+tongtien+'" data-loaithunhap="'+childSnapshot.val().loaithunhap+'" data-key="'+childSnapshot.key+'" data-taikhoan="'+childSnapshot.val().taikhoan+'" data-mota="'+childSnapshot.val().mota+'" data-sothe="'+childSnapshot.val().sothe+'" data-ngaythang="'+childSnapshot.val().ngaythang+'" class="openModal2" data-toggle="modal" data-target="#myModal2"><i class="fa fa-pencil-square-o"></i></a><a href="#" data-mota="'+childSnapshot.val().mota+'" data-sotien="'+tongtien+'" data-st="'+childSnapshot.val().sotien+'" data-magd="'+childSnapshot.val().magd+'" data-sothe="'+childSnapshot.val().sothe+'" class="openModal3" data-toggle="modal" data-target="#myModal3" data-st="'+childSnapshot.val().sotien+'" data-taikhoan="'+childSnapshot.val().taikhoan+'"  data-key="'+childSnapshot.key+'"><i class="fa fa-times" style="padding-left:20px"></i></a>';
                if(childSnapshot.val().taikhoan == "Card"){
                    for (var i = 0; i < sothe.length; i++) {
                      if(childSnapshot.val().sothe==sothe[i].sothe){
                        data.push({'loaithunhap':childSnapshot.val().loaithunhap,'tongtien':tongtien,'ngaythang':stringngaythang,'mota':childSnapshot.val().mota,'taikhoan':childSnapshot.val().taikhoan+" ("+sothe[i].tenthe+")",'hanhdong':hanhdong});
                      }
                    }
                  }
                  else
                    data.push({'loaithunhap':childSnapshot.val().loaithunhap,'tongtien':tongtien,'ngaythang':stringngaythang,'mota':childSnapshot.val().mota,'taikhoan':childSnapshot.val().taikhoan,'hanhdong':hanhdong});
              });
              if(n==0){
                n=1;
                datatable1= $('.datatable1').DataTable({
                  data:data,
                  columns : [
                          { 'data' : 'loaithunhap'},
                          { 'data' : 'taikhoan'},
                          { 'data' : 'tongtien'},
                          { 'data' : 'ngaythang'},
                          { 'data' : 'mota'},
                          { 'data' : 'hanhdong'},
                      ],
                  order: [[ 3, 'desc' ]],
               });
             }else{datatable1.clear().rows.add(data).draw(false);}
        });
        refkhoanchuyen.on('value', function(snapshot) {
            var data=[];
            snapshot.forEach(function(childSnapshot) {
              tongtien=childSnapshot.val().sotien;
              if (tongtien.toString().length==4){
                  tongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3);
                  }else if (tongtien.toString().length==5){
                      tongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,4);
                  }else if (tongtien.toString().length==6){
                      tongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,5);
                  }else if (tongtien.toString().length==7){
                      tongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3)+"."+tongtien.toString().substr(4,6);
                  }else if (tongtien.toString().length==8){
                      tongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,3)+"."+tongtien.toString().substr(5,7);
                  }else if (tongtien.toString().length==9){
                      tongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,3)+"."+tongtien.toString().substr(6,8);
                  }
              sodu=childSnapshot.val().sodu;
                if (sodu.toString().length==4){
                  sodu=sodu.toString().substr(0,1)+"."+sodu.toString().substr(1,3);
                  }else if (sodu.toString().length==5){
                      sodu=sodu.toString().substr(0,2)+"."+sodu.toString().substr(2,4);
                  }else if (sodu.toString().length==6){
                      sodu=sodu.toString().substr(0,3)+"."+sodu.toString().substr(3,5);
                  }else if (sodu.toString().length==7){
                      sodu=sodu.toString().substr(0,1)+"."+sodu.toString().substr(1,3)+"."+sodu.toString().substr(4,6);
                  }else if (sodu.toString().length==8){
                      sodu=sodu.toString().substr(0,2)+"."+sodu.toString().substr(2,3)+"."+sodu.toString().substr(5,7);
                  }else if (sodu.toString().length==9){
                      sodu=sodu.toString().substr(0,3)+"."+sodu.toString().substr(3,3)+"."+sodu.toString().substr(6,8);
                  }
              var ngay=childSnapshot.val().ngaythang.split(' ');
              var date= ngay[0].split('-');
              var format=date[2]+'-'+date[1]+'-'+date[0];
              var stringngaythang="<span>"+format+"</span>"+childSnapshot.val().ngaythang;
              var hanhdong='<a href="#" class="openModal6" data-toggle="modal" data-target="#myModal6" data-chedo="'+childSnapshot.val().loaichuyen+'" data-sotien="'+childSnapshot.val().sotien+'" data-sothe="'+childSnapshot.val().sothe+'"  data-key="'+childSnapshot.key+'" data-magd="'+childSnapshot.val().magd+'"><i class="fa fa-times"></i></a>';
              if(childSnapshot.val().sothe != null){
                    for (var i = 0; i < sothe.length; i++) {
                      if(childSnapshot.val().sothe == sothe[i].sothe){
                        if(childSnapshot.val().loaichuyen=="Thẻ -> Tiền tiết kiệm"){
                            split=childSnapshot.val().loaichuyen.toString().split('-');
                            data.push({'loaichuyen':split[0]+"("+sothe[i].tenthe+") -"+split[1],'tongtien':tongtien,'ngaythang':stringngaythang,'sodu':sodu,'hanhdong':hanhdong});
                        }else if(childSnapshot.val().loaichuyen=="Thẻ -> Tiền mặt"){
                            split=childSnapshot.val().loaichuyen.toString().split('-');
                            data.push({'loaichuyen':split[0]+"("+sothe[i].tenthe+") -"+split[1],'tongtien':tongtien,'ngaythang':stringngaythang,'sodu':sodu,'hanhdong':hanhdong});
                        }else
                        data.push({'loaichuyen':childSnapshot.val().loaichuyen+"("+sothe[i].tenthe+")",'tongtien':tongtien,'ngaythang':stringngaythang,'sodu':sodu,'hanhdong':hanhdong});
                      }
                    }
              }else
                data.push({'loaichuyen':childSnapshot.val().loaichuyen,'tongtien':tongtien,'ngaythang':stringngaythang,'sodu':sodu,'hanhdong':hanhdong});
             });
             if(l==0){
                l=1;
                datatable2= $('.datatable2').DataTable({
                  data:data,
                  columns : [
                          { 'data' : 'loaichuyen'},
                          { 'data' : 'tongtien'},
                          { 'data' : 'sodu'},
                          { 'data' : 'ngaythang'},
                          { 'data' : 'hanhdong'},
                      ],
                  order: [[ 3, 'desc' ]],
               });
             }else{datatable2.clear().rows.add(data).draw(false);}
        });
        $(document).on("click", ".openModal", function () {
           sothebandau=$(this).data('sothe');
           if(sothe.length != 0){
              for (var i = 0; i < sothe.length; i++) {
                if(sothe[i].sothe==$(this).data('sothe'))
                  $('#'+sothe[i].idthe).prop('checked',true);
              }
           }
           sotienbandau=$(this).data('st');
           taikhoanbandau=$(this).data('taikhoan');
           key= $(this).data('key');
           magd=$(this).data('magd');
           lstk= $(this).data('taikhoan');
           $("#sotien").val( $(this).data('sotien') );
           $("#mota").html( $(this).data("mota") );
           $("#datetimepicker4").val( $(this).data('ngaythang') );
           if($(this).data('taikhoan')=="Card"){
              $('#card').prop('checked',true);
              $('#tienmat1').attr('class','btn btn-primary fa fa-usd ');
              $('#card1').attr('class','btn btn-danger fa fa-credit-card active');
           }else{
              $('#tienmat').prop('checked',true);
              $('#tienmat1').trigger("click");
           }
           if($(this).data('loaichitieu')=="Đi chơi"){
              $('#dichoi').prop('checked',true);
              $('#dichoi1').trigger("click");
           }else  if($(this).data('loaichitieu')=="Đổ xăng"){
              $('#doxang').prop('checked',true);
              $('#doxang1').trigger("click");
           } if($(this).data('loaichitieu')=="Mua đồ"){
              $('#muado').prop('checked',true);
              $('#muado1').trigger("click");
           }else{
             $('#' + $(this).data('loaichitieu') ).prop('checked',true);
             $('#' + $(this).data('loaichitieu')+"1" ).trigger("click");
           }
        });
        $("#quayvechontienmat").on("click",function(){
          if(sothe.length != 0){
              for (var i = 0; i < sothe.length; i++) {
                if(sothe[i].sothe==sothebandau)
                  $('#'+sothe[i].idthe).prop('checked',true);
              }
           }
        });
        $(document).on("click", ".openModal1", function () {
           key= $(this).data('key');
           $("#deltien").html( $(this).data('sotien') );
           $("#delmota").html( $(this).data("mota") );
           magd=$(this).data('magd');
           sothebandau=$(this).data('sothe');
           sotienbandau=$(this).data('st');
           lstk= $(this).data('taikhoan');
        });
        $(document).on("click", ".openModal2", function () {
           sotienbandau=$(this).data('st');
           magd=$(this).data('magd');
           key= $(this).data('key');
           taikhoanbandau=$(this).data('taikhoan');
           sothebandau=$(this).data('sothe');
           magd=$(this).data('magd');
           if(sothe.length != 0){
              for (var i = 0; i < sothe.length; i++) {
                if(sothe[i].sothe==$(this).data('sothe'))
                  $('#'+sothe[i].idthe).prop('checked',true);
              }
           }
           if($(this).data('taikhoan')=="Card"){
              $('#card3').prop('checked',true);
              $('#tienmat2').attr('class','btn btn-primary fa fa-usd ');
              $('#card2').attr('class','btn btn-danger fa fa-credit-card active');
           }else{
              $('#tienmat3').prop('checked',true);
              $('#tienmat2').trigger("click");
           }
           $("#sotien1").val( $(this).data('sotien') );
           $("#motathu").html( $(this).data("mota") );
           $("#datetimepicker5").val( $(this).data('ngaythang') );
           if($(this).data('loaithunhap')=="Bán đồ"){
              $('#bando').prop('checked',true);
              $('#bando1').trigger("click");
           }else if($(this).data('loaithunhap')=="Khác"){
              $('#khacthu').prop('checked',true);
              $('#khacthu1').trigger("click");
           }else{
             $('#luong').prop('checked',true);
             $('#luong1').trigger("click");
           }
        });
        $(document).on("click", ".openModal3", function () {
           magd=$(this).data('magd');
           key= $(this).data('key');
           sothebandau=$(this).data('sothe');
           sotienbandau=$(this).data('st');
           taikhoanbandau= $(this).data('taikhoan');
           $("#deltienthu").html( $(this).data('sotien') );
           $("#delmotathu").html( $(this).data("mota") );
        });
        var chedochon,sothechuyen;
        $(document).on("click", ".openModal6", function () {
           chedo=$(this).data('chedo');
           magd=$(this).data('magd');
           key= $(this).data('key');
           sotienbandau=$(this).data('sotien');
           sothebandau=$(this).data('sothe');
           $("#deltienthu").html( $(this).data('sotien') );
           $("#delmotathu").html( $(this).data("mota") );
        });
        //logout
         $('#logout').on('click',function(){
          localStorage.removeItem("key");
          localStorage.removeItem("name");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
         });
      // Fill Nhập liệu chi tiêu
      $('#mota').on('click',function(){
          $('.err').html('');
      });
      $('#chitieu').on('click',function(){
          $('.err').html('');
      });
      $('#sotien').on('click',function(){
          $('.err').html('');
      });
      $('#sotien2').on('click',function(){
          $('.err').html('');
      });
      $('#motathu').on('click',function(){
          $('.err').html('');
      });
      $('#thunhap').on('click',function(){
          $('.err').html('');
      });
      $('#sotien1').on('click',function(){
          $('.err').html('');
      });
      $('#datetimepicker4').datetimepicker(
        {format: 'DD-MM-YYYY HH:mm'}
      );
      $('#datetimepicker4').keydown(function(e){
        if (e.which === 8)
            return false;
      }); 
      $('#datetimepicker5').keydown(function(e){
        if (e.which === 8)
            return false;
      });
      $('#datetimepicker6').keydown(function(e){
        if (e.which === 8)
            return false;
      }); 
      $('#datetimepicker5').datetimepicker(
        {format: 'DD-MM-YYYY HH:mm'}
      );  
      $('#datetimepicker6').datetimepicker(
        {format: 'DD-MM-YYYY HH:mm'}
      );
      $('#sotien1').keyup(function(event) {
        $(this).val(
              this.value.replace(text,"") + text
        );
            if (this.value.length==8){
              $(this).val(
                this.value.substr(0,1)+"."+this.value.substr(1,8)
              );
            }
            else if (this.value.length==10){
              $(this).val(
                this.value.substr(0,1)+this.value.substring(2,3)+"."+this.value.substr(3,10)
              );
            }
            else if (this.value.length==11){
              $(this).val(
                this.value.substr(0,2)+this.value.substring(3,4)+"."+this.value.substr(4,11)
              );
            }else if(this.value.length>11){
              $(this).val("Số tiền quá lớn");
            }
          if(reg.test(this.value) || reg1.test(this.value)|| reg2.test(this.value)){
             
          }else{
            $(this).val("");
          }
          if(event.keyCode == 8) $(this).val("");       
      });

      $("#sotien").click(function(){
          document.getElementById('sotien').value="";
      });

      $('#sotien2').keyup(function(event) {
        $(this).val(
              this.value.replace(text,"") + text
        );
            if (this.value.length==8){
              $(this).val(
                this.value.substr(0,1)+"."+this.value.substr(1,8)
              );
            }
            else if (this.value.length==10){
              $(this).val(
                this.value.substr(0,1)+this.value.substring(2,3)+"."+this.value.substr(3,10)
              );
            }
            else if (this.value.length==11){
              $(this).val(
                this.value.substr(0,2)+this.value.substring(3,4)+"."+this.value.substr(4,11)
              );
            }else if(this.value.length>11){
              $(this).val("Số tiền quá lớn");
            }
          if(reg.test(this.value) || reg1.test(this.value)|| reg2.test(this.value)){
             
          }else{
            $(this).val("");
          }
          if(event.keyCode == 8) $(this).val("");       
      });

      $("#sotien2").click(function(){
          document.getElementById('sotien2').value="";
      });
      $("#sotien1").click(function(){
          document.getElementById('sotien1').value="";
      });
      var text= ".000";
      var reg=/^([0-9])+\.([0-9])+\.([0-9])+$/;
      var reg1=/^([0-9])+\.([0-9])+$/;
      var reg3=/^([0-9])+\s([0-9])+\s+$/;
      var reg4=/^([0-9])+\s+$/;
      var reg6=/^([0-9])+\s([0-9])+$/;
      var reg5=/^([0-9])+\s([0-9])+\s([0-9])+\s+$/;
      var reg8=/^([0-9])+\s([0-9])+\s([0-9])+\s([0-9])+$/;
      var reg7=/^([0-9])+\s([0-9])+\s([0-9])+$/;
      var reg2=/^([0-9])+$/;
      $('#sotien').keyup(function(event) {
        $(this).val(
              this.value.replace(text,"") + text
        );
            if (this.value.length==8){
              $(this).val(
                this.value.substr(0,1)+"."+this.value.substr(1,8)
              );
            }
            else if (this.value.length==10){
              $(this).val(
                this.value.substr(0,1)+this.value.substring(2,3)+"."+this.value.substr(3,10)
              );
            }
            else if (this.value.length==11){
              $(this).val(
                this.value.substr(0,2)+this.value.substring(3,4)+"."+this.value.substr(4,11)
              );
            }else if(this.value.length>11){
              $(this).val("Số tiền quá lớn");
            }
          if(reg.test(this.value) || reg1.test(this.value)|| reg2.test(this.value)){
             
          }else{
            $(this).val("");
          }
          if(event.keyCode == 8) $(this).val("");       
      });
      });
      function confirmdel(){
        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanchi/'+key).remove();
        $('#myModal1').modal('toggle');
        if(lstk=="Card"){
          for (var i = 0; i < lichsudata1.length; i++) {
            if(lichsudata1[i].magd==magd){
                  for (var j = i+1; j < lichsudata1.length; j++) {
                    if(lichsudata1[j].sothe == $('input[name=chonthe]:checked').val()){
                      var postData = {
                        sotien:lichsudata1[j].sotien,
                        sodu:+lichsudata1[j].sodu+Number(lichsudata1[i].sotien),
                        ngaythang:lichsudata1[j].ngaythang,
                        magd:lichsudata1[j].magd,
                        trangthai:lichsudata1[j].trangthai,
                        sothe:lichsudata1[j].sothe
                      };
                      var updates = {};
                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                      firebase.database().ref().update(updates);
                    }
                  }
                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[i].key).remove();
                  for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe == sothebandau){
                            var postData1 = {
                                sotien: sothe[i].sotien + sotienbandau,
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                           }
                  }
            }
          }
         }else{
          for (var i = 0; i < lichsudata.length; i++) {
            if(lichsudata[i].magd==magd){
                  sotienmathientai += Number(lichsudata[i].sotien);
                  reftienmat.set(sotienmathientai);
                  for (var j = i+1; j < lichsudata.length; j++) {
                    var postData = {
                      sotien:lichsudata[j].sotien,
                      sodu:+lichsudata[j].sodu+Number(lichsudata[i].sotien),
                      ngaythang:lichsudata[j].ngaythang,
                      magd:lichsudata[j].magd,
                      trangthai:lichsudata[j].trangthai,
                    };
                    var updates = {};
                    updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[j].key] = postData;
                    firebase.database().ref().update(updates);
                  }
                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[i].key).remove();
            }
          }
        }
        sessionStorage.clickcount=0;
       }
      function myclick(){
            var sotien=$('#sotien').val();
            if(sotien.length==5){
              sotien=sotien.substr(0,1)+sotien.substr(2,5);
            }else if(sotien.length==6){
              sotien=sotien.substr(0,2)+sotien.substr(3,6);
            }else if(sotien.length==7){
              sotien=sotien.substr(0,3)+sotien.substr(4,7);
            }else if(sotien.length==9){
              sotien=sotien.substr(0,1)+sotien.substr(2,3)+sotien.substr(6,9);
            }else if(sotien.length==10){
              sotien=sotien.substr(0,2)+sotien.substr(3,3)+sotien.substr(7,10);
            }else if(sotien.length==11){
              sotien=sotien.substr(0,3)+sotien.substr(4,3)+sotien.substr(8,11);
            }
            if ($('input[name=chitieu]:checked').val() == null ||$('input[name=chitieu]:checked').val() =="") {
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn loại chi tiêu</li</ul>');
                return false;
            }else if($('#sotien').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập số tiền</li</ul>');
                return false;
            }else if($('#datetimepicker4').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn ngày giờ</li</ul>');
                return false;
            }else if($('#mota').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập mô tả</li</ul>');
                return false;
            }else{
                if(taikhoanbandau != $('input[name=taikhoan]:checked').val() && taikhoanbandau == "Card"){
                     var postData = {
                      loaichitieu:$('input[name=chitieu]:checked','#chitieuform1').val(),
                      sotien:sotien,
                      ngaythang:$('#datetimepicker4').val(),
                      mota:$('#mota').val(),
                      taikhoan:$('input[name=taikhoan]:checked').val(),
                      magd:magd
                    };
                    var updates = {};
                    updates['/users/'+localStorage.getItem('key')+'/tien/khoanchi/' + key] = postData;
                    firebase.database().ref().update(updates);
                    sotienmathientai -= +sotien;
                    reftienmat.set(sotienmathientai);
                    for (var i = 0; i < lichsudata1.length; i++) {
                      if(lichsudata1[i].magd==magd){
                        for (var j = i+1; j < lichsudata1.length; j++) {
                          var postData = {
                            sotien:lichsudata1[j].sotien,
                            sodu:+lichsudata1[j].sodu+Number(lichsudata1[i].sotien),
                            ngaythang:lichsudata1[j].ngaythang,
                            magd:lichsudata1[j].magd,
                            trangthai:lichsudata1[j].trangthai,
                            sothe:lichsudata1[j].sothe
                          };
                          var updates = {};
                          updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                          firebase.database().ref().update(updates);
                        }
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[i].key).remove();
                      }
                    }
                    ref_lichsu.push().set({
                      trangthai:"Chi",
                      sotien:sotien,
                      ngaythang:$('#datetimepicker4').val(),
                      sodu:sotienmathientai,
                      magd:magd
                    });
                    for (var i = 0; i < sothe.length; i++) {
                      if(sothe[i].sothe==sothebandau){
                          var postData1 = {
                            sotien:+sothe[i].sotien+ +sotienbandau,
                            sothe:sothe[i].sothe,
                            tenthe:sothe[i].tenthe
                          };
                          var updates1= {};
                          updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                          firebase.database().ref().update(updates1);
                      }
                    }
                }else if(taikhoanbandau != $('input[name=taikhoan]:checked').val() && taikhoanbandau == "Tiền mặt"){
                     var postData = {
                      loaichitieu:$('input[name=chitieu]:checked','#chitieuform1').val(),
                      sotien:sotien,
                      ngaythang:$('#datetimepicker4').val(),
                      mota:$('#mota').val(),
                      taikhoan:$('input[name=taikhoan]:checked').val(),
                      magd:magd,
                      sothe:$('input[name=chonthe]:checked').val()
                    };
                    var updates = {};
                    updates['/users/'+localStorage.getItem('key')+'/tien/khoanchi/' + key] = postData;
                    firebase.database().ref().update(updates);
                    sotienmathientai += + sotienbandau;
                    reftienmat.set(sotienmathientai);
                    for (var i = 0; i < lichsudata.length; i++) {
                      if(lichsudata[i].magd==magd){
                        for (var j = i+1; j < lichsudata.length; j++) {
                          var postData = {
                            sotien:lichsudata[j].sotien,
                            sodu:+lichsudata[j].sodu+Number(lichsudata[i].sotien),
                            ngaythang:lichsudata[j].ngaythang,
                            magd:lichsudata[j].magd,
                            trangthai:lichsudata[j].trangthai,
                          };
                          var updates = {};
                          updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[j].key] = postData;
                          firebase.database().ref().update(updates);
                        }
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[i].key).remove();
                      }
                    }
                    soducuathe=0;
                    for (var i = 0; i < sothe.length; i++) {
                      if(sothe[i].sothe==$('input[name=chonthe]:checked').val()){
                          var postData1 = {
                            sotien:+sothe[i].sotien - sotien,
                            sothe:sothe[i].sothe,
                            tenthe:sothe[i].tenthe
                          };
                          soducuathe=+sothe[i].sotien - sotien;
                          var updates1= {};
                          updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                          firebase.database().ref().update(updates1);
                      }
                    }
                    ref_lichsu1.push().set({
                      trangthai:"Chi",
                      sotien:sotien,
                      ngaythang:$('#datetimepicker4').val(),
                      sodu:soducuathe,
                      magd:magd,
                      sothe:$('input[name=chonthe]:checked').val()
                    });
             }else if(taikhoanbandau == $('input[name=taikhoan]:checked').val()){
                  if(lstk=="Card"){
                     var postData = {
                        loaichitieu:$('input[name=chitieu]:checked','#chitieuform1').val(),
                        sotien:sotien,
                        ngaythang:$('#datetimepicker4').val(),
                        mota:$('#mota').val(),
                        taikhoan:$('input[name=taikhoan]:checked').val(),
                        magd:magd,
                        sothe:$('input[name=chonthe]:checked').val()
                      };
                      var updates = {};
                      updates['/users/'+localStorage.getItem('key')+'/tien/khoanchi/' + key] = postData;
                      firebase.database().ref().update(updates);
                    if(sothebandau != $('input[name=chonthe]:checked').val()){
                        sodubandau=0;
                        for (var i = 0; i < lichsudata1.length; i++) {
                          if(lichsudata1[i].magd==magd){
                            if(i==lichsudata1.length-1){
                              if(i>0){
                                for (var k = lichsudata1.length-1; k >= 0; k--) {
                                  if(lichsudata1[k].sothe==$('input[name=chonthe]:checked').val()){
                                    var postData1 = {
                                      sotien:sotien,
                                      ngaythang:$('#datetimepicker4').val(),
                                      trangthai: "Chi",
                                      sodu: +lichsudata1[k].sodu  - Number(sotien),
                                      magd:magd,
                                      sothe:$('input[name=chonthe]:checked').val()
                                    };
                                    var updates1= {};
                                    updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                    firebase.database().ref().update(updates1);
                                    break;
                                  }
                                }
                              }else{
                                var postData1 = {
                                      sotien:sotien,
                                      ngaythang:$('#datetimepicker4').val(),
                                      trangthai: "Chi",
                                      sodu: +lichsudata1[i].sodu  - Number(sotien),
                                      magd:magd,
                                      sothe:$('input[name=chonthe]:checked').val()
                                    };
                                    var updates1= {};
                                    updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                    firebase.database().ref().update(updates1);
                              }
                            }else{
                              if(i>0){
                                for (var j = i-1; j >=0; j--) {
                                if(lichsudata1[j].sothe == $('input[name=chonthe]:checked').val()){
                                  var postData1 = {
                                    sotien:sotien,
                                    ngaythang:$('#datetimepicker4').val(),
                                    trangthai: "Chi",
                                    sodu: +lichsudata1[j].sodu - Number(sotien),
                                    magd:magd,
                                    sothe:$('input[name=chonthe]:checked').val()
                                  };
                                  sodubandau=+lichsudata1[j].sodu - Number(sotien);
                                  var updates1= {};
                                  updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                  firebase.database().ref().update(updates1);
                                  break;
                                }
                                if(j==0){
                                  for(var k=0;k<sothe.length;k++){
                                    if(sothe[k].sothe==$('input[name=chonthe]:checked').val()){
                                      tongsodubandau=0;
                                      for(var l=i+1;l<lichsudata1.length;l++){
                                        if(lichsudata1[l].sothe==$('input[name=chonthe]:checked').val()){
                                           tongsodubandau+= +lichsudata1[l].sotien;
                                        }
                                      }
                                      var postData1 = {
                                            sotien:sotien,
                                            ngaythang:$('#datetimepicker4').val(),
                                            trangthai: "Chi",
                                            sodu: (+sothe[k].sotien +tongsodubandau) - Number(sotien),
                                            magd:magd,
                                            sothe:$('input[name=chonthe]:checked').val()
                                      };
                                      sodubandau=(+sothe[k].sotien +tongsodubandau) - Number(sotien);
                                      var updates1= {};
                                      updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                      firebase.database().ref().update(updates1);
                                    }
                                  }
                                }
                                }
                              }else{
                                   for(var k=0;k<sothe.length;k++){
                                    if(sothe[k].sothe==$('input[name=chonthe]:checked').val()){
                                      tongsodubandau=0;
                                      for(var l=i+1;l<lichsudata1.length;l++){
                                        if(lichsudata1[l].sothe==$('input[name=chonthe]:checked').val()){
                                           tongsodubandau+= +lichsudata1[l].sotien;
                                        }
                                      }
                                      var postData1 = {
                                            sotien:sotien,
                                            ngaythang:$('#datetimepicker4').val(),
                                            trangthai: "Chi",
                                            sodu: (+sothe[k].sotien +tongsodubandau) - Number(sotien),
                                            magd:magd,
                                            sothe:$('input[name=chonthe]:checked').val()
                                      };
                                      sodubandau=(+sothe[k].sotien +tongsodubandau) - Number(sotien);
                                      var updates1= {};
                                      updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                      firebase.database().ref().update(updates1);
                                    }
                                  }
                              }
                              
                              for (var j = i+1; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].sothe==sothebandau){
                                  var postData = {
                                    sotien:lichsudata1[j].sotien,
                                    sodu:+lichsudata1[j].sodu  +sotienbandau,
                                    ngaythang:lichsudata1[j].ngaythang,
                                    magd:lichsudata1[j].magd,
                                    trangthai:lichsudata1[j].trangthai,
                                    sothe:lichsudata1[j].sothe
                                  };
                                  var updates = {};
                                  updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                                  firebase.database().ref().update(updates);
                                }else if(lichsudata1[j].sothe==$('input[name=chonthe]:checked').val()){
                                    var postData = {
                                        sotien:lichsudata1[j].sotien,
                                        sodu:sodubandau - +lichsudata1[j].sotien,
                                        ngaythang:lichsudata1[j].ngaythang,
                                        magd:lichsudata1[j].magd,
                                        trangthai:lichsudata1[j].trangthai,
                                        sothe:lichsudata1[j].sothe
                                    };
                                    sodubandau=sodubandau - +lichsudata1[j].sotien;
                                    var updates = {};
                                    updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                                    firebase.database().ref().update(updates);
                                }   
                              }
                             }
                            }
                          }
                          for (var i = 0; i < sothe.length; i++) {
                            if(sothe[i].sothe == $('input[name=chonthe]:checked').val()){
                                var postData1 = {
                                  sotien:+sothe[i].sotien - sotien,
                                  sothe:sothe[i].sothe,
                                  tenthe:sothe[i].tenthe
                                };
                             
                                var updates1= {};
                                updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                firebase.database().ref().update(updates1);
                              }
                          }
                          for (var i = 0; i < sothe.length; i++) {
                              if(sothe[i].sothe==sothebandau){
                                  var postData1 = {
                                    sotien:+sothe[i].sotien + sotienbandau,
                                    sothe:sothe[i].sothe,
                                    tenthe:sothe[i].tenthe
                                  };
                                  var updates1= {};
                                  updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                  firebase.database().ref().update(updates1);
                              }
                          }
                      }else{
                          for (var i = 0; i < sothe.length; i++) {
                            if(sothe[i].sothe==$('input[name=chonthe]:checked').val()){
                                var postData1 = {
                                  sotien:(sothe[i].sotien +sotienbandau) - sotien,
                                  sothe:sothe[i].sothe,
                                  tenthe:sothe[i].tenthe
                                };
                                var updates1= {};
                                updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                firebase.database().ref().update(updates1);
                            }
                          }
                          for (var i = 0; i < lichsudata1.length; i++) {
                            if(lichsudata1[i].magd==magd){
                               var postData1 = {
                                sotien:sotien,
                                ngaythang:$('#datetimepicker4').val(),
                                trangthai: "Chi",
                                sodu: (+lichsudata1[i].sodu  +sotienbandau) - Number(sotien),
                                magd:magd,
                                sothe:sothebandau
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                              for (var j = i+1; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].sothe==$('input[name=chonthe]:checked').val()){
                                  var postData = {
                                    sotien:lichsudata1[j].sotien,
                                    sodu:(lichsudata1[j].sodu +sotienbandau) - sotien,
                                    ngaythang:lichsudata1[j].ngaythang,
                                    magd:lichsudata1[j].magd,
                                    trangthai:lichsudata1[j].trangthai,
                                    sothe:lichsudata1[j].sothe
                                  };
                                  var updates = {};
                                  updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                                  firebase.database().ref().update(updates);
                                } 
                              }
                            }
                          }
                      }
                  }else{
                     var postData = {
                      loaichitieu:$('input[name=chitieu]:checked','#chitieuform1').val(),
                      sotien:sotien,
                      ngaythang:$('#datetimepicker4').val(),
                      mota:$('#mota').val(),
                      taikhoan:$('input[name=taikhoan]:checked').val(),
                      magd:magd
                    };
                    var updates = {};
                    updates['/users/'+localStorage.getItem('key')+'/tien/khoanchi/' + key] = postData;
                    firebase.database().ref().update(updates);
                    for (var i = 0; i < lichsudata.length; i++) {
                      if(lichsudata[i].magd == magd){
                          sotienmathientai = (sotienmathientai+sotienbandau)-sotien;
                          reftienmat.set(sotienmathientai);
                          var postData1 = {
                            sotien:sotien,
                            ngaythang:$('#datetimepicker4').val(),
                            trangthai: "Chi",
                            sodu: (lichsudata[i].sodu + Number(lichsudata[i].sotien))-sotien,
                            magd:magd
                          };
                          var updates1= {};
                          updates1['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[i].key] = postData1;
                          firebase.database().ref().update(updates1);
                          for (var j = i+1; j < lichsudata.length; j++) {
                            var postData = {
                              sotien:lichsudata[j].sotien,
                              sodu: (+lichsudata[j].sodu+sotienbandau)-sotien,
                              ngaythang:lichsudata[j].ngaythang,
                              magd:lichsudata[j].magd,
                              trangthai:lichsudata[j].trangthai,
                            };
                            var updates = {};
                            updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[j].key] = postData;
                            firebase.database().ref().update(updates);
                          }
                      }
                    }
                  }
                }
                $('#myModal').modal('toggle');
                sessionStorage.clickcount=0;
            }
        }

      $("#themthu").on("click",function(){
          var sotien=$('#sotien1').val();
            if(sotien.length==5){
              sotien=sotien.substr(0,1)+sotien.substr(2,5);
            }else if(sotien.length==6){
              sotien=sotien.substr(0,2)+sotien.substr(3,6);
            }else if(sotien.length==7){
              sotien=sotien.substr(0,3)+sotien.substr(4,7);
            }else if(sotien.length==9){
              sotien=sotien.substr(0,1)+sotien.substr(2,3)+sotien.substr(6,9);
            }else if(sotien.length==10){
              sotien=sotien.substr(0,2)+sotien.substr(3,3)+sotien.substr(7,10);
            }else if(sotien.length==11){
              sotien=sotien.substr(0,3)+sotien.substr(4,3)+sotien.substr(8,11);
            }
            if ($('input[name=khoanthu]:checked').val() == null ||$('input[name=khoanthu]:checked').val() =="") {
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn loại thu nhập</li</ul>');
                return false;
            }else if(sotien==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập số tiền</li</ul>');
                return false;
            }else if($('#datetimepicker5').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn ngày giờ</li</ul>');
                return false;
            }else if($('#motathu').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập mô tả</li</ul>');
                return false;
            }else{
              if(taikhoanbandau != $('input[name=taikhoan1]:checked').val() && taikhoanbandau == "Card"){
                     var postData = {
                        loaithunhap:$('input[name=khoanthu]:checked').val(),
                        sotien:sotien,
                        ngaythang:$('#datetimepicker5').val(),
                        mota:$('#motathu').val(),
                        magd:magd,
                        taikhoan:$('input[name=taikhoan1]:checked').val()
                      };
                      var updates = {};
                      updates['/users/'+localStorage.getItem('key')+'/tien/khoanthu/' + key] = postData;
                      firebase.database().ref().update(updates);
                      reftienmat.set(sotienmathientai+Number(sotien));
                      for (var i = 0; i < lichsudata1.length; i++) {
                        if(lichsudata1[i].magd==magd){
                          for (var j = i+1; j < lichsudata1.length; j++) {
                            var postData = {
                              sotien:lichsudata1[j].sotien,
                              sodu:+lichsudata1[j].sodu - Number(lichsudata1[i].sotien),
                              ngaythang:lichsudata1[j].ngaythang,
                              magd:lichsudata1[j].magd,
                              trangthai:lichsudata1[j].trangthai,
                              sothe:lichsudata1[j].sothe
                            };
                            var updates = {};
                            updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                            firebase.database().ref().update(updates);
                          }
                          firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[i].key).remove();
                        }
                      }
                      ref_lichsu.push().set({
                        trangthai:"Thu",
                        sotien:sotien,
                        ngaythang:$('#datetimepicker5').val(),
                        sodu:sotienmathientai,
                        magd:magd
                      });
                      for (var i = 0; i < sothe.length; i++) {
                        if(sothe[i].sothe==sothebandau){
                            var postData1 = {
                              sotien:sothe[i].sotien - sotienbandau,
                              sothe:sothe[i].sothe,
                              tenthe:sothe[i].tenthe
                            };
                            var updates1= {};
                            updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                            firebase.database().ref().update(updates1);
                        }
                      }
                }else if(taikhoanbandau != $('input[name=taikhoan1]:checked').val() && taikhoanbandau == "Tiền mặt"){
                      var postData = {
                        loaithunhap:$('input[name=khoanthu]:checked').val(),
                        sotien:sotien,
                        ngaythang:$('#datetimepicker5').val(),
                        mota:$('#motathu').val(),
                        sothe:$('input[name=chonthe]:checked').val(),
                        magd:magd,
                        taikhoan:$('input[name=taikhoan1]:checked').val()
                      };
                      var updates = {};
                      updates['/users/'+localStorage.getItem('key')+'/tien/khoanthu/' + key] = postData;
                      firebase.database().ref().update(updates);
                      sotienmathientai -=  sotienbandau;
                      reftienmat.set(sotienmathientai);
                    for (var i = 0; i < lichsudata.length; i++) {
                      if(lichsudata[i].magd==magd){
                        for (var j = i+1; j < lichsudata.length; j++) {
                          var postData = {
                            sotien:lichsudata[j].sotien,
                            sodu:+lichsudata[j].sodu - Number(lichsudata[i].sotien),
                            ngaythang:lichsudata[j].ngaythang,
                            magd:lichsudata[j].magd,
                            trangthai:lichsudata[j].trangthai,
                          };
                          var updates = {};
                          updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[j].key] = postData;
                          firebase.database().ref().update(updates);
                        }
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[i].key).remove();
                      }
                    }
                    soducuathe=0;
                    for (var i = 0; i < sothe.length; i++) {
                      if(sothe[i].sothe==$('input[name=chonthe]:checked').val()){
                          var postData1 = {
                            sotien:+sothe[i].sotien + Number(sotien),
                            sothe:sothe[i].sothe,
                            tenthe:sothe[i].tenthe
                          };
                          soducuathe=+sothe[i].sotien +  Number(sotien);
                          var updates1= {};
                          updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                          firebase.database().ref().update(updates1);
                      }
                    }
                    ref_lichsu1.push().set({
                      trangthai:"Thu",
                      sotien:sotien,
                      ngaythang:$('#datetimepicker5').val(),
                      sodu:soducuathe,
                      magd:magd,
                      sothe:$('input[name=chonthe]:checked').val()
                    });
                }else if(taikhoanbandau == $('input[name=taikhoan1]:checked').val()){
                  if(taikhoanbandau=="Card"){
                     var postData = {
                        loaithunhap:$('input[name=khoanthu]:checked').val(),
                        sotien:sotien,
                        ngaythang:$('#datetimepicker5').val(),
                        mota:$('#motathu').val(),
                        sothe:$('input[name=chonthe]:checked').val(),
                        magd:magd,
                        taikhoan:$('input[name=taikhoan1]:checked').val()
                      };
                      var updates = {};
                      updates['/users/'+localStorage.getItem('key')+'/tien/khoanthu/' + key] = postData;
                      firebase.database().ref().update(updates);
                    if(sothebandau != $('input[name=chonthe]:checked').val()){
                        sodubandau=0;
                        for (var i = 0; i < lichsudata1.length; i++) {
                          if(lichsudata1[i].magd==magd){
                            if(i==lichsudata1.length-1){
                              if(i>0){
                              for (var k = lichsudata1.length-1; k >= 0; k--) {
                                if(lichsudata1[k].sothe==$('input[name=chonthe]:checked').val()){
                                  var postData1 = {
                                    sotien:sotien,
                                    ngaythang:$('#datetimepicker5').val(),
                                    trangthai: "Thu",
                                    sodu: +lichsudata1[k].sodu  + Number(sotien),
                                    magd:magd,
                                    sothe:$('input[name=chonthe]:checked').val()
                                  };
                                  var updates1= {};
                                  updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                  firebase.database().ref().update(updates1);
                                  break;
                                }
                              }
                            }else{
                                var postData1 = {
                                    sotien:sotien,
                                    ngaythang:$('#datetimepicker5').val(),
                                    trangthai: "Thu",
                                    sodu: +lichsudata1[i].sodu  + Number(sotien),
                                    magd:magd,
                                    sothe:$('input[name=chonthe]:checked').val()
                                  };
                                    var updates1= {};
                                    updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                    firebase.database().ref().update(updates1);
                              }
                            }else{
                              if(i>0){
                                for (var j = i-1; j >=0; j--) {
                                  if(lichsudata1[j].sothe == $('input[name=chonthe]:checked').val()){
                                    var postData1 = {
                                      sotien:sotien,
                                      ngaythang:$('#datetimepicker5').val(),
                                      trangthai: "Thu",
                                      sodu: +lichsudata1[j].sodu + Number(sotien),
                                      magd:magd,
                                      sothe:$('input[name=chonthe]:checked').val()
                                    };
                                    sodubandau=+lichsudata1[j].sodu + Number(sotien);
                                    var updates1= {};
                                    updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                    firebase.database().ref().update(updates1);
                                    break;
                                  }else if(j==0){
                                    for(var k=0;k<sothe.length;k++){
                                      if(sothe[k].sothe==$('input[name=chonthe]:checked').val()){
                                        tongsodubandau=0;
                                        for(var l=i+1;l<lichsudata1.length;l++){
                                          if(lichsudata1[l].sothe==$('input[name=chonthe]:checked').val()){
                                             tongsodubandau-= +lichsudata1[l].sotien;
                                          }
                                        }
                                        var postData1 = {
                                              sotien:sotien,
                                              ngaythang:$('#datetimepicker5').val(),
                                              trangthai: "Thu",
                                              sodu: (+sothe[k].sotien -tongsodubandau) + Number(sotien),
                                              magd:magd,
                                              sothe:$('input[name=chonthe]:checked').val()
                                        };
                                        sodubandau=(+sothe[k].sotien -tongsodubandau) + Number(sotien);
                                        var updates1= {};
                                        updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                        firebase.database().ref().update(updates1);
                                    }
                                  }
                                 }
                                }
                              }else{
                                for(var k=0;k<sothe.length;k++){
                                      if(sothe[k].sothe==$('input[name=chonthe]:checked').val()){
                                        tongsodubandau=0;
                                        for(var l=i+1;l<lichsudata1.length;l++){
                                          if(lichsudata1[l].sothe==$('input[name=chonthe]:checked').val()){
                                             tongsodubandau-= +lichsudata1[l].sotien;
                                          }
                                        }
                                        var postData1 = {
                                              sotien:sotien,
                                              ngaythang:$('#datetimepicker5').val(),
                                              trangthai: "Thu",
                                              sodu: (+sothe[k].sotien -tongsodubandau) + Number(sotien),
                                              magd:magd,
                                              sothe:$('input[name=chonthe]:checked').val()
                                        };
                                        sodubandau=(+sothe[k].sotien -tongsodubandau) + Number(sotien);
                                        var updates1= {};
                                        updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                                        firebase.database().ref().update(updates1);
                                    }
                                  }
                              }
                              for (var j = i+1; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].sothe==sothebandau){
                                  var postData = {
                                    sotien:lichsudata1[j].sotien,
                                    sodu:+lichsudata1[j].sodu  - sotienbandau,
                                    ngaythang:lichsudata1[j].ngaythang,
                                    magd:lichsudata1[j].magd,
                                    trangthai:lichsudata1[j].trangthai,
                                    sothe:lichsudata1[j].sothe
                                  };
                                  var updates = {};
                                  updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                                  firebase.database().ref().update(updates);
                                }else if(lichsudata1[j].sothe==$('input[name=chonthe]:checked').val()){
                                    var postData = {
                                        sotien:lichsudata1[j].sotien,
                                        sodu:sodubandau + +lichsudata1[j].sotien,
                                        ngaythang:lichsudata1[j].ngaythang,
                                        magd:lichsudata1[j].magd,
                                        trangthai:lichsudata1[j].trangthai,
                                        sothe:lichsudata1[j].sothe
                                    };
                                    sodubandau=sodubandau + +lichsudata1[j].sotien;
                                    var updates = {};
                                    updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                                    firebase.database().ref().update(updates);
                                }   
                              }
                             }
                            }
                          }
                          for (var i = 0; i < sothe.length; i++) {
                            if(sothe[i].sothe == $('input[name=chonthe]:checked').val()){
                                var postData1 = {
                                  sotien:+sothe[i].sotien + Number(sotien),
                                  sothe:sothe[i].sothe,
                                  tenthe:sothe[i].tenthe
                                };
                             
                                var updates1= {};
                                updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                firebase.database().ref().update(updates1);
                              }
                          }
                          for (var i = 0; i < sothe.length; i++) {
                              if(sothe[i].sothe==sothebandau){
                                  var postData1 = {
                                    sotien:+sothe[i].sotien - sotienbandau,
                                    sothe:sothe[i].sothe,
                                    tenthe:sothe[i].tenthe
                                  };
                                  var updates1= {};
                                  updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                  firebase.database().ref().update(updates1);
                              }
                          }
                      }else{
                          for (var i = 0; i < sothe.length; i++) {
                            if(sothe[i].sothe==$('input[name=chonthe]:checked').val()){
                                var postData1 = {
                                  sotien:(sothe[i].sotien - sotienbandau) + Number(sotien),
                                  sothe:sothe[i].sothe,
                                  tenthe:sothe[i].tenthe
                                };
                                var updates1= {};
                                updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                firebase.database().ref().update(updates1);
                            }
                          }
                          for (var i = 0; i < lichsudata1.length; i++) {
                            if(lichsudata1[i].magd==magd){
                               var postData1 = {
                                sotien:sotien,
                                ngaythang:$('#datetimepicker5').val(),
                                trangthai: "Thu",
                                sodu: (+lichsudata1[i].sodu  -sotienbandau) + Number(sotien),
                                magd:magd,
                                sothe:sothebandau
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                              for (var j = i+1; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].sothe==sothebandau){
                                  var postData = {
                                    sotien:lichsudata1[j].sotien,
                                    sodu:(lichsudata1[j].sodu -sotienbandau) + Number(sotien),
                                    ngaythang:lichsudata1[j].ngaythang,
                                    magd:lichsudata1[j].magd,
                                    trangthai:lichsudata1[j].trangthai,
                                    sothe:lichsudata1[j].sothe
                                  };
                                  var updates = {};
                                  updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                                  firebase.database().ref().update(updates);
                                } 
                              }
                            }
                          }
                      }
                  }else{
                     var postData = {
                        loaithunhap:$('input[name=khoanthu]:checked').val(),
                        sotien:sotien,
                        ngaythang:$('#datetimepicker5').val(),
                        mota:$('#motathu').val(),
                        magd:magd,
                        taikhoan:$('input[name=taikhoan1]:checked').val()
                      };
                    var updates = {};
                    updates['/users/'+localStorage.getItem('key')+'/tien/khoanthu/' + key] = postData;
                    firebase.database().ref().update(updates);
                    for (var i = 0; i < lichsudata.length; i++) {
                      if(lichsudata[i].magd == magd){
                          sotienmathientai = (sotienmathientai-sotienbandau)+Number(sotien);
                          reftienmat.set(sotienmathientai);
                          var postData1 = {
                            sotien:sotien,
                            ngaythang:$('#datetimepicker5').val(),
                            trangthai: "Thu",
                            sodu: (lichsudata[i].sodu - Number(lichsudata[i].sotien))+ Number(sotien),
                            magd:magd
                          };
                          var updates1= {};
                          updates1['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[i].key] = postData1;
                          firebase.database().ref().update(updates1);
                          for (var j = i+1; j < lichsudata.length; j++) {
                            var postData = {
                              sotien:lichsudata[j].sotien,
                              sodu: (+lichsudata[j].sodu-sotienbandau)+Number(sotien),
                              ngaythang:lichsudata[j].ngaythang,
                              magd:lichsudata[j].magd,
                              trangthai:lichsudata[j].trangthai,
                            };
                            var updates = {};
                            updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[j].key] = postData;
                            firebase.database().ref().update(updates);
                          }
                      }
                    }
                  }
                }
                $('#myModal2').modal('toggle');
                sessionStorage.clickcount = 1;
            }
        });
      function confirmdel1(){
        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanthu/'+key).remove();
        $('#myModal3').modal('toggle');
        if(taikhoanbandau=="Card"){
          for (var i = 0; i < lichsudata1.length; i++) {
              if(lichsudata1[i].magd==magd){
                  for (var j = i+1; j < lichsudata1.length; j++) {
                    if(lichsudata1[j].sothe == $('input[name=chonthe]:checked').val()){
                      var postData = {
                        sotien:lichsudata1[j].sotien,
                        sodu:+lichsudata1[j].sodu - Number(lichsudata1[i].sotien),
                        ngaythang:lichsudata1[j].ngaythang,
                        magd:lichsudata1[j].magd,
                        trangthai:lichsudata1[j].trangthai,
                        sothe:lichsudata1[j].sothe
                      };
                      var updates = {};
                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[j].key] = postData;
                      firebase.database().ref().update(updates);
                    }
                  }
                   firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[i].key).remove();
                  for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe == sothebandau){
                            var postData1 = {
                                sotien: sothe[i].sotien - sotienbandau,
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                           }
                  }
            }
          }
        }else{
          for (var i = 0; i < lichsudata.length; i++) {
            if(lichsudata[i].magd==magd){
                  sotienmathientai -= Number(lichsudata[i].sotien);
                  reftienmat.set(sotienmathientai);
                  for (var j = i+1; j < lichsudata.length; j++) {
                    var postData = {
                      sotien:lichsudata[j].sotien,
                      sodu:+lichsudata[j].sodu - Number(lichsudata[i].sotien),
                      ngaythang:lichsudata[j].ngaythang,
                      magd:lichsudata[j].magd,
                      trangthai:lichsudata[j].trangthai,
                    };
                    var updates = {};
                    updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[j].key] = postData;
                    firebase.database().ref().update(updates);
                  }
                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[i].key).remove();
            }
          }
       }
       sessionStorage.clickcount = 1;
     }
       function confirmdel2(){
                  if(chedo=="Tiền mặt -> Thẻ"){
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe == sothebandau){
                              reftienmat.set(sotienmathientai + Number(sotienbandau));
                              for (var j = 0; j < lichsudata.length; j++) {
                                if(lichsudata[j].magd == magd){
                                  for (var k = j+1; k < lichsudata.length; k++) {
                                    var postData = {
                                      sotien:lichsudata[k].sotien,
                                      sodu:+lichsudata[k].sodu + Number(lichsudata[j].sotien),
                                      ngaythang:lichsudata[k].ngaythang,
                                      magd:lichsudata[k].magd,
                                      trangthai:lichsudata[k].trangthai,
                                    };
                                    var updates = {};
                                    updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[k].key] = postData;
                                    firebase.database().ref().update(updates);
                                  }
                                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[j].key).remove(); 
                                }
                              } 
                              for (var j = 0; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].magd == magd){
                                  for (var k = j+1; k < lichsudata1.length; k++) {  
                                    if(lichsudata1[k].sothe==sothebandau){
                                      var postData = {
                                        sotien:lichsudata1[k].sotien,
                                        sodu:lichsudata1[k].sodu -  Number(lichsudata1[j].sotien),
                                        ngaythang:lichsudata1[k].ngaythang,
                                        magd:lichsudata1[k].magd,
                                        trangthai:lichsudata1[k].trangthai,
                                        sothe:lichsudata1[k].sothe
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    } 
                                  }
                                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[j].key).remove();
                              }
                            }
                            var postData1 = {
                                sotien: sothe[i].sotien - sotienbandau,
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);    
                          }
                        } 
                  }else if(chedo=="Tiền mặt -> Tiền tiết kiệm"){
                     reftienmat.set(sotienmathientai + Number(sotienbandau));
                     reftietkiem.set(sotientietkiemhientai - Number(sotienbandau));
                      for (var j = 0; j < lichsudata.length; j++) {
                          if(lichsudata[j].magd == magd){
                            for (var k = j+1; k < lichsudata.length; k++) {
                              var postData = {
                                sotien:lichsudata[k].sotien,
                                sodu:+lichsudata[k].sodu + Number(lichsudata[j].sotien),
                                ngaythang:lichsudata[k].ngaythang,
                                magd:lichsudata[k].magd,
                                trangthai:lichsudata[k].trangthai,
                              };
                              var updates = {};
                              updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[k].key] = postData;
                              firebase.database().ref().update(updates);
                            }
                            firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[j].key).remove(); 
                          }
                      } 
                      for (var j = 0; j < lichsudata2.length; j++) {
                          if(lichsudata2[j].magd == magd){
                            for (var k = j+1; k < lichsudata2.length; k++) {
                              var postData = {
                                sotien:lichsudata2[k].sotien,
                                sodu:+lichsudata2[k].sodu - Number(lichsudata2[j].sotien),
                                ngaythang:lichsudata2[k].ngaythang,
                                magd:lichsudata2[k].magd,
                                loaichuyen:lichsudata2[k].loaichuyen,
                              };
                              var updates = {};
                              updates['/users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/' + lichsudata2[k].key] = postData;
                              firebase.database().ref().update(updates);
                            }
                            firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/'+lichsudata2[j].key).remove(); 
                          }
                      }
                  }else if(chedo=="Tiền tiết kiệm -> Thẻ"){
                    for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe == sothebandau){
                              reftietkiem.set(sotientietkiemhientai + Number(sotienbandau));
                              for (var j = 0; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].magd == magd){
                                  for (var k = j+1; k < lichsudata1.length; k++) {
                                    if(lichsudata1[k].sothe==sothebandau){
                                      var postData = {
                                        sotien:lichsudata1[k].sotien,
                                        sodu:lichsudata1[k].sodu -  Number(lichsudata1[j].sotien),
                                        ngaythang:lichsudata1[k].ngaythang,
                                        magd:lichsudata1[k].magd,
                                        trangthai:lichsudata1[k].trangthai,
                                        sothe:lichsudata1[k].sothe
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    } 
                                  }
                                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[j].key).remove(); 
                                }
                              }
                              for (var j = 0; j < lichsudata2.length; j++) {
                                  if(lichsudata2[j].magd == magd){
                                    for (var k = j+1; k < lichsudata2.length; k++) {
                                      var postData = {
                                        sotien:lichsudata2[k].sotien,
                                        sodu:+lichsudata2[k].sodu + Number(lichsudata2[j].sotien),
                                        ngaythang:lichsudata2[k].ngaythang,
                                        magd:lichsudata2[k].magd,
                                        loaichuyen:lichsudata2[k].loaichuyen,
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/' + lichsudata2[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    }
                                    firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/'+lichsudata2[j].key).remove(); 
                                  }
                              }
                              var postData1 = {
                                sotien: sothe[i].sotien - sotienbandau,
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);    
                          }
                        }
                  }else if(chedo=="Tiền tiết kiệm -> Tiền mặt"){
                     reftienmat.set(sotienmathientai - Number(sotienbandau));
                     reftietkiem.set(sotientietkiemhientai + Number(sotienbandau));
                      for (var j = 0; j < lichsudata.length; j++) {
                          if(lichsudata[j].magd == magd){
                            for (var k = j+1; k < lichsudata.length; k++) {
                              var postData = {
                                sotien:lichsudata[k].sotien,
                                sodu:+lichsudata[k].sodu - Number(lichsudata[j].sotien),
                                ngaythang:lichsudata[k].ngaythang,
                                magd:lichsudata[k].magd,
                                trangthai:lichsudata[k].trangthai,
                              };
                              var updates = {};
                              updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[k].key] = postData;
                              firebase.database().ref().update(updates);
                            }
                            firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[j].key).remove(); 
                          }
                      } 
                      for (var j = 0; j < lichsudata2.length; j++) {
                          if(lichsudata2[j].magd == magd){
                            for (var k = j+1; k < lichsudata2.length; k++) {
                              var postData = {
                                sotien:lichsudata2[k].sotien,
                                sodu:+lichsudata2[k].sodu + Number(lichsudata2[j].sotien),
                                ngaythang:lichsudata2[k].ngaythang,
                                magd:lichsudata2[k].magd,
                                loaichuyen:lichsudata2[k].loaichuyen,
                              };
                              var updates = {};
                              updates['/users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/' + lichsudata2[k].key] = postData;
                              firebase.database().ref().update(updates);
                            }
                            firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/'+lichsudata2[j].key).remove(); 
                          }
                      }
                  }else if(chedo=="Thẻ -> Tiền mặt"){
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe == sothebandau){  
                              reftienmat.set(sotienmathientai - Number(sotienbandau));
                              for (var j = 0; j < lichsudata.length; j++) {
                                  if(lichsudata[j].magd == magd){
                                    for (var k = j+1; k < lichsudata.length; k++) {
                                      var postData = {
                                        sotien:lichsudata[k].sotien,
                                        sodu:+lichsudata[k].sodu - Number(lichsudata[j].sotien),
                                        ngaythang:lichsudata[k].ngaythang,
                                        magd:lichsudata[k].magd,
                                        trangthai:lichsudata[k].trangthai,
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsutienmat/' + lichsudata[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    }
                                    firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+lichsudata[j].key).remove(); 
                                  }
                              } 
                              for (var j = 0; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].magd == magd){
                                  for (var k = j+1; k < lichsudata1.length; k++) {
                                    if(lichsudata1[k].sothe==sothebandau){
                                      var postData = {
                                        sotien:lichsudata1[k].sotien,
                                        sodu:lichsudata1[k].sodu +  Number(lichsudata1[j].sotien),
                                        ngaythang:lichsudata1[k].ngaythang,
                                        magd:lichsudata1[k].magd,
                                        trangthai:lichsudata1[k].trangthai,
                                        sothe:lichsudata1[k].sothe
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    } 
                                  }
                                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[j].key).remove(); 
                                }
                              }    
                              var postData1 = {
                                sotien: sothe[i].sotien + sotienbandau,
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                          }
                      }
                  }else if(chedo=="Thẻ -> Tiền tiết kiệm"){
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe == sothebandau){
                              reftietkiem.set(sotientietkiemhientai - Number(sotienbandau));
                              for (var j = 0; j < lichsudata1.length; j++) {
                                if(lichsudata1[j].magd == magd){
                                  for (var k = j+1; k < lichsudata1.length; k++) {
                                    if(lichsudata1[k].sothe==sothebandau){
                                      var postData = {
                                        sotien:lichsudata1[k].sotien,
                                        sodu:lichsudata1[k].sodu +  Number(lichsudata1[j].sotien),
                                        ngaythang:lichsudata1[k].ngaythang,
                                        magd:lichsudata1[k].magd,
                                        trangthai:lichsudata1[k].trangthai,
                                        sothe:lichsudata1[k].sothe
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsucard/' + lichsudata1[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    } 
                                  }
                                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+lichsudata1[j].key).remove(); 
                                }
                              }
                              for (var j = 0; j < lichsudata2.length; j++) {
                                  if(lichsudata2[j].magd == magd){
                                    for (var k = j+1; k < lichsudata2.length; k++) {
                                      var postData = {
                                        sotien:lichsudata2[k].sotien,
                                        sodu:+lichsudata2[k].sodu - Number(lichsudata2[j].sotien),
                                        ngaythang:lichsudata2[k].ngaythang,
                                        magd:lichsudata2[k].magd,
                                        loaichuyen:lichsudata2[k].loaichuyen,
                                      };
                                      var updates = {};
                                      updates['/users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/' + lichsudata2[k].key] = postData;
                                      firebase.database().ref().update(updates);
                                    }
                                    firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutietkiem/'+lichsudata2[j].key).remove(); 
                                  }
                              }
                              var postData1 = {
                                sotien: sothe[i].sotien + sotienbandau,
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);    
                          }
                      }
                  }
          firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanchuyen/'+key).remove();
          sessionStorage.clickcount = 2;
       }
       
      