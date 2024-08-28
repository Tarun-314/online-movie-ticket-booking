import { Component, Renderer2, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.css']
})
export class TicketBookingComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.generateDateButtons();
    this.setupSeatMatrix();
    this.setupDateAndTimeSelection();
  }
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateDateButtons() {
    const dateContainer = this.renderer.selectRootElement('.row > .col-md-8 .d-flex', true);
    const today = new Date();
    
    // Clear existing buttons
    this.renderer.setProperty(dateContainer, 'innerHTML', '');

    for (let i = 0; i < 5; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        
        const formattedDate = this.formatDate(currentDate);
        const displayDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`;

        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-outline-primary');
        this.renderer.addClass(button, 'm-1');
        this.renderer.setAttribute(button, 'id', `date-${formattedDate}`);
        this.renderer.setAttribute(button, 'data-date', formattedDate);
        this.renderer.setProperty(button, 'textContent', displayDate);
        
        this.renderer.appendChild(dateContainer, button);
    }
  }

  setupSeatMatrix() {
    const seatString = "000101010000000000010101000000000000000000000000"; 
    const seatMatrixContainer = this.renderer.selectRootElement('.seat-grid', true);
  
    const seatRows = [
      { label: 'A', count: 10, price: 100 },
      { label: 'B', count: 10, price: 100 },
      { label: 'C', count: 10, price: 100 },
      { label: 'D', count: 10, price: 150 },
      { label: 'E', count: 10, price: 150 },
      { label: 'F', count: 10, price: 150 },
      { label: 'G', count: 10, price: 200 },
      { label: 'H', count: 10, price: 200 }
    ];
  
    let seatStringIndex = 0;
    let matrixHTML = '';
  
    seatRows.forEach(row => {
      matrixHTML += `<div class="seat-row" data-price="${row.price}"><div class="seat-label">${row.label}</div>`;
      
      for (let i = 0; i < row.count; i++) {
        const seatStatus = seatString[seatStringIndex++];
        const seatClass = seatStatus === '1' ? 'occupied' : 'free';
        matrixHTML += `<div class="seat ${seatClass}" data-seat-number="${row.label}${i + 1}">${i + 1}</div>`;
      }
  
      matrixHTML += '</div>';
    });
  
    this.renderer.setProperty(seatMatrixContainer, 'innerHTML', matrixHTML);
  
    // Generate seat matrix on modal load
    $('#selectionModal').on('show.bs.modal', () => {
      this.generateSeatMatrix(seatString);
    });
  
    // Event listener for seat selection
    seatMatrixContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('seat') && target.classList.contains('free')) {
        target.classList.toggle('selected');
        this.updateSeatSelection();
      }
    });
  }
  
  generateSeatMatrix(seatString: string) {
    const seatMatrixContainer = this.renderer.selectRootElement('.seat-grid', true);
    const seatRows = [
      { label: 'A', count: 10, price: 100 },
      { label: 'B', count: 10, price: 100 },
      { label: 'C', count: 10, price: 100 },
      { label: 'D', count: 10, price: 150 },
      { label: 'E', count: 10, price: 150 },
      { label: 'F', count: 10, price: 150 },
      { label: 'G', count: 10, price: 200 },
      { label: 'H', count: 10, price: 200 }
    ];
  
    let seatStringIndex = 0;
    let matrixHTML = '';
  
    seatRows.forEach(row => {
      matrixHTML += `<div class="seat-row" data-price="${row.price}"><div class="seat-label">${row.label}</div>`;
      
      for (let i = 0; i < row.count; i++) {
        const seatStatus = seatString[seatStringIndex++];
        const seatClass = seatStatus === '1' ? 'occupied' : 'free';
        matrixHTML += `<div class="seat ${seatClass}" data-seat-number="${row.label}${i + 1}">${i + 1}</div>`;
      }
  
      matrixHTML += '</div>';
    });
  
    this.renderer.setProperty(seatMatrixContainer, 'innerHTML', matrixHTML);
  }
  
  updateSeatSelection() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.getAttribute('data-seat-number'));
    const totalPrice = selectedSeats.length * 100; // Update according to your logic
    document.getElementById('selectedSeats')!.textContent = selectedSeatsArray.join(', ') || 'None';
    document.getElementById('totalPrice')!.textContent = totalPrice.toString();
    (document.getElementById('checkoutButton') as HTMLButtonElement).disabled = selectedSeats.length === 0;
  }

  setupDateAndTimeSelection() {
    let selectedDate: string | null = null;
    let selectedTime: string | null = null;
    let currentCard: HTMLElement | null = null;
  
    // Set a default date on page load
    const defaultDate = document.querySelector('#date-2024-08-15');
    if (defaultDate) {
      selectedDate = defaultDate.getAttribute('data-date');
      defaultDate.classList.add('active');
    }
  
    // Handle date selection
    document.querySelectorAll('.btn[data-date]').forEach(button => {
      button.addEventListener('click', function () {
        document.querySelectorAll('.btn[data-date]').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        selectedDate = this.getAttribute('data-date');
      });
    });
  
    // Handle time selection
    document.querySelectorAll('.multiplex-card button[data-time]').forEach(button => {
      button.addEventListener('click', function () {
        // Reset previously selected card's time
        if (currentCard) {
          currentCard.querySelectorAll('button[data-time]').forEach(btn => btn.classList.remove('active'));
          (currentCard.querySelector('.confirm-selection') as HTMLElement).style.display = 'none';
        }
  
        // Select new card
        const card = this.closest('.multiplex-card') as HTMLElement;
        const confirmButton = card.querySelector('.confirm-selection') as HTMLElement;
  
        if (this.classList.contains('active')) {
          this.classList.remove('active');
          selectedTime = null;
          confirmButton.style.display = 'none';
          currentCard = null;
        } else {
          this.classList.add('active');
          selectedTime = this.getAttribute('data-time');
          confirmButton.style.display = 'block';
          currentCard = card;
        }
      });
    });
  
    // Handle confirm selection
    document.querySelectorAll('.confirm-selection').forEach(button => {
      button.addEventListener('click', function () {
        if (!selectedDate) {
          alert('Please select a date.');
          return;
        }
  
        if (selectedTime && currentCard) {
          const multiplexName = currentCard.querySelector('.card-title')?.textContent;
          const area = currentCard.querySelector('.card-subtitle')?.textContent;
  
          document.getElementById('selectedMultiplexName')!.textContent = multiplexName || '';
          document.getElementById('selectedArea')!.textContent = area || '';
          document.getElementById('selectedDate')!.textContent = 'Date: ' + selectedDate;
          document.getElementById('selectedTime')!.textContent = 'Show Time: ' + selectedTime;
          $('#selectionModal').modal('show');
        } else {
          alert('Please select a show time.');
        }
      });
    });
  
    // Handle seat selection
    document.querySelectorAll('.seat').forEach(seat => {
      seat.addEventListener('click', function () {
        if (!this.classList.contains('occupied')) {
          this.classList.toggle('selected');
          updateSeatSelection();
        }
      });
    });
  
    // Function to update seat selection
    const updateSeatSelection = () => {
      const selectedSeats = document.querySelectorAll('.seat.selected');
      let seatCount = selectedSeats.length;
      let totalPrice = 0;
      let seatNumbers: string[] = [];
  
      selectedSeats.forEach(seat => {
        const row = seat.parentElement as HTMLElement;
        const price = parseInt(row.getAttribute('data-price') || '0');
        totalPrice += price;
        seatNumbers.push(`${row.querySelector('.seat-label')?.textContent}${seat.getAttribute('data-seat-number')}`);
      });
  
      document.getElementById('selectedSeats')!.textContent = seatNumbers.join(', ');
      document.getElementById('totalPrice')!.textContent = totalPrice.toString();
  
      // Enable/disable the checkout button based on seat selection
      const checkoutButton = document.getElementById('checkoutButton') as HTMLButtonElement;
      if (checkoutButton) {
        checkoutButton.disabled = seatCount === 0;
      }
    };
  
    // Reset seats and price when the modal is closed
    $('#selectionModal').on('hidden.bs.modal', function () {
      document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
      });
      document.getElementById('selectedSeats')!.textContent = 'None';
      document.getElementById('totalPrice')!.textContent = '0';
      const checkoutButton = document.getElementById('checkoutButton') as HTMLButtonElement;
      if (checkoutButton) {
        checkoutButton.disabled = true;
      }
  
      // Reset active time selection and hide confirm button
      if (currentCard) {
        currentCard.querySelectorAll('button[data-time]').forEach(btn => btn.classList.remove('active'));
        (currentCard.querySelector('.confirm-selection') as HTMLElement)!.style.display = 'none';
      }
      selectedTime = null;
      currentCard = null;
    });
  }
  
}






