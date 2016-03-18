import {Rx} from 'rx';

const subject = new Rx.Subject();

function doZunDoko() {
    while (!subject.isStopped) {
        if (Math.random() > 0.5) {
            subject.onNext('ズン');
        } else {
            subject.onNext('ドコ');
        }
    }
}


const subscription = subject
    .doOnNext((aString) => console.log(aString))
    .bufferWithCount(5, 1)
    .filter((aArray) => aArray.join(',') === 'ズン,ズン,ズン,ズン,ドコ')
    .take(1)
    .subscribe(() => {
        console.log('キ・ヨ・シ！');
        subject.onCompleted();
        subscription.dispose();
    });

doZunDoko();
