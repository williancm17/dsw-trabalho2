let frete2 = 15;
let frete5 = 10;

let total = 161.94

function Calcfrete(){


let txt1 = document.getElementById('resultado')
let soma = frete2 + total 
txt1.innerHTML = `O valor total é de R$:${soma},00`

}

let shipping_time = 5;
let shipping_cost = 0;
let arrival_date = '';
let weightOz = 0;

function apply_event_handlers() {
    calculateButton(); 
}

function calculateButton() {
    $("#calcBtn").click(function () {
        let inputValidation = $("#weightInput").val()
        if (inputValidation == '') {
            $('.btnValidation').addClass('red');
            return false;
        } else {
            console.log('calcBtn called.');
            $('btn-validation').val('');
            calculate_shipping(inputValidation, shipping_time)
            $("#weightInput").val('');
            $('.btnValidation').removeClass('red');
            calculateData()
            $('.icon-img').addClass('bounce');
            setTimeout(function () {
                $('.icon-img').removeClass('bounce');
            }, 1000);
        }
    });
}


function validate_keydown(evt, obj) {
    let charCode = (evt.which) ? evt.which : event.keyCode
    let value = obj.value;
    let dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


function change_shipping_type(time) {
    shipping_time = time;

    let currentDate = new Date();
    let numberOfDaysToAdd = time;
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let y = currentDate.getFullYear();

    arrival_date = dd + '/' + mm + '/' + y;
}


function calculate_shipping(weight, shipping_time) {
    weightOz = weight * 16;

    if (weightOz <= 20) {
        shipping_cost = (weightOz * 0.02).toFixed(2);
    } else if (weightOz > 20 && weightOz < 32) {
        shipping_cost = (weightOz * 0.10).toFixed(2);
    } else if (weightOz >= 32) {
        shipping_cost = (weightOz * 0.20).toFixed(2);
    }

    if (shipping_time === 5) {
        shipping_cost = shipping_cost * 1;
    } else if (shipping_time === 3) {
        shipping_cost = shipping_cost * 1.5;
    } else if (shipping_time === 2) {
        shipping_cost = shipping_cost * 2;
    }
    change_shipping_type(shipping_time);
}


function calculateData() {
    $('#totalOz').text(weightOz);
    $('#totalLbs').text(weightOz / 16);
    $('#eta').text(arrival_date);
    $('#TotalCost').text("$" + shipping_cost.toFixed(2));
}