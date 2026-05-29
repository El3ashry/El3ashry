document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('probe-cursor');
    const projectItems = document.querySelectorAll('.project-item');
    const bootLog = document.getElementById('boot-log');
    const bootSequence = document.getElementById('boot-sequence');

    // --- Boot Sequence Logic ---
    const logs = [
        "[ OK ] INITIALIZING_KERNEL_PROBE...",
        "[ OK ] LOADING_SYSTEM_REGISTRIES...",
        "[ OK ] ESTABLISHING_LINK_TO_NEURAL_NET_31.23...",
        "[ OK ] DECRYPTING_BIOMETRIC_DATA...",
        "[ OK ] READY. WELCOME AHMED.",
        "> EXEC PORTFOLIO.SH"
    ];

    let logIndex = 0;
    const typeLogs = () => {
        if (logIndex < logs.length) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.textContent = logs[logIndex];
            bootLog.appendChild(line);
            logIndex++;
            setTimeout(typeLogs, Math.random() * 200 + 100);
        } else {
            const cursorBlink = document.createElement('span');
            cursorBlink.className = 'cursor-blink';
            bootLog.appendChild(cursorBlink);
            
            setTimeout(() => {
                bootSequence.style.opacity = '0';
                bootSequence.style.transition = 'opacity 1s ease-in-out';
                setTimeout(() => {
                    bootSequence.style.display = 'none';
                }, 1000);
            }, 1000);
        }
    };
    
    // Start boot sequence
    setTimeout(typeLogs, 500);

    // --- Custom Probe Cursor ---
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Smoothly follow cursor
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    });

    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .project-item');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // --- Reveal Animations ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Apply reveal classes to sections and project items
    const revealTargets = document.querySelectorAll('section, .project-item, .interest-block');
    revealTargets.forEach(target => {
        target.style.opacity = '0';
        target.style.transform = 'translateY(20px)';
        target.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(target);
    });

    // Add CSS for revealed state dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- Subtle Glitch/Noise Interaction ---
    // Occurs randomly or on specific actions
    const triggerGlitch = () => {
        const scanlines = document.querySelector('.scanlines');
        scanlines.style.opacity = '0.1';
        setTimeout(() => {
            scanlines.style.opacity = '0.02';
        }, 100);
    };

    // Glitch on project hover
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', triggerGlitch);
    });

    // --- Dynamic System Time ---
    const timeElement = document.getElementById('system-time');
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        timeElement.textContent = timeString;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // --- Hero Visual Interaction ---
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroVisual.style.transform = `translate(${moveX}px, ${-50 + moveY}%)`;
        });
    }

    // Random glitch occasionally
    setInterval(() => {
        if (Math.random() > 0.95) triggerGlitch();
    }, 3000);
});
