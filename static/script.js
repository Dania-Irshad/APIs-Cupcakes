/** Get cupcakes and display on page */
function cupcakeHTML(cupcake) {
    return `<div class="col-2" data-cupcake-id=${cupcake.id}>
          <img style="width:200px; height:200px;"src="${cupcake.image}" alt="image">
            <br>
            Flavor: ${cupcake.flavor}
            <br>
            Size: ${cupcake.size}
            <br>
            Rating: ${cupcake.rating}
            <br>
            <button class="mt-1 btn btn-danger">Delete</button>
        </div>`;
}

async function getCupcakes() {
    const res = await axios.get("http://localhost:5000/api/cupcakes");
    for (let cupcake of res.data.cupcakes) {
        $("#cupcakesList").append($(cupcakeHTML(cupcake)));
    }
}

/** Delete cupcake on clicking the delete button */
$("#cupcakesList").on("click", ".btn-danger", async function (e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
    await axios.delete(`http://localhost:5000/api/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

/** Get cupcake from form and add to database */
$("#cupcake-form").on("submit", async function (e) {
    e.preventDefault();
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();
    const res = await axios.post(`http://localhost:5000/api/cupcakes`,
        {
            flavor,
            rating,
            size,
            image
        });

    $("#cupcakesList").append($(cupcakeHTML(res.data.cupcake)));
});

$(getCupcakes);