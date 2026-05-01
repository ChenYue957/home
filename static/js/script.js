/* ============================================================
   script.js — 尘钥ChenYue 个人主页脚本
   ============================================================ */


/* ===== 控制台彩蛋 ===== */

console.log('%c2026 chenyue.top  chenyue.art', 'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');


/* ===== 禁用右键菜单 ===== */

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});


/* ===== 通用工具函数 ===== */

/**
 * 切换指定元素的 class
 * @param {string} selector - CSS 选择器
 * @param {string} className - 要切换的类名
 */
function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

/**
 * 设置 Cookie
 * @param {string} name - Cookie 名称
 * @param {string} value - Cookie 值
 * @param {number} days - 过期天数
 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * 获取 Cookie
 * @param {string} name - Cookie 名称
 * @returns {string|null} Cookie 值
 */
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

/**
 * HTML 转义（防 XSS）
 * @param {string} text - 原始文本
 * @returns {string} 转义后的 HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


/* ===== DOMContentLoaded 主初始化 ===== */

document.addEventListener('DOMContentLoaded', function () {

    /* ----- 随机文字（头像 hover 提示） ----- */
    // 从时间线自动同步最后修改日期
    const firstLi = document.querySelector('#line li');
    let latestDate = "未知日期";
    if (firstLi) {
        const dateDiv = firstLi.querySelectorAll('div');
        if (dateDiv.length >= 2) {
            latestDate = dateDiv[1].textContent.trim();
        }
    }
    const randomTexts = ["博主 " + latestDate + " 在线", "别戳我啦"];
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


    /* ----- 主题切换（明/暗色） ----- */
    var themeState = getCookie("themeState") || "Blue";
    const htmlTag = document.querySelector('html');
    var svgItems = document.getElementsByTagName("svg");
    var tanChiShe = document.getElementById("tanChiShe");

    /**
     * 批量修改所有 SVG 填充色
     * @param {string} color - 目标颜色值
     */
    function changeSvg(color) {
        for (var i = 0; i < svgItems.length; i++) {
            var paths = svgItems[i].getElementsByTagName("path");
            for (var j = 0; j < paths.length; j++) {
                paths[j].setAttribute("fill", color);
            }
        }
    }

    /**
     * 切换主题
     * @param {string} theme - "Dark" 或 "Blue"
     */
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

    /* 夜间自动打开暗色主题（20:00 ~ 06:00） */
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 20 || currentHour < 6) {
        switchCheckbox.checked = false;
        changeTheme('Dark');
    }

    // 开关切换事件
    switchCheckbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Blue");
        } else if (themeState == "Blue") {
            changeTheme("Dark");
        }
    });

    // 恢复上次主题状态
    if (themeState == "Dark") {
        switchCheckbox.checked = false;
    }
    changeTheme(themeState);


    /* ----- 卡片淡入效果（滚动触发） ----- */
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


    /* ----- 页面加载动画 ----- */
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


    /* ----- 搜索框功能 ----- */
    (function() {
        const customSelect = document.querySelector('.custom-select');
        const trigger = document.querySelector('.select-trigger');
        const options = document.querySelectorAll('.option');
        const triggerIcon = document.getElementById('triggerIcon');
        const input = document.getElementById('searchInput');
        const btn = document.getElementById('searchBtn');
        
        /**
         * 获取当前选中的搜索引擎 URL（实时查询）
         * @returns {string} 搜索引擎 URL
         */
        function getCurrentUrl() {
            const active = document.querySelector('.custom-select .option.active');
            if (!active) {
                console.warn('没有找到 active 选项，使用默认必应');
                return 'https://www.bing.com/search?q=';
            }
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
                
                // 更新顶部图标
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

        // 点击外部关闭下拉
        document.addEventListener('click', function(e) {
            if (customSelect && !customSelect.contains(e.target)) {
                customSelect.classList.remove('active');
            }
        });

        /**
         * 执行搜索
         */
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

        // 绑定搜索事件
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
        
        // 初始化：确保有一个 active 选项（默认必应）
        if (options.length > 0 && !document.querySelector('.option.active')) {
            options[1].classList.add('active');
        }

        // 初始化域名提示
        initDomainTip();

    })();

    /* ----- 侧边栏遮罩点击关闭（移动端） ----- */
    const leftPanel = document.querySelector('.left');
    if (leftPanel) {
        leftPanel.addEventListener('click', function(e) {
            // 只在侧边栏打开时生效，且只点击遮罩背景（非 .left-main 内部）时关闭
            if (leftPanel.classList.contains('left-open') && !e.target.closest('.left-main')) {
                left();
            }
        });
    }

}); // DOMContentLoaded 结束


/* ===== 弹窗函数（微信/赞助图片弹窗） ===== */

/**
 * 显示微信/赞助图片弹窗
 * @param {string} imageURL - 图片路径
 */
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

/**
 * 点击弹窗外部关闭
 */
function closeWxOutside(e) {
    const tc = document.querySelector('.tc');
    
    // 点击背景遮罩关闭
    if (e.target === tc) {
        wx();
    }
}

/**
 * 关闭弹窗（统一关闭函数）
 */
function closeWx() {
    const tc = document.querySelector('.tc');
    const tcMain = document.querySelector('.tc-main');
    
    if (tc) tc.classList.remove('active');
    if (tcMain) tcMain.classList.remove('active');
    
    // 移除事件监听
    document.removeEventListener('click', closeWxOutside);
}

/**
 * 关闭弹窗（兼容旧调用）
 */
function wx() {
    const tc = document.querySelector('.tc');
    const tcMain = document.querySelector('.tc-main');
    
    if (tc) tc.classList.remove('active');
    if (tcMain) tcMain.classList.remove('active');
    
    // 立即移除监听
    document.removeEventListener('click', closeWxOutside);
}


/* ===== 侧边栏开关 ===== */

/**
 * 切换侧边栏显示/隐藏（移动端）
 */
function left() {
    toggleClass(".left-main", "left-main-open");
    toggleClass(".left", "left-open");
}


/* ===== 邮箱复制 ===== */

/**
 * 点击复制邮箱地址并显示反馈
 * @param {HTMLElement} element - 触发元素
 */
function copyMail(element) {
    const text = 'xjr957@gmail.com';
    
    // 复制到剪贴板
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


/* ===== 域名安全提示 ===== */

/**
 * 关闭域名安全提示
 */
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

/**
 * 设置"不再提示"（写入 Cookie）
 */
function setNoTip() {
    setCookie('noDomainTip', 'true', 30);
    closeDomainTip();
}

/**
 * 初始化域名安全提示
 * 判断当前域名是否为官方域名，决定提示样式
 */
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

/**
 * 显示域名选择器（清空"不再提示"记录并重新显示）
 */
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


/* ===== 多域名站点 URL 解析 ===== */

/**
 * 根据当前域名解析站点链接
 * @param {string} type - 链接类型：'blog' | 'intro' | 'home'
 * @returns {string} 对应域名下的完整 URL
 */
function resolveSiteUrl(type) {
    const host = window.location.host;
    const pathname = window.location.pathname;
    const isChenYueTop = host.includes('chenyue.top');
    const isChenYueArt957 = host.includes('chenyue.art:957');
    const isGithubHome = host.includes('github.io') && pathname.includes('/home/');

    switch (type) {
        case 'blog':
            if (isChenYueTop) return 'https://blog.chenyue.top';
            if (isChenYueArt957) return 'https://blog.chenyue.art:958';
            if (isGithubHome) return 'https://chenyue957.github.io/blog/';
            return 'https://blog.chenyue.top';
        case 'intro':
            if (isChenYueTop) return 'https://blog.chenyue.top/posts/你好我是尘钥chenyue/';
            if (isChenYueArt957) return 'https://blog.chenyue.art:958/posts/你好我是尘钥chenyue/';
            if (isGithubHome) return 'https://chenyue957.github.io/blog/posts/你好我是尘钥chenyue/';
            return 'https://blog.chenyue.top/posts/你好我是尘钥chenyue/';
        case 'home':
            if (isChenYueTop || isChenYueArt957 || isGithubHome) return '/';
            return 'https://chenyue.top';
        default:
            return 'https://chenyue.top';
    }
}

// 动态设置网站跳转链接
(function() {
    const blogLink = document.getElementById('blogLink');
    if (blogLink) {
        blogLink.href = resolveSiteUrl('blog');
    } else {
        console.warn('blogLink 元素未找到');
    }

    const homeLink = document.getElementById('homeLink');
    if (homeLink) {
        homeLink.href = resolveSiteUrl('intro');
    } else {
        console.warn('homeLink 元素未找到');
    }
})();


/* ===== MC 服务器状态检测 ===== */

let allPlayers = [];
let currentServer = 'frp'; // 默认使用穿透节点（IPv6 暂未开放）

/**
 * 通用 MC 状态查询（带超时）
 * @param {string} host - 服务器地址
 * @param {number} timeoutMs - 超时毫秒数
 * @returns {Promise<{success: boolean, data?: object, error?: Error}>}
 */
async function queryMCStatus(host, timeoutMs) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        
        const res = await fetch('https://api.mcstatus.io/v2/status/java/' + host, {
            signal: controller.signal
        });
        clearTimeout(timeout);
        
        const data = await res.json();
        return { success: !!(data && data.online), data };
    } catch (e) {
        return { success: false, error: e };
    }
}

/**
 * 主检测函数
 * 策略：FRP 优先（当前在线），IPv6 作为备用快速探测
 */
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
    
    // 先快速检测 FRP（主要通道，超时 5 秒）
    const frpResult = await queryMCStatus('mc.chenyue.art', 5000);
    
    if (frpResult.success) {
        // FRP 在线 → 直接使用，同时后台快速探测 IPv6
        currentServer = 'frp';
        updateStatus(frpResult.data, '穿透');
        if (dotV4) { dotV4.classList.remove('checking'); dotV4.classList.add('online'); }
        if (frpResult.data.icon && serverIcon) serverIcon.src = frpResult.data.icon;
        
        // 后台探测 IPv6（不阻塞主流程，2 秒超时）
        queryMCStatus('mcv6.chenyue.art', 2000).then(v6Result => {
            if (dotV6) {
                dotV6.classList.remove('checking');
                dotV6.classList.add(v6Result.success ? 'online' : 'offline');
            }
        });
        return;
    }
    
    // FRP 失败 → 尝试 IPv6（给更多时间，5 秒）
    const v6Result = await queryMCStatus('mcv6.chenyue.art', 5000);
    
    if (v6Result.success) {
        currentServer = 'ipv6';
        updateStatus(v6Result.data, 'IPv6');
        if (dotV6) { dotV6.classList.remove('checking'); dotV6.classList.add('online'); }
        if (dotV4) { dotV4.classList.remove('checking'); dotV4.classList.add('offline'); }
        if (v6Result.data.icon && serverIcon) serverIcon.src = v6Result.data.icon;
        return;
    }
    
    // 都失败
    currentServer = null;
    updateOffline();
    if (dotV6) { dotV6.classList.remove('checking'); dotV6.classList.add('offline'); }
    if (dotV4) { dotV4.classList.remove('checking'); dotV4.classList.add('offline'); }
}

/**
 * 更新状态卡片为在线
 * @param {object} data - API 返回的服务器数据
 * @param {string} type - 连接类型（IPv6 / 穿透）
 */
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

/**
 * 更新状态卡片为离线
 */
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

/**
 * 渲染玩家列表（显示前 3 个，超出显示 +N 人）
 * @param {HTMLElement} container - 列表容器
 * @param {Array} players - 玩家数组
 */
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


/* ===== MC 玩家列表弹窗 ===== */

/**
 * 打开玩家列表弹窗
 * @param {Array} players - 玩家数组
 */
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

/**
 * 关闭玩家列表弹窗
 */
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


/* ===== IP 地址复制 ===== */

/**
 * 复制 IP 地址并在对应位置显示反馈
 * @param {string} text - 要复制的文本
 * @param {string} tipId - 提示元素 ID
 */
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


/* ===== 页面加载完成后启动 MC 检测 ===== */

window.addEventListener('load', () => {
    var runMCCheck = function() {
        checkMCStatus();
        setInterval(checkMCStatus, 30000); // 每 30 秒刷新一次
    };
    
    // 优先使用 requestIdleCallback，不支持则回退到 setTimeout
    if ('requestIdleCallback' in window) {
        requestIdleCallback(runMCCheck, { timeout: 3000 });
    } else {
        setTimeout(runMCCheck, 200);
    }
});