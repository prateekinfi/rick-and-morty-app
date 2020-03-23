

var contentHandler = (async function () {

    let response = await fetch(`https://rickandmortyapi.com/api/character/`);

    //private variable
    data = await response.json();

    //private functions
    var listData = function (data) {
        $("article").empty("");

        for (var i = 0; i < data.results.length; i++) {
            var created =new Number((new Date().getTime() - new Date(data.results[i].created).getTime()) / 31536000000).toFixed(0);
            var charCard = `<section> <div class="top-section"><img src="${data.results[i].image}" alt=""> <span class="image-text"> <span class="name">${data.results[i].name}</span><br> id : ${data.results[i].id} - created ${created} years ago </span> </div> <ul> <li> <div class="list-item"> <span class="property">STATUS</span> <div class="value">${data.results[i].status}</div> </div> </li> <li> <div class="list-item"> <span class="property">SPECIES</span> <div class="value">${data.results[i].species}</div> </div> </li> <li> <div class="list-item"> <span class="property">GENDER</span> <div class="value">${data.results[i].gender}</div> </div> </li> <li> <div class="list-item"> <span class="property">ORIGIN</span> <div class="value">${data.results[i].origin.name}</div> </div> </li> <li> <div class="list-item"> <span class="property">LAST LOCATION</span> <div class="value">${data.results[i].location.name}</div> </div> </li> </ul> </section>`;
            $("article").append(charCard);
        }
    };
    var listDataReverse = function (data) {
        $("article").empty("");

        for (var i = data.results.length - 1; i >= 0; i--) {
            var created =new Number((new Date().getTime() - new Date(data.results[i].created).getTime()) / 31536000000).toFixed(0);

            var charCard = `<section> <div class="top-section"><img src="${data.results[i].image}" alt=""> <span class="image-text"> <span class="name">${data.results[i].name}</span><br> id : ${data.results[i].id} - created ${created} years ago </span> </div> <ul> <li> <div class="list-item"> <span class="property">STATUS</span> <div class="value">${data.results[i].status}</div> </div> </li> <li> <div class="list-item"> <span class="property">SPECIES</span> <div class="value">${data.results[i].species}</div> </div> </li> <li> <div class="list-item"> <span class="property">GENDER</span> <div class="value">${data.results[i].gender}</div> </div> </li> <li> <div class="list-item"> <span class="property">ORIGIN</span> <div class="value">${data.results[i].origin.name}</div> </div> </li> <li> <div class="list-item"> <span class="property">LAST LOCATION</span> <div class="value">${data.results[i].location.name}</div> </div> </li> </ul> </section>`;
            $("article").append(charCard);
        }
    };
    var filterData = function (data, property, filter) {
        var fliteredData = { results: [] };
        var j = 0;
        for (var i = 0; i < data.results.length; i++) {

            if (property != "origin") {
                if (data.results[i][property].toLowerCase() == filter) {
                    fliteredData.results.push(data.results[i]);
                    j++;
                }
            } else {
                if (data.results[i][property].name.toLowerCase() == filter) {
                    fliteredData.results.push(data.results[i]);
                    j++;
                }

            }
        }
        return fliteredData;
    };

    var getCurrentData = function(){
        var currentData = {};
        var selectedFilterElement = $('.selected-filter');
        var filters = { gender: null, species: null, origin: { name: null } };
        for (var i = 0; i < selectedFilterElement.length; i++) {
            var property = $($('.selected-filter')[i]).attr("id").substr(16);
            if (property != "origin") {
                filters[property] = $($('.selected-filter')[i]).data('name');
            } else {
                filters.origin.name = $($('.selected-filter')[i]).data('name');
            }
        }
        if (filters.gender != null) {
            currentData = filterData(data, "gender", filters.gender);
        } else {
            currentData = data;
        }
        if (filters.species != null) {
            currentData = filterData(currentData, "species", filters.species);
        }
        if (filters.origin.name != null) {
            currentData = filterData(currentData, "origin", filters.origin.name);
        }
        return currentData;
    }

    //exposed functions
    var listAll = function () {
        listData(data)
    };

    var sortData = function (order) {
        var currentData = getCurrentData();

        if (order == "dsc") {
            listDataReverse(currentData);
        } else {
            listData(currentData);
        }
    }


    var filterCharacters = function () {
        var currentData = getCurrentData();
        listData(currentData);

    }

    var searchCharacters = async function (name) {
        let response = await fetch(`https://rickandmortyapi.com/api/character?name=${name}`);

        fliteredData = await response.json();
        listData(fliteredData);
    }

    return {
        listAllCharacters: listAll,
        search: searchCharacters,
        filter: filterCharacters,
        sort: sortData
    };
})();

contentHandler.then(x => {
    x.listAllCharacters();


    $("#submit-search").on("click", () => {
        var searchName = $("#search-box").val();
        if (searchName != "") {
            x.search(searchName);
        }
    });


    $("#clear-search").on("click", () => {
        x.listAllCharacters();
    });
    $("#clear-filters").on("click", () => {
        x.listAllCharacters();
        $('input:checked').prop("checked", false);
        $('#selected-filter-container').empty();
    });


    $("#sort-by-id").on("change", () => {
        var order = $("#sort-by-id").val()
        x.sort(order);
    });

    $('input[type="checkbox"]').on('change', function (e) {

        if (!$(this).is(":checked")) {
            this.checked = !this.checked;
        } else {
            $(this).closest(".filters").find('input[type="checkbox"]').not(this).prop('checked', false);

            $(`#selected-filter-${$(this).closest(".filters").attr("id")}`).remove();
            $('#selected-filter-container').append(`
            <div class="selected-filter" id="selected-filter-${$(this).closest(".filters").attr("id")}" data-name="${$(this).attr("name")}">${$(this).attr("name")} <div class="cross" id="cross-${$(this).closest(".filters").attr("id")}">X</div>
                </div>
            `);
            x.filter($(this).closest(".filters").attr("id"), $(this).attr("name"));
        }
    });

    $(document).on("click", ".cross", function () {

        var prop = $(this).closest(".selected-filter").attr("id").substr(16);
        $(this).closest(".selected-filter").remove();

        $(`#${prop} input:checked`).prop("checked", false);
        x.filter(prop, $($(this).closest(".selected-filter")).data('name'));

    });



});


