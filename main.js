//https://teachablemachine.withgoogle.com/models/TlgzAiEVR/model.json
var prediction1 = ""

Webcam.set({
    width:350,
    height:300,
    imageFormat:"png",
    pngQuality:90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'

 });
}
console.log("versão ml5:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Wi6guaJL9/model.json",modelLoaded);
function modelLoaded(){
    console.log("modelo carregado");
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é:"+prediction1;
    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);

}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if(results[0].label == "joia"){
            document.getElementById("updateEmoji").innerHTML = "&#128077";
        }
        if(results[0].label == "dboa "){
            document.getElementById("updateEmoji").innerHTML = "&#9996";
        }
        if(results[0].label == "hang lose"){
            document.getElementById("updateEmoji").innerHTML = "&#129305";
        }
      
    }
}
