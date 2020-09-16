let iconNumber = 0;
window.onload = function() {
    let icons = document.getElementsByClassName("icon");
    if(localStorage.getItem("iconNumber") != null){
        icons[localStorage.getItem("iconNumber")].style.backgroundColor = "yellow";
    }else{
        localStorage.setItem("iconNumber",0);
        iconNumber = 0;
        icons[0].style.backgroundColor = "yellow";
    }
    // ボタンクリック時の処理
    document.getElementById("post").onclick = function() {
        // カスタムメッセージ
        post(document.getElementById("input").value,0);
        document.getElementById("input").value = "";
    };
    document.getElementById("driveStart").onclick = function() {
        // 運転開始
        post(":x::x::x:車の運転を始めました。注意して歩いてください:cold_face:",1);
    };
    document.getElementById("driveStop").onclick = function() {
        // 運転終了
        post(":yellow_circle::yellow_circle::yellow_circle:車の運転を終了しました。もうこれで安全です（やったー:blush:）",1);
    }

    // 保存ボタン
    document.getElementById("save").onclick = function() {
        localStorage.setItem("name",document.getElementById("name").value);
        localStorage.setItem("url",document.getElementById("url").value);
        localStorage.setItem("iconNumber",iconNumber)
        alert("保存しました")
    }
    // 削除ボタン
    document.getElementById("remove").onclick = function() {
        if(window.confirm("データを削除しますか？")){
            localStorage.removeItem("name");
            localStorage.removeItem("url");
            document.getElementById("name").value = "";
            document.getElementById("url").value = "";
            icons[iconNumber].style.backgroundColor = "#cccccc";
            iconNumber = 0;
            icons[0].style.backgroundColor = "yellow";
        } 
    }

    // アイコンの設定
    if(localStorage.getItem("iconNumber") != null){
        iconNumber = localStorage.getItem("iconNumber");
    }
    for(let i=0;i < icons.length;i++){
        icons[i].onclick = function() {
            icons[iconNumber].style.backgroundColor = "#cccccc";
            let iconParent = event.target.parentNode;
            let icon = iconParent.querySelectorAll("img");
            iconNumber = Array.prototype.indexOf.call(icon, event.target);
            icons[iconNumber].style.backgroundColor = "yellow";
        }
    }

    // userFormの初期値を入力
    document.getElementById("name").value = localStorage.getItem("name");
    document.getElementById("url").value = localStorage.getItem("url");


    let status = document.getElementById("status");


    xhr = new XMLHttpRequest();
    // サーバからのデータ受信を行った際の動作
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 204) {
            status.innerText = "status:送信完了";
        }else{
            status.innerText = "status:送信失敗";
        }
        console.log(xhr);
      }
    };
};

function post(message) {
    xhr.open('POST', localStorage.getItem("url"));
    xhr.setRequestHeader('content-type', 'application/json');
    // フォームに入力した値をリクエストとして設定
    let username = localStorage.getItem("name");
    if(username == null || username == "") username = "MsgBot";

    let iconNum = localStorage.getItem("iconNumber");
    if(iconNum == null) iconNum = 0;
    let iconURL = location.href + "images/car_" + iconNum + ".png";
    console.log(iconURL)
    
    let request = '{"username":"' + username + '","content":"' + message + '","avatar_url":"' + iconURL + '"}';
    xhr.send(request);
};