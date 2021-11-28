'use strict'
{
    class Panel {
        constructor () {
            // sectionの生成
            const section = document.createElement('section');
            section.classList.add('panel');
            // 画像の生成
            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();
            // ストップボタンの生成
            this.timeoutId = undefined;
            this.stop = document.createElement('div');
            this.stop.classList.add('stop');
            this.stop.classList.add('inactive');
            this.stop.textContent = 'STOP';
            this.stop.addEventListener('click', () => {
                if(this.stop.classList.contains('inactive')) {
                    return;
                }
                this.stop.classList.add('inactive');
                clearTimeout(this.timeoutId);
                panelsLeft--;
                if (panelsLeft === 0) {
                    spin.classList.remove('inactive');
                    panelsLeft = 3;
                    checkresult();
                }
            })
            // 要素の追加
            section.appendChild(this.img);
            section.appendChild(this.stop);
            const main = document.querySelector('main');
            main.appendChild(section);
        }
        // 画像をランダムに取得
        getRandomImage() {
            const images = [
                'img/bell.png',
                'img/cherry.png',
                'img/seven.png',
            ];
            return images[Math.floor(Math.random() * images.length ) ];
        }
        spin() {
            this.img.src = this.getRandomImage();
            this.timeoutId = setTimeout(() => {
                this.spin();
            }, 50)
        }
        // 正誤判定のメソッドの作成
        isUnmatched(p1, p2) {
            return this.img.src != p1.img.src && this.img.src != p2.img.src;
        }
        unmatch() {
            this.img.classList.add('unmatched');
        }
        activate() {
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');
        }
    }
    // 正誤判定
    const checkresult = () => {
        if (panels[0].isUnmatched(panels[1], panels[2])) {
            panels[0].unmatch();
        }
        if (panels[1].isUnmatched(panels[0], panels[2])) {
            panels[1].unmatch();
        }
        if (panels[2].isUnmatched(panels[0], panels[1])) {
            panels[2].unmatch();
        }
    }
    // Panelの実行
    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    // 回っているパネルの数の管理
    let panelsLeft = 3;

    // スピンボタンの設定
    const spin = document.querySelector('#spin');
    spin.addEventListener('click', () => {
        if(spin.classList.contains('inactive')) {
            return;
        }
        spin.classList.add('inactive');
        panels.forEach(panel => {
            panel.activate();
            panel.spin();
        })
    });
}