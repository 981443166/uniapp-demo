(function() {
    'use strict';

    const state = {
        isLoading: true,
        currentMusic: null,
        isPlaying: false,
        isMuted: false,
        currentGalleryIndex: 0,
        galleryItems: [],
        musicPlaylist: [
            { id: 1, title: '百鬼夜行', artist: '迷雾染色体乐队', duration: '3:45', audioPath: 'music/迷雾染色体 - 百鬼夜行.mp3' }
        ],
        currentTrackIndex: -1
    };

    const elements = {};

    function initializeElements() {
        elements.loadingScreen = document.getElementById('loadingScreen');
        elements.mainNav = document.getElementById('mainNav');
        elements.hamburger = document.getElementById('hamburger');
        elements.navMenu = document.getElementById('navMenu');
        elements.musicToggleBtn = document.getElementById('musicToggleBtn');
        elements.floatingPlayer = document.getElementById('floatingPlayer');
        elements.audioPlayer = document.getElementById('audioPlayer');
        elements.playerPlay = document.getElementById('playerPlay');
        elements.playerPrev = document.getElementById('playerPrev');
        elements.playerNext = document.getElementById('playerNext');
        elements.playerProgressBar = document.getElementById('playerProgressBar');
        elements.playerProgressFill = document.getElementById('playerProgressFill');
        elements.playerCurrentTime = document.getElementById('playerCurrentTime');
        elements.playerTotalTime = document.getElementById('playerTotalTime');
        elements.playerVolume = document.getElementById('playerVolume');
        elements.playerTrackName = document.getElementById('playerTrackName');
        elements.playerTrackArtist = document.getElementById('playerTrackArtist');
        elements.playerArtwork = document.getElementById('playerArtwork');
        elements.volumeIcon = document.querySelector('.volume-icon');
        elements.heroParticles = document.getElementById('heroParticles');
        elements.galleryModal = document.getElementById('galleryModal');
        elements.modalClose = document.getElementById('modalClose');
        elements.modalPrev = document.getElementById('modalPrev');
        elements.modalNext = document.getElementById('modalNext');
        elements.modalImage = document.getElementById('modalImage');
        elements.modalCaption = document.getElementById('modalCaption');
        elements.modalDots = document.getElementById('modalDots');
        elements.notificationToast = document.getElementById('notificationToast');
        elements.notificationMessage = document.getElementById('notificationMessage');
        elements.dateFilter = document.getElementById('dateFilter');
        elements.locationFilter = document.getElementById('locationFilter');
        elements.contactForm = document.getElementById('contactForm');
        elements.notifyBtn = document.getElementById('notifyBtn');
    }

    function init() {
        initializeElements();
        initLoadingScreen();
        initNavigation();
        initParallax();
        initHeroParticles();
        initScrollAnimations();
        initCounterAnimation();
        initMusicTabs();
        initAudioPlayer();
        initShowFilters();
        initGallery();
        initContactForm();
        initLazyLoading();
        initKeyboardNavigation();
        initTouchGestures();
        window.addEventListener('resize', handleResize);
    }

    function initLoadingScreen() {
        const loadingBar = document.querySelector('.loading-bar');
        if (loadingBar) {
            loadingBar.style.width = '0';
            setTimeout(() => {
                loadingBar.style.width = '100%';
            }, 100);
        }

        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
            state.isLoading = false;
            triggerEntranceAnimations();
        }, 2500);
    }

    function triggerEntranceAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-load');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 150);
        });
    }

    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        window.addEventListener('scroll', handleScroll);

        elements.hamburger.addEventListener('click', toggleMobileMenu);

        document.addEventListener('click', (e) => {
            if (!elements.navMenu.contains(e.target) && !elements.hamburger.contains(e.target)) {
                elements.navMenu.classList.remove('active');
                elements.hamburger.classList.remove('active');
            }
        });
    }

    function handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = elements.mainNav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                elements.navMenu.classList.remove('active');
                elements.hamburger.classList.remove('active');
            }
        }
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        elements.mainNav.classList.toggle('scrolled', scrollY > 50);
    }

    function toggleMobileMenu() {
        elements.hamburger.classList.toggle('active');
        elements.navMenu.classList.toggle('active');
    }

    function initParallax() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        if (parallaxLayers.length === 0) return;

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            const heroSection = document.querySelector('.hero-section');
            if (!heroSection) return;

            const heroRect = heroSection.getBoundingClientRect();
            const heroCenter = heroRect.top + heroRect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const relativePosition = (heroCenter - windowCenter) / windowCenter;

            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) || 0.1;
                const translateY = relativePosition * speed * 200;
                layer.style.transform = `translateY(${translateY}px)`;
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    function initHeroParticles() {
        if (!elements.heroParticles) return;

        const particleCount = 30; // 减少粒子数量以提高性能
        const colors = ['#8B5CF6', '#EC4899', '#F472B6', '#A78BFA', '#DB2777'];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 3 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.opacity = Math.random() * 0.4 + 0.2;
            particle.style.willChange = 'transform, opacity'; // 提示浏览器优化动画
            elements.heroParticles.appendChild(particle);
        }
    }

    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');

        if (!animatedElements.length) return;

        // 使用更高效的 Intersection Observer 配置
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 使用 requestAnimationFrame 确保动画在浏览器重绘时执行
                    requestAnimationFrame(() => {
                        entry.target.classList.add('animated');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05, // 降低阈值以提高触发灵敏度
            rootMargin: '50px 0px -30px 0px', // 调整根边距以优化触发时机
            trackVisibility: true, // 启用可见性跟踪以提高性能
            delay: 100 // 添加延迟以减少不必要的触发
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-count]');

        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        element.classList.add('counted');
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);

            if (target >= 1000000) {
                element.textContent = (current / 10000).toFixed(0) + '万';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target >= 1000000
                    ? (target / 10000).toFixed(0) + '万'
                    : target >= 1000
                        ? (target / 1000).toFixed(0) + 'K'
                        : target;
            }
        }

        requestAnimationFrame(update);
    }

    function initMusicTabs() {
        const tabs = document.querySelectorAll('.music-tab');
        const panels = document.querySelectorAll('.music-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                panels.forEach(panel => {
                    panel.classList.toggle('active', panel.id === `${target}Panel`);
                });
            });
        });

        initAlbumPlayButtons();
        initSinglePlayButtons();
    }

    function initAlbumPlayButtons() {
        const buttons = document.querySelectorAll('.album-play-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const albumId = btn.dataset.albumPlay;
                playAlbum(albumId);
            });
        });
    }

    function initSinglePlayButtons() {
        const buttons = document.querySelectorAll('.single-play-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const singleId = btn.dataset.singlePlay;
                playSingle(singleId);
            });
        });
    }

    function playAlbum(albumId) {
        const albumIndex = parseInt(albumId) - 1;
        if (albumIndex >= 0 && albumIndex < state.musicPlaylist.length) {
            state.currentTrackIndex = albumIndex;
            playTrack(state.musicPlaylist[albumIndex]);
            showFloatingPlayer();
            showNotification(`正在播放：${state.musicPlaylist[albumIndex].title}`);
        }
    }

    function playSingle(singleId) {
        const singleIndex = parseInt(singleId) - 1;
        if (singleIndex >= 0 && singleIndex < state.musicPlaylist.length) {
            state.currentTrackIndex = singleIndex;
            playTrack(state.musicPlaylist[singleIndex]);
            showFloatingPlayer();
            showNotification(`正在播放：${state.musicPlaylist[singleIndex].title}`);
        }
    }

    function playTrack(track) {
        state.currentMusic = track;
        state.isPlaying = true;

        elements.playerTrackName.textContent = track.title;
        elements.playerTrackArtist.textContent = track.artist;
        elements.playerTotalTime.textContent = track.duration;

        elements.playerPlay.querySelector('.play-icon').style.display = 'none';
        elements.playerPlay.querySelector('.pause-icon').style.display = 'block';

        elements.musicToggleBtn.classList.add('playing');

        // 设置并播放音频
        if (elements.audioPlayer) {
            elements.audioPlayer.src = track.audioPath;
            elements.audioPlayer.play().catch(error => {
                console.error('播放失败:', error);
                showNotification('播放失败，请稍后重试');
            });
        }

        simulatePlaybackProgress();
    }

    function simulatePlaybackProgress() {
        function updateProgress() {
            if (!elements.audioPlayer || !state.isPlaying) return;

            const currentTime = elements.audioPlayer.currentTime;
            const duration = elements.audioPlayer.duration || parseTimeToSeconds(elements.playerTotalTime.textContent);

            if (duration > 0) {
                const percentage = Math.min((currentTime / duration) * 100, 100);
                elements.playerProgressFill.style.width = `${percentage}%`;
                elements.playerCurrentTime.textContent = formatTime(Math.floor(currentTime));
                
                // 更新总时间为实际音频时长
                if (elements.audioPlayer.duration > 0) {
                    elements.playerTotalTime.textContent = formatTime(Math.floor(elements.audioPlayer.duration));
                }
            }
        }

        function handleTrackEnded() {
            nextTrack();
        }

        // 移除旧的事件监听器
        if (elements.audioPlayer) {
            // 先移除所有可能的监听器
            elements.audioPlayer.removeEventListener('timeupdate', updateProgress);
            elements.audioPlayer.removeEventListener('ended', handleTrackEnded);
            
            // 添加新的事件监听器
            elements.audioPlayer.addEventListener('timeupdate', updateProgress);
            elements.audioPlayer.addEventListener('ended', handleTrackEnded);
        }
    }

    function parseTimeToSeconds(timeStr) {
        const parts = timeStr.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function nextTrack() {
        if (state.currentTrackIndex < state.musicPlaylist.length - 1) {
            state.currentTrackIndex++;
        } else {
            state.currentTrackIndex = 0;
        }
        playTrack(state.musicPlaylist[state.currentTrackIndex]);
        showNotification(`下一首：${state.musicPlaylist[state.currentTrackIndex].title}`);
    }

    function prevTrack() {
        if (state.currentTrackIndex > 0) {
            state.currentTrackIndex--;
        } else {
            state.currentTrackIndex = state.musicPlaylist.length - 1;
        }
        playTrack(state.musicPlaylist[state.currentTrackIndex]);
        showNotification(`上一首：${state.musicPlaylist[state.currentTrackIndex].title}`);
    }

    function togglePlay() {
        state.isPlaying = !state.isPlaying;

        elements.playerPlay.querySelector('.play-icon').style.display = state.isPlaying ? 'none' : 'block';
        elements.playerPlay.querySelector('.pause-icon').style.display = state.isPlaying ? 'block' : 'none';

        // 控制实际的音频播放
        if (elements.audioPlayer) {
            if (state.isPlaying) {
                elements.audioPlayer.play().catch(error => {
                    console.error('播放失败:', error);
                    showNotification('播放失败，请稍后重试');
                });
            } else {
                elements.audioPlayer.pause();
            }
        }

        if (state.isPlaying && state.currentMusic) {
            simulatePlaybackProgress();
        }
    }

    function toggleMute() {
        state.isMuted = !state.isMuted;
        
        if (elements.audioPlayer) {
            elements.audioPlayer.muted = state.isMuted;
        }
        
        updateVolumeIcon();
    }

    function updateVolumeIcon() {
        if (!elements.volumeIcon) return;
        
        if (state.isMuted) {
            // 更改图标为静音状态 - 使用更简单、更适合小尺寸的图标
            elements.volumeIcon.innerHTML = '<path d="M12 4L9.91 6.09 12 8.18M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03h2V20h-2v-2.73c-1.38-.31-2.63-.95-3.69-1.81L14.73 12 19 16.27 20.27 15 12 6.73 4.27 14.47 3 13.24 12 4.27 4.27 3z"/>';
            // 确保 SVG 视口正确设置
            elements.volumeIcon.setAttribute('viewBox', '0 0 24 24');
            // 添加样式确保图标正确显示
            elements.volumeIcon.style.width = '18px';
            elements.volumeIcon.style.height = '18px';
            elements.volumeIcon.style.fill = 'currentColor';
        } else {
            // 恢复原始图标
            elements.volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
            // 确保 SVG 视口正确设置
            elements.volumeIcon.setAttribute('viewBox', '0 0 24 24');
            // 添加样式确保图标正确显示
            elements.volumeIcon.style.width = '18px';
            elements.volumeIcon.style.height = '18px';
            elements.volumeIcon.style.fill = 'currentColor';
        }
    }

    function showFloatingPlayer() {
        elements.floatingPlayer.classList.add('visible');
    }

    function hideFloatingPlayer() {
        elements.floatingPlayer.classList.remove('visible');
    }

    function initAudioPlayer() {
        elements.playerPlay.addEventListener('click', togglePlay);
        elements.playerNext.addEventListener('click', nextTrack);
        elements.playerPrev.addEventListener('click', prevTrack);

        elements.playerProgressBar.addEventListener('click', (e) => {
            const rect = elements.playerProgressBar.getBoundingClientRect();
            const percentage = (e.clientX - rect.left) / rect.width;
            elements.playerProgressFill.style.width = `${percentage * 100}%`;

            // 获取音频总时长
            let duration;
            if (elements.audioPlayer && !isNaN(elements.audioPlayer.duration)) {
                duration = elements.audioPlayer.duration;
            } else {
                duration = parseTimeToSeconds(elements.playerTotalTime.textContent);
            }

            const currentSeconds = Math.floor(duration * percentage);
            elements.playerCurrentTime.textContent = formatTime(currentSeconds);

            // 跳转到指定时间
            if (elements.audioPlayer) {
                elements.audioPlayer.currentTime = currentSeconds;
            }
        });

        elements.playerVolume.addEventListener('input', (e) => {
            const volume = e.target.value;
            if (elements.audioPlayer) {
                elements.audioPlayer.volume = volume / 100;
                // 如果调整音量时处于静音状态，取消静音
                if (state.isMuted) {
                    state.isMuted = false;
                    elements.audioPlayer.muted = false;
                    updateVolumeIcon();
                }
            }
        });

        // 添加音量图标点击事件，实现静音切换
        if (elements.volumeIcon) {
            elements.volumeIcon.addEventListener('click', toggleMute);
        }

        elements.musicToggleBtn.addEventListener('click', () => {
            if (state.currentMusic) {
                togglePlay();
            } else {
                showNotification('请先选择一首歌曲');
            }
        });
    }

    function initShowFilters() {
        if (!elements.dateFilter || !elements.locationFilter) return;

        // 初始化时为所有演出项目添加 visible 类
        const showItems = document.querySelectorAll('.show-item');
        showItems.forEach((item, index) => {
            item.style.display = 'flex';
            setTimeout(() => item.classList.add('visible'), index * 100);
        });

        elements.dateFilter.addEventListener('change', filterShows);
        elements.locationFilter.addEventListener('change', filterShows);

        function filterShows() {
            const dateValue = elements.dateFilter.value;
            const locationValue = elements.locationFilter.value;
            const showItems = document.querySelectorAll('.show-item');

            showItems.forEach(item => {
                const itemDate = item.dataset.date;
                const itemLocation = item.dataset.location;

                const dateMatch = dateValue === 'all' || itemDate === dateValue ||
                    (dateValue === 'this-month' && ['upcoming'].includes(itemDate)) ||
                    (dateValue === 'next-month' && ['upcoming'].includes(itemDate));

                const locationMatch = locationValue === 'all' || itemLocation === locationValue;

                if (dateMatch && locationMatch) {
                    item.style.display = 'flex';
                    setTimeout(() => item.classList.add('visible'), 50);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        }
    }

    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openGallery(index);
            });
        });

        state.galleryItems = Array.from(galleryItems);

        elements.modalClose.addEventListener('click', closeGallery);
        elements.modalPrev.addEventListener('click', prevGalleryImage);
        elements.modalNext.addEventListener('click', nextGalleryImage);

        elements.galleryModal.addEventListener('click', (e) => {
            if (e.target === elements.galleryModal) {
                closeGallery();
            }
        });

        updateGalleryDots();
    }

    function openGallery(index) {
        state.currentGalleryIndex = index;
        elements.galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateGalleryImage();
    }

    function closeGallery() {
        elements.galleryModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevGalleryImage() {
        state.currentGalleryIndex = (state.currentGalleryIndex - 1 + state.galleryItems.length) % state.galleryItems.length;
        updateGalleryImage();
        updateGalleryDots();
    }

    function nextGalleryImage() {
        state.currentGalleryIndex = (state.currentGalleryIndex + 1) % state.galleryItems.length;
        updateGalleryImage();
        updateGalleryDots();
    }

    function updateGalleryImage() {
        const item = state.galleryItems[state.currentGalleryIndex];
        if (!item) return;

        const galleryImage = item.querySelector('.gallery-image');
        if (galleryImage) {
            elements.modalImage.innerHTML = '';
            elements.modalImage.appendChild(galleryImage.cloneNode(true));
        }

        const title = item.dataset.gallery || '图片';
        elements.modalCaption.textContent = `图片 ${state.currentGalleryIndex + 1} / ${state.galleryItems.length}`;
    }

    function updateGalleryDots() {
        elements.modalDots.innerHTML = '';

        state.galleryItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `modal-dot${index === state.currentGalleryIndex ? ' active' : ''}`;
            dot.addEventListener('click', () => {
                state.currentGalleryIndex = index;
                updateGalleryImage();
                updateGalleryDots();
            });
            elements.modalDots.appendChild(dot);
        });
    }

    function initContactForm() {
        if (!elements.contactForm) return;

        elements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(elements.contactForm);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.message) {
                showNotification('请填写完整信息');
                return;
            }

            showNotification('消息已发送，我们会尽快回复！');
            elements.contactForm.reset();
        });

        if (elements.notifyBtn) {
            elements.notifyBtn.addEventListener('click', () => {
                showNotification('已订阅演出提醒');
            });
        }
    }

    function showNotification(message) {
        elements.notificationMessage.textContent = message;
        elements.notificationToast.classList.add('visible');

        setTimeout(() => {
            elements.notificationToast.classList.remove('visible');
        }, 3000);
    }

    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        if (!lazyImages.length) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!elements.galleryModal.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    closeGallery();
                    break;
                case 'ArrowLeft':
                    prevGalleryImage();
                    break;
                case 'ArrowRight':
                    nextGalleryImage();
                    break;
            }
        });
    }

    function initTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;

        elements.galleryModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        elements.galleryModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextGalleryImage();
                } else {
                    prevGalleryImage();
                }
            }
        }
    }

    function handleResize() {
        const showItems = document.querySelectorAll('.show-item');
        showItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add('visible');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
