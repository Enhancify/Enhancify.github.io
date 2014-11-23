var counter = 0;
var resultsh1 = $("<h1>Results</h1>");

$(function() {
	
	var imgDiv = $("<div id='images'>");
	imgDiv.hide();
	$("body").append(imgDiv);

	$("#resultsdiv").hide();

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
});

function showResults() {
	$("#fileselectiondiv").hide();
	$("#resultsdiv").show();
}

function clearResults() {
	$("#resultsdiv").hide();
	$("#resultsdiv").empty();
	$("#images").empty();
	counter = 0;
	Dropzone.instances[0].removeAllFiles();
	$("#resultsdiv").append(resultsh1);
	$("#fileselectiondiv").show();
}