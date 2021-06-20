// Jquery for cart in nav
$(document).ready(function(){
    
    var result=JSON.parse(localStorage.getItem('products'));
    var products=result?result:[];
    var length=products?products.length:0;
    for(var i=0;i<length;i++){
        var style=products[i].sl>1?'style=" opacity:1"':'';
        var count = Number($("#cart-panel-open div").text());
        count += products[i].sl;
        $("#no-item").fadeOut();
        $("#continue-shopping").fadeOut();
        $("#cart-panel-open div").text(count);
        $("#cart-panel .cart-panel-body").css("justify-content","flex-start");
        $("#cart-item-list").fadeIn();
          var htmlAdder = '<div class="cart-item"><img src="';
          htmlAdder +=products[i].img + '" >';
          htmlAdder += '<div class="item-detail"><span class="item-title">';
          htmlAdder += products[i].name + '</span>';
          htmlAdder += '<div class="item-price"><div class="item-number"><input type="text" readonly class="count-number" value="'+products[i].sl+'"><img src="images/icon/caret-up-solid.svg" alt="" class="number-up"><img src="images/icon/caret-down-solid.svg" alt="" class="number-down" '+style+'></div> x ';
          htmlAdder += products[i].price + ' VND<div class="cart-item-price-hidden">';
          htmlAdder += products[i].price + ' </div></div><div class="product-size"><span class="selected-size size">S</span><span class="size">M</span><span class="size">L</span><span class="size">XL</span><span class="size">XXL</span></div></div><div class="delete-item"><img src="images/icon/trash-alt-regular.svg" alt=""></div></div>';
          $("#cart-item-list").append(htmlAdder);
          $("#total-price-hidden").text(Number($("#total-price-hidden").text()) + Number(products[i].price));
          $("#price").text(parseInt(Number($("#total-price-hidden").text())).toLocaleString());
          $(".payment").css("display", "block");

    }
    $("#cart-panel-close").click(function(){
        $("#cart-panel").animate({right: '-90%'}, "8000ms");
        $("#over-layer").fadeOut();
        $("#cart-panel").fadeOut();
        $("body").removeClass("no-scroll");
    })
    $("#over-layer").click(function(){
        $("#cart-panel").animate({right: '-90%'}, "8000ms");
        $("#over-layer").fadeOut();
        $("#cart-panel").fadeOut();
        $("body").removeClass("no-scroll");
    })
    $("#continue-shopping").click(function(){
        $("#cart-panel").animate({right: '-90%'}, "8000ms");
        $("#over-layer").fadeOut();
        $("#cart-panel").fadeOut();
        $("body").removeClass("no-scroll");
    })
    $("#cart-panel-open").click(function(){
        $("#cart-panel").fadeIn("0ms");
        $("#cart-panel").animate({right: '0%'}, "8000ms");
        $("#over-layer").fadeIn();
        $("body").addClass("no-scroll");
    })
    $("body").delegate(".Button-Buy", "click", function(){
      var equal = 0;
      var titleItem = $(this).siblings("h3").text();
      var hiddenPrice = Number($(this).siblings(".product-price-hidden").text());
      var count = Number($("#cart-panel-open div").text());
      count += 1;
      $("#no-item").fadeOut();
      $("#continue-shopping").fadeOut();
      $("#cart-panel-open div").text(count);
      $("#cart-panel .cart-panel-body").css("justify-content","flex-start");
      $("#cart-item-list").fadeIn();

      $(".item-title").each(function(){
          if($(this).text() == titleItem) {
            updateSL(titleItem,1);
            $(this).siblings(".item-price").find("input").val(Number($(this).siblings(".item-price").find("input").val()) + 1);
            $(this).siblings(".item-price").find(".number-down").css("opacity", "1");
            $("#total-price-hidden").text(Number($("#total-price-hidden").text()) + hiddenPrice);
            $("#price").text(parseInt(Number($("#total-price-hidden").text())).toLocaleString());
            equal = 1;
           
          }
          
      })
      if(equal == 0) {
        var product={
            name:$(this).siblings("h3").text(),
            img:$(this).parent().siblings("a").children().attr("src"),
            price:$(this).siblings(".product-price-hidden").text(),
            sl:1,
        }
        products.push(product);
         localStorage.setItem('products',JSON.stringify(products));
         
        var htmlAdder = '<div class="cart-item"><img src="';
        htmlAdder += $(this).parent().siblings("a").children().attr("src") + '" >';
        htmlAdder += '<div class="item-detail"><span class="item-title">';
        htmlAdder += $(this).siblings("h3").text() + '</span>';
        htmlAdder += '<div class="item-price"><div class="item-number"><input type="text" readonly class="count-number" value="1"><img src="images/icon/caret-up-solid.svg" alt="" class="number-up"><img src="images/icon/caret-down-solid.svg" alt="" class="number-down"></div> x ';
        htmlAdder += $(this).siblings("h4").children().text() + ' <div class="cart-item-price-hidden">';
        htmlAdder += $(this).siblings(".product-price-hidden").text() + '</div></div><div class="product-size"><span class="selected-size size">S</span><span class="size">M</span><span class="size">L</span><span class="size">XL</span><span class="size">XXL</span></div></div><div class="delete-item"><img src="images/icon/trash-alt-regular.svg" alt=""></div></div>';
        $("#cart-item-list").append(htmlAdder);
        $("#total-price-hidden").text(Number($("#total-price-hidden").text()) + hiddenPrice);
        $("#price").text(parseInt(Number($("#total-price-hidden").text())).toLocaleString());
        $(".payment").css("display", "block");
       
      }
     
    })
  $("body").delegate(".delete-item", "click", function(){
        var titleItem = $(this).siblings(".item-detail").children(".item-title").text();
        findProductInLocalStorage(titleItem);
        var hiddenPrice = Number($(this).parent().find(".cart-item-price-hidden").text());
        var countCart = Number($("#cart-panel-open div").text());
        var countItem = Number($($(this).siblings(".item-detail")).find("input").val());
        
        countCart -= countItem;
        $("#cart-panel-open div").text(countCart);
        $(this).parent().remove();
        $("#total-price-hidden").text(Number($("#total-price-hidden").text()) - hiddenPrice*countItem);
        $("#price").text(parseInt(Number($("#total-price-hidden").text())).toLocaleString());
        
        if(countCart == 0)
        {
          $("#cart-panel .cart-panel-body").css("justify-content","center");
          $("#cart-item-list").css("display", "none");
          $(".payment").css("display", "none");
          $("#no-item").fadeIn();
          $("#continue-shopping").fadeIn();
        }
  })
  $("body").delegate(".number-up", "click", function(){
        var titleItem = $(this).parent().parent().siblings(".item-title").text();
        updateSL(titleItem,1);
        var hiddenPrice = Number($($(this).parent()).parent().find(".cart-item-price-hidden").text());
        var count = Number($(this).siblings("input").val());
        count += 1;
        $(this).siblings("input").val(count);
        $("#total-price-hidden").text(Number($("#total-price-hidden").text()) + hiddenPrice);
        $("#price").text(parseInt(Number($("#total-price-hidden").text())).toLocaleString());
        $("#cart-panel-open div").text(Number($("#cart-panel-open div").text()) + 1);
        
        if(count > 1)
          $(this).siblings(".number-down").css("opacity", "1");
  })
  $("body").delegate(".number-down", "click", function(){
        var hiddenPrice = Number($($(this).parent()).parent().find(".cart-item-price-hidden").text());
        var count = Number($(this).siblings("input").val());
        if(count > 1) {
            var titleItem = $(this).parent().parent().siblings(".item-title").text();
            updateSL(titleItem,-1);
          count -= 1;
          $(this).siblings("input").val(count);
        $("#total-price-hidden").text(Number($("#total-price-hidden").text()) - hiddenPrice);
        $("#price").text(parseInt(Number($("#total-price-hidden").text())).toLocaleString());
          $("#cart-panel-open div").text(Number($("#cart-panel-open div").text()) - 1);
          
          if(count == 1)
            $(this).css("opacity", "0.5");
        }
  })
  $("#pay-btn").on("click",function(){
    var result=JSON.parse(localStorage.getItem('products'));
    var products=result?result:[];
    window.location.href='thanhtoan/?watch='+products;
  })
  $("body").delegate(".size", "click", function(){
    $(this).addClass("selected-size");
    $(this).siblings(".size").removeClass("selected-size");
  })
})

// JS của Đặt hàng
function toggle(){
    var m=document.getElementById("change-text");
    var x=document.getElementById("show-product-info");
    var y=document.getElementById("show-coupon");
    var z=document.getElementById("show-calculate");
    var t=document.getElementById("calculate-footer");
    var text = m.innerHTML;
    
    if (text == "Hiển thị thông tin đơn hàng") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "block";
        t.style.display = "block";
        m.innerHTML = "Ẩn thông tin đơn hàng";

    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "none";
        t.style.display = "none";
        m.innerHTML = "Hiển thị thông tin đơn hàng";
    }
}

// Đóng JS của Đặt hàng

 function findProductInLocalStorage(title){
    var products=JSON.parse(localStorage.getItem('products'));
    products=products.filter((product,index)=>{
        return product.name!=title;
    })
    localStorage.setItem('products',JSON.stringify(products));
}
function updateSL(title,number){
    
    var products=JSON.parse(localStorage.getItem('products'));
    products=products.map((product,index)=>{
        if(product.name==title){
            product.sl+=number;
        }
        return product ;
    })
    localStorage.setItem('products',JSON.stringify(products));
}