function updatePayment(id){
    $.post("/dashboard/updateOrderStatus", {id:id,sent:false,payment:true}, function(data, status){
        location.reload();
    });
}

function updateSent(id){
    $.post("/dashboard/updateOrderStatus", {id:id,sent:true,payment:true}, function(data, status){
        location.reload();
    });
}

function getOption(option){
    switch(option){
        case 'send-option-1':
            return 'Sækja á vörumessu í Smáralind';
        case 'send-option-2':
            return 'Sækja í Verzló frá kl: 8-14 á virkum dögum';
        case 'send-option-3':
            return 'Heimkeyrsla innan höfuðborgarsvæðisins, Selfoss og Hveragerði';
        case 'send-option-4':
            return 'Fá sent með almennum pósti á landsbyggðina'; 
        default:
            return "Undefined";
    }
}

function updateModal(data){
    $('#order-detail-fname').text(data.firstname);
    $('#order-detail-lname').text(data.lastname);
    $('#order-detail-address').text(data.address + " (floor: " + data.floor + ")");
    $('#order-detail-city').text(data.city);
    $('#order-detail-email').text(data.email);
    $('#order-detail-phone').text(data.phone);
    $('#order-detail-zip').text(data.zip);
    $('#order-detail-orders').text('');
    $('#dash-order-price').text(data.totalPrice);
    $('#order-detail-option').text(getOption(data.soption));

    for(var i = 0; i < data.orders.length; i++){
        var element = `<li class="order">${data.orders[i].name} (${data.orders[i].price} ISK)</li>`;
        $('#order-detail-orders').append(element);
    }

    $('#order-detail-modal').modal('show');
}

$(document).ready(function(){
    $('.list-group-item').hover(function(){
        $(this).addClass('active');
        }, function(){
        $(this).removeClass('active');
    });
    
    $('.list-group-item').click(function(e){
       var data = JSON.parse($(this).attr('data'));
       console.log(data);
       
       updateModal(data);
    });

    $('.update-order-button').click(function(e){
        $('#order-detail-modal').modal('hide');
        var id = $(this).attr('data-id');
        var type = $(this).attr('data-type');

        console.log("asdf");
        

        if(type == "send"){
            updateSent(id);
        }
        else if(type == "update-payment"){
            updatePayment(id);
        }
    });
});