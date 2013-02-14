$(function() {
  $.randRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  $(".damage").live("change", function() {
    var hp = $(this).prev();
    hp.val(parseInt(hp.val()) - parseInt($(this).val()));
    $(this).val("");

    if(parseInt(hp.val()) < 0) $(this).parent().find(".delete-monster").click();
  }).live("keyup", function() {
    if(event.keyCode == 32) $(this).change();
  });

  $("#roll").click(function() {
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
  });

  $(".change").live("click", function() {
    $(this).parent().find(".changer").toggle();
  })

  function nextMiniature() {
    var lastIndex = 0;
    $(".miniature option:selected").each(function(i, option) {
      if(option.index > lastIndex) lastIndex = option.index;
    });

    var lastOption = $("#monster-source .miniature option")[lastIndex + 1];
    if(typeof lastOption == "undefined") {
      alert("Too many mosnters!");
      return false;
    }
    else {
      return lastOption.value;
    }
  }

  $(".copy-monster").live("click", function() {
    $(this).parent().after($(this).parent().clone());

    var miniature = $(this).parent().next().find(".miniature");
    miniature.val(nextMiniature());

    $(this).parent().find(".change").click();
  });

  $(".delete-monster").live("click", function() {
    if(confirm("Really delete?")) $(this).parent().remove();

    $(this).parent().find(".change").click();
  })

  $(".add-monster").click(function() {
    $(this).parent().append($("#monster-source").children().clone());

    var miniature = $(this).parent().children().last().find(".miniature");
    miniature.val(nextMiniature());
  });
});
