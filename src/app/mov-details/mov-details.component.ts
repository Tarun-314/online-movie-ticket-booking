import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-mov-details',
  templateUrl: './mov-details.component.html',
  styleUrls: ['./mov-details.component.css']
})
export class MovDetailsComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', () => {
      const ratingInput = document.getElementById('rating') as HTMLInputElement;
      const ratingValue = document.getElementById('ratingValue') as HTMLElement;

      ratingInput.addEventListener('input', function() {
        ratingValue.textContent = `Rating: ${this.value}`;
      });
    });
  }

  ngAfterViewInit() {
    $('#trailerModal').on('hide.bs.modal', function () {
      const videoSrc = $('#trailerVideo').attr('src');
      $('#trailerVideo').attr('src', '');
      $('#trailerVideo').attr('src', videoSrc);
    });
  }
}
