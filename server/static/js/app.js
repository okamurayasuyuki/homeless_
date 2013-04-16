$(function(){
  console.log("called");
  var score = 0;
  var data = [];
  var tappedCnt = 0;

  // return type of man/women/okama

  var type = function(){
    var types = ["men","women","okama"];
    var rand = Math.floor(Math.random()  * 3);
    return types[rand];
  };


  // make picture's dir.
  var picDir = function(){
    var chDir = function(){
    };
    var idx = Math.floor(Math.random()  * 5) + 1;
    var randType = type();
    var str = "";
    str += "static/img/" + randType +  "/" + randType +idx + ".png"; 
    return str;

  };

  var isExist = function(item){
    var flag = false;
    data.forEach(function(d){
      if (item === d){
        flag =  true;
        return flag;
      }else{
        flag =  false;
      }
    });
    return flag;
  };
  var pushData = function(){
    while(data.length !== 5){
      console.log("try");
      var d = picDir();
      if (isExist(d)){
        console.log("already");
      }else{
        data.push(d);
      }
    }
  };

  var wrapped = function(html){
    html += "<button>men</button>";
    html += "<button>women</button>";
    html += "<button>okama</button>";
    return html;
  };

  pushData();

  var renderPic = function(){
    var str = "";
    var $el = $("#pictures");

    for(var i = 0 ;  i < 5;i++){
      var dir = data[i];

      var correctType = dir.split('\/')[2];

      str += "<li><img class='pic' src='";
      str += dir;
      str += "'></li>";
      str += "<div class='buttons'>";
      if (correctType === "men"){
        str += "<button class='correct' >men</button>";
      }else{
        str += "<button class=''>men</button>";
      }
      if (correctType === "women"){
        str += "<button class='correct' >women</button>";
      }else{
        str += "<button class=''>women</button>";
      }
      if (correctType === "okama"){
        str += "<button class='correct'>okama</button>";
      }else{
        str += "<button>okama</button>";
      }
      str += "</div>";
    }

    $el.html(str);
  };


  renderPic();



  var popOver = function(){
    $("body").append("<div class='gameover'>Game Over!<br>"+ "score: " + score + "</div>");
  };

  $("button").bind("click",function(e){
    tappedCnt += 1;
    var target = $(this).attr("class");

    $closest = $(this).closest(".buttons");
    $correct = $(".correct");

    var wrapped = function(str,isCorrect){
      var res;
      if (isCorrect === true){
        res = "<div class='red'>";
      }else{
        res = "<div class='blue'>";
      }

      res += str;
      res += "</div>";
      return res;
    };

    if (target === "correct"){
      score += 1;
      $closest.html(wrapped($correct.html(),true));
    }else{
      $closest.html(wrapped($correct.html()),false);
    }
    if (tappedCnt === 5){
      popOver();
      console.log("clcl");
    }

  });




});
