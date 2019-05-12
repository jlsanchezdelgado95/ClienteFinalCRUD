window.onload = function () {

    //ajax para sacar el ultimo idCarrito
    /*$.ajax({
        type: "GET",
        url: "http://localhost:3000/carritos",
        success: function (json) {
            idCarrito = json.length;
        }
    });*/
    //Cargo y pinto categorias y todos los articulos
    function cargarTodo() {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/categorias",
            success: function (json) {
                $("#categorias").html('');
                $("#articulos").html('');
                $("#articulos").append("<h3>Todos los articulos</h3>")
                json.map(elemento => {
                    $("#categorias").append("<a href='#' class='btn btn-lg btn-block btn-outline-primary mt-4' id=" + elemento.id + ">" + elemento.nombre + "</a>");
                    pintarArt(elemento.id);

                });
            }
        });
    }
    cargarTodo();

    function pintarArt(id) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/articulos?idCat=" + id + "",
            success: function (json) {
                json.map(elemento => {
                    $("#articulos").append("<div href='#' class='bg-light shadow-sm mx-auto m-5 p-4' id=art" + elemento.id + "><p>" + elemento.nombre + "</p><p>" + elemento.descripcion + "</p><p>" + elemento.precio +
                        "</p><button id='btnBorrar' class='btn btn-danger m-3'>Borrar articulo</button><button id='btnModificar' class='btn btn-info'>Modificar articulo</button></div>");
                });
            }
        });
    }

    $("#categorias").on("click", "a", function () {
        $("#articulos").html('');
        idCat = ($(this).attr("id"));
        pintarArt(idCat);
    })

    $("#articulos").on("click", "#btnBorrar", function () {//BORRO ARTICULO
        codArt = $(this).parent().attr("id");
        idPart = codArt.split("t");
        idFrag = idPart[1];
        console.log(idFrag);
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/articulos/" + idFrag,
            success: function (response) {
            }
        });
        cargarTodo();
    });

    $("#articulos").on("click", "#btnModificar", function () {//MODAL PARA MODIFICAR
        codArt = $(this).parent().attr("id");
        nomArt = $(this).parent().find("p:eq(0)").html();
        desArt = $(this).parent().find("p:eq(1)").html();
        pvpArt = $(this).parent().find("p:eq(2)").html();
        $("#id").val(codArt);
        $("#nombre").val(nomArt);
        $("#descripcion").val(desArt);
        $("#precio").val(pvpArt);
        $("#modalArticulo").modal("show");
    });

    $("#anyadir").click(function () {
        $("#anyadirArticulo").modal("show");
    });

    $("#btnanyadir").on("click", function () {//AÑADIR ARTICULO AL JSON
        datos = $('#ficha').serialize();
        codArt = $("#id").val();
        console.log(codArt);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/articulos/",
            data: datos,
            success: function (response) {
                alert("FUNCIONA");
            }
        });
        $("#anyadirArticulo").modal("hide");
    });

    $("#btnGrabar").on("click", function () {//intentar comprobar que se carguen al acabar
        datos = $('#ficha').serialize();
        idProdArt = $("#id").val();
        idPart = idProdArt.split("t");
        idFrag = idPart[1];
        $.ajax({
            method: "PATCH",
            url: "http://localhost:3000/articulos/" + idFrag + "",
            data: datos,
            success: function (response) {
            }
        });
        $("#modalArticulo").modal("hide");
        cargarTodo();
    });
}