console.log('%cCopyright © 2024 chenyue.art', 'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');







document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // 阻止默认的上下文菜单行为
});










function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

function wx(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");



}


function left() {
    toggleClass(".left-main", "left-main-open");
    toggleClass(".left", "left-open");

}


document.addEventListener('DOMContentLoaded', function () {

    // 随机显示两条文本的函数
    const randomTexts = ["博主 26年02月07日 在线", "别戳我啦"];
    const textElement = document.getElementById("randomText");
    let lastUpdateTime = 0;
    const throttleDelay = 1000; // 1秒内最多更新一次
    
    function updateRandomText() {
        const now = Date.now();
        if (now - lastUpdateTime > throttleDelay) {
            const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
            if (textElement) {
                textElement.title = randomText;
            }
            lastUpdateTime = now;
        }
    }
    
    // 初始化显示
    updateRandomText();
    
    // 鼠标悬停时随机更新
    if (textElement) {
        textElement.addEventListener('mouseenter', updateRandomText);
        textElement.addEventListener('mousemove', updateRandomText);
    }

    var themeState = getCookie("themeState") || "Blue";
    const htmlTag = document.querySelector('html');
    var svgItems = document.getElementsByTagName("svg");
    var tanChiShe = document.getElementById("tanChiShe");




    function changeSvg(color) {
        for (var i = 0; i < svgItems.length; i++) {
            var paths = svgItems[i].getElementsByTagName("path");
            for (var j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", color);
            }
        }
    }



    function changeTheme(theme) {
        if (theme == "Dark") {
            themeState = "Dark";
            changeSvg("#ffffff");
            tanChiShe.src = "./static/svg/snake-Dark.svg";
            htmlTag.dataset.theme = 'dack';
        } else if (theme == "Blue") {
            themeState = "Blue";
            changeSvg("#000000");
            tanChiShe.src = "./static/svg/snake-Light.svg";
            htmlTag.dataset.theme = '';
        }
        setCookie("themeState", theme, 365);
    }



    const switchCheckbox = document.getElementById('myonoffswitch');
    /*夜间自动打开暗色主题*/
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 20 || currentHour < 6) {
        switchCheckbox.checked = false;
        changeTheme('Dark');
    }


    switchCheckbox.addEventListener('change', function () {
        if (themeState == "Dark") {

            changeTheme("Blue");

        } else if (themeState == "Blue") {

            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        switchCheckbox.checked = false;
    }
    changeTheme(themeState);




    /*淡入效果*/
    var projectItems = document.querySelectorAll(".projectItem");
    function checkProjectItems() {
        for (var i = 0; i < projectItems.length; i++) {
            var projectItem = projectItems[i];
            var projectItemTop = projectItem.getBoundingClientRect().top;

            if (projectItemTop < window.innerHeight * 1.2) {
                projectItem.classList.add("fade-in-visible");
            }
        }
        
        var mcServerCard = document.querySelector(".mcServerCard iframe");
        if (mcServerCard) {
            var mcCardTop = mcServerCard.getBoundingClientRect().top;
            if (mcCardTop < window.innerHeight * 1.2) {
                mcServerCard.classList.add("fade-in-visible");
            }
        }
    }

    window.addEventListener("scroll", checkProjectItems);
    window.addEventListener("resize", checkProjectItems);



    /*加载效果*/
    var pageLoading = document.querySelector("#PageLoading");
    var center = document.getElementById("PageLoading-尘钥ChenYue-center");
    setTimeout(function () {
        checkProjectItems();
        pageLoading.style.opacity = '0';
        center.style.height = "500px";
        center.style.width = "500px";
        center.style.opacity = "0";
        pageLoading.style.backgroundSize = "200%";
     }, 300);

    // ===== 搜索框功能（确保版）=====
    (function() {
        // 获取元素
        const customSelect = document.querySelector('.custom-select');
        const trigger = document.querySelector('.select-trigger');
        const options = document.querySelectorAll('.option');
        const triggerIcon = document.getElementById('triggerIcon');
        const input = document.getElementById('searchInput');
        const btn = document.getElementById('searchBtn');
        
        console.log('搜索框初始化:', {customSelect, trigger, options: options.length, input, btn});

        // 获取当前选中的搜索引擎URL（实时查询）
        function getCurrentUrl() {
            const active = document.querySelector('.custom-select .option.active');
            if (!active) {
                console.warn('没有找到 active 选项，使用默认必应');
                return 'https://www.bing.com/search?q=';
            }
            // 使用 dataset 获取（最可靠）
            const url = active.dataset.value;
            console.log('获取到URL:', url);
            return url || 'https://www.bing.com/search?q=';
        }

        // 下拉菜单开关
        if (trigger && customSelect) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                customSelect.classList.toggle('active');
                console.log('下拉菜单状态:', customSelect.classList.contains('active'));
            });
        }

        // 选项点击
        options.forEach(function(opt) {
            opt.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 切换 active 类
                options.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // 更新顶部图标
                if (triggerIcon) {
                    triggerIcon.innerHTML = this.querySelector('.option-icon').innerHTML;
                }
                
                // 关闭下拉
                customSelect.classList.remove('active');
                
                console.log('切换到:', this.dataset.value);
            });
        });

        // 点击外部关闭
        document.addEventListener('click', function(e) {
            if (customSelect && !customSelect.contains(e.target)) {
                customSelect.classList.remove('active');
            }
        });

        // 执行搜索
        function search() {
            if (!input) {
                console.error('找不到输入框');
                return;
            }
            
            const query = input.value.trim();
            if (!query) {
                console.log('输入为空');
                return;
            }
            
            const url = getCurrentUrl();
            if (!url || url === 'undefined') {
                console.error('URL 无效:', url);
                alert('搜索引擎选择错误，请重新选择');
                return;
            }
            
            const fullUrl = url + encodeURIComponent(query);
            console.log('跳转:', fullUrl);
            
            window.open(fullUrl, '_blank');
            input.value = '';
        }

        // 绑定事件
        if (btn) {
            btn.addEventListener('click', search);
            console.log('搜索按钮已绑定');
        }
        
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    search();
                }
            });
            console.log('输入框已绑定');
        }
        
        // 初始化：确保有一个 active
        if (options.length > 0 && !document.querySelector('.option.active')) {
            options[1].classList.add('active'); // 默认必应（第二个）
            console.log('初始化默认选择必应');
        }
    })();

            // ===== 域名安全提示 =====
            (function initDomainTip() {
                if (getCookie('noDomainTip') === 'true') return;
                
                const host = window.location.host;
                const tipEl = document.getElementById('domainTip');
                const currentUrlEl = document.getElementById('currentUrl');
                const officialLineEl = document.getElementById('officialLine');
                
                currentUrlEl.textContent = window.location.href;
                
                // 判断是否官方域名
                const officialDomains = ['chenyue.top', 'chenyue.art:957', 'chenyue957.github.io'];
                const isOfficial = officialDomains.some(d => host.includes(d));
                
                if (!isOfficial) {
                    // 非官方域名：显示推荐地址
                    officialLineEl.innerHTML = '推荐访问：<span id="officialUrl" style="color: #16a34a;">https://chenyue.top</span>';
                }
                
                setTimeout(() => {
                    tipEl.classList.add('show');
                }, 500);
            })();

        function closeDomainTip() {
            document.getElementById('domainTip').classList.remove('show');
        }

        function setNoTip() {
            setCookie('noDomainTip', 'true', 30);
            closeDomainTip();
        }
});


// 动态设置博客链接
(function() {
    const blogLink = document.getElementById('blogLink');
    if (!blogLink) {
        console.warn('blogLink 元素未找到');
        return;
    }

    const host = window.location.host;
    const pathname = window.location.pathname;

    let blogUrl = 'https://blog.chenyue.top'; // 默认

    if (host.includes('chenyue.top')) {
        blogUrl = 'https://blog.chenyue.top';
    } else if (host.includes('chenyue.art:957')) {
        blogUrl = 'https://blog.chenyue.art:958';
    } else if (host.includes('github.io') && pathname.includes('/home/')) {
        blogUrl = 'https://chenyue957.github.io/blog/';
    }

    blogLink.href = blogUrl;        
})();

// 动态设置个人主页跳转
(function() {
    const homeLink = document.getElementById('homeLink');
    if (!homeLink) {
        console.warn('homeLink 元素未找到');
        return;
    }

    const host = window.location.host;
    const pathname = window.location.pathname;

    let homeUrl = '/'; // 默认回到当前站点根

    // 如果不在列表中，跳转到 chenyue.top
    if (!host.includes('chenyue.top') && !host.includes('chenyue.art:957') && !(host.includes('github.io') && pathname.includes('/home/'))) {
        homeUrl = 'https://chenyue.top';
    }

    homeLink.href = homeUrl;
})();