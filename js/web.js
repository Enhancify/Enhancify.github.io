var counter = 0;
var resultsh1 = $("<h1>Results</h1>");
var faceArray = [];

$(function() {
	
	var imgDiv = $("<div id='images'>");
	imgDiv.hide();
	$("body").append(imgDiv);


	Dropzone.instances[0].on("addedfile", function(file) {

    	var img = document.createElement('img');
        img.file = file;
        img.id = "img" + counter;
        counter ++;
        imgDiv.append(img);
        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
	});

	$('#cage_btn').click(function () {
		console.log('Started face detection');

		$('.face').remove();
		for(var i = 0; i < counter; i ++) {
			var id = '#img' + i;

			$(id).faceDetection({
				complete: function (faces) {
					console.log(faces);
					faceArray = []; 
					for (var i = 0; i < faces.length; i++) {
						faceArray.push(faces[i]);                                 
					}
					replaceFaces(id);
				},
				error:function (code, message) {
					alert('Error: ' + message);
				}
			});
		}
		showResults();
	});

	$("#done_btn").click(function() {
		$("#resultsdiv").hide();
		$("#resultsphotosdiv").empty();
		$("#images").empty();
		counter = 0;
		Dropzone.instances[0].removeAllFiles();
		$("#fileselectiondiv").show();
	});

	$("#resultsdiv").hide();
});

function showResults() {
	$("#fileselectiondiv").hide();
	$("#resultsdiv").show();
}

var replaceFaces = function(id){
	var w = document.createElement('canvas');
	$("#images").show();
    w.height = $(id).height();
	w.width = $(id).width();
    $("#images").hide();
	w.x = $(id).x;
	w.y = $(id).y;
	var ctx= w.getContext("2d");
	ctx.drawImage($(id).get(0),0,0);

	for(var i = 0; i < faceArray.length; i ++){
		var n = Math.floor((Math.random() * 10) + 1);
		var imgFile = document.getElementById("nick"+(n)+"");
		imgFile.width = faceArray[i].scaleX * faceArray[i].width;
		imgFile.height = faceArray[i].scaleY * faceArray[i].height;
	
		var ratio = faceArray[i].width / imgFile.width;
		var width = imgFile.height * ratio * 2;
		var height = imgFile.height * ratio * 2;
	
		ctx.drawImage(imgFile,faceArray[i].x - 0.25 * width,faceArray[i].y - 0.25 * height,width,height);
	}

	w.setAttribute('display', 'block');

	$('#resultsphotosdiv').append(w);
}