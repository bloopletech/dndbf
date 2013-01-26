$(function() {
  $.randRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  $(".damage").live("change", function() {
    var hp = $(this).prev();
    hp.val(parseInt(hp.val()) - parseInt($(this).val()));
    $(this).val("");
  }).live("keyup", function() {
    if(event.keyCode == 32) $(this).change();
  });

  $(".roll").live("click", function() {
    var plus = $(this).prev();
    var result = $(this).next();
    var roll = $.randRange(1, 20);
    if(roll == 1) result.val("N 1");
    else if(roll == 20) result.val("N 20");
    else result.val(roll + parseInt(plus.val()));
  });

  $(".add-attack").live("click", function() {
    $(this).before($("#attack-source").children().clone());
  });

  $(".copy-monster").live("click", function() {
    $(this).parent().after($(this).parent().clone());
  });

  $(".delete-monster").live("click", function() {
    if(confirm("Really delete?")) $(this).parent().remove();
  })

  $(".add-monster").click(function() {
    $(this).parent().append($("#monster-source").children().clone());
  });
});
