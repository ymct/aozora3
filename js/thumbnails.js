/**
 * サムネイル画像をCanvasで描画するスクリプト
 */
document.addEventListener('DOMContentLoaded', function() {
    // 人間失格のサムネイル
    createThumbnail('thumbnail-ningen', function(ctx, width, height) {
        // 背景
        ctx.fillStyle = '#080808';
        ctx.fillRect(0, 0, width, height);
        
        // 黒い球体（内面）
        ctx.beginPath();
        ctx.arc(width/2, height/2, 50, 0, Math.PI * 2);
        ctx.fillStyle = '#101010';
        ctx.fill();
        ctx.strokeStyle = '#202040';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 白い仮面
        ctx.beginPath();
        ctx.arc(width/2 - 30, height/2 - 20, 25, 0, Math.PI);
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 赤い線（恥の記憶）
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const startLen = 50;
            const endLen = 70 + Math.random() * 30;
            
            ctx.beginPath();
            ctx.moveTo(
                width/2 + Math.cos(angle) * startLen,
                height/2 + Math.sin(angle) * startLen
            );
            ctx.lineTo(
                width/2 + Math.cos(angle) * endLen,
                height/2 + Math.sin(angle) * endLen
            );
            ctx.strokeStyle = 'rgba(255, 60, 60, 0.6)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
    
    // つゆのあとさきのサムネイル
    createThumbnail('thumbnail-tsuyu', function(ctx, width, height) {
        // 夜の背景
        ctx.fillStyle = '#101316';
        ctx.fillRect(0, 0, width, height);
        
        // 地面（濡れた道）
        ctx.fillStyle = '#102030';
        ctx.fillRect(0, height * 0.7, width, height * 0.3);
        
        // 雨
        ctx.strokeStyle = 'rgba(160, 176, 192, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height * 0.7;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 1, y + 10);
            ctx.stroke();
        }
        
        // 和傘
        ctx.beginPath();
        ctx.arc(width/2 - 40, height * 0.6, 30, 0, Math.PI);
        ctx.fillStyle = '#604030';
        ctx.fill();
        ctx.strokeStyle = '#705040';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 行燈
        ctx.beginPath();
        ctx.arc(width/2 + 60, height * 0.4, 15, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 220, 160, 0.6)';
        ctx.fill();
        
        // 家のシルエット
        ctx.fillStyle = '#050505';
        ctx.fillRect(width * 0.7, height * 0.5, 40, 50);
        ctx.beginPath();
        ctx.moveTo(width * 0.7, height * 0.5);
        ctx.lineTo(width * 0.7 + 20, height * 0.4);
        ctx.lineTo(width * 0.7 + 40, height * 0.5);
        ctx.closePath();
        ctx.fill();
    });
    
    // 万延元年のフットボールのサムネイル
    createThumbnail('thumbnail-football', function(ctx, width, height) {
        // 背景
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, width, height);
        
        // 谷間を表現
        const gradient = ctx.createLinearGradient(0, height * 0.6, 0, height);
        gradient.addColorStop(0, '#304020');
        gradient.addColorStop(1, '#203010');
        ctx.fillStyle = gradient;
        
        ctx.beginPath();
        ctx.moveTo(0, height * 0.7);
        ctx.quadraticCurveTo(width * 0.5, height * 0.9, width, height * 0.7);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
        
        // 中心の鉄球
        ctx.beginPath();
        ctx.arc(width/2, height/2 + 20, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#808090';
        ctx.fill();
        ctx.strokeStyle = '#909090';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // フットボール
        ctx.beginPath();
        ctx.arc(width/2, height/3, 15, 0, Math.PI * 2);
        ctx.fillStyle = '#d0d0d0';
        ctx.fill();
        
        // 赤い線
        ctx.beginPath();
        ctx.moveTo(width/2, height/2 + 20);
        ctx.lineTo(width/2, height/3);
        ctx.strokeStyle = '#ff3030';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 第二の太陽
        ctx.beginPath();
        ctx.arc(width * 0.8, height * 0.2, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 204, 48, 0.7)';
        ctx.fill();
    });
});

/**
 * サムネイル画像をCanvas要素で描画する共通関数
 * @param {string} id - サムネイル要素のID
 * @param {Function} drawFunction - キャンバスに描画する関数
 */
function createThumbnail(id, drawFunction) {
    const thumbnail = document.getElementById(id);
    if (!thumbnail) return;
    
    const canvas = document.createElement('canvas');
    const width = 300;
    const height = 200;
    
    // 高解像度ディスプレイ対応
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    const ctx = canvas.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
    
    drawFunction(ctx, width, height);
    thumbnail.appendChild(canvas);
}