"use strict";

$(function () {
  var $windows = $(window),
    $html = $("html"),
    $container = $("#container"),
    $footer = $("#footer");

  //테이블 thead tr 두 개 이상 스타일
  $(".table thead tr").each(function () {
    var trIndex = $(this).index() + 1;

    if (trIndex > 1) {
      $(this).closest(".table").addClass("tr_over");
    }
  });

  //인풋 포커스
  var selectTarget = $('.sd_input input[type="text"]');
  selectTarget.on({
    focus: function () {
      $(this).parent().addClass("focus");
    },
    blur: function () {
      $(this).parent().removeClass("focus");
    },
  });

  //모달창
  $(".modal_btn").on("click", function () {
    $("html").toggleClass("modal_open");
  });

  $(".modal_close").on("click", function () {
    $("html").toggleClass("modal_open");
  });

  //레이어팝업
  $(".popup_btn").click(function () {
    $(this).siblings().addClass("on");
  });
  $(".popup_close").click(function () {
    $(".popup").removeClass("on");
  });

  /* 아코디언 열고 닫기*/
  $(".qna_item .question .qna_btn").on("click", function () {
    var $this = $(this),
      $Title = $this.parent(".question"),
      $Item = $Title.parent(".qna_item"),
      $Layer = $Title.siblings(".answer"),
      IsActive = $Item.is(".active");
    if (!IsActive) {
      $this.addClass("active").attr("title", "답변 닫기");
      $Item.addClass("active");
      $Layer.slideDown();
    } else {
      $this.removeClass("actvie").attr("title", "답변 열기");
      $Item.removeClass("active");
      $Layer.slideUp();
    }
  });

  //테이블.responsive 반응형
  $("table.table.responsive").each(function () {
    var RowSpanExist = $(this).find("td, th").is("[rowspan]"),
      TheadExist = $(this).find("thead").length;
    if (RowSpanExist == false && TheadExist != 0) {
      //rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
      $(this)
        .children("tbody")
        .children("tr")
        .find("th, td")
        .each(function () {
          var ThisIndex = $(this).index(),
            TheadText = $(this)
              .parents("tbody")
              .siblings("thead")
              .find("th")
              .eq(ThisIndex)
              .text();
          $(this).attr("data-content", TheadText);
        });
      $(this)
        .children("tfoot")
        .children("tr")
        .find("th, td")
        .each(function () {
          var ThisIndex = $(this).index(),
            TheadText = $(this)
              .parents("tfoot")
              .siblings("thead")
              .find("th")
              .eq(ThisIndex)
              .text();
          $(this).attr("data-content", TheadText);
        });
    }
  });

  /* 탬플릿 전체보기 */
  var $tab = $container.find(".tab.template"),
    $tabAll = $tab.find(".tab_all"),
    $tabContent = $tab.find(".tab_content");

  $tabContent.addClass("active");
  $tabAll.click(function (event) {
    var $this = $(this);

    $this
      .closest(".tab_item")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $tabContent.addClass("active");
  });

  //ol.num
  $("ol.num").each(function () {
    var $this = $(this),
      $ThisLi = $this.find(">li");
    $ThisLi.each(function () {
      var $this = $(this),
        ThisIndex = $this.index() + 1;
      $this.prepend('<i class="count">' + ThisIndex + "</i>");
    });
  });

  //img mobile - 모바일에서 확대 아이콘 추가
  var $imgMobile = $(".img_mobile");
  $(window).on("load resize", function () {
    $imgMobile.each(function () {
      var $this = $(this),
        $img = $this.find("img"),
        imgRight = $img.outerWidth() + $img.offset().left;
      $this.find(".zoom").remove();
      if ($(window).width() < 1000) {
        var $elem = $(
          '<a href="' +
            $img.attr("src") +
            '" class="zoom" target="_blank" title="이미지확대보기 새창"></a>'
        );
        $this.append($img).append($elem);
        var $zoom = $this.find(".zoom");
        $zoom.css("left", imgRight - $this.offset().left - $zoom.width());
      }
    });
  });

  //셀렉트박스 디자인
  var $select = $container.find(".style_select_box"),
    $selectAllButton = $select.find("button", "a"),
    $selectAnchor = $select.find(".select_anchor"),
    $selectList = $select.find(".search_list");

  $selectAnchor.click(function () {
    var $this = $(this),
      selectButtonText = $this.text();

    $this
      .attr("title", "선택됨")
      .closest(".select_item")
      .addClass("active")
      .siblings(".select_item")
      .removeClass("active")
      .find(".select_anchor")
      .removeAttr("title");
    $this
      .parents(".style_select_box")
      .find(".search_select")
      .text(selectButtonText);
    $selectList.addClass("active").siblings().removeClass("active");
  });

  $selectAllButton.click(function () {
    var $this = $(this),
      $parentmenu = $this.parents(".style_select_box"),
      IsActive = $parentmenu.is(".active");
    if (!IsActive) {
      $this.attr("title", "열림");
      $parentmenu.find(".search_list").stop().slideDown("250", "easeOutExpo");
      $parentmenu.addClass("active");
    } else {
      $this.removeAttr("title");
      $parentmenu.find(".search_list").stop().slideUp("250", "easeOutExpo");
      $parentmenu.removeClass("active");
    }
  });
});
