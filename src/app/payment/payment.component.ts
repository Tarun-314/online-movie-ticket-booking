import { Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Toggle the card details display
    this.renderer.listen('document', 'click', (event) => {
      const cardHeader = event.target.closest('.card-header');
      if (cardHeader) {
        const cardDetails = cardHeader.nextElementSibling as HTMLElement;
        document.querySelectorAll('.card-body').forEach(body => {
          if (body !== cardDetails) {
            body.classList.remove('show');
            (body as HTMLElement).style.maxHeight = '0';
            (body as HTMLElement).style.opacity = '0';
            
          }
        });
        if (cardDetails) {
          if (cardDetails.classList.contains('show')) {
            cardDetails.classList.remove('show');
            cardDetails.style.maxHeight = '0';
            cardDetails.style.opacity = '0';
          } else {
            cardDetails.classList.add('show');
            cardDetails.style.maxHeight = `${cardDetails.scrollHeight+20}px`;
            cardDetails.style.opacity = '1';
          }
        }
      }
    });
  
    // Handle payment option selection
    document.querySelectorAll('.payment-option').forEach(button => {
      this.renderer.listen(button, 'click', () => {
        document.querySelectorAll('.payment-option').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
    });
  
    // Handle proceed button click
    const proceedButton = document.getElementById('proceedButton');
    if (proceedButton) {
      this.renderer.listen(proceedButton, 'click', () => {
        const selectedOption = document.querySelector('.payment-option.selected');
        if (selectedOption) {
          alert(`Proceeding with ${selectedOption.textContent.trim()}`);
          // Add further payment processing logic here
        } else {
          alert('Please select a payment method');
        }
      });
    }
  }
}
