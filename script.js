// 1. 資料來源：你的 9 張圖片，請確保檔名正確
// 這裡的標題和描述我先留空，因為你的圖片上已經有文字了
const bannerData = [
    { image: "image.jpg", title: "", desc: "" },
    { image: "image2.jpg", title: "", desc: "" },
    { image: "image3.jpg", title: "", desc: "" },
    { image: "image4.jpg", title: "", desc: "" },
    { image: "image5.jpg", title: "", desc: "" },
    { image: "image6.jpg", title: "", desc: "" },
    { image: "image7.png", title: "", desc: "" }, // 注意副檔名是 png
    { image: "image8.jpg", title: "", desc: "" },
    { image: "image9.jpg", title: "", desc: "" }
];

const track = document.getElementById('carousel-track');
const indicatorsContainer = document.getElementById('carousel-indicators');
const prevButton = document.getElementById('banner-prev');
const nextButton = document.getElementById('banner-next');

let currentSlide = 0;
let slideInterval;

// 2. 初始化
function initCarousel() {
    bannerData.forEach((slide, index) => {
        // 建立圖片區塊
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('carousel-slide');
        
        // 只有當有標題或描述時才產生文字區塊的 HTML
        let contentHtml = '';
        if (slide.title || slide.desc) {
            contentHtml = `
                <div class="slide-content">
                    ${slide.title ? `<h2>${slide.title}</h2>` : ''}
                    ${slide.desc ? `<p>${slide.desc}</p>` : ''}
                </div>
            `;
        }
        
        slideDiv.innerHTML = `
            <img src="${slide.image}" alt="Banner ${index + 1}">
            ${contentHtml}
        `;
        track.appendChild(slideDiv);

        // 建立圓點
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    startAutoPlay();
}

// 3. 切換邏輯 (確保是順序播放)
function goToSlide(index) {
    currentSlide = index;
    // 確保 index 在有效範圍內，實現循環播放
    if (currentSlide < 0) currentSlide = bannerData.length - 1;
    if (currentSlide >= bannerData.length) currentSlide = 0;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    const dots = document.querySelectorAll('.indicator');
    dots.forEach(d => d.classList.remove('active'));
    dots[currentSlide].classList.add('active');

    resetTimer();
}

function nextSlide() {
    // 順序播放：當前索引 + 1
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    // 順序播放：當前索引 - 1
    goToSlide(currentSlide - 1);
}

// 4. 自動播放與暫停
function startAutoPlay() {
    // 每 3 秒切換到下一張，確保是順序的
    slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

function resetTimer() {
    stopAutoPlay();
    startAutoPlay();
}

// 事件綁定
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

const container = document.querySelector('.carousel-container');
container.addEventListener('mouseenter', stopAutoPlay);
container.addEventListener('mouseleave', startAutoPlay);

// 啟動
initCarousel();