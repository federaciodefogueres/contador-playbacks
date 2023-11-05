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
  @ViewChild('canvas') myCanvas!: ElementRef;
  public context!: CanvasRenderingContext2D;
  public isDrawing = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.context = (this.myCanvas.nativeElement as HTMLCanvasElement).getContext('2d')!;
    this.myCanvas.nativeElement.width = this.width;
    this.myCanvas.nativeElement.height = this.height;

    // set some default properties about the line
    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#000';
  }

  startDrawing(event: MouseEvent | TouchEvent): void {
    this.isDrawing = true;
    this.context.beginPath();
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    this.context.moveTo(
      (event as MouseEvent).clientX - rect.left || (event as TouchEvent).touches[0].clientX - rect.left,
      (event as MouseEvent).clientY - rect.top || (event as TouchEvent).touches[0].clientY - rect.top
    );
  }

  draw(event: MouseEvent | TouchEvent): void {
    if (!this.isDrawing) {
      return;
    }
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    this.context.lineTo(
      (event as MouseEvent).clientX - rect.left || (event as TouchEvent).touches[0].clientX - rect.left,
      (event as MouseEvent).clientY - rect.top || (event as TouchEvent).touches[0].clientY - rect.top
    );
    this.context.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
    this.context.closePath()
  }

  clearSigner() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

}
