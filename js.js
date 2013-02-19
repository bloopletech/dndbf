$(function() {
  $.randRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  $.fn.pulse = function(complete) {
    $(this).css("backgroundColor", "#ffff00").animate({
      backgroundColor: "#ffffff"
    }, 1000, complete ? complete : $.noop);
  };

  $("#dungeons").on("keydown", ".damage", function(event) {
    if(event.keyCode == 32) {
      var hp = $(this).prev();
      hp.val(parseInt(hp.val()) - parseInt($(this).val())).pulse();
      $(this).val("");

      if(parseInt(hp.val()) < 0) $(this).parent().find(".delete-monster").click();
    }
  });

  /*$(".change").live("click", function() {
    $(this).parent().find(".changer").toggle();
  })*/

  $("#dungeons").on("keydown", "input, button, select", function(event) {
    if(event.keyCode == 32) event.stopPropagation();
  });

  function nextMiniature() {
    var lastIndex = 0;
    $(".miniature option:selected").each(function(i, option) {
      if(option.index > lastIndex) lastIndex = option.index;
    });

    var lastOption = $("#monster-source .miniature option")[lastIndex + 1];
    if(typeof lastOption == "undefined") {
      alert("Too many monsters!");
      return false;
    }
    else {
      return lastOption.value;
    }
  }

  $("#dungeons").on("click", ".copy-monster", function() {
    $(this).parent().after($(this).parent().clone());

    var miniature = $(this).parent().next().find(".miniature");
    miniature.val(nextMiniature());

    //$(this).parent().find(".change").click();
  });

  $("#dungeons").on("click", ".delete-monster", function() {
    if(confirm("Really delete?")) $(this).parent().remove();

    //$(this).parent().find(".change").click();
  });

  $("#dungeons").on("click", ".add-monster", function() {
    var monsters = $(this).parent().parent().find(".monsters");
    monsters.append($("#monster-source").children().clone());
    var miniature = monsters.children().last().find(".miniature");
    miniature.val(nextMiniature());
  });

  var currentlyRolling = false;

  $("#roll").click(function() {
    if(currentlyRolling) return;
    currentlyRolling = true;

    var roll = $.randRange(1, 20);

    if(roll == 1) {
      $(".result").val("N 1");
    }
    else if(roll == 20) {
      $(".result").val("N 20");
    }
    else {
      $(".result").each(function(i, result) {
        $(result).val(roll + i);
      });
    }

    $(".result:first").pulse(function() {
      currentlyRolling = false;
    });
  });


  $(window).keydown(function(event) {
    if(event.keyCode == 32) $("#roll").click();
  });
});
