// Floating Lines Background Animation
class FloatingLines {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }

        this.options = {
            linesCount: options.linesCount || 12,
            gradient: options.gradient || ['#f06c33', '#bf6022'],
            animationSpeed: options.animationSpeed || 1,
            interactive: options.interactive !== false,
            bendRadius: options.bendRadius || 5,
            bendStrength: options.bendStrength || -0.5,
            mouseDamping: options.mouseDamping || 0.05,
            parallax: options.parallax !== false,
            parallaxStrength: options.parallaxStrength || 0.2
        };

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        this.lines = [];
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.time = 0;
        this.isInitialized = false;

        this.init();
        this.setupEventListeners();
        this.animate();
        
        console.log('FloatingLines initialized');
    }

    init() {
        this.resize();
        this.createLines();
        this.isInitialized = true;
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        console.log('Canvas size:', this.canvas.width, 'x', this.canvas.height);
    }

    createLines() {
        this.lines = [];
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        if (width === 0 || height === 0) {
            console.warn('Canvas has no dimensions');
            return;
        }

        for (let i = 0; i < this.options.linesCount; i++) {
            const line = {
                points: [],
                speed: (Math.random() * 0.5 + 0.5) * this.options.animationSpeed,
                offset: (i / this.options.linesCount) * Math.PI * 2,
                baseY: (height / this.options.linesCount) * i + 50,
                amplitude: Math.random() * 80 + 40,
                frequency: Math.random() * 0.003 + 0.002,
                thickness: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.3,
                parallaxFactor: (i / this.options.linesCount) * this.options.parallaxStrength
            };

            // Create smooth curve points
            const segments = 100;
            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                line.points.push({
                    x: t * width,
                    baseY: line.baseY,
                    originalX: t * width
                });
            }

            this.lines.push(line);
        }
        
        console.log('Created', this.lines.length, 'lines');
    }

    setupEventListeners() {
        if (this.options.interactive) {
            const handleMouseMove = (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.targetX = e.clientX - rect.left;
                this.mouse.targetY = e.clientY - rect.top;
            };

            this.container.addEventListener('mousemove', handleMouseMove);

            this.container.addEventListener('mouseleave', () => {
                this.mouse.targetX = this.canvas.width / 2;
                this.mouse.targetY = this.canvas.height / 2;
            });
        }

        window.addEventListener('resize', () => {
            this.resize();
            this.createLines();
        });
    }

    updateMouse() {
        if (this.options.interactive) {
            this.mouse.x += (this.mouse.targetX - this.mouse.x) * this.options.mouseDamping;
            this.mouse.y += (this.mouse.targetY - this.mouse.y) * this.options.mouseDamping;
        }
    }

    drawLine(line) {
        this.ctx.beginPath();
        
        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        gradient.addColorStop(0, this.options.gradient[0]);
        gradient.addColorStop(1, this.options.gradient[1]);
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = line.thickness;
        this.ctx.globalAlpha = line.opacity;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        let firstPoint = true;

        for (let i = 0; i < line.points.length; i++) {
            const point = line.points[i];
            
            // Calculate wave motion
            const wave = Math.sin(
                (point.x * line.frequency) + 
                (this.time * line.speed * 0.01) + 
                line.offset
            ) * line.amplitude;
            
            // Calculate parallax effect
            let parallaxX = 0;
            let parallaxY = 0;
            if (this.options.parallax && this.options.interactive) {
                const centerX = this.canvas.width / 2;
                const centerY = this.canvas.height / 2;
                parallaxX = (this.mouse.x - centerX) * line.parallaxFactor;
                parallaxY = (this.mouse.y - centerY) * line.parallaxFactor;
            }

            // Calculate mouse interaction bend
            let bendY = 0;
            if (this.options.interactive && this.mouse.x > 0) {
                const dx = point.x - this.mouse.x;
                const dy = (line.baseY + wave) - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = this.options.bendRadius * 100;
                
                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance);
                    bendY = force * this.options.bendStrength * 50 * (dy / (distance + 1));
                }
            }

            const x = point.x + parallaxX;
            const y = line.baseY + wave + bendY + parallaxY;

            if (firstPoint) {
                this.ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }

    animate() {
        if (!this.isInitialized || this.canvas.width === 0) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateMouse();
        this.time += 1;

        this.lines.forEach(line => this.drawLine(line));

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingLines);
} else {
    initFloatingLines();
}

function initFloatingLines() {
    // Small delay to ensure container is sized
    setTimeout(() => {
        const floatingLinesContainer = document.getElementById('floating-lines-bg');
        if (floatingLinesContainer) {
            console.log('Initializing floating lines for rover section...');
            new FloatingLines('floating-lines-bg', {
                linesCount: 12,
                gradient: ['#f06c33', '#bf6022'],
                animationSpeed: 1,
                interactive: true,
                bendRadius: 5,
                bendStrength: -0.5,
                mouseDamping: 0.05,
                parallax: true,
                parallaxStrength: 0.2
            });
        } else {
            console.error('floating-lines-bg container not found');
        }
        
        // Initialize for progress section
        const progressFloatingLines = document.getElementById('progress-floating-lines');
        if (progressFloatingLines) {
            console.log('Initializing floating lines for progress section...');
            new FloatingLines('progress-floating-lines', {
                linesCount: 6,
                gradient: ['#f06c33', '#bf6022'],
                animationSpeed: 1,
                interactive: true,
                bendRadius: 5,
                bendStrength: -0.5,
                mouseDamping: 0.05,
                parallax: true,
                parallaxStrength: 0.2
            });
        } else {
            console.error('progress-floating-lines container not found');
        }
    }, 100);
}
