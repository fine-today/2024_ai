$(function () {
  //menu
  var $menu = $(".depth1"),
    $menuItem = $menu.find(".depth-item"),
    $menuAnchor = $menu.find(".depth-anchor");
  $menuItem.each(function (i, elem) {
    var $elem = $(elem);
    if ($elem.find(".depth-list").length > 0) {
      $elem.addClass("has");
    }
    if ($elem.hasClass("actived")) {
      $elem.find(">.depth-anchor").attr("title", "현재 위치");
      $elem.parents(".depth-item").addClass("actived");
    }
  });
  $menuItem.each(function (i, elem) {
    var $elem = $(elem);
    if ($elem.closest("#footer").length < 0) {
      if ($elem.hasClass("actived")) {
        $elem.parents(".depth-item").find(".depth-list");
      }
    }
  });
  $menuItem.on("mouseover", function () {
    var $this = $(this),
      $thisAnchor = $this.find(">.depth-anchor");
    // location'만' 적용
    if ($this.closest(".location").length > 0) {
      $this.addClass("active");
      $this.siblings().removeClass("active");
      if ($thisAnchor.hasClass("depth1-anchor")) {
        $thisAnchor.removeAttr("href");
      }
      if ($thisAnchor.hasClass("depth2-anchor")) {
        $(".location .depth1-item.active .depth2-item").each(function (
          i,
          depth2Item
        ) {
          var $depth2Item = $(depth2Item);
          if ($depth2Item.hasClass("has") && $depth2Item.hasClass("active")) {
            $depth2Item.find(">.depth3-anchor").attr("title", "열림");
          }
        });
      } 
    } else if ($this.closest("header.header").length > 0) {
      var $headerMenu = $(".header .depth1"),
        $headerMenuItem = $headerMenu.find(".depth-item");
      $headerMenu.find(".actived > .depth-anchor").removeAttr("title");
      // $headerMenuItem.removeClass("active");
      $this.addClass("active");
      $this.parents(".depth-item").addClass("active");
      $this.siblings().removeClass("active");
      $headerMenuItem.each(function (i, item) {
        var $item = $(item),
          $thisItemList = $item.find(">.depth-list");
        if ($item.hasClass("has") && $item.hasClass("active")) {
          // $thisItemList.css("display", "flex");
          $item.find(">.depth-anchor").attr("title", "열림");
        } else {
          $thisItemList.removeAttr("title");
        }
      });
    } 
  });
  $menuAnchor.on('click', function(e){
    if ($(this).closest("header.header").length > 0){
      if($(this).closest('.depth-item').hasClass('has')){
        console.log(1)
        e.preventDefault();
      }
    }
    
  })
  
  $menuItem.on("mouseleave", function () {
    var $this = $(this),
      $thisItem = $this.closest(".depth-item");
    $thisItem.removeClass("active");
  });

  // FAQ board
  setTimeout(function () {
    $(".acc-board-item").each(function () {
      var $this = $(this).find(".acc-title-btn"),
        $thisItem = $(this),
        $thisCon = $thisItem.find(".acc-con"),
        $thisConBox = $thisCon.find(".acc-con-box"),
        thisConHeight = $thisConBox.outerHeight();
      if ($thisItem.hasClass("active")) {
        $thisCon.outerHeight(thisConHeight);
        $thisCon.attr("title", $this.text() + " 열림");
      } else {
        $thisCon.outerHeight(0);
        $thisCon.attr("title", $this.text());
      }
    });
  }, 0);
  $(".acc-title-btn").on("click", function () {
    var $this = $(this),
      $thisItem = $this.closest(".acc-board-item"),
      $thisCon = $thisItem.find(".acc-con"),
      $thisConBox = $thisCon.find(".acc-con-box"),
      thisConHeight = $thisConBox.outerHeight();
    $thisItem.toggleClass("active");
    if ($thisItem.hasClass("active")) {
      $thisCon.outerHeight(thisConHeight);
      $thisCon.attr("title", $this.text() + " 열림");
    } else {
      $thisCon.outerHeight(0);
      $thisCon.attr("title", $this.text());
    }
  });
});
