// step 1
$("#step2, #step3").hide();
$(".page").hide();
var number = 3;

// add one person
$("#step1 .next").click(function() {
	$(".number").fadeOut(150).fadeIn(150);
	number = parseInt($(".number").text());
	$("#step1 .prev").css("fill", "white");
	if (number <= 9) {
		number ++;
		$(".number").text(number);	
	} 
	if (number === 10) {
		$("#step1 .next").css("fill", "#616161");
	}	
})

// remove one person
$("#step1 .prev").click(function() {
	$(".number").fadeOut(150).fadeIn(150);
	number = parseInt($(".number").text());
	$("#step1 .next").css("fill", "white");
	if (number >= 3) {
		number --;
		$(".number").text(number);
	} 
	if (number === 2) {
		$("#step1 .prev").css("fill", "#616161");
	}
})

// hover

$("#step1 .next").mouseenter(function(){
	if(number !== 10) {
	$(this).css("fill", "#FF9800");
	}
}).mouseleave(function() {
	if(number !== 10) {
    $(this).css("fill", "white");
	}
});

// hover

$("#step1 .prev").mouseenter(function(){
	if(number !== 2) {
		$(this).css("fill", "#FF9800");
	}
}).mouseleave(function() {
	if(number !== 2) {
    $(this).css("fill", "white");
	}
});

// click next on step 1

$("#step1 button").click(function() {
	$("#step1").fadeOut(150);
	$("#step2").fadeIn(150);
	for (i = 0; i < number; i++) {
		var clonePerson = $("#person").clone(true).removeAttr("id").addClass("person" + (i+1));
		clonePerson.find("input").attr("placeholder", "Person " + (i+1));
		clonePerson.insertBefore($("#person"));

		var cloneCube = $("#cube").clone(true).removeAttr("id").addClass("person" + (i+1));
		cloneCube.insertBefore($("#cube"));

		var cloneBar = $("#tabBarBottom").clone(true).removeAttr("id").addClass("person" + (i+1));
		cloneBar.find("p").first().text("Person " + (i+1));
		cloneBar.insertBefore($("#tabBarBottom"));

		var cloneDiv = $("#page").clone(true).removeAttr("id").addClass("person" + (i+1));
		cloneDiv.find(".title").find("h4").text("Person " + (i+1));
		cloneDiv.insertBefore($("#page"));
	}


	var width = $("#tabBar").width() / number + "%";
	$("#tabBar").children().width(width);


	$("#tabBar").children().first().addClass("orange");
	$("#tabBar").children().first().find("svg").addClass("orange");
	$(".pages").children().eq(0).show();
	
})


// input value name

$("#step2 .name").change(function() {
	var name = $(this).val();
	var index = $(this).parent().parent().index();
	$("#step3 .items").children().eq(index).find("p").text(name);
})

// input person name 

$("#step2 .inputName").change(function() {
	var person = $(this).val();
	var index = $(this).parent().index() - 1;
	$("#step3 .page").eq(index).find(".title").find("h4").text(person);
	$(".tabBarBottom").eq(index).find("p").text(person);
})

// input price

$("#step2 .price").change(function() {

	var price = $(this).val();
	var divide = 0;

	$(this).parent().parent().find(".orange").each(function() {
		divide ++;
	})	
	var each = (price / divide).toFixed(2);

	$(this).parent().parent().find(".orange").each(function() {
	var index = $(this).parent().index();
	var person = $(this).index() - 1;

	var targetPage = $("#step3 .pages").children().eq(person);
	var targetItem = targetPage.find(".items").children().eq(index);
	targetItem.find("h4").text(each);
	})

})


// toggle cube

$('#step2 .cube').click(function() {
	$(this).toggleClass("orange");

	var price = $(this).parent().find(".price").val();
	var divide = 0;
	$(this).parent().find(".orange").each(function() {
		divide ++;
	})	
	var each = (price / divide).toFixed(2);

	$(this).parent().find(".orange").each(function() {
	var index = $(this).parent().index();
	var person = $(this).index() - 1;

	var targetPage = $("#step3 .pages").children().eq(person);
	var targetItem = targetPage.find(".items").children().eq(index);
	targetItem.find("h4").text(each);
	})
})



// toggle all

$('#step2 .all').click(function() {
	if($(this).hasClass("orange")) {
		$(this).parent().find("div").addClass("orange");

		var price = $(this).parent().find(".price").val();
		var each = (price / number).toFixed(2);
		var index = $(this).parent().index();

		var targetPage = $("#step3 .pages").children().each(function(){
			$(this).find(".items").children().eq(index).find("h4").text(each);
		});
	} else {
		$(this).siblings().removeClass("orange");

		var index = $(this).parent().index();
		var targetPage = $("#step3 .pages").children().each(function(){
			$(this).find(".items").children().eq(index).find("h4").text(0);
		});
	}

	
})

// hover on add button

$("#step2 .add").mouseenter(function(){
	$(this).css("fill", "#FF9800");
}).mouseleave(function() {
    $(this).css("fill", "white");
});

// add row

var itemIndex = 2;

$("#step2 .add").click(function() {

	var cloneRow = $("#step2 #row").clone(true).children().removeClass("orange").parent().removeAttr("id").removeClass("item1").addClass("item" + itemIndex);
	cloneRow.find("input").val('');
	cloneRow.find(".name").attr("placeholder", "Item " + itemIndex);
	$("#step2 .table").append(cloneRow);
	

	
	var cloneItem = $("#step3 #item").first().clone(true).removeAttr("id").removeClass("item1").addClass("item" + itemIndex);
	cloneItem.find("p").text("Item" + itemIndex);
	$("#step3 .items").append(cloneItem);
	
	itemIndex ++;
	
})


// calculate total

var total = 0 * 1;

$(".price").change(function(){
	
	var val = $(this).val();

    total = total + val*1;

    $(".total").text("Total " + total);

});

// calculate total each

$("#step2 button").click(function(){
	
	$(".page").each(function() {
		var totalEach = 0.00;
		$(this).find(".item").each(function() {
			var itemPrice = $(this).find("h4").text() * 1;
			totalEach += itemPrice;
		})
		$(this).find(".totalEach").text("Total: " + totalEach);
	})	
});


// click on next on step 2

$("#step2 button").click(function() {
	$("#step2").fadeOut(150);
	$("#step3").fadeIn(150);
})


// change tab bar active state 

$("#step3 .tabBarBottom").click(function() {
	$(this).addClass("orange");
	$(this).find("svg").addClass("orange");
	$(this).siblings().removeClass("orange");
	$(this).siblings().find("svg").removeClass("orange");

	var index = $(this).index();
	$(".pages").children().hide();
	$(".pages").children().eq(index).show();
})







// page transition


$("#step3 .back").click(function() {
	$("#step3").fadeOut(150);
	$("#step2").fadeIn(150);
})


// reset



$("#step2 .back").click(function() {
	window.location.href = "./index.html"
})

$("#step3 button").click(function() {
	window.location.href = "./index.html"
})










