var users = [];
var trns = [];

$(document).on("click", ".view-data", function(){
	var id = $(this).data('id');
	viewTrans(id)
})

function clearFields(){
	$("#pin").val("");
	$("#pin-confirm").val("");
	$("#name").val("");
}
function clear(){
	$("#sender").val("");
	$("#receiver").val("");
	$("#amount").val("");
	$("#payment-pin").val("");
}

function getAcc(){
	return Math.floor((Math.random()*1000000)+1) + 60000;
}

function depositAcc(accNo){
	let user = users.find(function(user){
	})
      return user;
}

function withdrawaAcc(accNo){
   let user = users.find(function(user){
   	})
      return user;
}

function makeUser(name, pin, accNo, balance,deposit_amount){
	return {
		"id": (users.length + 1),
		"name": name,
		"pin": pin,
		"balance": Number(balance),
		"accNo" : accNo
	};
}


function showUser(user){
	var table = $(".user-table");
	table.append(`
		<tr data-id=${user.id}>
      <th scope="row">${user.id}</th>
      <td>${user.name}</td>
      <td>${user.balance}</td>
      <td>${user.accNo}</td>
      <td><button type="button" class="btn btn-primary  view-data" data-id=${user.id} data-toggle="modal" data-target="#exampleModalCenter">View</button></td>
  	</tr>
  `)
}

function getName(id) {
	let user = users.find(function(n){
		return n.id == id;
	})
	return user.name;
}

function viewTrans(id){
	let user = users.find(function(u){
		return u.id === id ;
	})
	var transctions =  trns.filter(function(item){
	   
    return item.sender.id === user.id || item.reciever.id ==user.id;
	})
	$(".trns-table").html("");
	transctions.forEach(function(trn){
		$(".trns-table").append(`
		<tr data-tran-id=${trn.id}>
	      <th scope="row">${trn.id}</th>
	      <td>${trn.sender.name}</td>
	      <td>${trn.reciever.name}</td>
	      <td>${trn.amount}</td>
    	</tr>
    `)
	})
}


function checkPin(){
	if(($("#pin").val() == $('#pin-confirm').val()) && ($("#pin").val().length == 4)){
		return true;
	}else{
		alert("Pin not match or empty pin, re-enter the details ");
		clearFields();
	}
}

function valildateUser(user){
	if(user.name.length > 0){
		if(checkPin()){
			return true;
		}else{
		}
	}else{
		alert("Enter valid Name")
	}
}

function getUser(accNo){
	var user;
	users.forEach(function(item){
		if(item.accNo == accNo){
			user = item;
		}
	})
	return user;
}


function validatePayment(user, pin, amount){
	if(user.pin == pin){
		if(user.balance >= amount ){
			user.balance -= amount;
			return true;
		}else{
			alert("Insufficient Balance!!")
			clear();
		}
	}else{
		alert("Invalid Pin!!");
		clear();
	}
}

function updateInfo(user){
	$(`tr[data-id="${user.id}"]`).html(`
	      <th scope="row">${user.id}</th>
	      <td>${user.name}</td>
	      <td>${user.balance}</td>
	      <td>${user.accNo}</td>
	      <td><button type="button" class="btn btn-primary view-data" data-id=${user.id} data-toggle="modal" data-target="#exampleModalCenter">View</button></td>
    `)
}

function updateTransaction(sender, reciever, amount){
	var trn = {
		"id": trns.length+1,
		"sender": sender,
		"reciever": reciever,
		"amount": amount
	}
	trns.push(trn);
}


$("#submit").click(function(){
	var name = $("#name").val();
	var pin = $("#pin").val();
	var accNo = getAcc();

	
	var user = makeUser(name, pin, accNo, 1000);
	if(valildateUser(user)){
		users.push(user);
		showUser(user);	
		clearFields();
	}
		
})
   // MAKE TRANSACTION ------------>
$("#make_transaction").click(function(){
	var sender = getUser($("#sender").val());
	var reciever = getUser($("#receiver").val());
	var amount = Number($("#amount").val());
	var accNo = getAcc();
	var pin = $("#payment-pin").val();
	if(sender && reciever){
		if(validatePayment(sender, pin, amount)){
      
			reciever.balance += amount;
			updateInfo(sender);
			updateInfo(reciever);
			updateTransaction(sender, reciever, amount);
			clear();
		}
	} else{
	  	alert("invalid sender or reciever!!")
	  	clear();
	}
})
   // MAKE DEPOSIT ----------->
$("#make_deposit").click(function(){
	var deposit_acc = $("#deposit_acc").val();
	var deposit_amount = Number($("#deposit_amount").val());
    var user = getUser(deposit_acc);
    if (user) {
    	user.balance += deposit_amount;
    	updateInfo(user);
    }
	else{
		alert("invalid acc no. ")
	}
})
   // MAKE WITHDRAWA ---------->
// $("#make_withdrawa").click(function(){
// 	var withdrawa_acc = $("withdrawa_acc").val();
// 	var withdrawa_amount = Number($("withdrawa_amount").val());
// 	var withdrawa_pin = $("withdrawa_pin").val();
// 	var user = getUser(withdrawa_acc);
// 	if(user){
// 			user.balance -= withdrawa_amount;
// 			updateInfo(user);
			
// 		}
// 	 else{
// 	  	alert("invalid user!!");
	  	
// 	}
    
// })

$("#btn-register").click(function(){
	$(".hide-inpute").show();
	$(".table-hide ").show();
	$(".hide-uinput ").hide();
	$(".hide-withdrawa").hide();
	$(".hide-deposit").hide();
})
$("#btn-transaction").click(function(){
	$(".hide-uinput").show();
	$(".hide-inpute").hide();
	$(".hide-withdrawa").hide();
	$(".hide-deposit").hide();
})
$("#btn-withdrawa").click(function(){
	$(".hide-withdrawa").show();
	$(".hide-inpute ").hide();
	$(".hide-uinput").hide();
	$(".hide-deposit").hide();
})
$("#btn-deposit").click(function(){
	$(".hide-deposit").show();
	$(".hide-inpute ").hide();
	$(".hide-uinput").hide();
	$(".hide-withdrawa").hide();
})

