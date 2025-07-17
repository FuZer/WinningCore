// DOM 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 기본 기능들
    handleNavigation();
    handleScrollAnimations();
    handleContactForm();
    handleSelectDropdown();
    handleServiceAnimations(); // 서비스 애니메이션 추가
});

// 스크롤 애니메이션 처리
function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('[class*="delay-"]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 스크롤 진행률 표시
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// 네비게이션 처리
function handleNavigation() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // 스크롤 시 헤더 배경 변경
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 부드러운 스크롤
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 셀렉트 드롭다운 처리
function handleSelectDropdown() {
    const selects = document.querySelectorAll('select');
    
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#333';
            }
        });
    });
}

// 문의 폼 처리
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // 폼 데이터 수집
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // 간단한 유효성 검사
            if (!data.company || !data.name || !data.email || !data.phone || !data.service || !data.message) {
                alert('필수 항목을 모두 입력해주세요.');
                e.preventDefault();
                return;
            }
            
            // 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                e.preventDefault();
                return;
            }
            
            // 메일 제목과 본문 구성
            const subject = `[WinningCore 문의] ${data.service} - ${data.company}`;
            const body = `
회사명: ${data.company}
담당자: ${data.name}
이메일: ${data.email}
연락처: ${data.phone}
관심서비스: ${data.service}

문의내용:
${data.message}
            `;
            
            // 메일 링크 생성
            const mailtoLink = `mailto:hong@winningcore.co.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // 새 창에서 메일 클라이언트 열기
            window.open(mailtoLink);
            
            // 성공 메시지
            alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            contactForm.reset();
        });
    }
}

// 서비스 스크롤 처리
function handleServiceAnimations() {
    // 서비스 페이지에서만 실행
    if (window.location.pathname.includes('/services')) {
        // 푸터 링크 클릭 시 스크롤 처리
        const footerLinks = document.querySelectorAll('.footer-section a[href*="#"]');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').split('#')[1];
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // 해당 섹션으로 스크롤
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// 추가 CSS 스타일 (동적으로 추가)
const additionalStyles = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .nav.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-content img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #3498db;
        z-index: 10001;
        transition: width 0.1s ease;
    }
    
    .tooltip {
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: #333;
    }
    
    /* 셀렉트 박스 드롭다운 방향 제어 */
    select {
        direction: ltr;
    }
    
    select option {
        direction: ltr;
    }
`;

// 스타일 적용
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 