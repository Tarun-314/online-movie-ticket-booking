import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit{

  bookingId: string = '#20030220';
  qrCodeUrl: string = '';

  ngOnInit() {
    this.generateQRCode();
  }

  generateQRCode() {
    QRCode.toDataURL(this.bookingId, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return;
      }
      this.qrCodeUrl = url;
    });
  }

  downloadImage() {
    const ticketElement = document.querySelector('.ticket') as HTMLElement;

    html2canvas(ticketElement, {
      scale: 1.2, 
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'ticket.png';
      link.click();
    }).catch(error => {
      console.error('Error generating image:', error);
    });
  }
}
