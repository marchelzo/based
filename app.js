async function run() {
    let code = document.querySelector('.code').value;
    let input = document.querySelector('.input').value;

    document.querySelector('.output').innerText = 'Running...';

    let data = new FormData();
    data.append('code', code);
    data.append('input', input);

    let r = await fetch('/run.ty', {
            method: 'POST',
            body: data
    });

    document.querySelector('.output').innerText = await r.text();
}

async function load(name) {
    let r = await fetch(name + '.ty');
    let example = await r.json();
    document.querySelector('.code').value = example.code;
    document.querySelector('.input').value = example.input || '';
}

const examples = document.querySelectorAll('.example');

for (const e of examples) {
    e.addEventListener('click', function () {
        for (const e of examples) { e.classList.remove('active'); }
        this.classList.add('active');
        load(this.getAttribute('data-url'));
    });
}

examples[0].click();
