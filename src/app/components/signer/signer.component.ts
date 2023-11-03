import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fromEvent, concatMap, takeUntil, tap, Subscription, pairwise, switchMap } from 'rxjs';


@Component({
  selector: 'app-signer',
  templateUrl: './signer.component.html',
  styleUrls: ['./signer.component.scss']
})
export class SignerComponent {
  @Input() width = 512;
  @Input() height = 418;
  @ViewChild('canvas') canvas!: ElementRef;
  cx!: CanvasRenderingContext2D;
  drawingSubscriptionMouse!: Subscription;
  drawingSubscriptionTouch!: Subscription;
  constructor() {}

  ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d')!;

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }

  clearSigner() {
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from teh canvas element
    this.drawingSubscriptionMouse = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: any) => {
        this.manageDrawEvent(this.processPositions(canvasEl, res, 'mouse'));
      });

      this.drawingSubscriptionTouch = fromEvent(canvasEl, 'touchstart')
        .pipe(
          switchMap(e => {
            return fromEvent(canvasEl, 'touchmove').pipe(
              takeUntil(fromEvent(canvasEl, 'touchend')),
              pairwise()
            )
          })
        ).subscribe((res: any) => {
          this.manageDrawEvent(this.processPositions(canvasEl, res, 'touch'));
        })
  }

  processPositions(canvasEl: HTMLCanvasElement, res: any, eventType: string) {

    const rect = canvasEl.getBoundingClientRect();
    let prevPos = {
      x: 0 - rect.left,
      y: 0 - rect.top
    };

    let currentPos = {
      x: 0 - rect.left,
      y: 0 - rect.top
    };

    if (eventType === 'mouse') {
      prevPos.x += res[0].clientX;
      prevPos.y += res[0].clientY;
      currentPos.x += res[1].clientX;
      currentPos.y += res[1].clientY;
    } else if (eventType === 'touch') {
      prevPos.x += res[0].targetTouches[0].clientX;
      prevPos.y += res[0].targetTouches[0].clientY;
      currentPos.x += res[1].targetTouches[0].clientX;
      currentPos.y += res[1].targetTouches[0].clientY;
    }

    return [prevPos, currentPos]

  }

  manageDrawEvent(positions: any[]) {
    this.drawOnCanvas(positions[0], positions[1]);
  }

  drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    // incase the context is not set
    if (!this.cx) {
      return;
    }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
  
  ngOnDestroy() {
    // this will remove event lister when this component is destroyed
    this.drawingSubscriptionMouse.unsubscribe();
    this.drawingSubscriptionTouch.unsubscribe();
  }

}
