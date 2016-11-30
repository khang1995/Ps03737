NProgress.start();
      $(function() {
        $("#myTabContent").swiperight(function() {
            var $tab = $('#tablist .active').prev();
            if ($tab.length > 0)
                $tab.find('a').tab('show');
        });
        $("#myTabContent").swipeleft(function() {
            var $tab = $('#tablist .active').next();
            if ($tab.length > 0)
                $tab.find('a').tab('show');
        });
        $("#myTabContent2").swiperight(function() {
            var $tab = $('#tablist1 .active').prev();
            if ($tab.length > 0){
              $tab.find('a').tab('show');
            }
                
        });
        $("#myTabContent2").swipeleft(function() {
            var $tab = $('#tablist1 .active').next();
            if ($tab.length > 0){
              $tab.find('a').tab('show');
            }
                
        });
        $("#myTabContent3").swiperight(function() {
            var $tab = $('#tablist2 .active').prev();
            if ($tab.length > 0){
              $tab.find('a').tab('show');
            }
                
        });
        $("#myTabContent3").swipeleft(function() {
            var $tab = $('#tablist2 .active').next();
            if ($tab.length > 0){
              $tab.find('a').tab('show');
            }
                
        });
      });
      var chart,options,data;
      $(document).ready(function() {
        var cb = function(start, end, label) {
          $('#reportrange span').html(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
        };
        var optionSet1 = {
          startDate: moment(),
          endDate: moment(),
          dateLimit: {
            days: 60
          },
          showDropdowns: true,
          showWeekNumbers: true,
          timePicker: false,
          timePickerIncrement: 1,
          timePicker12Hour: false,
          ranges: {
            'Hôm nay': [moment(), moment()],
            'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '7 ngày trước': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
            '30 ngày trước': [moment().subtract(29, 'days'), moment()]
          },
          opens: 'left',
          buttonClasses: ['btn btn-default'],
          applyClass: 'btn-small btn-primary',
          cancelClass: 'btn-small',
          format: 'DD-MM-YYYY',
          separator: ' to ',
          locale: {
            applyLabel: 'Chọn',
            cancelLabel: 'Đóng',
            fromLabel: 'Từ',
            toLabel: 'Đến',
            customRangeLabel: 'Tuỳ chọn',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            firstDay: 1
          }
        };
        $('#reportrange span').html(moment().format('DD-MM-YYYY') + ' - ' + moment().format('DD-MM-YYYY'));
        $('#reportrange').daterangepicker(optionSet1, cb);
        $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
            rangdate=[],rangdatethu=[];
            var startDate=+new Date(picker.startDate.format('YYYY-MM-DD').toString());
            var endDate=+new Date(picker.endDate.format('YYYY-MM-DD').toString());
            for (var i = 0; i < ngay.length; i++) {
              var data= ngay[i].split('-');
              var format=data[2]+'-'+data[1]+'-'+data[0];
              var today= +new Date(format.toString());
              rangdate.push(today);
            }
            for (var i = 0; i < ngaythu.length; i++) {
              var data= ngaythu[i].split('-');
              var format=data[2]+'-'+data[1]+'-'+data[0];
              var today= +new Date(format.toString());
              rangdatethu.push(today);            
            }
            
            if(startDate==endDate){
                var numberofrow=0,numberofrow1=0;
                var khoanthu=[],ngaygiokhoanthu=[],khoanchi=[],ngaygiokhoanchi=[];    
                for (var i = 0; i < rangdate.length; i++) {
                  if (startDate <= rangdate[i]  && rangdate[i] <= endDate) {
                      numberofrow+=1;
                      khoanchi.push(tien[i]);
                      ngaygiokhoanchi.push(gio[i].split(':')[0]);
                  }
                }
                for (var i = 0; i < rangdatethu.length; i++) {
                    if (startDate <= rangdatethu[i]  && rangdatethu[i] <= endDate) {
                      numberofrow1+=1;
                      khoanthu.push(tienthu[i]);
                      ngaygiokhoanthu.push(giothu[i].split(':')[0]);
                    }
                }
                for (var j = 0; j < 20; j++) {
                          for (var i = 0; i < ngaygiokhoanchi.length; i++) {
                           if(ngaygiokhoanchi[i] == ngaygiokhoanchi[i+1]){
                                      var val= +khoanchi[i];
                                      val += +khoanchi[i+1];
                                      khoanchi[i]= val;
                                      var index = khoanchi.indexOf(khoanchi[i+1]);
                                      khoanchi.splice(index, 1);
                                      var index1 = ngaygiokhoanchi.indexOf(ngaygiokhoanchi[i+1]);
                                      ngaygiokhoanchi.splice(index1, 1);
                                      numberofrow-=1;
                            }else if(ngaygiokhoanchi[i] == ngaygiokhoanchi[i-1]){
                                      var val= +khoanchi[i-1];
                                      val += +khoanchi[i];
                                      khoanchi[i-1] = val;
                                      var index = khoanchi.indexOf(khoanchi[i]);
                                      khoanchi.splice(index, 1);
                                      var index1 = ngaygiokhoanchi.indexOf(ngaygiokhoanchi[i]);
                                      ngaygiokhoanchi.splice(index1, 1);
                                      numberofrow-=1;
                            }       
                          }
                          for (var i = 0; i < ngaygiokhoanthu.length; i++) {
                           if(ngaygiokhoanthu[i] == ngaygiokhoanthu[i+1]){
                                      var val= +khoanthu[i];
                                      val += +khoanthu[i+1];
                                      khoanthu[i]= val;
                                      var index = khoanthu.indexOf(khoanthu[i+1]);
                                      khoanthu.splice(index, 1);
                                      var index1 = ngaygiokhoanthu.indexOf(ngaygiokhoanthu[i+1]);
                                      ngaygiokhoanthu.splice(index1, 1);
                                      numberofrow1-=1;
                            }else if(ngaygiokhoanthu[i] == ngaygiokhoanthu[i-1]){
                                      var val= +khoanthu[i-1];
                                      val += +khoanthu[i];
                                      khoanthu[i-1] = val;
                                      var index = khoanthu.indexOf(khoanthu[i]);
                                      khoanthu.splice(index, 1);
                                      var index1 = ngaygiokhoanthu.indexOf(ngaygiokhoanthu[i]);
                                      ngaygiokhoanthu.splice(index1, 1);
                                      numberofrow1-=1;
                            }       
                          }
                }
                var chartdata=[];
                for (var i = 0; i < ngaygiokhoanchi.length; i++) {
                            chartdata.push({gio:+ngaygiokhoanchi[i],khoanchi:khoanchi[i],khoanthu:null,loai:"Chi"});
                        }
                for (var i = 0; i < ngaygiokhoanthu.length; i++) {
                            chartdata.push({gio:+ngaygiokhoanthu[i],khoanthu:khoanthu[i],khoanchi:null,loai:"Thu"});
                        }
                for (var i = 0; i < chartdata.length; i++) {
                      for (var j = i+1; j < chartdata.length; j++) {
                            if(chartdata[i].gio>chartdata[j].gio){
                              var min=chartdata[j];
                              chartdata[j]=chartdata[i];
                              chartdata[i]=min;
                            }else if(chartdata[i].gio==chartdata[j].gio){
                              if(chartdata[i].loai="Chi"){
                                chartdata[i]=({gio:+chartdata[i].gio,khoanchi:chartdata[i].khoanchi,khoanthu:chartdata[j].khoanthu});
                              }else{
                                chartdata[i]=({gio:+chartdata[i].gio,khoanchi:chartdata[j].khoanchi,khoanthu:chartdata[i].khoanthu});
                              }
                              var index1 = chartdata.indexOf(chartdata[j]);
                              chartdata.splice(index1, 1);
                            }
                      }
                }
                data = new google.visualization.DataTable();
                data.addColumn('string','date');
                data.addColumn('number', 'Khoản thu');    
                data.addColumn('number', 'Khoản chi');    
                for (var i = 0; i < chartdata.length; i++) {
                              data.addRows([[chartdata[i].gio+"h",+chartdata[i].khoanthu, +chartdata[i].khoanchi]]);
                }    
                options = {legend: {position: 'top', maxLines: 3},hAxis: {title: 'Giờ',  titleTextStyle: {color: '#333'}},vAxis:{minValue: 0}}; 
            }else{
              songaychon= (endDate- startDate)/86400000;
              var numberofrow=0,numberofrow1=0;
              var khoanthu=[],ngaygiokhoanthu=[],khoanchi=[],ngaygiokhoanchi=[];
                for (var i = 0; i < rangdate.length; i++) {
                  if (startDate <= rangdate[i]  && rangdate[i] <= endDate) {
                      khoanchi.push(tien[i]);
                      ngaygiokhoanchi.push(ngay[i].split('-')[0]+'-'+ngay[i].split('-')[1]);
                  }
                }
                for (var i = 0; i < rangdatethu.length; i++) {
                  if (startDate <= rangdatethu[i]  && rangdatethu[i] <= endDate) {
                      khoanthu.push(tienthu[i]);
                      ngaygiokhoanthu.push(ngaythu[i].split('-')[0]+'-'+ngaythu[i].split('-')[1]);
                  }
                }
                
                for (var j = 0; j < 30; j++) {
                  for (var i = 0; i < ngaygiokhoanchi.length; i++) {
                   if(ngaygiokhoanchi[i] == ngaygiokhoanchi[i+1]){
                              var val= +khoanchi[i];
                              val += +khoanchi[i+1];
                              khoanchi[i]= val;
                              var index = khoanchi.indexOf(khoanchi[i+1]);
                              khoanchi.splice(index, 1);
                              var index1 = ngaygiokhoanchi.indexOf(ngaygiokhoanchi[i+1]);
                              ngaygiokhoanchi.splice(index1, 1);
                              numberofrow-=1;
                    }else if(ngaygiokhoanchi[i] == ngaygiokhoanchi[i-1]){
                              var val= +khoanchi[i-1];
                              val += +khoanchi[i];
                              khoanchi[i-1] = val;
                              var index = khoanchi.indexOf(khoanchi[i]);
                              khoanchi.splice(index, 1);
                              var index1 = ngaygiokhoanchi.indexOf(ngaygiokhoanchi[i]);
                              ngaygiokhoanchi.splice(index1, 1);
                              numberofrow-=1;
                    }  
                  }
                  for (var i = 0; i < ngaygiokhoanthu.length; i++) {
                   if(ngaygiokhoanthu[i] == ngaygiokhoanthu[i+1]){
                              var val= +khoanthu[i];
                              val += +khoanthu[i+1];
                              khoanthu[i]= val;
                              var index = khoanthu.indexOf(khoanthu[i+1]);
                              khoanthu.splice(index, 1);
                              var index1 = ngaygiokhoanthu.indexOf(ngaygiokhoanthu[i+1]);
                              ngaygiokhoanthu.splice(index1, 1);
                              numberofrow1-=1;
                    }else if(ngaygiokhoanthu[i] == ngaygiokhoanthu[i-1]){
                              var val= +khoanthu[i-1];
                              val += +khoanthu[i];
                              khoanthu[i-1] = val;
                              var index = khoanthu.indexOf(khoanthu[i]);
                              khoanthu.splice(index, 1);
                              var index1 = ngaygiokhoanthu.indexOf(ngaygiokhoanthu[i]);
                              ngaygiokhoanthu.splice(index1, 1);
                              numberofrow1-=1;
                    }  
                  }
                }
                
                var chartdata=[];
                for (var i = 0; i < ngaygiokhoanchi.length; i++) {
                            chartdata.push({ngay:ngaygiokhoanchi[i],khoanchi:khoanchi[i],khoanthu:null,loai:"Chi"});
                        }
                for (var i = 0; i < ngaygiokhoanthu.length; i++) {
                            chartdata.push({ngay:ngaygiokhoanthu[i],khoanthu:khoanthu[i],khoanchi:null,loai:"Thu"});
                        }
                for (var i = 0; i < chartdata.length; i++) {
                      for (var j = i+1; j < chartdata.length; j++) {
                            if(chartdata[i].ngay==chartdata[j].ngay){
                              if(chartdata[i].loai="Chi"){
                                chartdata[i]=({ngay:chartdata[i].ngay,khoanchi:chartdata[i].khoanchi,khoanthu:chartdata[j].khoanthu});
                              }else{
                                chartdata[i]=({ngay:chartdata[i].ngay,khoanchi:chartdata[j].khoanchi,khoanthu:chartdata[i].khoanthu});
                              }
                              var index1 = chartdata.indexOf(chartdata[j]);
                              chartdata.splice(index1, 1);
                            }
                      }
                }
                var bientam=[];
                for (var i = 0; i < chartdata.length; i++) {
                  ngay1= Number(chartdata[i].ngay.split('-')[1]);
                  for (var j = i; j < chartdata.length; j++) {
                    ngay2=Number(chartdata[j].ngay.split('-')[1]);
                    if(ngay1>ngay2){
                      bientam=chartdata[i];
                      chartdata[i]=chartdata[j];
                      chartdata[j]=bientam;
                    }
                  }
                }
                for(var l=0;l<2;l++){
                  for (var i = 0; i < chartdata.length; i++) {
                  ngay1= Number(chartdata[i].ngay.split('-')[1]);
                  gio1= Number(chartdata[i].ngay.split('-')[0]);
                  for (var j = i; j < chartdata.length; j++) {
                    ngay2=Number(chartdata[j].ngay.split('-')[1]);
                    gio2=Number(chartdata[j].ngay.split('-')[0]);
                    if(ngay1==ngay2){
                      if(gio1>gio2){
                      bientam=chartdata[i];
                      chartdata[i]=chartdata[j];
                      chartdata[j]=bientam;
                     }
                    }
                  }
                }
                }
                
                data = new google.visualization.DataTable();
                data.addColumn('string','date');
                data.addColumn('number', 'Khoản thu');
                data.addColumn('number', 'Khoản chi');
                for (var i = 0; i < songaychon; i++) {
                  data.addRows([[chartdata[i].ngay,+chartdata[i].khoanthu, +chartdata[i].khoanchi]]);
                }    
                options = {legend: {position: 'top', maxLines: 3},hAxis: {title: 'Ngày',  titleTextStyle: {color: '#333'}},vAxis:{minValue: 0}};   
            } 
            chart.draw(data, options);  
        });
        $('#options1').click(function() {
          $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
        });
        $('#options2').click(function() {
          $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
        });
        $('#destroy').click(function() {
          $('#reportrange').data('daterangepicker').remove();
        });
      });
        var ref=firebase.database().ref('users/'+localStorage.getItem('key'));
        
        ref.once("value", function(snapshot, prevChildKey) {
              if(sessionStorage.IsLogin==null){
                $.notify({ title: '<h2>Đăng nhập thành công</h2>', message: 'Chào mừng '+snapshot.val().name, },{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 1000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
              }
              $('.profilename').html(snapshot.val().name);$('#left-col-name').html(snapshot.val().name);
        });

        var sotienmathientai=0;
        var rangdate=[];
        var chuoingay=[];
        var ngaythuso=0;
        var test;
        var tienan=0,tienuong=0,tiendichoi=0,tienmuado=0,tiendoxang=0,tienkhac=0;
        var split;
        var tongtien=0;
        var date = [];
        var data7ngay=[];
        var valtongtien;
        var ngay=[],gio=[],tien=[],mota=[],loaichitieu=[],taikhoan=[];
        var ngaythu=[],giothu=[],tienthu=[],motathu=[],loaithunhap=[];
        var ref1=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanchi').orderByChild('ngaythang');
        var ref2=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/khoanthu').orderByChild('ngaythang');
        var reftienmat=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/tienmat');
        var dkchonhide=true;
        var refngay=firebase.database().ref();
        refngay.once('value', function(snapshot) {
              ngaythuso = snapshot.val().ngaythu;
              var noichuoingay="";
              if(ngaythuso == 7){
                  for (var i = 0; i < 7; i++) {
                    if (i==6) {
                      noichuoingay+= moment().add(i, 'days').format("DD-MM-YYYY");
                    }else{
                      noichuoingay+= moment().add(i, 'days').format("DD-MM-YYYY")+",";
                    }
                  }
                  refngay.update({chuoingay:noichuoingay});
                  refngay.update({ngaythu:0}); 
                  chuoingay=snapshot.val().chuoingay.split(',');
                  for (var i=0; i <= 6; i++){
                      date.push(chuoingay[i]);
                  }
              }else{
                chuoingay=snapshot.val().chuoingay.split(',');
                for (var i=0; i <= 6; i++){
                    date.push(chuoingay[i]);
                }
                if(localStorage.getItem('username')=='khang1995'){
                  for (var i = ngaythuso; i < date.length; i++) {
                  if (chuoingay[i] != moment().format("DD-MM-YYYY")) {
                    ngaythuso+=1;
                    refngay.update({ngaythu:ngaythuso});
                  }else{
                    break;
                  }
                 }
                }
              }
              $("#titletuan").html("<h1>"+date[0].substr(0,2)+"/"+date[0].substr(3,2) +" <i class='fa fa-arrow-right' style='font-size:20px'></i> "+date[6].substr(0,2)+"/"+date[6].substr(3,2)+"</h1>");
            ref2.on("value", function(snapshot, prevChildKey) {
              tongtien=0,tienan=0,tienuong=0,tiendichoi=0,tienmuado=0,tiendoxang=0,tienkhac=0;
              ngaythu=[];giothu=[];tienthu=[];motathu=[];loaithunhap=[];
              snapshot.forEach(function(childSnapshot) {
                split=(childSnapshot.val().ngaythang).split(" ");
                ngaythu.push(split[0]);
                giothu.push(split[1]);
                tienthu.push(childSnapshot.val().sotien);
                motathu.push(childSnapshot.val().mota);
                loaithunhap.push(childSnapshot.val().loaithunhap);

              });

            });

            ref1.on("value", function(snapshot, prevChildKey) {
              tongtien=0,tienan=0,tienuong=0,tiendichoi=0,tienmuado=0,tiendoxang=0,tienkhac=0;
              loaichitieu=[];
              ngay=[];
              gio=[];
              tien=[];
              mota=[];
              taikhoan=[];
              snapshot.forEach(function(childSnapshot) {
                split=(childSnapshot.val().ngaythang).split(" ");
                ngay.push(split[0]);
                gio.push(split[1]);
                tien.push(childSnapshot.val().sotien);
                taikhoan.push(childSnapshot.val().taikhoan);
                mota.push(childSnapshot.val().mota);
                loaichitieu.push(childSnapshot.val().loaichitieu);
              });

              for (var i = 0; i < date.length; i++) {
                for (var j = 0; j < ngay.length; j++) {
                  if (date[i] == ngay[j]) {
                      tongtien += Number(tien[j]);
                      data7ngay.push({taikhoan:taikhoan[j],ngaygio:ngay[j]+" "+gio[j],mota:mota[j],tien:tien[j],loaichitieu:loaichitieu[j]});
                  }
                }
              }
              if (tongtien.toString().length==4){ valtongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3); }else if (tongtien.toString().length==5){ valtongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,4); }else if (tongtien.toString().length==6){ valtongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,5); }else if (tongtien.toString().length==7){ valtongtien=tongtien.toString().substr(0,1)+"."+tongtien.toString().substr(1,3)+"."+tongtien.toString().substr(4,6); }else if (tongtien.toString().length==8){ valtongtien=tongtien.toString().substr(0,2)+"."+tongtien.toString().substr(2,3)+"."+tongtien.toString().substr(5,7); }else if (tongtien.toString().length==9){ valtongtien=tongtien.toString().substr(0,3)+"."+tongtien.toString().substr(3,3)+"."+tongtien.toString().substr(6,8); }
              $('#tongtien').html(valtongtien);
              for (var j = 0; j < date.length; j++) {
                for (var i = 0; i < loaichitieu.length; i++) {
                    if(loaichitieu[i]=="Ăn" && date[j]==ngay[i]){
                       tienan+= +tien[i];
                    }else if(loaichitieu[i]=="Uống" && date[j]==ngay[i]){
                       tienuong+= +tien[i];                  
                    }else if(loaichitieu[i]=="Mua đồ" && date[j]==ngay[i]){
                        tienmuado+= +tien[i];                  
                    }else if(loaichitieu[i]=="Đổ xăng" && date[j]==ngay[i]){
                      tiendoxang+= +tien[i];
                    }else if(loaichitieu[i]=="Đi chơi" && date[j]==ngay[i]){
                      tiendichoi+= +tien[i];
                    }else if(loaichitieu[i]=="Khác" && date[j]==ngay[i]){
                      tienkhac+= +tien[i];
                    }
                }
              }
              tienan = Math.round(Number(tienan/tongtien)*100);  
              tienuong = Math.round(Number(tienuong/tongtien)*100);  
              tienmuado = Math.round(Number(tienmuado/tongtien)*100); 
              tiendoxang = Math.round(Number(tiendoxang/tongtien)*100);
              tienkhac = Math.round(Number(tienkhac/tongtien)*100);
              tiendichoi = Math.round(Number(tiendichoi/tongtien)*100);
              if(+tienan + +tienkhac + +tiendichoi + +tiendoxang + +tienuong + +tienmuado>100 && Math.max(+tienan , +tienkhac , +tiendichoi , +tiendoxang , +tienuong , +tienmuado)==+tienan) tienan-=1; else if(+tienan + +tienkhac + +tiendichoi + +tiendoxang + +tienuong + +tienmuado>100 && Math.max(+tienan , +tienkhac , +tiendichoi , +tiendoxang , +tienuong , +tienmuado)==+tienuong) tienuong-=1; else if(+tienan + +tienkhac + +tiendichoi + +tiendoxang + +tienuong + +tienmuado>100 && Math.max(+tienan , +tienkhac , +tiendichoi , +tiendoxang , +tienuong , +tienmuado)==+tienmuado) tienmuado-=1; else if(+tienan + +tienkhac + +tiendichoi + +tiendoxang + +tienuong + +tienmuado>100 && Math.max(+tienan , +tienkhac , +tiendichoi , +tiendoxang , +tienuong , +tienmuado)==+tiendoxang) tiendoxang-=1; else if(+tienan + +tienkhac + +tiendichoi + +tiendoxang + +tienuong + +tienmuado>100 && Math.max(+tienan , +tienkhac , +tiendichoi , +tiendoxang , +tienuong , +tienmuado)==+tiendichoi) tiendichoi-=1; else if(+tienan + +tienkhac + +tiendichoi + +tiendoxang + +tienuong + +tienmuado>100 && Math.max(+tienan , +tienkhac , +tiendichoi , +tiendoxang , +tienuong , +tienmuado)==+tienkhac) tienkhac-=1;   
              if(tongtien != 0){
              $('#chart1').attr('data-percent',tienan);
              $('#vchart1').html(tienan);
              $('#chart2').attr('data-percent',tienuong);
              $('#vchart2').html(tienuong);
              $('#chart3').attr('data-percent',tienmuado);
              $('#vchart3').html(tienmuado);
              $('#chart4').attr('data-percent',tiendoxang);
              $('#vchart4').html(tiendoxang);
              $('#chart5').attr('data-percent',tiendichoi);
              $('#vchart5').html(tiendichoi);
              $('#chart6').attr('data-percent',tienkhac);
              $('#vchart6').html(tienkhac);
              }
              $('.chart').easyPieChart({ easing: 'easeOutElastic', delay: 2000, barColor: '#26B99A', scaleColor: false, lineWidth: 5, size:105, trackWidth: 5, lineCap: 'butt', onStep: function(from, to, percent) { $(this.el).find('.percent1').text(Math.round(percent)); } });
              NProgress.done();
              google.charts.load('current', {'packages':['corechart']});
              google.charts.setOnLoadCallback(drawChart);
              function drawChart() {
                    rangdate=[],rangdatethu=[];
                        var startDate=+new Date(moment().format('YYYY-MM-DD').toString());
                        for (var i = 0; i < ngay.length; i++) {
                          var data= ngay[i].split('-');
                          var format=data[2]+'-'+data[1]+'-'+data[0];
                          var today= +new Date(format.toString());
                          rangdate.push(today);
                        }
                        for (var i = 0; i < ngaythu.length; i++) {
                          var data= ngaythu[i].split('-');
                          var format=data[2]+'-'+data[1]+'-'+data[0];
                          var today= +new Date(format.toString());
                          rangdatethu.push(today);
                        }
                        var numberofrow=0,numberofrow1=0;
                        var khoanthu=[],ngaygiokhoanthu=[],khoanchi=[],ngaygiokhoanchi=[];
                        for (var i = 0; i < rangdate.length; i++) {
                          if (startDate == rangdate[i]) {
                              numberofrow+=1;
                              khoanchi.push(tien[i]);
                              ngaygiokhoanchi.push(gio[i].split(':')[0]);
                          }
                        }
                        for (var i = 0; i < rangdatethu.length; i++) {
                          if (startDate == rangdatethu[i]) {
                              numberofrow1+=1;
                              khoanthu.push(tienthu[i]);
                              ngaygiokhoanthu.push(giothu[i].split(':')[0]);
                          }
                        }
                        for (var j = 0; j < 20; j++) {
                          for (var i = 0; i < ngaygiokhoanchi.length; i++) {
                           if(ngaygiokhoanchi[i] == ngaygiokhoanchi[i+1]){
                                      var val= +khoanchi[i];
                                      val += +khoanchi[i+1];
                                      khoanchi[i]= val;
                                      var index = khoanchi.indexOf(khoanchi[i+1]);
                                      khoanchi.splice(index, 1);
                                      var index1 = ngaygiokhoanchi.indexOf(ngaygiokhoanchi[i+1]);
                                      ngaygiokhoanchi.splice(index1, 1);
                                      numberofrow-=1;
                            }else if(ngaygiokhoanchi[i] == ngaygiokhoanchi[i-1]){
                                      var val= +khoanchi[i-1];
                                      val += +khoanchi[i];
                                      khoanchi[i-1] = val;
                                      var index = khoanchi.indexOf(khoanchi[i]);
                                      khoanchi.splice(index, 1);
                                      var index1 = ngaygiokhoanchi.indexOf(ngaygiokhoanchi[i]);
                                      ngaygiokhoanchi.splice(index1, 1);
                                      numberofrow-=1;
                            }       
                          }
                          for (var i = 0; i < ngaygiokhoanthu.length; i++) {
                           if(ngaygiokhoanthu[i] == ngaygiokhoanthu[i+1]){
                                      var val= +khoanthu[i];
                                      val += +khoanthu[i+1];
                                      khoanthu[i]= val;
                                      var index = khoanthu.indexOf(khoanthu[i+1]);
                                      khoanthu.splice(index, 1);
                                      var index1 = ngaygiokhoanthu.indexOf(ngaygiokhoanthu[i+1]);
                                      ngaygiokhoanthu.splice(index1, 1);
                                      numberofrow1-=1;
                            }else if(ngaygiokhoanthu[i] == ngaygiokhoanthu[i-1]){
                                      var val= +khoanthu[i-1];
                                      val += +khoanthu[i];
                                      khoanthu[i-1] = val;
                                      var index = khoanthu.indexOf(khoanthu[i]);
                                      khoanthu.splice(index, 1);
                                      var index1 = ngaygiokhoanthu.indexOf(ngaygiokhoanthu[i]);
                                      ngaygiokhoanthu.splice(index1, 1);
                                      numberofrow1-=1;
                            }       
                          }
                        }
                        var chartdata=[];
                        for (var i = 0; i < ngaygiokhoanchi.length; i++) {
                            chartdata.push({gio:+ngaygiokhoanchi[i],khoanchi:khoanchi[i],khoanthu:null,loai:"Chi"});
                        }
                        for (var i = 0; i < ngaygiokhoanthu.length; i++) {
                            chartdata.push({gio:+ngaygiokhoanthu[i],khoanthu:khoanthu[i],khoanchi:null,loai:"Thu"});
                        }
                        for (var i = 0; i < chartdata.length; i++) {
                          for (var j = i+1; j < chartdata.length; j++) {
                            if(chartdata[i].gio>chartdata[j].gio){
                              var min=chartdata[j];
                              chartdata[j]=chartdata[i];
                              chartdata[i]=min;
                            }else if(chartdata[i].gio==chartdata[j].gio){
                              if(chartdata[i].loai="Chi"){
                                chartdata[i]=({gio:+chartdata[i].gio,khoanchi:chartdata[i].khoanchi,khoanthu:chartdata[j].khoanthu});
                              }else{
                                chartdata[i]=({gio:+chartdata[i].gio,khoanchi:chartdata[j].khoanchi,khoanthu:chartdata[i].khoanthu});
                              }
                              var index1 = chartdata.indexOf(chartdata[j]);
                              chartdata.splice(index1, 1);
                            }
                          }
                        }
                        data = new google.visualization.DataTable();
                        data.addColumn('string','date');
                        data.addColumn('number', 'Khoản thu');    
                        data.addColumn('number', 'Khoản chi');    
                        for (var i = 0; i < chartdata.length; i++) {
                              data.addRows([[chartdata[i].gio+"h",+chartdata[i].khoanthu, +chartdata[i].khoanchi]]);
                        }
                    options = {legend: {position: 'top', maxLines: 3},hAxis: {title: 'Giờ',  titleTextStyle: {color: '#333'}},vAxis: {minValue: 0}};   
                    chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                  }
              
        });             
        });
        
    
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
            }else if($('#sotien').val().charAt(0)=="0"){
                $('.err').html('<ul><li style="color:red;font-size:16px">Số tiền không hợp lệ</li</ul>');
                return false;
            }else if($('#datetimepicker4').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn ngày giờ</li</ul>');
                return false;
            }else if($('#mota').val()==""){
                $('.err').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập mô tả</li</ul>');
                return false;
            }else{
              magd=(Math.random() + 1).toString(36).substring(7);
                if($('input[name=taikhoan]:checked').val()=="Card"){
                  for (var i = 0; i < sothe.length; i++) {
                    if(sothe[i].sothe==$('input[name=chonthe]:checked').val()){
                      if(+sothe[i].sotien >= Number(sotien)){
                        soduthe=sothe[i].sotien -sotien;
                        ref.child('tien/khoanchi').push().set({
                            loaichitieu:$('input[name=chitieu]:checked').val(),
                            taikhoan:$('input[name=taikhoan]:checked').val(),
                            sotien:sotien,
                            ngaythang:$('#datetimepicker4').val(),
                            mota:$('#mota').val(),
                            magd:magd,
                            sothe:$('input[name=chonthe]:checked').val()
                        });
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').push().set({
                          trangthai:"Chi",
                          sotien:sotien,
                          ngaythang:$('#datetimepicker4').val(),
                          sodu:soduthe,
                          magd:magd,
                          sothe:$('input[name=chonthe]:checked').val()
                        });
                        var postData1 = {
                          sotien:soduthe,
                          sothe:sothe[i].sothe,
                          tenthe:sothe[i].tenthe
                        };
                        var updates1= {};
                        updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                        firebase.database().ref().update(updates1);   
                    }else{
                      $('.err').html('<ul><li style="color:red;font-size:16px">Số tiền trong thẻ không đủ</li</ul>');
                      return false;
                    }
                   }
                  }
                }else{
                  if(sotienmathientai>=sotien){
                    ref.child('tien/khoanchi').push().set({
                    loaichitieu:$('input[name=chitieu]:checked').val(),
                    taikhoan:$('input[name=taikhoan]:checked').val(),
                    sotien:sotien,
                    ngaythang:$('#datetimepicker4').val(),
                    mota:$('#mota').val(),
                    magd:magd
                  });
                  sotienmathientai-=sotien;
                  firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').push().set({
                    trangthai:"Chi",
                    sotien:sotien,
                    ngaythang:$('#datetimepicker4').val(),
                    sodu:sotienmathientai,
                    magd:magd
                  });
                  reftienmat.set(sotienmathientai);
                  }else{
                    $('.err').html('<ul><li style="color:red;font-size:16px">Số tiền mặt không đủ</li</ul>');
                      return false;
                  }
                }
                $('#ct1').attr('class','btn btn-primary');
                $('#ct2').attr('class','btn btn-danger');
                $('#ct3').attr('class','btn btn-primary');
                $('#ct4').attr('class','btn btn-info');
                $('#ct5').attr('class','btn btn-warning');
                $('#ct6').attr('class','btn btn-success');
                $('#tk1').attr('class','btn btn-primary fa fa-usd active');
                $('#tk2').attr('class','btn btn-danger fa fa-credit-card');
                $('#sotien').val("");
                $('#mota').val("");
                $('input[name=chitieu]').attr('checked',false);
                $('input[name=taikhoan]').attr('checked',false);
                $('input:radio[name="taikhoan"]').filter('[value="Tiền mặt"]').prop('checked', true);
                $('#datetimepicker4').val(moment().format('DD-MM-YYYY HH:mm'));
                $('.err').html('');
                $.notify({ message: '<h2>Thêm chi tiêu thành công</h2>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
          }
        }
        $('#chitieuform').on('keydown', 'input', function (event) {
          if (event.which == 13) {
              event.preventDefault();
              var $this = $(event.target);
              var index = parseFloat($this.attr('data-chi'));
              $('[data-chi="' + (index + 1).toString() + '"]').focus();
          }
        });
        $('#khoanthuform').on('keydown', 'input', function (event) {
          if (event.which == 13) {
              event.preventDefault();
              var $this = $(event.target);
              var index = parseFloat($this.attr('data-thu'));
              $('[data-thu="' + (index + 1).toString() + '"]').focus();
          }
        });

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
                $('.err2').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn loại thu nhập</li</ul>');
                return false;
            }else if(sotien==""){
                $('.err2').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập số tiền</li</ul>');
                return false;
            }else if($('#sotien1').val().charAt(0)=="0"){
                $('.err2').html('<ul><li style="color:red;font-size:16px">Số tiền không hợp lệ</li</ul>');
                return false;
            }else if($('#datetimepicker5').val()==""){
                $('.err2').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn ngày giờ</li</ul>');
                return false;
            }else if($('#motathu').val()==""){
                $('.err2').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập mô tả</li</ul>');
                return false;
            }else{
                magd=(Math.random() + 1).toString(36).substring(7);
                if($('input[name=taikhoan1]:checked').val()=="Card"){
                  for (var i = 0; i < sothe.length; i++) {
                    if(sothe[i].sothe==$('input[name=chonthe]:checked').val()){
                          soduthe= +sothe[i].sotien + Number(sotien);
                          ref.child('tien/khoanthu').push().set({
                              loaithunhap:$('input[name=khoanthu]:checked').val(),
                              taikhoan:$('input[name=taikhoan1]:checked').val(),
                              sotien:sotien,
                              ngaythang:$('#datetimepicker5').val(),
                              mota:$('#motathu').val(),
                              magd:magd,
                              sothe:$('input[name=chonthe]:checked').val()
                            });   
                          firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').push().set({
                            trangthai:"Thu",
                            sotien:sotien,
                            ngaythang:$('#datetimepicker5').val(),
                            sodu:soduthe,
                            magd:magd,
                            sothe:$('input[name=chonthe]:checked').val()
                          });
                           var postData1 = {
                            sotien:soduthe,
                            sothe:sothe[i].sothe,
                            tenthe:sothe[i].tenthe
                            };
                            var updates1= {};
                            updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                            firebase.database().ref().update(updates1);    
                      }
                    }
                  }else{
                    ref.child('tien/khoanthu').push().set({
                      loaithunhap:$('input[name=khoanthu]:checked').val(),
                      taikhoan:$('input[name=taikhoan]:checked').val(),
                      sotien:sotien,
                      ngaythang:$('#datetimepicker5').val(),
                      mota:$('#motathu').val(),
                      magd:magd
                    });
                    firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').push().set({
                      trangthai:"Thu",
                      sotien:sotien,
                      ngaythang:$('#datetimepicker5').val(),
                      sodu:sotienmathientai + Number(sotien),
                      magd:magd
                    });
                    sotienmathientai+= Number(sotien);
                    reftienmat.set(sotienmathientai);
                }
                $('#tn1').attr('class','btn btn-primary');
                $('#tn2').attr('class','btn btn-warning');
                $('#tn3').attr('class','btn btn-success');
                $('#sotien1').val("");
                $('#motathu').val("");
                $('#tk3').attr('class','btn btn-primary fa fa-usd active');
                $('#tk4').attr('class','btn btn-danger fa fa-credit-card');
                $('input[name=khoanthu]').attr('checked',false);
                $('input[name=taikhoan1]').attr('checked',false);
                $('input:radio[name="taikhoan1"]').filter('[value="Tiền mặt"]').prop('checked', true);
                $('#datetimepicker5').val(moment().format('DD-MM-YYYY HH:mm'));
                $('.err').html('');
                $.notify({ message: '<h2>Thêm thu nhập thành công</h2>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
            }
        });

        $('#logout').on('click',function(){
          localStorage.removeItem("key");
          localStorage.removeItem("name");
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          sessionStorage.removeItem('IsAccessed');
         });
       

      $('#mota').on('click',function(){
          $('.err').html('');
      });
      $('#chitieu').on('click',function(){
          $('.err').html('');
      });
      $('#sotien').on('click',function(){
          $('.err').html('');
      });
      $('#motathu').on('click',function(){
          $('.err2').html('');
      });
      $('#thunhap').on('click',function(){
          $('.err2').html('');
      });
      $('#sotien1').on('click',function(){
          $('.err2').html('');
      });
      $('#updatesotien').on('click',function(){
          $('.err2').html('');
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
      $('#datetimepicker4').val(moment().format('DD-MM-YYYY HH:mm'));
      $('#datetimepicker5').datetimepicker(
        {format: 'DD-MM-YYYY HH:mm'}
      );  

      $('#datetimepicker5').val(moment().format('DD-MM-YYYY HH:mm'));
      $("#sotien").click(function(){
          document.getElementById('sotien').value="";
      });
      $('#datetimepicker6').datetimepicker(
        {format: 'DD-MM-YYYY HH:mm'}
      );  

      $('#datetimepicker6').val(moment().format('DD-MM-YYYY HH:mm'));
      
      $("#sotien").click(function(){
          document.getElementById('sotien').value="";
      });
      $("#sotien1").click(function(){
          document.getElementById('sotien1').value="";
      });
      $("#sotien2").click(function(){
          document.getElementById('sotien2').value="";
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
      function keyupmoney(sotien){
          $('#'+sotien+'').keyup(function(event) {
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
      }

      var lat,lng;
      $(document).ready(function() {
        keyupmoney("sotien");
        keyupmoney("sotien1");
        keyupmoney("sotien2");
        keyupmoney("sotien3");
        keyupmoney("sotien4");
        keyupmoney("sotien8");
        $('#password').keydown(function(e){
                if(e.keyCode == 13)
                  {
                      $('#accesssercetmoney').click();
                  }
              });
        $('#sotien3').keydown(function(e){
          if(e.keyCode == 13)
          {
            $('#updatesodutienmat').click();
          }      
        });
        $('#sotien3').on('click',function(){
          $('.err3').html('');
        });
        $('#divthemthe').hide();
        $('#bchonthe').hide();
        $('#h2themthe').hide();
        $('#bthemthe').on('click',function(){
          $('#divthemthe').show();
          $('#bchonthe').show();
          $('#h2themthe').show();
          $('#quayvechontienmat').hide();
          $('#divthe').hide();
          $('#bthemthe').hide();
          $('#h2chonthe').hide();
          $('#chonhide').hide();
          $('#themthe').show();
        });
        $('#bchonthe').on('click',function(){
          $('#divthemthe').hide();
          $('#bchonthe').hide();
          $('#h2themthe').hide();
          $('#divthe').show();
          $('#quayvechontienmat').show();
          $('#bthemthe').show();
          $('#h2chonthe').show();
          $('#themthe').hide();
          if(dkchonhide)
          $('#chonhide').show();
        });
        $('#sothe').keydown(function(event) {
          if (event.which === 32)
            return false;
          if(event.keyCode != 8){
              if(reg2.test(this.value)||reg4.test(this.value)||reg3.test(this.value)||reg5.test(this.value)||reg6.test(this.value)||reg7.test(this.value)||reg8.test(this.value)){
                if (this.value.length==4){
                $(this).val(
                  this.value+" "
                );
                }
                else if (this.value.length==9){
                  $(this).val(
                    this.value+" "
                  );
                }
                else if (this.value.length==14){
                  $(this).val(
                    this.value +" "
                  );
                }
              }
            }
        });
        $('#sothe').keyup(function(event){
          if(reg2.test(this.value)||reg4.test(this.value)||reg3.test(this.value)||reg5.test(this.value)||reg6.test(this.value)||reg7.test(this.value)||reg8.test(this.value)){
              
            }else{
                $(this).val(this.value.substring(0,this.value.length-1));
            } 
        });
        $('#updatesothe').keydown(function(event) {
          if (event.which === 32)
            return false;
          if(event.keyCode != 8){
              if(reg2.test(this.value)||reg4.test(this.value)||reg3.test(this.value)||reg5.test(this.value)||reg6.test(this.value)||reg7.test(this.value)||reg8.test(this.value)){
                if (this.value.length==4){
                $(this).val(
                  this.value+" "
                );
                }
                else if (this.value.length==9){
                  $(this).val(
                    this.value+" "
                  );
                }
                else if (this.value.length==14){
                  $(this).val(
                    this.value +" "
                  );
                }
              }
            }
        });
        $('#updatesothe').keyup(function(event){
            if(reg2.test(this.value)||reg4.test(this.value)||reg3.test(this.value)||reg5.test(this.value)||reg6.test(this.value)||reg7.test(this.value)||reg8.test(this.value)){
              
            }else{
                $(this).val(this.value.substring(0,this.value.length-1));
            } 
        });
        $("#quayvechontienmat").on("click",function(){
          $('input[name=taikhoan]').attr('checked',false);
          $('input:radio[name="taikhoan"]').filter('[value="Tiền mặt"]').prop('checked', true);
          $('#tk1').trigger("click");
          $('input[name=taikhoan1]').attr('checked',false);
          $('input:radio[name="taikhoan1"]').filter('[value="Tiền mặt"]').prop('checked', true);
          $('#tk3').trigger("click");
        });
        $("#themthe").on("click",function(){
          var sotien=$('#sotien4').val();
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
            if($('#tenthe').val()==""){
                $('.err4').html('<ul><li style="color:red;font-size:16px">Tên thẻ không được trống</li</ul>');
                return false;
            }else if($('#sothe').val().length<19){
                $('.err4').html('<ul><li style="color:red;font-size:16px">Số thẻ không hợp lệ</li</ul>');
                return false;
            }else if(sotien==""){
                $('.err4').html('<ul><li style="color:red;font-size:16px">Số tiền không được trống</li</ul>');
                return false;
            }else if($('#sotien4').val().charAt(0)=="0"){
                $('.err4').html('<ul><li style="color:red;font-size:16px">Số tiền không hợp lệ</li</ul>');
                return false;
            }else{
                ref.child('tien/danhsachthe').push().set({
                  tenthe:$('#tenthe').val(),
                  sotien:sotien,
                  sothe:$('#sothe').val()
                });
                $('#divthemthe').hide();
                $('#quayvechontienmat').show();
                $('#bchonthe').hide();
                $('#chonhide').show();
                $('#divthe').show();
                $("#themthe").hide();
                $('#h2themthe').hide();
                $('#divthe').show();
                $('#bthemthe').show();
                $('#h2chonthe').show();
                $('#tenthe').val('');
                $('#sothe').val('');
                $('#sotien4').val('');     
                $.notify({ message: '<h2>Thêm thẻ thành công</h2>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
            }
        });

        $('#myModal1').on('shown.bs.modal', function () {
            $('#sotien3').focus();
        });  
        $("#updatesodutienmat").on("click",function(){
          sotien=$('#sotien3').val();
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
           if(sotien==""){
                $('.err3').html('<ul><li style="color:red;font-size:16px">Vui lòng nhập số tiền</li</ul>');
                return false;
            }else if($('#sotien3').val().charAt(0)=="0"){
                $('.err3').html('<ul><li style="color:red;font-size:16px">Số tiền không hợp lệ</li</ul>');
                return false;
            }else{
                sotien=Number(sotien);
                reftienmat.set(sotien);
                $('#sotien3').val('');
                $('#myModal1').modal('toggle');
                $.notify({ message: '<h2>Cập nhật thành công</h2>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
            } 
        });
        $(".ui-loader").hide();
        function showTheTime() { 
            document.getElementById("todaydate").innerHTML= moment().format('dddd, D  MMMM, YYYY');
            document.getElementById("todayhour").innerHTML= moment().format(' H:mm:ss ');            
        }
        function reloadTime(){
          $('#datetimepicker4').val(moment().format('DD-MM-YYYY HH:mm'));
          $('#datetimepicker5').val(moment().format('DD-MM-YYYY HH:mm'));
          $('#datetimepicker6').val(moment().format('DD-MM-YYYY HH:mm'));
        }
        var address;
        setInterval(reloadTime, 60000);
        setInterval(showTheTime, 1000);
        $.getJSON('http://ip-api.com/json', function(data){
            lat = data.lat;
            lng = data.lon;
        });
        setTimeout(function() {
          if (lat ==null) {
              address='http://api.openweathermap.org/data/2.5/forecast?lat=10.775663&lon=106.645399&APPID=3a3caff163572a8e029fa2f79d8b3f2b';

            }else{
              address='http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lng+'&APPID=3a3caff163572a8e029fa2f79d8b3f2b';
          }
         $.ajax({
              url:address ,
              dataType: 'json',
              jsonpCallback: 'MyJSONPCallback',
              success: function(data){
                  if(data.city.name=="Thông Tây Hội"){
                    document.getElementById("city").innerHTML="Thành phố Hồ Chí Minh";
                  }else{
                     document.getElementById("city").innerHTML=data.city.name;
                  }
                  
                 var icons = new Skycons({
                    "color": "#73879C"
                  });
                  var weather;
                  for (i = 1; i < 8;i++)
                  {
                        document.getElementById("d"+i).innerHTML=(data.list[i].main.temp-273.15).toString().substr(0,2);
                        document.getElementById("m"+i).innerHTML=capitalizeFirstLetter(data.list[i].weather[0].description);
                        if (i!=7)
                        document.getElementById("h"+i).innerHTML=data.list[i+1].dt_txt.toString().substr(11,13).split(":",1)+"h";
                        if(data.list[i].weather[0].main=="Clouds"){
                          weather="cloudy";
                        }else if(data.list[i].weather[0].main=="Rain"){
                          weather="rain";
                        }else if(data.list[i].weather[0].main=="Clear"){
                           var gio=data.list[i].dt_txt.toString().substr(11,13).split(":",1).toString();
                            if(gio == "18" || gio == "21" || gio=="00" || gio == "03")
                              weather="clear-night";
                            else
                              weather="clear-day";
                        }
                        icons.add(document.getElementById("wi"+i),weather);
                  } 
                  icons.play();
              }
            });
          }, 1000);
       
      });
      function changemoneyshow(formattien){
          if (formattien.toString().length==4){
                  formattien=formattien.toString().substr(0,1)+"."+formattien.toString().substr(1,3);
              }else if (formattien.toString().length==5){
                  formattien=formattien.toString().substr(0,2)+"."+formattien.toString().substr(2,4);
              }else if (formattien.toString().length==6){
                  formattien=formattien.toString().substr(0,3)+"."+formattien.toString().substr(3,5);
              }else if (formattien.toString().length==7){
                  formattien=formattien.toString().substr(0,1)+"."+formattien.toString().substr(1,3)+"."+formattien.toString().substr(4,6);
              }else if (formattien.toString().length==8){
                  formattien=formattien.toString().substr(0,2)+"."+formattien.toString().substr(2,3)+"."+formattien.toString().substr(5,7);
              }else if (formattien.toString().length==9){
                  formattien=formattien.toString().substr(0,3)+"."+formattien.toString().substr(3,3)+"."+formattien.toString().substr(6,8);
              }
        return formattien;
      }
      function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

      var refdutienmat=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').orderByChild('ngaythang');
      refdutienmat.on("value", function(snapshot, prevChildKey) {
                    var array=[];
                    $('#lichsutienmat').html('');   
                    snapshot.forEach(function(childSnapshot) {
                          array.push({ngaythang:childSnapshot.val().ngaythang,sotien:childSnapshot.val().sotien,sodu:childSnapshot.val().sodu,trangthai:childSnapshot.val().trangthai,key:childSnapshot.key,trangthai1:childSnapshot.val().trangthai1});
                    });
                    array.reverse();
                    for (var i = 0; i < array.length; i++) {
                      if(i<10){
                        var formattien=changemoneyshow(array[i].sotien);
                        var ngay=array[i].ngaythang.split(' ');
                        var data= ngay[0].split('-');
                        var format=data[2]+'-'+data[1]+'-'+data[0];
                        if(array[i].trangthai=="Chi"){
                              if(array[i].trangthai1 !=null){
                                $('#lichsutienmat').append('<tr><td>'+ array[i].ngaythang +'</td><td>'+ array[i].trangthai1 +'</td><td><b style="color:#F52727" class="fa fa-long-arrow-down"> '+ formattien+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');
                              }else
                              $('#lichsutienmat').append('<tr><td>'+ array[i].ngaythang +'</td><td>'+ array[i].trangthai +'</td><td><b style="color:#F52727" class="fa fa-long-arrow-down"> '+ formattien+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');
                        }else{
                            if(array[i].trangthai1 !=null){
                                $('#lichsutienmat').append('<tr><td>'+ array[i].ngaythang +'</td><td>'+ array[i].trangthai1 +'</td><td><b style="color:#27C416" class="fa fa-long-arrow-up"> '+ formattien+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');
                            }else
                                $('#lichsutienmat').append('<tr><td>'+ array[i].ngaythang +'</td><td>'+ array[i].trangthai +'</td><td><b style="color:#27C416" class="fa fa-long-arrow-up"> '+ formattien+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');
                        }  
                      }else{
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+array[i].key).remove();
                      } 
                    }
      });
      var chedo,sothechuyen='',isnull=true,sotienchuyen=0,tenthechuyen,keychuyen;
      var dslichsucard=[];  
      $(document).on("click", ".opendata7ngay", function () {
          $("#data7ngay").html('');
          tt=0;
           for (var i = 0; i < data7ngay.length; i++) {
             if (data7ngay[i].loaichitieu==$(this).data('loaichitieu')) {
                $("#data7ngay").append('<tr><td>'+ data7ngay[i].taikhoan+'</td><td>'+ data7ngay[i].ngaygio +'</td><td>'+ data7ngay[i].mota+'</td><td><i style="float:right">'+ changemoneyshow(data7ngay[i].tien)+' vnđ</i></td></tr>');
                tt+= +data7ngay[i].tien;
             }
           }
           $("#data7ngay").append('<tr style="background:#FFF; border-bottom: 5px solid rgba(255,255,255,.5);border-left: 5px solid rgba(255,255,255,.5);border-right: 5px solid rgba(255,255,255,.5);"><td style="border-right: 10px solid rgba(255,255,255,.5);"></td><td style="border-right: 10px solid rgba(255,255,255,.5);"></td><td style="border-right: 10px solid rgba(255,255,255,.5);" ><b style="float:right;font-size:14px"> Tổng tiền</b></td><td><b style="float:right;margin-left:15px;font-size:14px">'+changemoneyshow(tt)+' vnđ</b></td></tr>');
           $('#myModal2').modal('show'); 
        });
        var sothe=[];
        var chedochuyen,opttm,opttd,opttk;
        var sotabthe=0;
        var refdanhsachthe=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/danhsachthe');
        refdanhsachthe.on('value', function(snapshot) {
          tongsodu=0;
          if(snapshot.val()==null){
            $('#divthe').html('Bạn không có thẻ nào');
            $('#chonhide').hide();
            $('#tablist1').hide();
            $('#myTabContent2').html('<h3>Bạn không có thẻ nào</h3>');
            dkchonhide=false;
          }else{
            dkchonhide=true;
            sothe=[];
            $('#tablist1').show();
            $('#divthe').html('');
            dem=0;
            $('#tablist1').html("");
            $('#myTabContent2').html('');
            dem1=6;
            sotabthe=0;
            chedochuyen='';
            opttm='';
            opttd='';
            opttk='';
            $(".chedochuyen").html('');
          }
          snapshot.forEach(function(childSnapshot) {
            sothe.push({sothe:childSnapshot.val().sothe,sotien:childSnapshot.val().sotien,tenthe:childSnapshot.val().tenthe,key:childSnapshot.key});
              if(dem1==6){ 
                $('#tablist1').append('<li role="presentation" class="active"><a href="#tab_content'+dem1+'" role="tab" data-toggle="tab" data-tab="tab'+dem1+'" aria-expanded="false">'+childSnapshot.val().tenthe+'</a> </li>');
                $('#myTabContent2').append('<div role="tabpanel" class="tab-pane active in fade" id="tab_content'+dem1+'" aria-labelledby="home-tab"> <p style="font-size:15px">Số thẻ: <b>'+childSnapshot.val().sothe+'</b></p> <p style="font-size:15px">Số dư: <b>'+changemoneyshow(childSnapshot.val().sotien)+'</b></p><a href="#" class="btn btn-primary clickupdatecard" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sothe="'+childSnapshot.val().sothe+'" data-sotien="'+childSnapshot.val().sotien+'">Cập nhật thẻ</a><a href="#" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" class=" btn btn-danger xoadanhsachthe">Xoá thẻ</a><br><h2>Lịch sử thẻ</h2><table class="datatable table table-striped table-bordered" style="width: 100%"> <thead> <tr> <th>Ngày giờ</th> <th>Trạng thái</th><th>Số tiền</th><th>Số dư</th> </tr> </thead> <tbody id="the'+dem+'"></tbody> </table> </div>');
              }
              else{
                 $('#tablist1').append('<li role="presentation" ><a href="#tab_content'+dem1+'" role="tab" data-toggle="tab" data-tab="tab'+dem1+'" aria-expanded="false">'+childSnapshot.val().tenthe+'</a> </li>');
                 $('#myTabContent2').append('<div role="tabpanel" class="tab-pane fade" id="tab_content'+dem1+'" aria-labelledby="home-tab"> <p style="font-size:15px">Số thẻ: <b>'+childSnapshot.val().sothe+'</b></p><p style="font-size:15px">Số dư: <b>'+changemoneyshow(childSnapshot.val().sotien)+'</b> </p><a href="#" class="btn btn-primary clickupdatecard" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sothe="'+childSnapshot.val().sothe+'" data-sotien="'+childSnapshot.val().sotien+'">Cập nhật thẻ</a><a href="#" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" class=" btn btn-danger xoadanhsachthe">Xoá thẻ</a><br><h2>Lịch sử thẻ</h2><table class="datatable table table-striped table-bordered" style="width: 100%"> <thead> <tr> <th>Ngày giờ</th> <th>Trạng thái</th><th>Số tiền</th><th>Số dư</th> </tr> </thead> <tbody id="the'+dem+'"></tbody> </table> </div>'); 
              }
            if(dem==0)
              $('#divthe').append('<label style="width: 100%"><input type="radio" checked="checked" name="chonthe" value="'+ childSnapshot.val().sothe +'"><b style="margin-left: 15px">'+childSnapshot.val().tenthe+' ('+ childSnapshot.val().sothe +') - '+ changemoneyshow(childSnapshot.val().sotien)+' vnđ</b></label>');
            else
              $('#divthe').append('<label style="width: 100%"><input type="radio" name="chonthe" value="'+ childSnapshot.val().sothe +'"><b style="margin-left: 15px">'+childSnapshot.val().tenthe+' ('+ childSnapshot.val().sothe +') - '+changemoneyshow(childSnapshot.val().sotien)+'vnđ</b></label>');
            $('#optgrouptm').append('<option>Tiền mặt -> Thẻ('+childSnapshot.val().sothe+')</option>');
            opttm += '<option data-chedochuyen="Tiền mặt -> Thẻ" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'" >Tiền mặt -> Thẻ('+childSnapshot.val().tenthe+')</option>';
            opttk += '<option data-chedochuyen="Tiền tiết kiệm -> Thẻ" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'">Tiền tiết kiệm -> Thẻ('+childSnapshot.val().tenthe+')</option>';
            opttd += '<option data-chedochuyen="Thẻ -> Tiền mặt" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'">Thẻ('+childSnapshot.val().tenthe+') - '+changemoneyshow(childSnapshot.val().sotien)+' vnđ -> Tiền mặt</option><option data-chedochuyen="Thẻ -> Tiền tiết kiệm" data-sothe="'+childSnapshot.val().sothe+'" data-key="'+childSnapshot.key+'" data-tenthe="'+childSnapshot.val().tenthe+'" data-sotien="'+childSnapshot.val().sotien+'">Thẻ('+childSnapshot.val().tenthe+') - '+changemoneyshow(childSnapshot.val().sotien)+' vnđ -> Tiền tiết kiệm</option>';
            dem++;
            sotabthe++;
            dem1++;
            tongsodu+= Number(childSnapshot.val().sotien);
          });
          reftienmat.on('value', function(snapshot) {
            $(".chedochuyen").html('');
            sotienmathientai= Number(snapshot.val());
            var formattien=changemoneyshow(sotienmathientai);  
            $('#sotienmathientai').html(formattien+"  vnđ");
            $('#hthisoduht').html( " "+formattien+"  vnđ");
            $('#tongsodu').html(changemoneyshow(tongsodu+sotienmathientai)+"  vnđ");
            chedochuyen='<select class="col-md-9 col-sm-9 col-xs-12"><option disabled selected value="default"> -- Chọn chế độ -- </option><optgroup label="Tiền mặt - '+changemoneyshow(sotienmathientai)+' vnđ"><option data-chedochuyen="Tiền mặt -> Tiền tiết kiệm">Tiền mặt -> Tiền tiết kiệm</option>'+opttm+'</optgroup><optgroup label="Tín dụng">'+opttd+'</optgroup><optgroup label="Tiền tiết kiệm"> <option data-chedochuyen="Tiền tiết kiệm -> Tiền mặt">Tiền tiết kiệm -> Tiền mặt</option>'+opttk+'</optgroup></select>';
            $(".chedochuyen").append(chedochuyen);
            $('select').change(function(){
              chedo=$(this).find(':selected').data('chedochuyen');
              sothechuyen=$(this).find(':selected').data('sothe');
              console.log(sothechuyen);
              isnull=true;
              if(sothechuyen!=null){
                  isnull=false;
                  sotienchuyen= $(this).find(':selected').data('sotien');
                  tenthechuyen=$(this).find(':selected').data('tenthe');  
                  keychuyen=$(this).find(':selected').data('key');
              }
            });
            $(".btnhide").show();
          });
          var reflichsucard1=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').orderByChild('ngaythang');
          reflichsucard1.on('value', function(snapshot) {
                var array=[];
                dem=4;
                snapshot.forEach(function(childSnapshot) {
                  array.push({ngaythang:childSnapshot.val().ngaythang,sotien:childSnapshot.val().sotien,sodu:childSnapshot.val().sodu,sothe:childSnapshot.val().sothe,trangthai:childSnapshot.val().trangthai,key:childSnapshot.key,trangthai1:childSnapshot.val().trangthai1});
                });
                dslichsucard=array;   
                array.reverse();     
                for (var i = 0; i < sotabthe; i++) {
                  count=0;
                  $('#the'+i).html('');
                   for (var j = 0; j < array.length; j++) {
                      if(sothe[i].sothe==array[j].sothe){
                        count++;
                        if(count<10){
                          if(array[j].trangthai=="Chi"){
                            if(array[j].trangthai1 != null){
                              $('#the'+i).append('<tr><td>'+ array[j].ngaythang +'</td><td>'+ array[j].trangthai1 +'</td><td><b style="color:#F52727" class="fa fa-long-arrow-down"> '+ changemoneyshow(array[j].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[j].sodu)+' vnđ</td></tr>');
                             }else
                             $('#the'+i).append('<tr><td>'+ array[j].ngaythang +'</td><td>'+ array[j].trangthai +'</td><td><b style="color:#F52727" class="fa fa-long-arrow-down"> '+ changemoneyshow(array[j].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[j].sodu)+' vnđ</td></tr>');
                          }else{
                             if(array[j].trangthai1 !=null){
                               $('#the'+i).append('<tr><td>'+ array[j].ngaythang +'</td><td>'+ array[j].trangthai1 +'</td><td><b style="color:#27C416" class="fa fa-long-arrow-up"> '+ changemoneyshow(array[j].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[j].sodu)+' vnđ</td></tr>');
                             }else
                             $('#the'+i).append('<tr><td>'+ array[j].ngaythang +'</td><td>'+ array[j].trangthai +'</td><td><b style="color:#27C416" class="fa fa-long-arrow-up"> '+ changemoneyshow(array[j].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[j].sodu)+' vnđ</td></tr>');
              
                          }
                        }else{
                          firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+array[j].key).remove();
                        }  
                      }
                   }
                }                                                                
           });
      });
      var keyupdatetiencard,tenupdatethe,tienupdatethe,sotheupdatethe;
      $(document).on("click", ".clickupdatecard", function () {
          keyupdatetiencard=$(this).data('key');
          tenupdatethe=$(this).data('tenthe');
          tienupdatethe=$(this).data('sotien');
          sotheupdatethe=$(this).data('sothe');
          keyupmoney('updatesotien');
          $('#updatesotien').on('click',function(){
            $('#updatesotien').val('');
          });
          $('#myModal4').modal('toggle');
          $('#myModal9').modal('show'); 
          $('#myModal9').on('hidden.bs.modal', function () {$('body').css('padding-right','0px')});
          $('#updatetenthe').val(tenupdatethe);
          $('#updatesothe').val(sotheupdatethe);
          $('#updatesotien').val(changemoneyshow(tienupdatethe));
      });
      $(document).on("click", ".xoadanhsachthe", function () {
          keyupdatetiencard=$(this).data('key');
          sotheupdatethe=$(this).data('sothe');
          $('#myModal4').modal('toggle');
          $('#myModal10').modal('show');
           $('#myModal10').on('hidden.bs.modal', function () {$('body').css('padding-right','0px')}); 
      });
      $(document).on("click", "#xacnhanxoadanhsachthe", function () {
            for (var i = 0; i < sothe.length; i++) {
              if(sothe[i].key==keyupdatetiencard){
                    firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/danhsachthe/'+keyupdatetiencard).remove();
                    $('#myModal4').modal('show');
                    $('#myModal10').on('hidden.bs.modal', function () {$('body').css('padding-right','0px')});
              }
            }
            for (var i = 0; i < dslichsucard.length; i++) {
              if(dslichsucard[i].sothe==sotheupdatethe){
                firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard/'+dslichsucard[i].key).remove();
              }
            }
      });
      $(document).on("click", "#capnhatdanhsachthe", function () {
            sotien=$('#updatesotien').val();
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
            if($('#updatetenthe').val()==""){
                $('.err9').html('<ul><li style="color:red;font-size:16px">Tên thẻ không được trống</li</ul>');
                return false;
            }else if($('#updatesothe').val()==""){
                $('.err9').html('<ul><li style="color:red;font-size:16px">Số thẻ không được trống</li</ul>');
                return false;
            }else if($('#updatesothe').val().length<19){
                $('.err9').html('<ul><li style="color:red;font-size:16px">Số thẻ không hợp lệ</li</ul>');
                return false;
            }else if(sotien==""){
                $('.err9').html('<ul><li style="color:red;font-size:16px">Số tiền không được trống</li</ul>');
                return false;
            }else if($('#updatesotien').val().charAt(0)=="0"){
                $('.err9').html('<ul><li style="color:red;font-size:16px">Số tiền không được trống</li</ul>');
                return false;
            }else{
                var postData1 = {
                  sotien:sotien,
                  sothe:$('#updatesothe').val(),
                  tenthe:$('#updatetenthe').val()   
                };
                var updates1= {};
                updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + keyupdatetiencard] = postData1;
                firebase.database().ref().update(updates1);  
                $('#myModal9').modal('toggle');
                $('#myModal4').modal('show'); 
              } 
      });
      $(document).on("click", "#quayvedanhsachthe", function () {
          $('#myModal4').modal('show');
          $('#myModal9').modal('toggle');
      });
      $(document).on("click", "#clicksercetmoney", function () {
          if (sessionStorage.IsAccessed){
            $('#myModal6').modal('show');
            $('#myModal6').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
          }else{
            $('#myModal5').modal('show'); 
          }   
      });
      $(document).on("click", "#accesssercetmoney", function () {
              if($('#password').val()==""){
                 $('.err5').html('<ul><li style="color:red;font-size:14px;margin-top:5px">Mật khẩu không được trống</li</ul>');
                return false;
              }
              else if(CryptoJS.AES.decrypt(localStorage.getItem('password'), "password").toString(CryptoJS.enc.Utf8)!=$('#password').val()){
                $('.err5').html('<ul><li style="color:red;font-size:16px">Mật khẩu không khớp</li</ul>');
                return false;
              }else{
                $('#myModal5').modal('toggle');
                $('body').css('overflow','hidden');
                $('#myModal6').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
                $('#myModal6').modal('show'); 
                sessionStorage.IsAccessed = 1;
              }
             
      });
      var tientietkiem=0;
      var reftientietkiem=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/tientietkiem');
      reftientietkiem.on('value', function(snapshot) {
              tientietkiem=Number(snapshot.val());
              $('#tientietkiem').val(changemoneyshow(tientietkiem) +" vnđ");
      });
      $(document).on("click", "#capnhatttk", function () {
          $('#tientietkiem').attr('style','width:100px');
          $("#tientietkiem").prop('disabled', false);
          $("#tientietkiem").val('');
          $("#tientietkiem").focus();
          $('#tientietkiem').on('click',function(){
          $('#tientietkiem').attr('style','width:100px;border:black 1px solid');
      });
          $('#tientietkiem').keydown(function(e){
              if(e.keyCode == 13)
              {
                  $('#xacnhanttk').click();
              }
          });
          $('#tientietkiem').keyup(function(event) {
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
          $('#capnhatttk').hide();
          $('#huyttk').show();
          $('#xacnhanttk').show();
      });
      $(document).on("click", "#xacnhanttk", function () {
            sotien=$('#tientietkiem').val();
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
            if(sotien==""){
                $('#tientietkiem').attr('style','width:100px;border:Red 1px solid');
                return false;
            }else if($('#tientietkiem').val().charAt(0)=="0"){
                $('#tientietkiem').attr('style','width:100px;border:Red 1px solid');
                return false;
            }else{
              reftientietkiem.set(Number(sotien));
              $("#tientietkiem").prop('disabled', true);
              $('#tientietkiem').attr('style','margin-left: 10px;background-color: rgba(0, 0, 0, 0); border:none');
              $('#capnhatttk').show();
              $('#huyttk').hide();
              $('#xacnhanttk').hide();
            } 
      });
      $(document).on("click", "#huyttk", function () {
          $('#tientietkiem').attr('style','margin-left: 10px;background-color: rgba(0, 0, 0, 0); border:none;');
          $("#tientietkiem").prop('disabled', true);
          $("#tientietkiem").val(changemoneyshow(tientietkiem));
          $('#capnhatttk').show();
          $('#huyttk').hide();
          $('#xacnhanttk').hide();
      });
      $(document).on("click", "#themchuyen", function () {
            sotien=$('#sotien2').val();
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
            if($("select option:selected" ).val()=="default"){
              $('.err6').html('<ul><li style="color:red;font-size:16px">Vui lòng chọn chế độ chuyển</li</ul>');
              return false;
            }
            else if(sotien==""){
              $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền không được trống</li</ul>');
              return false;
            } else if($('#sotien2').val().charAt(0)=="0"){
              $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền không hợp lệ</li</ul>');
              return false;
            }else{
                  dk=true;
                  sodu=0;
                  magd=(Math.random() + 1).toString(36).substring(7);
                  if(chedo=="Tiền mặt -> Thẻ"){
                    if(sotienmathientai>=sotien){
                      dk=false;
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe==sothechuyen){
                             sodu=+sothe[i].sotien+Number(sotien);
                             firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').push().set({
                                trangthai:"Thu",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: +sothe[i].sotien+Number(sotien),
                                magd:magd,
                                sothe:sothe[i].sothe
                              });
                              firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').push().set({
                                trangthai:"Chi",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: sotienmathientai-Number(sotien),
                                magd:magd,
                              });
                            var postData1 = {
                              sotien: sotienchuyen+Number(sotien),
                              sothe:sothe[i].sothe,
                              tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                              reftienmat.set(sotienmathientai-Number(sotien));    
                          }
                        } 
                      }else{
                        $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền trong tài khoản không đủ</li</ul>');
                        return false;
                      }
                  }else if(chedo=="Tiền mặt -> Tiền tiết kiệm"){
                      if(sotienmathientai>=sotien){
                        sodu=tientietkiem+Number(sotien);
                        sodu1=tientietkiem+Number(sotien);
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').push().set({
                                trangthai:"Chi",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: sotienmathientai-Number(sotien),
                                magd:magd,
                              });
                        reftienmat.set(sotienmathientai-Number(sotien));
                        reftientietkiem.set(tientietkiem+Number(sotien));
                      }else{
                        $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền trong tài khoản không đủ</li</ul>');
                        return false;
                      }
                  }else if(chedo=="Tiền tiết kiệm -> Thẻ"){
                    if(tientietkiem>=sotien){
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe==sothechuyen){                           
                            firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').push().set({
                                trangthai:"Thu",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: +sothe[i].sotien+Number(sotien),
                                magd:magd,
                                sothe:sothe[i].sothe
                              });
                              sodu= sothe[i].sotien + Number(sotien);
                              sodu1= tientietkiem - Number(sotien);
                              var postData1 = {
                              sotien: sotienchuyen+Number(sotien),
                              sothe:sothe[i].sothe,
                              tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);
                              reftientietkiem.set(tientietkiem-=Number(sotien));
                          }
                        } 
                       }else{
                        $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền trong tài khoản không đủ</li</ul>');
                        return false;
                      } 
                  }else if(chedo=="Tiền tiết kiệm -> Tiền mặt"){
                    if(tientietkiem>=sotien){
                        sodu=sotienmathientai+Number(sotien);
                        sodu1=tientietkiem-Number(sotien);
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').push().set({
                                  trangthai:"Thu",
                                  trangthai1:"Chuyển",
                                  sotien:sotien,
                                  ngaythang:$('#datetimepicker6').val(),
                                  sodu: sotienmathientai+Number(sotien),
                                  magd:magd,
                                });
                        reftienmat.set(sotienmathientai+Number(sotien));
                        reftientietkiem.set(tientietkiem-Number(sotien));
                      }else{
                        $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền trong tài khoản không đủ</li</ul>');
                        return false;
                      } 
                  }else if(chedo=="Thẻ -> Tiền mặt"){
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe==sothechuyen){
                            if(sotienchuyen>=sotien){
                              sodu=sotienmathientai+Number(sotien)
                              dk=false;
                              firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').push().set({
                                trangthai:"Chi",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: +sothe[i].sotien-Number(sotien),
                                magd:magd,
                                sothe:sothe[i].sothe
                              });
                              firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat').push().set({
                                trangthai:"Thu",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: sotienmathientai+Number(sotien),
                                magd:magd,
                              });
                            reftienmat.set(sotienmathientai+Number(sotien)); 
                            var postData1 = {
                              sotien: sotienchuyen-Number(sotien),
                              sothe:sothe[i].sothe,
                              tenthe:sothe[i].tenthe
                              };
                              var updates1= {};
                              updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                              firebase.database().ref().update(updates1);   
                              }else{
                                $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền trong tài khoản không đủ</li</ul>');
                                return false;
                              }
                          }
                      }
                  }
                  else if(chedo=="Thẻ -> Tiền tiết kiệm"){
                      for (var i = 0; i < sothe.length; i++) {
                          if(sothe[i].sothe==sothechuyen){
                            if(sotienchuyen>=sotien){
                              firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsucard').push().set({
                                trangthai:"Chi",
                                trangthai1:"Chuyển",
                                sotien:sotien,
                                ngaythang:$('#datetimepicker6').val(),
                                sodu: +sothe[i].sotien-Number(sotien),
                                magd:magd,
                                sothe:sothe[i].sothe
                              });  
                              sodu=tientietkiem+Number(sotien);
                              sodu1=tientietkiem+Number(sotien);
                              reftientietkiem.set(tientietkiem += Number(sotien));
                              var postData1 = {
                                sotien: sotienchuyen-Number(sotien),
                                sothe:sothe[i].sothe,
                                tenthe:sothe[i].tenthe
                                };
                                var updates1= {};
                                updates1['/users/'+localStorage.getItem('key')+'/tien/danhsachthe/' + sothe[i].key] = postData1;
                                firebase.database().ref().update(updates1);

                              }else{
                                $('.err6').html('<ul><li style="color:red;font-size:16px">Số tiền trong tài khoản không đủ</li</ul>');
                                return false;
                              }
                          }
                        }
                  }
                if(sothechuyen==null){
                    ref.child('tien/khoanchuyen').push().set({
                      loaichuyen:chedo,
                      sotien:sotien,
                      ngaythang:$('#datetimepicker6').val(),
                      magd:magd,
                      sodu:sodu
                    });
                    if(dk==true){
                      ref.child('tien/lichsutietkiem').push().set({
                        loaichuyen:chedo,
                        sotien:sotien,
                        ngaythang:$('#datetimepicker6').val(),
                        magd:magd,
                        sodu:sodu1
                      });
                    }
                  }else{
                    ref.child('tien/khoanchuyen').push().set({
                      loaichuyen:chedo,
                      sotien:sotien,
                      ngaythang:$('#datetimepicker6').val(),
                      magd:magd,
                      sothe:sothechuyen,
                      sodu:sodu
                    });
                    if(dk==true){
                      ref.child('tien/lichsutietkiem').push().set({
                        loaichuyen:chedo,
                        sotien:sotien,
                        ngaythang:$('#datetimepicker6').val(),
                        magd:magd,
                        sothe:sothechuyen,
                        sodu:sodu1
                      });
                    }
                  }
                $('#sotien2').val("");
                $('#datetimepicker6').val(moment().format('DD-MM-YYYY HH:mm'));
                $('.err6').html('');
                $.notify({ message: '<h2>Chuyển tiền thành công</h2>' },{ type: "success", placement: { from: "top", align: "center" }, offset: 20, spacing: 10, z_index: 1031, delay: 2000, timer: 1000, url_target: '_blank', mouse_over: null, animate: { enter: 'animated flipInY', exit: 'animated flipOutX' }, });
            } 
      });
      var refkhoanchuyen=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutietkiem');
      refkhoanchuyen.on('value', function(snapshot) {
                var array=[];
                $('#khoanchuyen').html('');
                snapshot.forEach(function(childSnapshot) {
                  array.push({loaichuyen:childSnapshot.val().loaichuyen,sotien:childSnapshot.val().sotien,sodu:childSnapshot.val().sodu,sothe:childSnapshot.val().sothe,ngaythang:childSnapshot.val().ngaythang});
                });
                array.reverse();
                    for (var i = 0; i < array.length; i++) {
                      if(i<10){
                        if(array[i].loaichuyen=="Tiền tiết kiệm -> Tiền mặt"){
                            $('#khoanchuyen').append('<tr><td>'+ array[i].loaichuyen +'</td><td>'+ array[i].ngaythang +'</td><td><b style="color:#F52727" class="fa fa-long-arrow-down"> '+ changemoneyshow(array[i].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');
                        }else if(array[i].loaichuyen=="Tiền mặt -> Tiền tiết kiệm"){
                            $('#khoanchuyen').append('<tr><td>'+ array[i].loaichuyen +'</td><td>'+ array[i].ngaythang +'</td><td><b style="color:#5cb85c" class="fa fa-long-arrow-up"> '+ changemoneyshow(array[i].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');              
                        }else if(array[i].loaichuyen=="Thẻ -> Tiền tiết kiệm"){
                            split=array[i].loaichuyen.toString().split('-');
                            $('#khoanchuyen').append('<tr><td>'+ split[0] + ' ('+  array[i].sothe +')'+' -'+split[1]+'</td><td>'+ array[i].ngaythang +'</td><td><b style="color:#5cb85c" class="fa fa-long-arrow-up"> '+ changemoneyshow(array[i].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');              
                        }else if(array[i].loaichuyen=="Tiền tiết kiệm -> Thẻ"){
                            $('#khoanchuyen').append('<tr><td>'+ array[i].loaichuyen + ' ('+  array[i].sothe +')'+'</td><td>'+ array[i].ngaythang +'</td><td><b style="color:#F52727" class="fa fa-long-arrow-down"> '+ changemoneyshow(array[i].sotien)+'</b> vnđ</td><td>'+ changemoneyshow(array[i].sodu)+' vnđ</td></tr>');              
                        }  
                      }else{
                        firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/lichsutienmat/'+array[i].key).remove();
                      } 
                    }
      });
      $(document).on("click", "#themsotk", function () {
        $('#themsotietkiem').show();
        $('#capnhatsotietkiem').hide();
        $('#myModal6').modal('toggle');
        $('body').css('overflow','hidden');
        $('#myModal6').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
        $('#myModal7').modal('show');
        $('#datetimepicker8').datetimepicker({format: 'DD-MM-YYYY'});  
        $('#datetimepicker8').val(moment().format('DD-MM-YYYY')); 
        $("#sotien8").click(function(){
          document.getElementById('sotien8').value="";
        });
      });
      $(document).on("click", "#quayvedanhsachtietkiem", function () {
            $('#myModal6').modal('show');
            $('#myModal7').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
            $('#nganhangactive').attr('class','active');
            $('#ttkactive').attr('class','');
            $('#tab_content5').attr('class','tab-pane active in fade');
            $('#tab_content4').attr('class','tab-pane fade');
      });
      $(document).on("click", "#themsotietkiem", function () {
          var sotien=$('#sotien8').val();
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
            if($('#tennganhang').val()==""){
                $('.err8').html('<ul><li style="color:red;font-size:16px">Tên ngân hàng không được trống</li</ul>');
                return false;
            }else if($('#laisuat').val()==""){
                $('.err8').html('<ul><li style="color:red;font-size:16px">Lãi suất không được trống</li</ul>');
                return false;
            }else if(sotien==""){
                $('.err8').html('<ul><li style="color:red;font-size:16px">Số tiền không được trống</li</ul>');
                return false;
            }else{
                firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/sotietkiem').push().set({
                  tennganhang:$('#tennganhang').val(),
                  sotien:sotien,
                  laisuat:$('#laisuat').val(),
                  ngaydaohan:$('#datetimepicker8').val()
                });
                $('#myModal6').modal('show');
                $('#myModal7').modal('toggle');
                $('#myModal7').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
                $('#nganhangactive').attr('class','active');
                $('#ttkactive').attr('class','');
                $('#tab_content5').attr('class','tab-pane active in fade');
                $('#tab_content4').attr('class','tab-pane fade');
                $('#tennganhang').val(""); 
                $('#sotien8').val("");
                $('#laisuat').val("");           
            }
        });
        var dskeystk;
        var refsotietkiem=firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/sotietkiem');
        refsotietkiem.on('value', function(snapshot) {
            $('#danhsachsotietkiem').html('');
            dskeystk=[];
            snapshot.forEach(function(childSnapshot) {
              dskeystk.push(childSnapshot.key);
              $('#danhsachsotietkiem').append('<div class="x_panel"><div class="x_title"> <h2>'+childSnapshot.val().tennganhang+'</h2> <ul class="nav navbar-right panel_toolbox"><li> <a href="#" id="modalcapnhat" data-key="'+childSnapshot.key+'" data-laisuat="'+childSnapshot.val().laisuat+'" data-ngaydaohan="'+childSnapshot.val().ngaydaohan+'" data-sotien="'+childSnapshot.val().sotien+'" data-tennganhang="'+childSnapshot.val().tennganhang+'"><i class="fa fa-wrench"></i></a></li><li><a href="#" id="xoasotietkiem" data-key="'+childSnapshot.key+'" ><i class="fa fa-close"></i></a> </li> </ul> <div class="clearfix"></div> </div> <div class="x_content"> <p>Ngày đáo hạn<b class="pull-right">'+childSnapshot.val().ngaydaohan+'</b></p> <p>Số tiền<b class="pull-right"> '+changemoneyshow(childSnapshot.val().sotien)+' vnđ</b></p> <p>Lãi suất<b class="pull-right"> '+childSnapshot.val().laisuat+'%/năm</b></p> <div class="ln_solid"></div> <p>Số tiền nhận được<b class="pull-right"> '+changemoneyshow((childSnapshot.val().sotien*childSnapshot.val().laisuat)/100)+' vnđ</b></p> </div></div>');
            });
        });              
        var ngaydaohan,tennganhang,sotienguitietkiem,laisuat,keysotietkiem;
        $(document).on("click", "#modalcapnhat", function () {
          keysotietkiem=$(this).data('key');
          ngaydaohan=$(this).data('ngaydaohan');
          tennganhang=$(this).data('tennganhang');
          sotienguitietkiem=$(this).data('sotien');
          laisuat=$(this).data('laisuat');
          $('#themsotietkiem').hide();
          $('#capnhatsotietkiem').show();
          $('#myModal6').modal('toggle');
          $('body').css('overflow','hidden');
          $('#myModal6').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
          $('#myModal7').modal('show');
          $('#datetimepicker8').datetimepicker({format: 'DD-MM-YYYY'});  
          $('#datetimepicker8').val(ngaydaohan);
          $('#tennganhang').val(tennganhang);
          $('#laisuat').val(laisuat); 
          $('#sotien8').val(changemoneyshow(sotienguitietkiem));
          $("#sotien8").click(function(){
            document.getElementById('sotien8').value="";
          });
        });
        $(document).on("click", "#capnhatsotietkiem", function () {
            var sotien=$('#sotien8').val();
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
            if($('#tennganhang').val()==""){
                $('.err8').html('<ul><li style="color:red;font-size:16px">Tên ngân hàng không được trống</li</ul>');
                return false;
            }else if($('#laisuat').val()==""){
                $('.err8').html('<ul><li style="color:red;font-size:16px">Lãi suất không được trống</li</ul>');
                return false;
            }else if(sotien==""){
                $('.err8').html('<ul><li style="color:red;font-size:16px">Số tiền không được trống</li</ul>');
                return false;
            }else{
              var postData1 = {
                sotien: sotien,
                ngaydaohan:$('#datetimepicker8').val(),
                tennganhang:$('#tennganhang').val(),
                laisuat:$('#laisuat').val()
              };
              var updates1= {};
              updates1['/users/'+localStorage.getItem('key')+'/tien/sotietkiem/' + keysotietkiem] = postData1;
              firebase.database().ref().update(updates1);
                $('#myModal6').modal('show');
                $('#myModal7').modal('toggle');
                $('#myModal7').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
                $('#nganhangactive').attr('class','active');
                $('#ttkactive').attr('class','');
                $('#tab_content5').attr('class','tab-pane active in fade');
                $('#tab_content4').attr('class','tab-pane fade');
                $('#tennganhang').val(""); 
                $('#sotien8').val("");
                $('#laisuat').val(""); 
            }   
        });
        $(document).on("click", "#xoasotietkiem", function () {
            keysotietkiem=$(this).data('key');
            $('#myModal8').modal('show');
            $('#myModal6').modal('toggle');
            $('#myModal8').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
        });
        $(document).on("click", "#xacnhanxoasotietkiem", function () {
            for (var i = 0; i < dskeystk.length; i++) {
              if(dskeystk[i]==keysotietkiem){
                    firebase.database().ref('users/'+localStorage.getItem('key')+'/tien/sotietkiem/'+keysotietkiem).remove();
                    $('#myModal6').modal('show');
                    $('#myModal8').on('hidden.bs.modal', function () {$('body').css('overflow','scroll');$('body').css('padding-right','0px')});
                    $('#nganhangactive').attr('class','active');
                    $('#ttkactive').attr('class','');
                    $('#tab_content5').attr('class','tab-pane active in fade');
                    $('#tab_content4').attr('class','tab-pane fade');
              }
            }
        });  