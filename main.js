Webcam.set({
    width:300,
    height:300,
    image_format:'png',
    png_quality:90
})

camera = document.getElementById("camera");
Webcam.attach("#camera");
console.log("ML5 VERSION = " + ml5.version);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='get_capture' src='" + data_uri + "'>"
    })
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qAUHIqwq4/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Has Been Loaded!");
}

function check(){
    image = document.getElementById("get_capture");
    classifier.classify(image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("member_name").innerHTML = results[0].label;
        document.getElementById("member_accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}
