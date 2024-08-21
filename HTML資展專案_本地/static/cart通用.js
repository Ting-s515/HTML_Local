// 在 DOMContentLoaded 事件處理程序中，
// 使用 JSON.parse(localStorage.getItem('cart')) || [] 加載保存的購物清單。
document.addEventListener('DOMContentLoaded', function () {
    const cartPopup = document.getElementById('cart-popup');//購物清單
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    // 包含手機版和桌面版的圖示
    const cartIcons = document.querySelectorAll('.shoppingcart-icon, .sm-shoppingcart-icon'); 
    // 使用 class選擇器更新數量icon
    const cartCountElements = document.querySelectorAll('.cart-count'); 
    const clearCartButton = document.getElementById('clear-cart');//清除購物車
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
//localStorage: Web API 中的一部分，用來存儲網站的本機數據，數據在關閉瀏覽器後仍然存在。
//JSON.parse(): 將 JSON 字符串轉換為 JavaScript     
// /如果 localStorage.getItem('cart') 返回 null，JSON.parse()將不會被執行，直接使用 []空陣列來初始化 cart。
    
// icon點擊切換顯示購物車彈出視窗
     //cartIcons是元素的集合 forEach遍歷每個元素icon，對每個元素都執行function
     cartIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
//event.preventDefault() 是用來阻止默認事件的發生。
//可以防止點擊圖標後的默認行為（例如，防止連結跳轉）。
            event.preventDefault();
            cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
        });//判斷是否為display:block ?'true' : 'false' 關閉or打開
    });

    // 關閉購物清單彈出視窗
    document.getElementById('close-cart-popup').addEventListener('click', function() {
        cartPopup.style.display = 'none';
    });

     // 清除購物車
     //檢查元素是否存在 true 
     if (clearCartButton) {
        clearCartButton.addEventListener('click', function() {
            cart = []; // 清空購物車陣列
            //removeItem 是 localStorage 的內建方法
            localStorage.removeItem('cart'); // 從 localStorage 中移除購物車
            updateCart(); // 更新購物車
        });
    }

    // 添加商品到購物車 add-to-cart 遍歷每個button
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            const productName = card.querySelector('.card-title').textContent;
            const productPrice = parseInt(card.querySelector('.card-text strong').textContent.replace('NT$', '').trim());
            addToCart(productName, productPrice);//呼叫方法
        });
    });
    
    // 使用 localStorage.setItem('cart', JSON.stringify(cart)) 將購物清單保存到 localStorage。
    function addToCart(name, price) {
        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart)); 
        // 保存到 localStorage 是api的一種
        //將名為 'cart' 的鍵設置為 JSON.stringify(cart) 返回的字符串值，
        //並將這個鍵值對存儲到 localStorage 中。
        updateCart();
    }
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-popup-item';
            div.innerHTML = `${item.name} - NT$ ${item.price}`;
            cartItems.appendChild(div);
            total += item.price;
        });
        cartTotal.textContent = total;
         // 更新所有購物車圖示的數量
         cartCountElements.forEach(element => {
            element.textContent = cart.length;
        });
    }

    // 更新頁面上的購物車數量
    updateCart();
});

