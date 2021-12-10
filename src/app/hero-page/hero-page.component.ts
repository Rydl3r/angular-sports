import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss']
})
export class HeroPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSports()
  }

  sportsList: any = []
  oddsList: any = []

  inputForm = new FormGroup({
    selectedSport: new FormControl(''),
    region: new FormControl(''),
  });

  getSports() {
    this.http.get("https://odds.p.rapidapi.com/v1/sports", {
      "headers": {
        "x-rapidapi-host": "odds.p.rapidapi.com",
        "x-rapidapi-key": "1b9baa5472msh867d9bc3d0cfec6p1a24cfjsnab59d1f4ae66"
      }
    }).subscribe((data: any) => {
      this.sportsList = data.data
    })
  }

  fetchSports() {
    this.http.get(`https://odds.p.rapidapi.com/v1/odds?sport=${this.inputForm.value.selectedSport}&region=${this.inputForm.value.region}&mkt=h2h&dateFormat=iso&oddsFormat=decimal`, {
      "headers": {
        "x-rapidapi-host": "odds.p.rapidapi.com",
        "x-rapidapi-key": "1b9baa5472msh867d9bc3d0cfec6p1a24cfjsnab59d1f4ae66"
      }
    }).subscribe((data: any) => {
      this.oddsList = data.data
    })
  }

  convertDate(date: string) {
    let converted = new Date(date).toLocaleString()
    return converted.substring(0, converted.length - 3)
  }
}
