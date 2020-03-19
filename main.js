

var contentHandler = (async function () {

    let response = await fetch(`https://rickandmortyapi.com/api/character/`);

    //private variables
    data = await response.json()
    currentData = {};

    //private functions
    var listData = function (data) {
        $("article").empty("");

        for (var i = 0; i < data.results.length; i++) {
            var charCard = `<section> <div class="top-section"><img src="${data.results[i].image}" alt=""> <span class="image-text"> <span class="name">${data.results[i].name}</span><br> id : ${data.results[i].id} - created ${data.results[i].created} </span> </div> <ul> <li> <div class="list-item"> <span class="property">STATUS</span> <div class="value">${data.results[i].status}</div> </div> </li> <li> <div class="list-item"> <span class="property">SPECIES</span> <div class="value">${data.results[i].species}</div> </div> </li> <li> <div class="list-item"> <span class="property">GENDER</span> <div class="value">${data.results[i].gender}</div> </div> </li> <li> <div class="list-item"> <span class="property">ORIGIN</span> <div class="value">${data.results[i].origin.name}</div> </div> </li> <li> <div class="list-item"> <span class="property">LAST LOCATION</span> <div class="value">${data.results[i].location.name}</div> </div> </li> </ul> </section>`;
            $("article").append(charCard);
        }
    };
    var listDataReverse = function (data) {
        $("article").empty("");

        for (var i = data.results.length - 1; i >= 0; i--) {
            var charCard = `<section> <div class="top-section"><img src="${data.results[i].image}" alt=""> <span class="image-text"> <span class="name">${data.results[i].name}</span><br> id : ${data.results[i].id} - created ${data.results[i].created} </span> </div> <ul> <li> <div class="list-item"> <span class="property">STATUS</span> <div class="value">${data.results[i].status}</div> </div> </li> <li> <div class="list-item"> <span class="property">SPECIES</span> <div class="value">${data.results[i].species}</div> </div> </li> <li> <div class="list-item"> <span class="property">GENDER</span> <div class="value">${data.results[i].gender}</div> </div> </li> <li> <div class="list-item"> <span class="property">ORIGIN</span> <div class="value">${data.results[i].origin.name}</div> </div> </li> <li> <div class="list-item"> <span class="property">LAST LOCATION</span> <div class="value">${data.results[i].location.name}</div> </div> </li> </ul> </section>`;
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

        console.log(fliteredData);


        return fliteredData;
    };



    //exposed functions
    var listAll = function () {
        listData(data)
    };

    var sortData = function (order) {
        var sortedData = data;
        if (order == "dsc") {
            listDataReverse(sortedData);
        } else {
            listData(sortedData);
        }
    }


    var filterCharacters = function (property, filter) {
        currentData = filterData(data, property, filter);
        // console.log(data);
        listData(currentData);

    }

    var searchCharacters = function (name) {
        var fliteredData = { results: [] };
        //filter data
        var j = 0;
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].name == name) {
                fliteredData.results.push(data.results[i]);
                j++;
            }
        }
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
        //alert("here");
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
            //alert();
            this.checked = !this.checked;
        } else {
            $(this).closest(".filters").find('input[type="checkbox"]').not(this).prop('checked', false);
            x.filter($(this).closest(".filters").attr("id"), $(this).attr("name"));
        }
    });



});


