console.log("started");

let datas;
let inputData = false;
const selectDisplay = $(".csselected");
const selectOptionsHidden = $(".hide");
const content = $(".content");

function supportPageMaker(k) {
  $(".imageOfCountry").attr("src", `${datas[k].flags.png}`);
  if (inputData) {
    $(".country-name").text(datas[k].name);
    $(".Native-Name").html(datas[k].nativeName);
    $(".Population").text(datas[k].population);
    $(".Region").text(datas[k].region);
    $(".Sub-Region").text(datas[k].subregion);
    $(".Capital").text(datas[k].capital);
    $(".Top-Level-Domain").text(datas[k].topLevelDomain[0]);
    $(".Currencies").text(datas[k].currencies[0].name);
    var lang = datas[k].languages;
    var langText = "";
    var n = lang.length;
    for (var i = 0; i < n; ++i) {
      if (n - 1 == i) {
        langText += lang[i].name;
      } else langText += lang[i].name + "," + " ";
    }
    $(".Languages").text(langText);
    var borders = datas[k].borders;
    var bordersHtml = "";
    n = borders.length;
    for (var i = 0; i < n; ++i) {
      bordersHtml += `<span class="borders">${borders[i]}</span>`;
    }
    $(".Border-Countries").html(bordersHtml);
  } else {
    $(".country-name").text(datas[k].name.common);
    var nativeName = datas[k].name.nativeName;
    for (const key in nativeName) {
      $(".Native-Name").text(nativeName[key].common);
      break;
    }

    $(".Population").text(datas[k].population);
    $(".Region").text(datas[k].region);
    $(".Sub-Region").text(datas[k].subregion);
    $(".Capital").text(datas[k].capital[0]);
    $(".Top-Level-Domain").text(datas[k].tld[0]);
    var user = datas[k].currencies;
    var texts = "";
    for (const key in user) {
      texts += user[key].name + " ";
    }
    $(".Currencies").text(texts);
    var lang = datas[k].languages;
    var langText = "";
    var n = lang.length;
    for (const key in lang) {
      langText += lang[key] + " ";
    }
    $(".Languages").text(langText);
    if ("borders" in datas[k]) {
      var borders = datas[k].borders;
      var bordersHtml = "";
      n = borders.length;
      for (var i = 0; i < n; ++i) {
        bordersHtml += `<span class="borders">${borders[i]}</span>`;
      }
      $(".Border-Countries").html(bordersHtml);
    } else $(".Border-Countries").html("NA");
  }
}

function displayCountry(k) {
  var z = 0;
  $(".content").html("");
  if (k == 0) {
    z = 16;
    for (var i = 0; i < datas.length; ++i) {
      if (!("capital" in datas[i])) continue;
      console.log("sdrrgsedrg");
      $(".content").html(
        $(".content").html() +
          `
            <div id="${i}"class="card">
                <img class="imgInsideCard" src="${datas[i].flags.png}" alt="">
                <div class="inner">
                    <h2>${datas[i].name.common}</h2>
                    <p><span>Population:</span> ${datas[i].population}</p>
                    <p><span>Region:</span> ${datas[i].region}</p>
                    <p class="cap"><span>Capital: </span>${datas[i].capital[0]}</p>
                </div>
            </div>`
      );
    }
    $(".card").click(function (t) {
      var l = $(this).attr("id");
      // here we will put the  code which will get tge data fom the datas array and then give ti to support.html wilde and then it will dispaly it.
      changeTheLayoutToSupport();
      supportPageMaker(l);
      $("#back").click(function () {
        inputData = false;
        changeTheLayoutToIndex();
        startTheParty();
      });
    });
  }
}
let v = 0;

function startTheParty() {
  $.get(
    "https://restcountries.com/v3.1/region/africa",
    function (data, status) {
      inputData = false;
      if (status == "success") {
        datas = data;
        displayCountry(v);
      } else {
        alert("error");
      }
    }
  );

  $(".csselected").click(function () {
    console.log("atleadt click works");
    $(".t").toggleClass("hide");
  });

  $(".t").click(function () {
    inputData = false;
    var re = $(this).attr("value");
    $(".region").text($(this).text());
    $.get(
      `https://restcountries.com/v3.1/region/${re}`,
      function (data, status) {
        if (status == "success") {
          datas = data;
          displayCountry(v);
        } else {
          alert("error");
        }
      }
    );

    $(".t").toggleClass("hide");
  });
  $(".search").click(function () {
    inputData = true;
    var data = $("input").val();
    if (data != "") {
      $.get(
        `https://restcountries.com/v2/name/${data}?fullText=true`,
        function (data, status) {
          if (status == "success") {
            datas = data;
            displayCountry(v);
            $("h2").html(datas[0].name);
            $(".cap").html("<span>Capital:</span> " + datas[0].capital);
          } else {
            alert("error");
          }
        }
      );
    }
  });
}
startTheParty();

$(".dark-mode").click(function () {
  $("body").toggleClass("let-the-darkness-spread");
});
//--codes for support.html
function changeTheLayoutToSupport() {
  var change = `<div class="search-bar ">
  <section class="centre-alien">
    <span class="search " id="back"><i class="fa-solid fa-arrow-left-long"></i> Back</span>
  </section>
</div>
<div class="support-container">
  <div class="support-flag"><img class="imageOfCountry" src="" alt="country flag"></div>
  <div class="support-content">
    <div>
        <p class="country-name">country name </p>
        <p><span class="bol">Native Name: </span> <span class="Native-Name ins"></span> </p>
        <p><span class="bol">Population: </span> <span class="Population ins"></span> </p>
        <p><span class="bol">Region: </span><span class="Region ins"></span></p>
        <p><span class="bol">Sub Region: </span> <span class="Sub-Region ins"></span> </p>
        <p><span class="bol">Capital: </span> <span class="Capital ins"></span> </p>
    </div>
    <div class="centre-aliens"> 
        <div>
        <p> <span class="bol">Top Level Domain:</span> <span class="Top-Level-Domain ins"></span> </p>
        <p> <span class="bol">Currencies: </span> <span class="Currencies ins"></span> </p>
        <p> <span class="bol">Languages: </span> <span class="Languages ins"></span> </p> 
        </div>
    </div>
    <div class="span2row">
      <p><span class="bol">Border Countries: </span> <span class="Border-Countries ins"></span> </p>
    </div>
  </div>
</div>`;
  $(".main").html(change);
}
function changeTheLayoutToIndex() {
  var change = `<div class="search-bar">
    <section >
      <span class="search"
        ><i class="fa-solid fa-magnifying-glass"></i></span
      ><input type="text" placeholder="Search for the country..." />
    </section>
    <div class="csselect">
      <div class="csoption csselected">
        <span class="region">region..</span>
        <i class="fa-solid fa-angle-down"></i>
      </div>
      <div value="asia" class="csoption hide">Asia</div>
      <div value="america" class="csoption hide">America</div>
      <div value="africa" class="csoption hide">Africa</div>
      <div value="europe" class="csoption hide">Europe</div>
      <div value="oceania" class="csoption hide">Oceania</div>
    </div>
  </div>

  <div class="content"></div>`;
  $(".main").html(change);
  $.get(
    "https://restcountries.com/v3.1/region/africa",
    function (data, status) {
      inputData = false;
      if (status == "success") {
        datas = data;
        console.log(datas);
        displayCountry(v);
      } else {
        alert("error");
      }
    }
  );
}
