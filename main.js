// 変数定義
// let tuika = "追加したぞ";
// let cnt_click = 0;

// 東京(130000)の予報を取得
let url = "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";

// htmlからid取得
let ent_temp = document.getElementById("nyuryoku");
let aiueo = document.getElementById("aiueo");
let ent_weather = document.getElementById("ent_weather");
let jouhou = document.getElementById("jouhou")

// のちのち使う変数
let newMidashi = document.createElement("h1");
let today_weather;
let today_temp;
let clothe;
let weather_img = document.createElement("img");
weather_img.classList.add("weather_img");
let clothe_img = document.createElement("img");
clothe_img.width = 200;
clothe_img.height = 200;
clothe_img.classList.add("clothe_img");
const clothes = ["ダウンコート", "冬物コート", "トレンチコート", "セーター", "カーディガン", "長袖シャツ", "半袖シャツ", "半袖"];





fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(weather) {
        console.log(weather);
        // 特定の地域(今回は東京)だけ選択して変数に詰め直す
        let area = weather[0].timeSeries[0].areas[0];
        let temp = weather[0].timeSeries[2].areas[0].temps[0];
        today_weather = area.weathers[0];
        const weather1 = weather_change(today_weather);
        console.log(weather1)

        today_temp =temp;
        console.log(area); 
        console.log(temp); 
        // 発表者と報告日時の情報を画面に書き出す
        document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice;
        document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;
        // 特定地域の情報を画面に書き出す
        document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
        document.getElementById("today").lastElementChild.textContent = area.weathers[0];
        document.getElementById("today").lastElementChild.appendChild(weather1);
        // document.getElementById("today").lastElementChild.appendChild(weather2);        
        document.getElementById("temperature").lastElementChild.textContent = temp;
    });



// 判定
const temps_change = temps => {

    if(temps < 5){
        clothe = clothes[0];
        clothe_img.src = "images/daun.png";
        clothe_img.alt = "ダウンコート";
    }else if(temps < 8){
        clothe = clothes[1];
        clothe_img.src = "images/ko-to.png";
        clothe_img.alt = "冬物コート";
    }else if(temps < 12){
        clothe = clothes[2];
        clothe_img.src = "images/torenchi.png";
        clothe_img.alt = "トレンチコート";
    }else if(temps < 16){
        clothe = clothes[3];
        clothe_img.src = "images/se-ta-.png";
        clothe_img.alt = "セーター";
    }else if(temps < 20){
        clothe = clothes[4];
        clothe_img.src = "images/ka-dhigan.png";
        clothe_img.alt = "カーディガン";
    }else if(temps < 25){
        clothe = clothes[5];
        clothe_img.src = "images/Tshatu.png";
        clothe_img.alt = "長袖シャツ";
    }else if(temps < 30){
        clothe = clothes[6];
        clothe_img.src = "images/hansodeTshatu.png";
        clothe_img.alt = "半そでシャツ";
    }else if(temps >= 30){
        clothe = clothes[7];
        clothe_img.src = "images/hansode.png";
        clothe_img.alt = "半そで";
    }else{
        clothe = 0;
    }
    return [clothe, clothe_img];
}

const weather_change = (weather) => {
    if(weather.includes("晴れ") === true){
        weather_img.src = "images/tenki_mark01_hare.png";
        weather_img.alt = "晴れ";
    }else if(weather.includes("雨") === true){
        weather_img.src = "images/tenki_mark02_ame.png";
        weather_img.alt = "雨";
    }else if(weather.includes("くもり") === true){
        weather_img.src = "images/tenki_mark05_kumori.png";
        weather_img.alt = "曇り";
    }else if(weather.includes("雷") === true){
        weather_img.src = "images/tenki_mark07_kaminari.png";
        weather_img.alt = "雷";
    }else if(weather.includes("雪") === true){
        weather_img.src = "images/tenki_mark08_yuki.png";
        weather_img.alt = "雪";
    }

    }
    // switch(weather){
    //     case "晴れ"
    //         :weather_img.src = "images/tenki_mark01_hare.png";
    //         weather_img.alt = "晴れ";
    //         break;
    //     case "雨"
    //         :weather_img.src = "images/tenki_mark02_ame.png";
    //         weather_img.alt = "雨";
    //         break;
    //     case "曇り"
    //         :weather_img.src = "images/tenki_mark05_kumori.png";
    //         weather_img.alt = "曇り";
    //         break;
    //     case "雷"
    //         :weather_img.src = "images/tenki_mark07_kaminari.png";
    //         weather_img.alt = "雷";
    //         break;
    //     case "雪"
    //         :weather_img.src = "images/tenki_mark08_yuki.png";
    //         weather_img.alt = "雪";
    //         break;   
    // }
    return weather_img;
}

// 結果表示
function initialize(){


}

function kekka(){
    // console.log(ent_temp.value);
    // console.log(temps_change(ent_temp.value));
    // console.log(newMidashi.innerHTML = "今日の服装は");
    // console.log(newMidashi.innerHTML = temps_change(ent_temp.value));
    // console.log(newMidashi.innerHTML = "で行きましょう！")
    // console.log(weather_change(ent_weather.value));
    let [clothename, clotheimg] = temps_change(today_temp);
    aiueo.innerHTML = "<p>今日の服装は</p>" + "<span>"+ clothename +"</span>" + "<p>がおすすめ！</p>";
    let element_p = aiueo.getElementsByTagName("p");
    console.log(element_p[0]);
    element_p[0].classList.add("item");
    if(clothename === "半袖"){
        aiueo.append(newMidashi.innerHTML = "(室内では羽織りものを着るとGood！)");
    }

    aiueo.appendChild(clotheimg);

}
// ページ開いたら実行
window.onload = initialize;