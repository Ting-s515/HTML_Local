// querySelectorAll 可以用來選擇具有指定類別名稱的所有元素。
// 可以透過 CSS 選擇器選擇元素，包括類別名稱、ID、標籤名稱等。
// // 它傳回一個 NodeList，可以用來遍歷和操作多個元素。
// JavaScript 文件包含代码，这些代码需要在 DOM 元素加载后执行，
// 使用 DOMContentLoaded 事件来确保在 DOM 完全加载后执行你的脚本。
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.search_Form').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            let searchInput = document.querySelector('.search_Input').value.trim();
            if (searchInput === '') {
                event.preventDefault(); // 阻止提交
                alert('請輸入搜尋關鍵字');
            }
        });
    });
});