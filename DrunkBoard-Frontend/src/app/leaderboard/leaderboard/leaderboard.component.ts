import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {

  leadData = new MatTableDataSource(TEST_DATA);
}

export interface LeadData {
  rank: number;
  first_name: string;
  last_name?: string;
  country_iso?: string;
  alcohol: number;
  story: string;
  votes_amount: number;
  votes_average: number;
}

const TEST_DATA: LeadData[] = [
  {
    rank: 1,
    first_name: 'Joris',
    last_name: 'Chenevas',
    country_iso: 'FR',
    alcohol: 14.2,
    story: 'Joris, 8 y/o boy was found drunk af. He still can\'t walk straight since.',
    votes_amount: 4,
    votes_average: 1.2
  },
  {
    rank: 2,
    first_name: 'Nils',
    last_name: 'Krattinger',
    country_iso: 'DE',
    alcohol: 7.5,
    story: 'Nils was found sobbing in his bathtub, unconscious, his face looking his vomit in the eyes.',
    votes_amount: 14,
    votes_average: 4.5
  },
  {
    rank: 3,
    first_name: 'Lucas',
    country_iso: 'FR',
    alcohol: 4.2,
    story: 'None',
    votes_amount: 0,
    votes_average: 5
  },
  {
    rank: 4,
    first_name: 'Rémy',
    country_iso: 'TU',
    alcohol: 8.5,
    story: 'None',
    votes_amount: 0,
    votes_average: 4
  }
];
