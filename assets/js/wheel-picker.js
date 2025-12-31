
// ===== 單一滾輪 Picker =====
class Picker {
    constructor(el, data, defaultVal, onChange) {
        this.el = el;
        this.data = data.map(String);
        this.onChange = onChange;
        this.itemHeight = 40;
        this.currentY = 0;
        this.isDragging = false;
        this.velocity = 0;
        this.selectedValue = String(defaultVal);

        this.init();
        this.setVal(defaultVal);
    }

    init() {
        const content = [...this.data, ...this.data, ...this.data];
        this.el.innerHTML = content
            .map(v => `<div class="wheel-item">${v.padStart(2, '0')}</div>`)
            .join('');

        this.items = this.el.querySelectorAll('.wheel-item');
        const wrap = this.el.parentElement;

        const start = y => {
            this.isDragging = true;
            this.startY = y;
            this.startHoldY = this.currentY;
            this.velocity = 0;
            this.lastMoveTime = Date.now();
            cancelAnimationFrame(this.raf);
        };

        const move = y => {
            if (!this.isDragging) return;
            const now = Date.now();
            const dt = now - this.lastMoveTime;
            const moveY = y - this.startY;

            if (dt > 0) {
                this.velocity = (this.currentY - (this.startHoldY + moveY)) / dt;
                this.velocity = Math.max(Math.min(this.velocity, 20), -20);
            }

            this.currentY = this.startHoldY + moveY;
            this.lastMoveTime = now;
            this.updatePosition();
        };

        const end = () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            this.velocity = -this.velocity * 15;
            this.animateInertia();
        };

        wrap.addEventListener('touchstart', e => {
            e.preventDefault();
            start(e.touches[0].pageY);
        }, { passive: false });

        wrap.addEventListener('touchmove', e => {
            e.preventDefault();
            move(e.touches[0].pageY);
        }, { passive: false });

        wrap.addEventListener('touchend', end);

        wrap.addEventListener('mousedown', e => start(e.pageY));
        window.addEventListener('mousemove', e => move(e.pageY));
        window.addEventListener('mouseup', end);
    }

    updatePosition() {
        this.el.style.transform = `translateY(${this.currentY}px)`;

        const total = this.data.length;
        const offsetIdx = Math.round(-this.currentY / this.itemHeight);
        const realIdx = (offsetIdx % total + total) % total;
        this.selectedValue = this.data[realIdx];

        const display = this.selectedValue.padStart(2, '0');
        this.items.forEach(i =>
            i.classList.toggle('active', i.textContent === display)
        );
    }

    animateInertia() {
        this.velocity *= 0.88;
        this.currentY += this.velocity;

        if (Math.abs(this.velocity) < 0.5) {
            const targetY = Math.round(this.currentY / this.itemHeight) * this.itemHeight;
            this.snap(targetY);
        } else {
            this.checkBoundary();
            this.updatePosition();
            this.raf = requestAnimationFrame(() => this.animateInertia());
        }
    }

    snap(targetY) {
        this.currentY += (targetY - this.currentY) * 0.15;
        this.updatePosition();

        if (Math.abs(targetY - this.currentY) < 0.1) {
            this.currentY = targetY;
            this.checkBoundary();
            this.onChange(this.selectedValue);
        } else {
            this.raf = requestAnimationFrame(() => this.snap(targetY));
        }
    }

    checkBoundary() {
        const len = this.data.length * this.itemHeight;
        if (this.currentY <= -len) this.currentY += len;
        if (this.currentY > 0) this.currentY -= len;
    }

    setVal(val) {
        const idx = this.data.indexOf(String(val));
        this.currentY = -idx * this.itemHeight;
        this.updatePosition();
    }
}

// ===== 一整組 日期＋時間 =====
class DateTimePicker {
    constructor(container, date = new Date()) {
        this.el = container;

        this.state = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            hh: date.getHours(),
            mm: date.getMinutes()
        };

        this.init();
    }

    init() {
        const years = Array.from({ length: 21 }, (_, i) => 2020 + i);
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const hours = Array.from({ length: 24 }, (_, i) => i);
        const mins = Array.from({ length: 60 }, (_, i) => i);

        this.y = new Picker(
            this.el.querySelector('.wheel.year'),
            years,
            this.state.y,
            v => { this.state.y = v; this.updateDays(); }
        );

        this.m = new Picker(
            this.el.querySelector('.wheel.month'),
            months,
            this.state.m,
            v => { this.state.m = v; this.updateDays(); }
        );

        this.h = new Picker(
            this.el.querySelector('.wheel.hour'),
            hours,
            this.state.hh,
            v => { this.state.hh = v; this.sync(); }
        );

        this.min = new Picker(
            this.el.querySelector('.wheel.minute'),
            mins,
            this.state.mm,
            v => { this.state.mm = v; this.sync(); }
        );

        this.updateDays();
    }

    updateDays() {
        const days = new Date(this.state.y, this.state.m, 0).getDate();
        if (this.state.d > days) this.state.d = days;

        this.d = new Picker(
            this.el.querySelector('.wheel.day'),
            Array.from({ length: days }, (_, i) => i + 1),
            this.state.d,
            v => { this.state.d = v; this.sync(); }
        );

        this.sync();
    }

    sync() {
        const r =
            `${this.state.y}/${String(this.state.m).padStart(2, '0')}/${String(this.state.d).padStart(2, '0')}
             ${String(this.state.hh).padStart(2, '0')}:${String(this.state.mm).padStart(2, '0')}`;

        const result = this.el.querySelector('.result');
        if (result) result.textContent = r;
    }

    getValue() {
        return { ...this.state };
    }
}

// ===== 自動初始化所有 picker =====
document.querySelectorAll('.datetime-picker').forEach(el => {
    new DateTimePicker(el);
});
