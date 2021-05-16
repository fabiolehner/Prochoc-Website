var size;
var isInCart = false;

$(document).ready(function() {

    //Hide bag button
    var bagButton = $(".bag-button");
   /* bagButton.hide();

   $(".size-entry").click(function() {
        size = $(this).html();
        $("#size-dropdown").html(size);
        bagButton.fadeIn("slow");
        isInCart = false;
    });*/

    bagButton.click(function() {
        if (!isInCart)
            bagButton.html("✓");
        else
            bagButton.html("add to bag");
        isInCart = !isInCart;
    });
});