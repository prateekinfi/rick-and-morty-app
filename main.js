var oReq = new XMLHttpRequest();

var reqListener = function() {
    data = JSON.parse(this.responseText);
 // console.log(data);

 var contentHandler = (function (data) {
    var listAll = function (data) {        
    //    console.log(data);
        for (var i = 0; i < data.results.length; i++) {

            $("article").append(`
    <section>
    <div class="top-section"><img src="${data.results[i].image}" alt="">
        <span class="image-text">
            <span class="name">${data.results[i].name}</span><br>
            id : ${data.results[i].id} - created ${data.results[i].created}
        </span> </div>
    <ul>
        <li>
            <div class="list-item">
                <span class="property">STATUS</span>
                <div class="value">${data.results[i].status}</div>
            </div>
        </li>
        <li>
            <div class="list-item">
                <span class="property">SPECIES</span>
                <div class="value">${data.results[i].species}</div>
            </div>
        </li>
        <li>
            <div class="list-item">
                <span class="property">GENDER</span>
                <div class="value">${data.results[i].gender}</div>
            </div>
        </li>
        <li>
            <div class="list-item">
                <span class="property">ORIGIN</span>
                <div class="value">${data.results[i].origin.name}</div>
            </div>
        </li>
        <li>
            <div class="list-item">
                <span class="property">LAST LOCATION</span>
                <div class="value">${data.results[i].location.name}</div>
            </div>
        </li>


    </ul>
</section>
    `);
        }

    };



    return {
        listAllCharacters: listAll
    };



})();

contentHandler.listAllCharacters(data);


};




var reqError = function (err) {
    console.log('Fetch Error :-S', err);
};


oReq.onload = reqListener;
oReq.onerror = reqError;
oReq.open('get', 'https://rickandmortyapi.com/api/character/', true);
oReq.send()

