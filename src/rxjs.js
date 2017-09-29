/*/!*import {Observable, Observer, Subject, Subscription, BehaviorSubject, ReplaySubject, AsyncSubject} from "rxjs";
import "rxjs/Observer"*!/


/!*var l = (txt: string) => {
  console.log(txt)
}*!/

/!*
 * Listening Dom Elements
 * *!/
var $ = (query: string) => document.querySelector(query);*/

// [SAMPLE 1]
/*
 Observable.fromEvent($("#ref1"),'click').subscribe(()=>{
 console.log(` ref1 Tested  `)
 });
 */
//--------------------------------------------
// [SAMPLE 1.1]
// To find num of click

/*
Observable.fromEvent($('#ref1'), 'click').scan((c: number) => c + 1, 0).subscribe((count) => {
  l(`ref count ${count}`)
});
*/
//--------------------------------------------
// we can elaborate subscribe , REF# SAMEPLE 2.1
/*Observable.fromEvent($('#ref1'), 'click').scan((c: number) => c + 1, 0)
  .subscribe({
    next(count:number){
      l(`cc count ${count}`);
    },
    complete(){
      l(`completed called`);
    }
});*/

//-----------------------------------------------
// [SAMPLE 2.1]
// To create Observable

/*l(`Note:- creating Observable like ES6 generators`);

var observable:Observable<number> = Observable.create(function (observer:Observer<number>) {
  observer.next(1);
  observer.next(2);
  observer.next(3);

  var clearTimeoutId:any =setTimeout(()=>{
    observer.next(5);
    //observer.error('observer error throw');
    observer.next(6);
    observer.complete();
    observer.next(7);
  },1000);

  observer.next(4);
  // un subscribe implementation
  return function () {
    l(`unsubscribe called`)
      clearTimeout(clearTimeoutId);
  }
});
var subscription = observable.subscribe({
  next(val:number){
    l(`value ${val}`)
  },
  complete(){
    l(`observable  completed`);
  },
  error(){
    l('observable error')
  }
});
// subscription.unsubscribe used to clear Observable
subscription.unsubscribe();*/



/*l(`
Note
   * Observable mean multiple promise with async / sync.
   Each 'subscribe' will get own Observable execution, meaning like fist subscribe is independent to the second subscribe.
   This will called 'UNICAST'.
   
   * But we can make single Observable execution for all Observer called 'MULTICAST'. We used 'Subject' for this.
   
   * Subject work like Observer & Observable
`);*/

/*
var subject:Subject<{}> = new Subject();
// subject have subscribe
subject.subscribe((val:number)=> {
  l(`subject subscribe 1 value :  ${val}`);
});

subject.subscribe((val:number)=> {
  l(`subject subscribe 2 value :  ${val}`);
});
// subject have next to send value
subject.next(1);
subject.next(2);
setTimeout(()=>{
  subject.next(3);
});
// subject like observer so we can use it as 'Observable.subscribe'
var observable =  Observable.from([5,6,7]);
observable.subscribe(subject)
// as above way , we can change unicast to multicast
// Or we can use observable.multicast to achieve 'multicast'

*/
// -------------------------------------------------------------------------------------

/*var subject:Subject<number> = new Subject<number>();
var observable:Observable<number> = Observable.interval(1000);
var multicasted = observable.multicast(subject);
var subscription1 = subject.subscribe((val:number)=>{
  l(`fist subscribe value ${val}`);
})
var subscription2:Subscription;
setTimeout(() => {
  subscription2 = subject.subscribe((val:number)=>{
    l(`second subscribe value ${val}`);
  });
},3000);


var subscriptionAll = multicasted.connect();

Observable.fromEvent($('#ref2'),'click').subscribe(()=>{
  l(` subscription 1 unsubscribed`);
  subscription1.unsubscribe();
});
Observable.fromEvent($('#ref3'),'click').subscribe(()=>{
  l(` subscription 2 unsubscribed`);
  subscription2.unsubscribe();
});
Observable.fromEvent($('#ref4'),'click').subscribe(()=>{
  l(` subscription All unsubscribed`);
  subscriptionAll.unsubscribe();
});
Observable.fromEvent($('#ref5'),'click').subscribe(()=>{
  l(` multicast reconnect `);
  subscriptionAll = multicasted.connect();
});*/

/*l(`
 Subject := reference counting
 refCount() help to connect  multicast once reach enough connections.
 but it will disconnect after unsubscribed enough connections
`)

var subject:Subject<number> = new Subject<number>();
var observable:Observable<number> = Observable.interval(1000);
var multicasted = observable.multicast(subject).refCount();

var subscription1 = multicasted.subscribe((val:number)=>{
  l(`fist subscribe value ${val}`);
})
var subscription2:Subscription;
setTimeout(() => {
  subscription2 = multicasted.subscribe((val:number)=>{
    l(`second subscribe value ${val}`);
  });
},3000);

Observable.fromEvent($('#ref2'),'click').subscribe(()=>{
  l(` subscription 1 unsubscribed`);
  subscription1.unsubscribe();
});
Observable.fromEvent($('#ref3'),'click').subscribe(()=>{
  l(` subscription 2 unsubscribed`);
  subscription2.unsubscribe();
});*/
/*l(`
 Behaviour Subject
 -----------------
 It store last emitted value to consumer. when another subscribed called then it gives stored value once.
 
`)
// Sample 1
var bSubject:BehaviorSubject<number> = new BehaviorSubject<number>(0);
bSubject.subscribe((val:number)=>{
  l(`value-1 => ${val}`);
});
bSubject.next(1);
bSubject.next(2);
bSubject.subscribe((val:number)=>{
  l(`value-2 => ${val}`);
})*/

// SAMPLE 2

/*var observable = Observable.interval(1000);
var bSubject:BehaviorSubject<number> = new BehaviorSubject<number>(0);
var multicastConnect = observable.multicast(bSubject);
var multiSubscribe = multicastConnect.connect();
l(`subscribe 1 started`);
bSubject.subscribe((val:number)=>{
  l(`subscribe-1 ${val}`);
});
setTimeout(()=>{
  l(`subscribe 2 started`);
  bSubject.subscribe((val:number)=>{
    l(`subscribe-2 ${val}`);
  });
},3000);
Observable.fromEvent($('#ref2'),'click').subscribe(()=>{
  l(`Stop All subscribe`);
  multiSubscribe.unsubscribe();
});*/
/*l(`
  Replay Subject
  --------------
  it's like Behaviour subject, difference it's store multiple data for replay(emit) to next subscribe
`);*/

/*var observable = Observable.interval(1000);
var rSubject:ReplaySubject<number> = new ReplaySubject<number>(4);
var multicastConnect = observable.multicast(rSubject);
var multiSubscribe = multicastConnect.connect();
l(`subscribe 1 started`);
rSubject.subscribe((val:number)=>{
  l(`subscribe-1 ${val}`);
});

Observable.fromEvent($('#ref2'),'click').subscribe(()=>{
  l(`Stop All subscribe`);
  multiSubscribe.unsubscribe();
});
Observable.fromEvent($('#ref3'),'click').subscribe(()=>{
  l(`subscribe 2 started`);
  rSubject.subscribe((val:number)=>{
    l(`subscribe-2 ${val}`);
  });
});*/

/*
l(` Async Subject
    -------------
    Send only a value when observer complete or finish 
`)
var observable1:Observable<number> = Observable.create((observer:Observer<number>)=>{
  observer.next(1);
  observer.next(2);
  observer.complete();
})
/!*observable1.last().subscribe((val:number)=>{
  l(`value ${val}`);
})*!/
var asyncSubject:AsyncSubject<number> = new AsyncSubject<number>();
var multicast = observable1.multicast(asyncSubject);
multicast.subscribe((val:number)=>{
  l(`value ${val}`);
})
multicast.connect();
*/
/*l(`
Observable.bindCallback example
`)
function f1(str:string,callback:Function){
  l(`hi f1 called ${str}`);
  callback('dinesh');
}
var observer = Observable.bindCallback(f1);
var obs = observer('hxcv');
obs.subscribe((val:string)=>{
  l(`subscribe say ${val}`);
})*/


/*
// Combinelatest
var obs1:Observable<number> = Observable.of(1,2,3);
var obs2:Observable<number> = Observable.of(2,4,6);
Observable.combineLatest(obs1,obs2,(b1:number,b2:number) => {
  return b1*b2;
}).subscribe((val:number)=>{
  l(`value := ${val}`)
})*/

/*var clicks = Observable.fromEvent($('#ref2'), 'click');
var timer = Observable.interval(1000);
var clicksOrTimer = Observable.merge(clicks, timer);
clicksOrTimer.subscribe(x => console.log(x));*/

//---------------------------------------------
/*var numbers = Observable.of(10, 20, 30);
var letters = Observable.of('a', 'b', 'c');
var interval = Observable.interval(1000);
var result = numbers.concat(interval).concat(letters)
result.subscribe((x:number | string) => console.log(x));*/

//-----------------------------------------------
console.log('dfgdfgsdfsfssdfdcxcsdf sdff sddfsdf')
/*
Observable.of({a:1},{a:132323},{a:2},{a:2},{a:3},{a:4},{a:2}).distinctKey('a').subscribe((val:{a:number})=>{
  l(`value sdfgdfgesdfsdfsdffsdfdsf ${val.a}`);
})
*/

































