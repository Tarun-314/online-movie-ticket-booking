import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { DataService } from '../services/data-services';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit{

  bookingId: string = '';
  qrCodeUrl: string = '';
  bookingData:any;

  constructor(private router:Router, private dataService:DataService){}

  ngOnInit() {
    this.retrieveStateData();
    this.generateQRCode();
  }

  retrieveStateData() {
    this.bookingData = history.state;
    console.log('Retrieved State Data:', this.bookingData);
  
    if (!this.bookingData.theatreID || 
        !this.bookingData.theatreName || 
        !this.bookingData.movieName || 
        !this.bookingData.moviePoster || 
        !this.bookingData.language || 
        !this.bookingData.selectedDate || 
        !this.bookingData.selectedTime || 
        !this.bookingData.seats || 
        !this.bookingData.amount || 
        !this.bookingData.seatString ||
        !this.bookingData.paymentMethod ||
        !this.bookingData.transactionId
      ) {
      this.router.navigate(['/error']);
    } else {
      this.bookingId = this.bookingData.transactionId; 
      this.dataService.setSeatString(this.bookingData.theatreID, this.bookingData.movieName, this.bookingData.selectedDate, this.bookingData.selectedTime, this.bookingData.seatString);
    }
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
