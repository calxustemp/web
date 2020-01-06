$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    if ($("#menu-bars").attr("data-fa-transform")) {
        $("#menu-bars").removeAttr("data-fa-transform")
    } else {
        $("#menu-bars").attr("data-fa-transform", "rotate-90")
    }

});