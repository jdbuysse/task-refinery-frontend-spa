//eventually need to update completedness between columns
function makeDraggable() {
    for (let items = document.querySelectorAll('[data-draggable="item"]'),
        len = items.length,
        i = 0; i < len; i++) {
        items[i].setAttribute('draggable', 'true');
    }

    let item = null;

    document.addEventListener('dragstart', e => {
        item = e.target;
        e.dataTransfer.setData('text', '');
    }, false);

    document.addEventListener('dragover', e => {
        if (item) {
            e.preventDefault();
        }
    }, false);


    document.addEventListener('drop', e => {
        if (e.target.getAttribute('data-draggable') == 'target') {
            e.target.appendChild(item);
            e.preventDefault();
        }
    }, false);

    document.addEventListener('dragend', () => {
        item = null;
    }, false);
}	

export {makeDraggable}