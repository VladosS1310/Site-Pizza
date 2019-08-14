		function initMap() {
			var pos = {lat: 50.446862, lng: 30.446574}
			var opt = {  
				center: pos,
				zoom: 15 
      };
				
			var myMap = new google.maps.Map(document.getElementById("map"), opt);
		

		var marker = new google.maps.Marker({
          position: pos,
          map: myMap,
          title: 'Pizza Italian'
        });

        var info = new 	google.maps.InfoWindow({
        	content: '<h3>Pizza House</h3>'
        });
        marker.addListener("click", function() {
        	info.open(myMap, marker);
        });
      }

   $(document).ready(function () {
    selectSize();
    clickBasket();
    choiceSupplements();

   });

//////Global Var//////   
var all_all_sum = $("#all_all_price span");
var mas_sup = [];


    // var name_;
    // var phone_;
    // var adres_;
    // var name_pizza_;
    // var size_pizza_pizza_;
    // var supplements_pizza_;

function selectSize() {
  var size_value = $(".pizza .size_pizza .size-pizza-js");

  size_value.click(function() {


    var par_id =  $(this).parent().parent().attr("id");
    var change_price = $(".price_and_basket .price-" + par_id);
    var change_photo = $(".foto-" + par_id);


    if ($(this).hasClass("size-s") && !$(this).hasClass("active-"+par_id)) {
         sSize(change_price);
         change_photo.css("width","70%");
    } else if ( $(this).hasClass("size-l") && !$(this).hasClass("active-"+par_id) ) {
        lSize(change_price);
        change_photo.css("width","100%");

    } else if ($(this).hasClass("size-xl") && !$(this).hasClass("active-"+par_id)) {
        xlSize(change_price)
        change_photo.css("width","130%");
    }

    var ident =  $(".pizza .size_pizza .size-pizza-js.select-" + par_id);

    ident.removeClass("active");

    $(this).addClass("active");

    ident.removeClass("active-"+par_id);

    $(this).addClass("active-"+par_id);
  });
}

function sSize(change_price) {
  change_price.text( +change_price.attr("fix-price") - 25);
    $(".total_suma span").text( +change_price.text());
    if ( $("#form").hasClass("form-openned")) {
      addSale(all_all_sum);
    }            
}
function lSize(change_price) {
  change_price.text( +change_price.attr("fix-price"));
    $(".total_suma span").text(change_price.text());
    if ( $("#form").hasClass("form-openned")) {
      addSale(all_all_sum);
    }            
}
function xlSize(change_price) {
  change_price.text( +change_price.attr("fix-price") + 75);
    $(".total_suma span").text(change_price.text());
    if ( $("#form").hasClass("form-openned")) {
      addSale(all_all_sum);
    }    
        
}

function clickBasket() {
  var basket_value = $(".price_and_basket .basket");

  basket_value.click(function() {

    if ( $(this).hasClass("open-supplement") ) {
      return false;
    } else {
         basket_value.removeClass("open-supplement");
         $(".supplements").hide();
         $(".supplements input[type='checkbox']").prop('checked', false);
        $(this).addClass("open-supplement");
    }
    var basket_id = $(this).attr("id");
    var add_supplements = $(".add-" + basket_id);


    basket(add_supplements, +$(this).prev().prev().text());
    addSale(all_all_sum);
    close(add_supplements, basket_value);


    var all_id_name = ".paperoni-" + $(this).attr("all-id");
    var all_id_size = ".active-" + $(this).attr("all-id");

    $("#name-order").text( $(all_id_name).text());
    $("#size-order").text( $(all_id_size).text());
    $(".name_pizza_confirm").text( $(all_id_name).text());

  }); 
}

function basket(add_supplements, price) {
  $("#form").addClass("form-openned");
  $("#form").fadeIn(1000, function() {
        $(this).css("display", "block");

        if (price > 100) {
          $(".total_suma span").text( price + 0.99 + " грн" );
          remove_Class();
        }else {
          $(".total_suma span").text(price + " грн");
          add_Class();
        }
       
      });
      $(add_supplements).slideDown(500, function() {
        $(this).css("display", "block");
      });
}

function close(add_supplements, basket_value) {
    $(".formochka .close").click( function () {
          $("#form").removeClass("form-openned");
          +all_all_sum.text(0);
      $("#form").fadeOut(500, function() {
          $(".formochka").css('display', 'none');
          mas_sup = [];
          $("#supplements-order").text("");
          $(".supplements input[type='checkbox']").prop('checked', 0);
      });
      $(add_supplements).slideUp(500, function() {
          $(".supplements").css("display", "none");
          basket_value.removeClass("open-supplement");
      });
    });

}

function choiceSupplements() {
  $(".supplements input[type='checkbox']").click( function() {
    var par_id = $(this).parent().parent().attr("sup-id");
    var basked_id = $(".price_and_basket .price-" + par_id);

    if ( !$(this).is(":checked")) {
      basked_id.text( +basked_id.text() - +$(this).parent().attr("fix-price-supp"));
      basked_id.attr("fix-price", +basked_id.attr("fix-price") - +$(this).parent().attr("fix-price-supp"));
      $(".total_suma span").text( +basked_id.text());
      $(this).removeClass("checked-"+ par_id);

      var all_id_supplements = ".supplements .checkmark-" + par_id + ".checked-" + par_id;
      mas_sup.pop( ($(all_id_supplements).parent().text() ));
      $("#supplements-order").text( mas_sup );

      } else  {
      basked_id.text( +basked_id.text() + +$(this).parent().attr("fix-price-supp"));
      basked_id.attr("fix-price", +basked_id.attr("fix-price") + +$(this).parent().attr("fix-price-supp"));
      $(".total_suma span").text( +basked_id.text());
      $(".supplements input").removeClass("checked-"+ par_id);
      $(this).addClass("checked-"+ par_id);

      var all_id_supplements = ".supplements .checkmark-" + par_id + ".checked-" + par_id;
      mas_sup.push( ($(all_id_supplements).parent().text() ));
      $("#supplements-order").text( mas_sup );
    }

        addSale(all_all_sum); 
   });
}



function addSale(all_all_sum) {
  if ( +all_all_sum.text() > 100 ) {
    +all_all_sum.text( +all_all_sum.text() + 0.99 + " грн" );
       remove_Class();
  } else if (+all_all_sum.text() < 100){
    +all_all_sum.text( +all_all_sum.text() + " грн" );
    add_Class()
  }
  return false;
}

function add_Class() {
  $(".total_suma .plus img").addClass("hidden");
    $(".total_suma div").addClass("plus");
}

function remove_Class() {
  $(".total_suma .plus img").removeClass("hidden");
    $(".total_suma div").removeClass("plus");
}
 
  var paperoni_id = $("#zakazat");
  paperoni_id.click(function() {
  
    var Name_name = $("#name").val();
    var patern_name = /^[A-ZА-Я][A-Za-zа-яА-Я'` -]+$/;
    var prov_name = patern_name.test(Name_name);

    var Phone_phone = $("#phone").val();
    var patern_phone = /^((0|\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    var prov_phone = patern_phone.test(Phone_phone);

    var Adres_adres = $("#adres").val();
    var patern_adres = /^[а-яa-zА-ЯA-Z0-9,\.\s]+$/;
    var prov_adres = patern_adres.test(Adres_adres);
    
    if(Name_name == "") {
      alert("Please enter name");
      return false;
    } else if (prov_name == true) {
      alert("Corect!");
    } else {
      alert("Incorect!");
      return false;
    }

    if (Phone_phone == "") {
      alert("Please enter phone");
      return false;
    } else if (prov_phone == true) {
      alert("Corect!");
    } else {
      alert("Incorect!");
      return false;
    }

    if(Adres_adres == "") {
      alert("please enter adres");
      return false;
    } else if (prov_adres == true) {
      alert("Corect!")
    } else {
      alert("Incorect!");
      return false;
    }

    console.log("Ім'я: " + $("#name").val());
    console.log("Номер телефону: " + $("#phone").val());
    console.log("Адрес: " + $("#adres").val());    
    console.log("Назва піци: " + $("#name-order").text());
    console.log("Розмір піци: " + $("#size-order").text());   
    console.log("Добавки: " + $("#supplements-order").text());   
    console.log("Загальна сума: " + $(".total_suma span").text());

    $("#name").val('');
    $("#phone").val('');
    $("#adres").val('');
    $("#name-order").text('');
    $(".total_suma span").text('');
    $("#size-order").text('');
    $("#supplements-order").text('');
    $(".total_suma div").css("display", "none");
    $(".supplements input[type='checkbox']").prop('checked', false);
    $(".supplements").slideUp(500);
    // goToPage();

    // name_ = $("#name").val();
    // phone_ = $("#phone").val();
    // adres_ = $("#adres").val();
    // name_pizza_ = $("#name-order").text();
    // size_pizza_pizza_ = $("#size-order").text();
    // supplements_pizza_ = $("#supplements-order").text().replace(/\s/g, '');

    // alert(name_);

    // location.href = "index_2.html?name=" + name_+ "&phone="+ phone_+"&adres="
    // + adres + "&namePizza=" + name_pizza_+ "&sizePizza=" + size_pizza_pizza_ + 
    // "&suplementsPiza="
    // + supplements_pizza_;

    // $(".name_pizza_confirm").text( $("#name").val() );

  });

    
