const API_KEY = "GWdZRWB1svhuRRxeQ3bBMiwlBqAQrkKTw%2BoEd0Zbjxxpaw9mykRs0NgETMIThRx9YOlYH33oHz1QkZm9GvfP%2FQ%3D%3D"

const getData = async() => {
    const url = `http://apis.data.go.kr/6260000/FoodService/getFoodKr?ServiceKey=${API_KEY}&resultType=json&numOfRows=7&pageNo=1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
}

window.initMap = function () {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.5400456, lng: 126.9921017 },
      zoom: 10,
    });
  };

getData();

