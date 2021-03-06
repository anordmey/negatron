//Negatron production 2

// --------------- HELPER FUNCTIONS ----------------
function shuffle(array) {
	var tmp, current, top = array.length
	if (top)
		while (--top) {
			current = Math.floor(Math.random() * (top + 1))
			tmp = array[current]
			array[current] = array[top]
			array[top] = tmp
		}
	return array
}

function showSlide(id) {
	$(".slide").hide()
	$("#" + id).show()
}

function makeLinkIm(imname) {
	return '<img src=\"images/' + imname + '.jpg\"><p align=\"center\"> </p>'
}

function makeQuestionText(q_text) {
	return '<p align=\"center\">' + q_text + '</p>'
}

//preload images: 
var myimages = new Array();

function preloading() {
	for (x = 0; x < preloading.arguments.length; x++) {
		myimages[x] = new Image();
		myimages[x].src = preloading.arguments[x];
	}
}

preloading("images/stanford.png", "images/apples_item.jpg", "images/balloons_item.jpg", "images/bananas_item.jpg", "images/bows_item.jpg", "images/buckets_item.jpg", "images/cakes_item.jpg", "images/carrots_item.jpg", "images/crayons_item.jpg", "images/cars_item.jpg", "images/cats_item.jpg", "images/cookies_item.jpg", "images/daisies_item.jpg", "images/dogs_item.jpg", "images/donuts_item.jpg", "images/fish_item.jpg", "images/flowers_item.jpg", "images/forks_item.jpg", "images/guitars_item.jpg", "images/ice cream cones_item.jpg", "images/keys_item.jpg", "images/kites_item.jpg", "images/lollipops_item.jpg", "images/mittens_item.jpg", "images/pencils_item.jpg", "images/phones_item.jpg", "images/plants_item.jpg", "images/presents_item.jpg", "images/purses_item.jpg", "images/rainboots_item.jpg", "images/scissors_item.jpg", "images/shovels_item.jpg", "images/umbrellas_item.jpg", "images/apples_nothing.jpg", "images/balloons_nothing.jpg", "images/bananas_nothing.jpg", "images/bows_nothing.jpg", "images/buckets_nothing.jpg", "images/cakes_nothing.jpg", "images/carrots_nothing.jpg", "images/crayons_nothing.jpg", "images/cars_nothing.jpg", "images/cats_nothing.jpg", "images/cookies_nothing.jpg", "images/daisies_nothing.jpg", "images/dogs_nothing.jpg", "images/donuts_nothing.jpg", "images/fish_nothing.jpg", "images/flowers_nothing.jpg", "images/forks_nothing.jpg", "images/guitars_nothing.jpg", "images/ice cream cones_nothing.jpg", "images/keys_nothing.jpg", "images/kites_nothing.jpg", "images/lollipops_nothing.jpg", "images/mittens_nothing.jpg", "images/pencils_nothing.jpg", "images/phones_nothing.jpg", "images/plants_nothing.jpg", "images/presents_nothing.jpg", "images/purses_nothing.jpg", "images/rainboots_nothing.jpg", "images/scissors_nothing.jpg", "images/shovels_nothing.jpg", "images/umbrellas_nothing.jpg")

// --------------- PARAMETERS OF THE EXPERIMENT ----------------
var items = ["apples", "balloons", "bananas", "bows", "buckets", "cakes", "carrots", "crayons", "cars", "cats", "cookies", "daisies", "dogs", "donuts", "fish", "flowers", "forks", "guitars", "ice cream cones", "keys", "kites", 	"lollipops", "mittens", "pencils", "phones", "plants", "presents", "purses", "rainboots", "scissors", "shovels", "umbrellas"]
var person = ["Bob", "Nancy", "Josh", "Natalie", "Abby", "Michael", "Katie", "Molly", "Susan", "Jasmine", "Jeff", "David", "Daniel", "Grace", "Sophia", "Lila", "Ethan", "John", "Kevin", "Kyle", "Sam", "Mark", "Alison", "Andrew", "Julia", "Jacob", "Lauren", "Lizzie", "Olivia", "Samantha", "Isabelle", "Alex"]
var people = ["boys", "girls", "boys", "girls", "girls", "boys", "girls", "girls",	"girls", "girls", "boys", "boys", "boys", "girls", "girls", "girls", "boys", "boys", "boys","boys", "boys",	"boys", "girls", "boys", "girls", "boys", "girls", "girls", "girls", "girls", "girls", "boys"]


var trial_types = shuffle([
	["item", 0],
	["item", 0],
	["item", 0],
	["item", 0],
	["item", 1],
	["item", 1],
	["item", 1],
	["item", 1],
	["item", 2],
	["item", 2],
	["item", 2],
	["item", 2],
	["item", 3],
	["item", 3],
	["item", 3],
	["item", 3],
	["nothing", 0],
	["nothing", 0],
	["nothing", 0],
	["nothing", 0],
	["nothing", 1],
	["nothing", 1],
	["nothing", 1],
	["nothing", 1],
	["nothing", 2],
	["nothing", 2],
	["nothing", 2],
	["nothing", 2],
	["nothing", 3],
	["nothing", 3],
	["nothing", 3],
	["nothing", 3]
])

var trial_order = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])

// --------------- EXPERIMENT ----------------------------------------
showSlide("instructions")

$("#pleaseWait").html("Please wait while the experiment loads...")

$(window).load(function() {
	document.getElementById("startButton").disabled = false;
	$("#pleaseWait").html("")
})

var experiment = {
	version: "production",
	trials: trial_order,
	completed: [],
	data: [],
	gender: [],
	age: "",
	nativeLanguage: "",
	about: "",
	comments: "",

	practice_start: function() {
		showSlide("practiceStart")
	},

	practice_two: function() {
		showSlide("practiceTwo")
	},

	next_trial: function() {
		var n = experiment.trials.shift() // account for the 0 indexing
		if (typeof n == "undefined") {
			return experiment.background()
		}

		experiment.completed.push(n)

		//shuffle the order
		var picOrder = shuffle(["context1", "context2", "context3", "target"])
		$("#pic1").attr("id", picOrder[0])
		$("#pic2").attr("id", picOrder[1])
		$("#pic3").attr("id", picOrder[2])
		$("#pic4").attr("id", picOrder[3])

		var cond = trial_types[n][1]

		//pictures appear
		var showContext = showContext
		if (cond == 0) {
			showSlide("stage")
			$("#context1").html(makeLinkIm(items[n] + "_nothing"))
			$("#context2").html(makeLinkIm(items[n] + "_nothing"))
			$("#context3").html(makeLinkIm(items[n] + "_nothing"))
		} else if (cond == 1) {
			showSlide("stage")
			$("#context1").html(makeLinkIm(items[n] + "_item"))
			$("#context2").html(makeLinkIm(items[n] + "_nothing"))
			$("#context3").html(makeLinkIm(items[n] + "_nothing"))
		} else if (cond == 2) {
			showSlide("stage")
			$("#context1").html(makeLinkIm(items[n] + "_item"))
			$("#context2").html(makeLinkIm(items[n] + "_item"))
			$("#context3").html(makeLinkIm(items[n] + "_nothing"))
		} else if (cond == 3) {
			showSlide("stage")
			$("#context1").html(makeLinkIm(items[n] + "_item"))
			$("#context2").html(makeLinkIm(items[n] + "_item"))
			$("#context3").html(makeLinkIm(items[n] + "_item"))
		}

		var test_images = items[n] + "_" + trial_types[n][0]
		$("#target").html(makeLinkIm(test_images)).attr('class', 'defaultPic')

		var context_text = "Look at these " + people[n] + "!"

		$("#questionText").html(makeQuestionText(context_text))
		$("#instructionsText").html("Please wait .")

		//Wait four seconds before showing target character
		setTimeout(function() {
			$("#instructionsText").html("Please wait . .")
		}, 1000)
		setTimeout(function() {
			$("#instructionsText").html("Please wait . . .")
		}, 2000)
		setTimeout(function() {
			$("#instructionsText").html("Please wait . . . .")
		}, 3000)

		//show the sentence (after a delay)
		setTimeout(function() {
			//red box appears around target
			$("#target").attr('class', 'selectedPic')
			$("#questionText").html("")
			$("#instructionsText").html("")

			setTimeout(function() {
				//sentence appears
				var question_text = "<center>" + person[n] + " has <input type='text' id='sentenceEnd'>. </center>"
				$("#questionText").html(question_text)
				$("#instructionsText").html("Fill in the blank!")
				$("#nextButton").attr("class", "visibleButton")

				//place cursor in text box
				$("#sentenceEnd").focus()

				//activate click if participant hits "return"
				$("#sentenceEnd").keypress(function(event) {
					var keycode = (event.keyCode ? event.keyCode : event.which);
					if (keycode == '13') {
						$('#nextButton').click()
					}
				})

				//On click, save data & start next trial
				$("#nextButton").off("click")
				$("#nextButton").on("click", function() {

					var subResponse = $("#sentenceEnd").val()

					if (subResponse.length == 0) {

						alert("Please fill in the blank!")

					} else {

						//make a variable "data" which includes all of the information I want to collect for each participant.  
						var data = {
							context_condition: cond,
							item: items[n],
							order: picOrder,
							stimulus: n,
							images: test_images,
							image_condition: trial_types[n][0],
							response: subResponse, 
						}

						experiment.data.push(data)

						// clear everything
						$("#context1").html("").attr('class', 'defaultPic')
						$("#context2").html("").attr('class', 'defaultPic')
						$("#context3").html("").attr('class', 'defaultPic')
						$("#target").html("").attr('class', 'defaultPic')
						$("#questionText").html("")
						$("#instructionsText").html("")
						$("#nextButton").attr("class", "hiddenButton")

						//reset pic ids
						$("#" + picOrder[0]).attr("id", "pic1")
						$("#" + picOrder[1]).attr("id", "pic2")
						$("#" + picOrder[2]).attr("id", "pic3")
						$("#" + picOrder[3]).attr("id", "pic4")


						setTimeout(experiment.next_trial, 500)
					}
				})
			}, 0)
		}, 4000)
	},

	//Ask for background info and comments:
	background: function() {
		$("#gender").trigger("reset")
		$("#age").trigger("reset")
		$("#language").trigger("reset")
		$("#aboutQ").trigger("reset")
		$("#commentQ").trigger("reset")
		showSlide("askInfo");

		$("#endButton").click(function() {
			var gen = $("input:radio[name=genderButton]:checked").val()
			var ag = $("#ageRange").val()
			var lan = $("#nativeLanguage").val()
			var about = $("#aboutQ").val()
			var comm = $("#commentQ").val()

			if (gen == "" | ag == "" | lan == "" | about == "") {
				alert("Please answer all of the questions")
			} else {
				experiment.gender = gen
				experiment.age = ag
				experiment.nativeLanguage = lan
				experiment.about = about
				experiment.comments = comm

				experiment.end()
			}
		})
	},

	// finish & submit results
	end: function() {
		showSlide("finished")

		setTimeout(function() {
			//No data collection in demo mode!
			//turk.submit(experiment)
		}, 1000)
	}
}