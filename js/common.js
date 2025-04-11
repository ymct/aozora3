/**
 * すべての3Dページで共通して使用する関数
 */

// ウィンドウリサイズ時の処理
function handleResize(cameras, renderers) {
    window.addEventListener('resize', () => {
        // すべてのカメラとレンダラーを更新
        for (let i = 0; i < cameras.length; i++) {
            if (cameras[i] && renderers[i]) {
                cameras[i].aspect = window.innerWidth / window.innerHeight;
                cameras[i].updateProjectionMatrix();
                renderers[i].setSize(window.innerWidth, window.innerHeight);
            }
        }
    });
}

// アニメーションループ
function startAnimationLoop(animationFunctions) {
    function animate() {
        requestAnimationFrame(animate);
        
        // 各アニメーション関数を実行
        for (let i = 0; i < animationFunctions.length; i++) {
            if (typeof animationFunctions[i] === 'function') {
                animationFunctions[i]();
            }
        }
    }
    
    animate();
}

// モバイルデバイスの検出
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// パフォーマンス最適化のための設定
function optimizeForPerformance(renderer, isMobile) {
    if (isMobile) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    } else {
        renderer.setPixelRatio(window.devicePixelRatio);
    }
    
    // アンチエイリアスの設定
    renderer.antialias = !isMobile;
}

// 情報表示の切り替え
function setupInfoToggle() {
    const infoElement = document.querySelector('.work-info');
    if (!infoElement) return;
    
    // 情報表示のトグルボタン
    const toggleButton = document.createElement('div');
    toggleButton.className = 'info-toggle';
    toggleButton.innerHTML = '?';
    toggleButton.style.position = 'absolute';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.width = '30px';
    toggleButton.style.height = '30px';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    toggleButton.style.color = 'white';
    toggleButton.style.display = 'flex';
    toggleButton.style.justifyContent = 'center';
    toggleButton.style.alignItems = 'center';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '10';
    
    document.body.appendChild(toggleButton);
    
    let isVisible = true;
    toggleButton.addEventListener('click', () => {
        isVisible = !isVisible;
        infoElement.style.display = isVisible ? 'block' : 'none';
    });
}