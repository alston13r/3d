"use strict";
let frameQueue = [];
const frameSaver = {
    downloadURI(uri, name) {
        let link = document.createElement('a');
        link.setAttribute('download', name);
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    saveFrame(canvas, id) {
        frameQueue.push({
            data: canvas.toDataURL('image/png'),
            id,
            downloaded: false
        });
    },
    saveNFrames(numFrames) {
        savingFrames = true;
        framesToSave = numFrames;
    },
    saveQueue() {
        frameQueue.forEach(item => {
            new Promise((res, rej) => {
                frameSaver.downloadURI(item.data, 'frame' + item.id + '.png');
                item.downloaded = true;
            });
        });
    }
};
//# sourceMappingURL=frameSaver.js.map