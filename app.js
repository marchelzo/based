function swap() {
    if (document.querySelector('.code').classList.contains('hidden')) {
        document.querySelector('button').innerText = 'Run'
        document.querySelector('button').onclick = run;
    } else {
        document.querySelector('button').innerText = 'Back to code'
        document.querySelector('button').onclick = swap;
    }

    document.querySelector('.output-container').classList.toggle('hidden');
    document.querySelector('.code').classList.toggle('hidden');
    document.querySelector('span.label').classList.toggle('stdout');
}

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

    swap();
}

async function share() {
    let code = document.querySelector('.code').value;
    let input = document.querySelector('.input').value;

    let data = new FormData();
    data.append('code', code);
    data.append('input', input);

    let r = await fetch('/share.ty', {
        method: 'POST',
        body: data
    });

    alert(await r.text());
}

async function load(name) {
    let r = await fetch(`/${name}.ty`);
    let example = await r.json();

    document.querySelector('.code').value = example.code;
    document.querySelector('.input').value = example.input || '';

    if (document.querySelector('.code').classList.contains('hidden')) {
        swap();
    }
}

const examples = document.querySelectorAll('.example');

for (const e of examples) {
    e.addEventListener('click', function () {
        for (const e of examples) { e.classList.remove('active'); }
        this.classList.add('active');
        load(this.getAttribute('data-url'));
    });
}

if (window.location.search === '') {
    examples[0].click();
} else {
    load(window.location.search.slice(1))
}
