console.log('%c2026 chenyue.top  chenyue.top', 'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
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
    const randomTexts = ["博主 26年02月19日 在线", "别戳我啦"];
    const textElement = document.getElementById("randomText");
    let lastUpdateTime = 0;
    const throttleDelay = 1000;
    
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
        requestAnimationFrame(() => {
        checkProjectItems();
        pageLoading.style.opacity = '0';
        
        // 拆分到下一帧
        requestAnimationFrame(() => {
            center.style.height = "500px";
            center.style.width = "500px";
            center.style.opacity = "0";
            pageLoading.style.backgroundSize = "200%";
        });
    });
    //搜索框功能
    (function() {
        // 获取元素
        const customSelect = document.querySelector('.custom-select');
        const trigger = document.querySelector('.select-trigger');
        const options = document.querySelectorAll('.option');
        const triggerIcon = document.getElementById('triggerIcon');
        const input = document.getElementById('searchInput');
        const btn = document.getElementById('searchBtn');
        
        // 获取当前选中的搜索引擎URL（实时查询）
        function getCurrentUrl() {
            const active = document.querySelector('.custom-select .option.active');
            if (!active) {
                console.warn('没有找到 active 选项，使用默认必应');
                return 'https://www.bing.com/search?q=';
            }
            // 使用 dataset 获取（最可靠）
            const url = active.dataset.value;
            return url || 'https://www.bing.com/search?q=';
        }

        // 下拉菜单开关
        if (trigger && customSelect) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                customSelect.classList.toggle('active');
            });
        }

        // 选项点击
        options.forEach(function(opt) {
            opt.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // 切换 active 类
                options.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // 更新顶部图标 - 获取当前选中的img src
                if (triggerIcon) {
                    const iconImg = this.querySelector('.option-icon img');
                    if (iconImg) {
                        triggerIcon.innerHTML = `<img src="${iconImg.src}" width="16" height="16" style="border-radius: 2px; display: block;">`;
                    }
                }
                
                // 关闭下拉
                customSelect.classList.remove('active');
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
                return;
            }
            
            const url = getCurrentUrl();
            if (!url || url === 'undefined') {
                console.error('URL 无效:', url);
                alert('搜索引擎选择错误，请重新选择');
                return;
            }
            
            const fullUrl = url + encodeURIComponent(query);
            window.open(fullUrl, '_blank');
            input.value = '';
        }

        // 绑定事件
        if (btn) {
            btn.addEventListener('click', search);
        }
        
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    search();
                }
            });
        }
        
        // 初始化：确保有一个 active
        if (options.length > 0 && !document.querySelector('.option.active')) {
            options[1].classList.add('active'); // 默认必应（第二个）
        }

        // 初始化域名提示
        initDomainTip();

    })();

});

// 全局弹窗函数
function showWx(imageURL) {
    const tc = document.querySelector('.tc');
    const tcMain = document.querySelector('.tc-main');
    const tcImg = document.querySelector('.tc-img');
    
    if (tcImg) tcImg.src = imageURL;
    if (tc) tc.classList.add('active');
    if (tcMain) tcMain.classList.add('active');
    
    // 延迟绑定点击事件，避免立即触发
    setTimeout(() => {
        document.addEventListener('click', closeWxOutside);
    }, 300); // 等动画完成后再绑定
}

function closeWxOutside(e) {
    const tc = document.querySelector('.tc');
    const tcMain = document.querySelector('.tc-main');
    
    // 点击背景遮罩关闭
    if (e.target === tc) {
        wx();
    }
}

// 统一关闭函数
function closeWx() {
    const tc = document.querySelector('.tc');
    const tcMain = document.querySelector('.tc-main');
    
    if (tc) tc.classList.remove('active');
    if (tcMain) tcMain.classList.remove('active');
    
    // 移除事件监听
    document.removeEventListener('click', closeWxOutside);
}

function wx() {
    const tc = document.querySelector('.tc');
    const tcMain = document.querySelector('.tc-main');
    
    if (tc) tc.classList.remove('active');
    if (tcMain) tcMain.classList.remove('active');
    
    // 立即移除监听
    document.removeEventListener('click', closeWxOutside);
}

//邮箱点击复制
function copyMail(element) {
    const text = 'xjr957@gmail.com';
    
    // 复制
    navigator.clipboard.writeText(text).catch(() => {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    });
    
    // 获取图标和文字
    const icon = element.querySelector('.mail-icon');
    const textEl = element.querySelector('.mail-text');
    const originalText = textEl.textContent;
    
    // 隐藏图标，改文字为已复制
    if (icon) icon.style.display = 'none';
    if (textEl) textEl.textContent = '已复制';
    element.classList.add('copied');
    
    // 0.5秒后恢复
    setTimeout(() => {
        if (icon) icon.style.display = 'block';
        if (textEl) textEl.textContent = originalText;
        element.classList.remove('copied');
    }, 500);
}

//域名安全提示 - 全局函数
function closeDomainTip() {
    var tipEl = document.getElementById('domainTip');
    if (!tipEl) {
        return;
    }
    
    tipEl.classList.remove('show');
    
    setTimeout(function() {
        tipEl.style.display = 'none';
    }, 300);
}

function setNoTip() {
    setCookie('noDomainTip', 'true', 30);
    closeDomainTip();
}

// 初始化函数
function initDomainTip() {
    if (getCookie('noDomainTip') === 'true') {
        return;
    }
    
    var host = window.location.host;
    var tipEl = document.getElementById('domainTip');
    var currentUrlEl = document.getElementById('currentUrl');
    var officialLineEl = document.getElementById('officialLine');
    var noMoreBtn = document.querySelector('.btn-nomore');
    
    if (!tipEl || !currentUrlEl || !officialLineEl) {
        return;
    }
    
    currentUrlEl.textContent = window.location.href;
    
    var officialDomains = ['chenyue.top', 'chenyue.art:957', 'chenyue957.github.io'];
    var isOfficial = officialDomains.some(function(d) {
        return host.indexOf(d) !== -1;
    });
    
    if (isOfficial) {
        officialLineEl.innerHTML = '当前访问：<span id="officialUrl">安全域名</span>';
        if (noMoreBtn) noMoreBtn.classList.add('highlight');
    } else {
        officialLineEl.innerHTML = '推荐访问：<span id="officialUrl">https://chenyue.top</span>';
        if (noMoreBtn) noMoreBtn.classList.remove('highlight');
    }
    
    setTimeout(function() {
        tipEl.classList.add('show');
    }, 500);
}

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

// 显示域名选择器（清空记录并重新显示）
function showDomainSelector() {
    // 清空不再提示记录
    setCookie('noDomainTip', 'false', -1);
    
    // 重置弹窗显示
    var tipEl = document.getElementById('domainTip');
    if (tipEl) {
        tipEl.style.display = 'block';
        // 强制重绘
        tipEl.offsetHeight;
        tipEl.classList.add('show');
    }
}

// MC 服务器状态检测
let allPlayers = [];
let currentServer = 'ipv6'; // 'ipv6' 或 'frp'

// 检测 IPv6 地址（带超时，不阻塞）
async function checkIPv6() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000); // 4秒超时
        
        const res = await fetch('https://api.mcstatus.io/v2/status/java/mcv6.chenyue.art', {
            signal: controller.signal
        });
        clearTimeout(timeout);
        
        const data = await res.json();
        if (data.online) {
            return { success: true, data, type: 'ipv6' };
        }
        throw new Error('IPv6 offline');
    } catch (e) {
        return { success: false, error: e };
    }
}

// 检测内网穿透地址（带超时）
async function checkFRP() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        
        const res = await fetch('https://api.mcstatus.io/v2/status/java/mc.chenyue.art', {
            signal: controller.signal
        });
        clearTimeout(timeout);
        
        const data = await res.json();
        if (data.online) {
            return { success: true, data, type: 'frp' };
        }
        throw new Error('FRP offline');
    } catch (e) {
        return { success: false, error: e };
    }
}

// 主检测函数（并行检测，哪个成功用哪个）
async function checkMCStatus() {
    const statusCard = document.getElementById('mcStatus');
    const serverIcon = document.getElementById('mcServerIcon');
    const dotV6 = document.getElementById('dotV6');
    const dotV4 = document.getElementById('dotV4');
    
    if (!statusCard) return;
    
    const h1 = statusCard.querySelector('h1');
    const ping = statusCard.querySelector('.mcPing');
    const playerList = document.getElementById('playerList');
    
    // 初始状态：都显示检测中
    if (dotV6) dotV6.className = 'mcStatusDot checking';
    if (dotV4) dotV4.className = 'mcStatusDot checking';
    h1.textContent = '检测中...';
    ping.textContent = '查询服务器状态...';
    
    // 并行检测两个地址（同时发起，不互相阻塞）
    const [v6Result, frpResult] = await Promise.all([
        checkIPv6(),
        checkFRP()
    ]);
    //console.log('IPv6结果:', v6Result);
    //console.log('FRP结果:', frpResult);
    
    // 优先用 IPv6 的数据（如果在线）
    if (v6Result.success) {
        currentServer = 'ipv6';
        updateStatus(v6Result.data, 'IPv6');
        if (dotV6) {
            dotV6.classList.remove('checking');
            dotV6.classList.add('online');
        }
        if (dotV4) {
            dotV4.classList.remove('checking');
            dotV4.classList.add(frpResult.success ? 'online' : 'offline');
        }
        
        if (v6Result.data.icon && serverIcon) {
            serverIcon.src = v6Result.data.icon;
        }
    } 
    // IPv6 失败但 FRP 成功
    else if (frpResult.success) {
        currentServer = 'frp';
        updateStatus(frpResult.data, '穿透');
        if (dotV6) {
            dotV6.classList.remove('checking');
            dotV6.classList.add('offline');
        }
        if (dotV4) {
            dotV4.classList.remove('checking');
            dotV4.classList.add('online');
        }
        
        if (frpResult.data.icon && serverIcon) {
            serverIcon.src = frpResult.data.icon;
        }
    } 
    // 都失败
    else {
        currentServer = null;
        updateOffline();
        if (dotV6) {
            dotV6.classList.remove('checking');
            dotV6.classList.add('offline');
        }
        if (dotV4) {
            dotV4.classList.remove('checking');
            dotV4.classList.add('offline');
        }
    }
}

function updateStatus(data, type) {
    const statusCard = document.getElementById('mcStatus');
    const h1 = statusCard.querySelector('h1');
    const ping = statusCard.querySelector('.mcPing');
    const playerList = document.getElementById('playerList');
    
    statusCard.classList.add('online');
    statusCard.classList.remove('offline');
    h1.textContent = '服务器在线';
    ping.textContent = `${type} | ${data.ping}ms | ${data.players.online}/${data.players.max}人`;
    
    allPlayers = data.players.list || [];
    renderPlayerList(playerList, allPlayers);
}

function updateOffline() {
    const statusCard = document.getElementById('mcStatus');
    const h1 = statusCard.querySelector('h1');
    const ping = statusCard.querySelector('.mcPing');
    const playerList = document.getElementById('playerList');
    
    statusCard.classList.add('offline');
    statusCard.classList.remove('online');
    h1.textContent = '服务器离线';
    ping.textContent = 'IPv6 和穿透均不可用';
    playerList.innerHTML = '<span class="mcPlayerTag empty">暂无玩家</span>';
    allPlayers = [];
}

// 渲染玩家列表（显示前3个）
function renderPlayerList(container, players) {
    if (!players || players.length === 0) {
        container.innerHTML = '<span class="mcPlayerTag empty">暂无玩家</span>';
        return;
    }
    
    let html = '';
    const showCount = Math.min(3, players.length);
    
    for (let i = 0; i < showCount; i++) {
        html += `<span class="mcPlayerTag">${escapeHtml(players[i].name_clean)}</span>`;
    }
    
    if (players.length > 3) {
        html += `<span class="mcPlayerTag more">+${players.length - 3}人</span>`;
    }
    
    container.innerHTML = html;
    container.onclick = () => openPlayerModal(players);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 打开玩家列表弹窗
function openPlayerModal(players) {
    const modal = document.getElementById('playerModal');
    const list = document.getElementById('modalPlayerList');
    const count = document.getElementById('playerCount');
    
    if (!modal || !list || !count) return;
    
    count.textContent = players.length;
    list.innerHTML = players.map(p => 
        `<span class="mcModalPlayerTag">${escapeHtml(p.name_clean)}</span>`
    ).join('');
    
    modal.classList.add('active');
}

// 关闭玩家列表弹窗
function closePlayerModal() {
    const modal = document.getElementById('playerModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 点击弹窗外部关闭
document.addEventListener('click', (e) => {
    const modal = document.getElementById('playerModal');
    if (e.target === modal) {
        closePlayerModal();
    }
});

// 复制 IP（在对应位置显示反馈）
function copyIp(text, tipId) {
    navigator.clipboard.writeText(text).then(() => {
        const tip = document.getElementById(tipId);
        if (tip) {
            tip.textContent = '已复制';
            tip.classList.add('show');
            
            setTimeout(() => {
                tip.classList.remove('show');
            }, 1500);
        }
    }).catch(() => {
        // 降级方案
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        
        const tip = document.getElementById(tipId);
        if (tip) {
            tip.textContent = '已复制';
            tip.classList.add('show');
            setTimeout(() => tip.classList.remove('show'), 1500);
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    checkMCStatus();
    setInterval(checkMCStatus, 30000);
});