let src_product = ["img/Tshirt.gif" , "img/Hoodie.gif" , "img/Short.gif" ,"img/Sweatshirt.gif"];

let category = document.querySelectorAll('.category');

let img = document.getElementById('img-product');
let title = document.getElementById('title');

let text = document.querySelectorAll('.cate');
let price = document.querySelector('.price');

let cartIcon = document.querySelector('.icon-cart');
let cart = document.querySelector('.cart');
let cartclose = document.querySelector('#cart-close');
let addCartButtons = document.getElementById('Add');

let cartContent = document.querySelector('.cart-content') || document.querySelector('.about-cart-content') || document.querySelector('.contact-cart-content') || document.querySelector('.checkout-cart-content');

let totalchekoutelement = document.querySelector('.total-price-checkout');
let TotalPriceElement = document.querySelector('.total-price');

/* || Data Base || */
let dataPRD;
if(localStorage.cart != null){
    dataPRD = JSON.parse(localStorage.cart);
}else{
    dataPRD = [] ; 
}

let orders = [];
let order ;
if (localStorage.order != null){
    order = JSON.parse(localStorage.order);
}else{
    order = [];
}


/* || Home page || */

for(let i = 0 ; i < category.length ; i++){
    category[i].addEventListener('click', (id) =>{

        category[i].classList.add('active');

        for(let j = 0 ; j < category.length ; j++){
            category[j] != category[i] && category[j].classList.remove('active');
        }

        let id_prd = id.target.id;

        if(id_prd === "T-shirt"){
            changePRD(0,"T-Shirt",99)
            console.log(img , title)
        }else if(id_prd === "Hoodie"){
            changePRD(1,"Hoodie",159);
        }else if(id_prd === "Sweatshirt"){
            changePRD(3,"Sweatshirt",199);
        }else if(id_prd === "Short"){
            changePRD(2,"Short",49);
        }
    })
}

/* || Cart || */

function changePRD(id,name,prc){
    img.src = src_product[id];
    title.innerHTML = name;
    for(let i = 0 ; i< text.length ; i++){
        text[i].innerHTML = name;
    };
    price.innerHTML = '$' + prc 

}

    if(cartContent.classList.contains('cart-content') || cartContent.classList.contains('about-cart-content') || cartContent.classList.contains('contact-cart-content')){
        cartIcon.addEventListener('click',()=>{
            cart.classList.add('active');
        })
        cartclose.addEventListener('click',()=>{
            cart.classList.remove('active');
        })
}


/* || BTN Cart || */

if(cartContent.classList.contains('cart-content')){
    addCartButtons.addEventListener('click',()=>{

        for(let i = 0 ; i < dataPRD.length ; i++){
            if(dataPRD[i].title === title.textContent){
                toast('Info','This item is already in the cart.')
                return;
            };
        };
    

        let newitem = {
            image : img.src,
            title : title.textContent,
            price : price.textContent,
            quantity : 1 
        };

        dataPRD.push(newitem);

        localStorage.setItem('cart',JSON.stringify(dataPRD));

        showdatacart();
        CoutItem();
        TotalPrice();

})};

/* || Item Cart || */

function showdatacart(){

    cartContent.innerHTML = "";
    
    for(let i = 0 ; i < dataPRD.length ; i++){

        let cartbox = document.createElement('div');
        cartbox.classList.add('cart-box');

        cartbox.dataset.index = i; 
        
        cartbox.innerHTML += `
            <img src="${dataPRD[i].image}" alt="Tshirt" class="cart-img">
            <div class="cart-detail">
                <h2 class="cart-product-title">${dataPRD[i].title}</h2>
                <span class="cart-price">${dataPRD[i].price}</span>
                <div class="cart-quantity">
                    <button id="decrement">-</button>
                    <span class="number">1</span>
                    <button id="increment">+</button>
                </div>
            </div>
            <i class='bx bx-x cart-remove'></i>
        `;
        cartContent.appendChild(cartbox);


        cartbox.querySelector('.cart-remove').addEventListener('click',()=>{
            let index = parseInt(cartbox.dataset.index);
            dataPRD.splice(index,1);
            localStorage.cart = JSON.stringify(dataPRD);
            cartbox.remove();
            showdatacart();
            CoutItem();
            TotalPrice();
        });


        cartbox.querySelector('.cart-quantity').addEventListener('click', event => {
            let NumberElement = cartbox.querySelector('.number');
            /* let decrementBtn = cartbox.querySelector('#decrement'); */
            let quantity = NumberElement.textContent;
    
            if(event.target.id === "decrement" && quantity > 1){
                quantity--;
                /* if(quantity === 1){
                    decrementBtn.style.color = "#999";
                } */
            }else if(event.target.id === "increment"){
                quantity++;
                /* decrementBtn.style.color = "#fefefe" */
            }
            NumberElement.textContent = quantity;
            TotalPrice();

            
        });
    }
    
    

}

showdatacart();

/* || Cout PRD || */

function CoutItem(){
    let CartCount = document.querySelector('.item-cart-count');
    if(cartContent.classList.contains('cart-content') || cartContent.classList.contains('about-cart-content') || cartContent.classList.contains('contact-cart-content')){
        if(dataPRD.length >= 1){
            CartCount.style.visibility = 'visible';
            CartCount.innerHTML = dataPRD.length;
        }else{
            CartCount.style.visibility = 'hidden';
        }

    }
    
}

CoutItem();

/* ||  Page Chekout || */

/* || Total Price || */

function TotalPrice(){
    
    let cartboxes = document.querySelectorAll('.cart-box');



    let total = 0;
    /* let totalchekout = 0; */


    for(let i = 0 ; i < cartboxes.length ; i++ ){
        let priceElement = cartboxes[i].querySelector('.cart-price');
        let quantityElement = cartboxes[i].querySelector('.number');
        let price = priceElement.textContent.replace("$","");
        let quantity = quantityElement.textContent;

        total += price * quantity;

        
    }

    let totalchekout =  total - (total * 0.02) ;


    TotalPriceElement.innerHTML = `$${total}`;
    totalchekoutelement.innerHTML = `$${totalchekout}`;

    coupon(totalchekout);

}

if(cartContent.classList.contains('checkout-cart-content')){
    TotalPrice();
}


/* || Coupon Code || */

function coupon(total){
    let codecoupon = document.querySelector('.enter-code');
    let btncoupon = document.getElementById('code-coupon')
    
    let couponbox = document.querySelector('.coupon-box');

    btncoupon.addEventListener('click',()=>{

        if(codecoupon.value === 'amine'){
            total = total- (total * 0.5);
            totalchekoutelement.innerHTML = `$${total}`;
            couponbox.style.display = 'none';
            
        }else{
            toast('Error',"Coupon code is incorrect.")
        }
    })
     
}

/* || BTN Place Order || */

if(cartContent.classList.contains('checkout-cart-content')){
    

    let btnplaceorder = document.getElementById('btn-Place-Order');
    let cartboxes = document.querySelectorAll('.cart-box');

    let LastName = document.getElementById('LastName');
    let labelLastName = document.querySelector('.LastName');

    let FirstName = document.getElementById('FirstName');
    let labelFirstName = document.querySelector('.FirstName');

    let StreetAddress = document.getElementById('StreetAddress');
    let labelStreetAddress = document.querySelector('.StreetAddress');

    let City = document.getElementById('City');
    let labelCity = document.querySelector('.City');

    let PhoneNumber = document.getElementById('PhoneNumber');
    let labelPhoneNumber = document.querySelector('.PhoneNumber');

    let EmailAddress = document.getElementById('EmailAddress');
    let labelEmailAddress = document.querySelector('.EmailAddress');
    
    

    btnplaceorder.addEventListener('click' , () =>{

        if (dataPRD.length <= 0) {
            toast('Info',"Your shopping cart is empty!")
            return;
        }

        /* || Control inputs || */

        function ControleInput(input,label){
            if(input.value.trim() === ""){
                toast('Error',"This field is required!");
                label.style.color = "red";
                return false;
            }else{
                label.style.color = "#010101";
                return true ;
            } 
        }

        if (!ControleInput(FirstName, labelFirstName) || !ControleInput(LastName, labelLastName) || !ControleInput(StreetAddress, labelStreetAddress) || !ControleInput(City, labelCity) || !ControleInput(PhoneNumber, labelPhoneNumber) || !ControleInput(EmailAddress, labelEmailAddress) ) {
            return; 
        }

        for(let i = 0 ; i < cartboxes.length ; i++ ){
            let image = cartboxes[i].querySelector('.cart-img').src;
            let title = cartboxes[i].querySelector('.cart-product-title').textContent;
            let qte = cartboxes[i].querySelector('.number').textContent;

            let neworder = {
                image : image,
                title : title,
                price : totalchekoutelement.textContent,
                quantity : qte
            }

            orders.push(neworder);
            
        }

        let newUserinfo = {
            FirstName : FirstName.value,
            LastName : LastName.value,
            StreetAddress : StreetAddress.value,
            City : City.value,
            PhoneNumber : PhoneNumber.value,
            EmailAddress : EmailAddress.value,
        }

        orders.push(newUserinfo);

        order.push(orders)
    
        localStorage.setItem('order',JSON.stringify(order));
        
        localStorage.removeItem('cart');

        cartContent.innerHTML = "";
        
        toast('Success','Order successful!')


        totalchekoutelement.innerHTML= "$0";
        TotalPriceElement.innerHTML = "$0";

        FirstName.value = "";
        LastName.value = "";
        StreetAddress.value = "";
        City.value = "";
        PhoneNumber.value = "";
        EmailAddress.value = "";

    });
}
/* || Contact Page || */

let BtnSendMessage = document.getElementById('sendMessage');

BtnSendMessage.addEventListener('click',(e)=>{
    e.preventDefault();

    let name = document.querySelector('.name');
    let email = document.querySelector('.email');
    let phone = document.querySelector('.phone');
    let MessageArea = document.querySelector('#message');

    /* function validateEmail(email) {
        // Simple regex for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    } */


        function ControleInput(input , type){

            if(type === "name" && input.value.trim() === ""){
                toast('Error',"This field is required!");
                input.classList.add('active');
                return false;
            }

            if(type === "email" && input.value.trim() === ""){
                toast('Error', "Invalid email address!");
                input.classList.add('active');
                return false ;
            } 

            if(type === "phone" && input.value.trim() === ""){
                toast('Error', "Invalid phone number!");
                input.classList.add('active');
                return false ;
            }


            input.classList.remove('active');
            return true ;
        }

        if (!ControleInput(name , "name") || !ControleInput(email, "email") || !ControleInput(phone , "phone")){
            return;
        }

        toast('Success', "Message sent successfully!");

        name.value = "";
        email.value = "";
        phone.value = "";
        MessageArea.value = "";
});



/* || Toast Message || */

function toast(type,text){
    let toast = document.querySelector('.toast');
    let icon = document.querySelector('.icon');
    let text1 = document.querySelector('.text-1');
    let text2 = document.querySelector('.text-2');
    let closeIcon = document.querySelector('.close');
    let progress = document.querySelector('.progress');

    if (!toast) return;

    toast.style.right = '10px';
    
    icon.classList.remove("bx", "bxs-error", "bxs-error-circle", "bxs-check-circle");
    progress.classList.remove('error', 'info', 'success');


    if(type === 'Error'){
        icon.classList.add("bx", "bxs-error")
        icon.style.color = 'red';
        text1.innerHTML = "Error";
        text2.innerHTML = text;
        progress.classList.add('error');
        toast.style.borderLeft = '3px solid red';
        
    }else if(type === 'Info'){
        icon.classList.add("bx", "bxs-error-circle")
        icon.style.color = 'blue'
        text1.innerHTML = "Info";
        text2.innerHTML = text;
        progress.classList.add('info');
        toast.style.border = 'blue';
        toast.style.borderLeft = '3px solid blue';
    
    }else{
        icon.classList.add("bx", "bxs-check-circle")
        icon.style.color = 'rgb(1, 187, 1)'
        text1.innerHTML = "Success";
        text2.innerHTML = text;
        progress.classList.add('success');
        toast.style.border = 'blue';
        toast.style.borderLeft = '3px solid rgb(1, 187, 1)';
    }

    setTimeout(()=>{
        toast.style.right = '-100%';
    },5000)


    setTimeout(()=>{
        progress.classList.remove('success','info','error');
    },5300)


    closeIcon.addEventListener('click',()=>{
        toast.style.right = '-100%';
        setTimeout(()=>{
            progress.classList.remove('success','info','error');
        },300)
    });
}



