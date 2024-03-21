const API_KEY = "GWdZRWB1svhuRRxeQ3bBMiwlBqAQrkKTw%2BoEd0Zbjxxpaw9mykRs0NgETMIThRx9YOlYH33oHz1QkZm9GvfP%2FQ%3D%3D"
let foodList = [];

let url = new URL(`http://apis.data.go.kr/6260000/FoodService/getFoodKr?ServiceKey=${API_KEY}&resultType=json`)
// 공공데이터 api 가져오기
// const getData = async() => {
//     const url = `http://apis.data.go.kr/6260000/FoodService/getFoodKr?ServiceKey=${API_KEY}&resultType=json&numOfRows=7&pageNo=5`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log("data", data);
//     const locations = data.getFoodKr.item.map((spot) =>[
//         spot.MAIN_TITLE,spot.LAT, spot.LNG
//     ]);
//     console.log("locations",locations);

//     getFood();
//     drawMap(locations);
// }

const getFood = async() => {
    const response = await fetch(url);
    const data = await response.json();
    foodList = data.getFoodKr.item;
    console.log("겟푸드",foodList);
}

const render = async() => {
    const response = await fetch(url);
    const data = await response.json();
    foodList = data.getFoodKr.item;
    let foodHTML = ``;
    foodHTML =  foodList.map((item) => `
        <div>
            <h1>${item.MAIN_TITLE}</h1>
        </div>
    `)
    
    document.getElementById("food-board").innerHTML = foodHTML;
    getFood();
}

// 구글 지도 가져오기
function drawMap(locations) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
  
    const infowindow = new google.maps.InfoWindow();
  
    let marker, i;
  
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
      });
  
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }



getFood();

render();

