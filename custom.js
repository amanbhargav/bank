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

// function uniqUser(){
// 	if(($("#name").val() == $('#sender').val())){
// 		return ;
// 	}else{
// 		alert("same name not allow");
// 		clearFields();
// 	}
// }

function makeUser(name, pin, balance){
	return {
		"id": (users.length + 1),
		"name": name,
		"pin": pin,
		"balance": Number(balance)
	};
}


function showUser(user){
	var table = $(".user-table");
	table.append(`
		<tr data-id=${user.id}>
      <th scope="row">${user.id}</th>
      <td>${user.name}</td>
      <td>${user.balance}</td>
      <td><button type="button" class="btn btn-primary view-data" data-id=${user.id} data-toggle="modal" data-target="#exampleModalCenter">View</button></td>
  	</tr>
  `)
}

function viewTrans(id){
	let user = users.find(function(u){
		return u.id === id ;
	})
	var transctions =  trns.filter(function(item){
	   
    return item.id === user.id;
	})
	$(".trns-table").html("");
	transctions.forEach(function(trn){
		$(".trns-table").append(`
		<tr data-tran-id=${trn.id}>
	      <th scope="row">${trn.id}</th>
	      <td>${trn.sender}</td>
	      <td>${trn.reciever}</td>
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

function getUser(name){
	var user;
	users.forEach(function(item){
		if(item.name == name){
			user = item;
		}
	})
	return user;
}


function validatePayment(user, pin, amount){
	if(user.pin == pin){
		if(user.balance >= amount){
			user.balance -= amount;
			return true;
		}else{
			alert("Insufficient Balance!!")
		}
	}else{
		alert("Invalid Pin!!");
	}
}

function updateInfo(user){
	$(`tr[data-id="${user.id}"]`).html(`
	      <th scope="row">${user.id}</th>
	      <td>${user.name}</td>
	      <td>${user.balance}</td>
	      <td><button type="button" class="btn btn-primary view-data" data-id=${user.id} data-toggle="modal" data-target="#exampleModalCenter">View</button></td>
    `)
}

function updateTransaction(sender, reciever, amount){
	var trn = {
		"id": trns.length+1,
		"sender": sender.name,
		"reciever": reciever.name,
		"amount": amount
	}
	trns.push(trn);
}


$("#submit").click(function(){
	var name = $("#name").val();
	var pin = $("#pin").val();
	var user = makeUser(name, pin, 1000);
	if(valildateUser(user)){
		users.push(user);
		showUser(user);	
		clearFields();
	}
		
})

$("#make_transaction").click(function(){
	var sender = getUser($("#sender").val());
	var reciever = getUser($("#receiver").val());
	var amount = Number($("#amount").val());
	var pin = $("#payment-pin").val();
	if(sender && reciever){
		if(validatePayment(sender, pin, amount)){
      
			reciever.balance += amount;
			updateInfo(sender);
			updateInfo(reciever);
			updateTransaction(sender, reciever, amount);
		}
	} else{
	  	alert("invalid sender or reciever!!")
	}
})


