import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  public filteredData$: Subject<LeadData[]>;

  constructor(private filterService: FilterService) {
    this.filteredData$ = new Subject<LeadData[]>();
  }

  ngOnInit(): void {
    // Init
    this.filteredData$.next(MOAR_DATA);

    this.filterService.filters$.subscribe(_ => {
      this.filteredData$.next(this.filterService.filter(MOAR_DATA));
    });
  }

  ngAfterViewInit(): void {
    this.filteredData$.next(MOAR_DATA);
  }

  get testData(): LeadData[] {
    return MOAR_DATA;
  }

  appendData(data: LeadData) {
    data.id = MOAR_DATA.length + 1;
    MOAR_DATA.push(data);
  }

  removeData(i: number) {
    MOAR_DATA.splice(i);
  }
}

export interface LeadData {
  id: number;
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
    id: 1,
    first_name: 'Joris',
    last_name: 'Chenevas',
    country_iso: 'FR',
    alcohol: 14.2,
    story: 'Joris, 8 y/o boy was found drunk af. He still can\'t walk straight since.',
    votes_amount: 4,
    votes_average: 1.2
  },
  {
    id: 2,
    first_name: 'Nils',
    last_name: 'Krattinger',
    country_iso: 'DE',
    alcohol: 7.5,
    story: 'Nils was found sobbing in his bathtub, unconscious, his face looking his vomit in the eyes.',
    votes_amount: 14,
    votes_average: 4.5
  },
  {
    id: 3,
    first_name: 'Lucas',
    country_iso: 'FR',
    alcohol: 4.2,
    story: 'None',
    votes_amount: 0,
    votes_average: 5
  },
  {
    id: 4,
    first_name: 'Rémy',
    country_iso: 'TU',
    alcohol: 8.5,
    story: 'None',
    votes_amount: 0,
    votes_average: 4
  }
];

const MOAR_DATA: LeadData[] = [{
  id: 1,
  first_name: 'Pearlie',
  last_name: 'Wolf',
  country_iso: 'FJ',
  alcohol: 4.14,
  story: 'Aut magni qui facere beatae. Dolorem consequatur sed excepturi eum molestiae architecto nisi deserunt. Nam et incidunt est sunt perspiciatis explicabo magnam voluptatem.',
  votes_amount: 7,
  votes_average: 3.4286
}, {
  id: 2,
  first_name: 'Ernest',
  last_name: 'Shields',
  country_iso: 'SR',
  alcohol: 6.5,
  story: 'Et eveniet excepturi facilis eos. Voluptatem et dolor repellat rerum aut omnis id. Qui numquam nemo et non. Esse nulla est earum enim voluptatem numquam rerum velit. Suscipit minima quasi veritatis voluptatem alias maiores assumenda.',
  votes_amount: 8,
  votes_average: 2.375
}, {
  id: 3,
  first_name: 'Erwin',
  last_name: 'Predovic',
  country_iso: 'SV',
  alcohol: 8.07,
  story: 'Beatae eum assumenda eaque debitis. Enim corporis sapiente provident enim perferendis earum tempora. Atque quia sint vitae similique vero tempore.',
  votes_amount: 11,
  votes_average: 1.8182
}, {
  id: 4,
  first_name: 'Camila',
  last_name: 'Gerhold',
  country_iso: 'PG',
  alcohol: 7.89,
  story: 'Officiis quo aut rerum nesciunt inventore ea impedit. Occaecati ipsum deserunt laboriosam dolores tenetur qui vero qui. Placeat est aut ullam suscipit sint omnis rem. Quaerat accusantium repudiandae reiciendis earum necessitatibus rerum.',
  votes_amount: 17,
  votes_average: 2.4118
}, {
  id: 5,
  first_name: 'Bryce',
  last_name: 'Swaniawski',
  country_iso: 'GR',
  alcohol: 3.96,
  story: 'Aut quam unde consequuntur dicta sit quas eius. Unde aut rerum nostrum sunt temporibus voluptate. Qui laborum et voluptate quae officiis repellat.',
  votes_amount: 11,
  votes_average: 2.5455
}, {
  id: 6,
  first_name: 'Libby',
  last_name: 'Rath',
  country_iso: 'SC',
  alcohol: 10.04,
  story: 'Aut quo necessitatibus qui unde. Vero veniam sequi dolores error. Maxime consequatur tempore sapiente labore asperiores dicta aut. Commodi est dolorem et rerum quae dolorem nulla. Optio recusandae occaecati vitae tempora amet hic.',
  votes_amount: 8,
  votes_average: 2.625
}, {
  id: 7,
  first_name: 'Asa',
  last_name: 'Crooks',
  country_iso: 'NO',
  alcohol: 5.71,
  story: 'Aut quas iusto magni inventore quos. Distinctio ut aut qui aliquid. Consectetur placeat et enim provident quam est quod. Pariatur sint molestiae ratione laborum.',
  votes_amount: 9,
  votes_average: 3.2222
}, {
  id: 8,
  first_name: 'Janie',
  last_name: 'Torp',
  country_iso: 'MN',
  alcohol: 6.64,
  story: 'Excepturi et molestiae sint qui sunt pariatur. Nesciunt ad magnam id impedit repudiandae necessitatibus nam. Aut maxime libero id et aut aliquam aperiam aliquid. Voluptate adipisci animi praesentium placeat aut.',
  votes_amount: 20,
  votes_average: 2.3
}, {
  id: 9,
  first_name: 'Zander',
  last_name: 'Leuschke',
  country_iso: 'GA',
  alcohol: 8.78,
  story: 'Voluptatibus excepturi nam recusandae aut voluptas. Libero deserunt cupiditate velit quia ut consequatur omnis quia. Ut asperiores quae qui facilis.',
  votes_amount: 4,
  votes_average: 3.5
}, {
  id: 10,
  first_name: 'Elmira',
  last_name: 'Bins',
  country_iso: 'SY',
  alcohol: 12.19,
  story: 'Dicta qui et distinctio sed nam omnis totam nesciunt. Quis necessitatibus cupiditate rerum quisquam. Accusantium similique sit consectetur ratione dignissimos voluptatibus.',
  votes_amount: 8,
  votes_average: 3.5
}, {
  id: 11,
  first_name: 'Shaniya',
  last_name: 'King',
  country_iso: 'GH',
  alcohol: 0.09,
  story: 'Et et nobis consequatur consequuntur numquam delectus et. Accusantium id necessitatibus molestiae rerum. Impedit dolores dolor quaerat et. Et iure officiis culpa.',
  votes_amount: 12,
  votes_average: 2.6667
}, {
  id: 12,
  first_name: 'Noemi',
  last_name: 'Ruecker',
  country_iso: 'SR',
  alcohol: 9.7,
  story: 'Labore inventore molestiae provident omnis. Rerum laudantium sunt magnam et rerum. Saepe rerum sint unde nihil quia corrupti.',
  votes_amount: 8,
  votes_average: 3.5
}, {
  id: 13,
  first_name: 'Kaitlyn',
  last_name: 'Mayer',
  country_iso: 'PK',
  alcohol: 14.42,
  story: 'Est explicabo qui ducimus quae similique. Exercitationem numquam a aperiam est sit. Et id incidunt officia fugiat sit.',
  votes_amount: 10,
  votes_average: 2.7
}, {
  id: 14,
  first_name: 'Sebastian',
  last_name: 'Stark',
  country_iso: 'EG',
  alcohol: 6.77,
  story: 'Aut eaque dolores qui sit. Sequi qui voluptatem animi non consequatur aliquid.',
  votes_amount: 14,
  votes_average: 3
}, {
  id: 15,
  first_name: 'Meagan',
  last_name: 'Shanahan',
  country_iso: 'PS',
  alcohol: 1.92,
  story: 'Aperiam est veritatis voluptas. Sed ea in ducimus et. Cupiditate quia eum in commodi ut. Minus reiciendis rerum aliquid voluptas deserunt.',
  votes_amount: 10,
  votes_average: 2.5
}, {
  id: 16,
  first_name: 'Juliet',
  last_name: 'Stanton',
  country_iso: 'GD',
  alcohol: 1.45,
  story: 'Eum consequatur quia voluptatibus cupiditate accusamus. Possimus eligendi laborum ea non excepturi. Iusto quis perspiciatis officiis nobis atque qui.',
  votes_amount: 9,
  votes_average: 2.8889
}, {
  id: 17,
  first_name: 'Tevin',
  last_name: 'Osinski',
  country_iso: 'BI',
  alcohol: 6.59,
  story: 'Qui qui veritatis ipsam non beatae id dignissimos nostrum. Ducimus vero a eius doloremque beatae eaque perspiciatis et. Amet ut praesentium culpa animi quibusdam dolor magni.',
  votes_amount: 12,
  votes_average: 2.5833
}, {
  id: 18,
  first_name: 'Keshawn',
  last_name: 'Grant',
  country_iso: 'AI',
  alcohol: 8.14,
  story: 'Eum labore velit corporis veniam delectus in et sit. Laboriosam laborum quia ut aut est.',
  votes_amount: 11,
  votes_average: 2.6364
}, {
  id: 19,
  first_name: 'Alec',
  last_name: 'Bechtelar',
  country_iso: 'GE',
  alcohol: 1.05,
  story: 'Dolorem quasi nisi ipsum. Odit aut consequatur nihil. Error sed sit natus velit rem. Est molestiae ea et ab deleniti.',
  votes_amount: 8,
  votes_average: 2
}, {
  id: 20,
  first_name: 'Mitchell',
  last_name: 'Adams',
  country_iso: 'DM',
  alcohol: 9.24,
  story: 'Architecto labore qui facilis. Facere esse harum assumenda magnam minus aperiam. Aut aliquam est eum laboriosam. Suscipit est provident dolores vitae dolorum deserunt qui.',
  votes_amount: 15,
  votes_average: 2
}, {
  id: 21,
  first_name: 'Avis',
  last_name: 'Murray',
  country_iso: 'CA',
  alcohol: 3.51,
  story: 'Excepturi inventore dolores nam voluptatem fugit molestias libero. Incidunt aliquid voluptas iure voluptas. Sint omnis voluptatem est quia est. Excepturi vitae ullam eum ratione.',
  votes_amount: 7,
  votes_average: 2.2857
}, {
  id: 22,
  first_name: 'Ernest',
  last_name: 'McGlynn',
  country_iso: 'BI',
  alcohol: 11.01,
  story: 'Soluta exercitationem ut temporibus velit perspiciatis. Eos error in et vel in. Repudiandae qui quia et et occaecati consequatur tenetur.',
  votes_amount: 8,
  votes_average: 1.75
}, {
  id: 23,
  first_name: 'Janiya',
  last_name: 'Wisoky',
  country_iso: 'TM',
  alcohol: 6.37,
  story: 'Libero quibusdam reiciendis quod occaecati autem vitae. Minima reprehenderit laboriosam sint temporibus reiciendis perferendis tempora. Omnis necessitatibus unde iure repudiandae.',
  votes_amount: 7,
  votes_average: 3.4286
}, {
  id: 24,
  first_name: 'Rosalyn',
  last_name: 'Pacocha',
  country_iso: 'TJ',
  alcohol: 8.08,
  story: 'Voluptatem nesciunt quo recusandae ut quidem rerum et voluptatem. Dolor qui cupiditate deserunt explicabo iste officiis. Recusandae et animi ducimus enim est et eum. Laudantium ea facere sint quis.',
  votes_amount: 7,
  votes_average: 3.1429
}, {
  id: 25,
  first_name: 'Malinda',
  last_name: 'Mohr',
  country_iso: 'GF',
  alcohol: 1.73,
  story: 'Voluptate quos totam qui illo id. Voluptas rem ut mollitia dolore sapiente. Molestias voluptas quisquam odio corporis cupiditate doloribus natus. Amet non temporibus aut corrupti.',
  votes_amount: 4,
  votes_average: 2.5
}, {
  id: 26,
  first_name: 'Norris',
  last_name: 'Koelpin',
  country_iso: 'GT',
  alcohol: 13.09,
  story: 'Rem delectus corporis illum rerum eos repellat. Ut reiciendis dicta mollitia et et iure vero veniam. Adipisci quis sequi et id.',
  votes_amount: 10,
  votes_average: 2.8
}, {
  id: 27,
  first_name: 'Liana',
  last_name: 'Trantow',
  country_iso: 'TW',
  alcohol: 6.6,
  story: 'Nihil est mollitia nam ut officiis ipsa quos. Facere repudiandae labore illum amet labore sed. Laboriosam hic voluptatem eaque.',
  votes_amount: 12,
  votes_average: 3.4167
}, {
  id: 28,
  first_name: 'Talon',
  last_name: 'Homenick',
  country_iso: 'TV',
  alcohol: 1.01,
  story: 'Possimus ipsum perspiciatis qui maiores sit. Vitae maiores dolores ab maxime necessitatibus totam rerum quae. Officiis repellendus maiores id qui in voluptas.',
  votes_amount: 10,
  votes_average: 2.6
}, {
  id: 29,
  first_name: 'Norene',
  last_name: 'Predovic',
  country_iso: 'PL',
  alcohol: 2.77,
  story: 'Doloremque cumque deserunt tempore at. Labore accusantium rerum ex ipsa facere dolorem deleniti.',
  votes_amount: 15,
  votes_average: 2.4667
}, {
  id: 30,
  first_name: 'Colleen',
  last_name: 'Cummings',
  country_iso: 'ID',
  alcohol: 10.95,
  story: 'Ab aspernatur eum quia animi accusamus doloremque deserunt. Voluptas exercitationem modi corporis aspernatur magnam beatae. Atque quidem doloremque autem quis sequi libero.',
  votes_amount: 6,
  votes_average: 3
}, {
  id: 31,
  first_name: 'Javier',
  last_name: 'Schmeler',
  country_iso: 'MS',
  alcohol: 1.44,
  story: 'Rerum alias illum provident voluptatem. Optio vel nobis cum. Tenetur eum totam eligendi modi. Natus atque et ipsum quia deserunt ea fuga consequatur.',
  votes_amount: 10,
  votes_average: 2.3
}, {
  id: 32,
  first_name: 'Arno',
  last_name: 'D\'Amore',
  country_iso: 'MZ',
  alcohol: 10.27,
  story: 'Eius eius sint sint qui. Eum earum asperiores repellendus quia nesciunt quisquam.',
  votes_amount: 12,
  votes_average: 2.5
}, {
  id: 33,
  first_name: 'Elwyn',
  last_name: 'Prosacco',
  country_iso: 'MT',
  alcohol: 11.25,
  story: 'Voluptatem porro doloremque molestias. Ut eveniet sunt a ut sed quo ad. Itaque quos vero voluptatem doloremque aut eos. Ut esse dolores est voluptatum.',
  votes_amount: 5,
  votes_average: 2.2
}, {
  id: 34,
  first_name: 'Madge',
  last_name: 'Bayer',
  country_iso: 'MG',
  alcohol: 1.08,
  story: 'Aut ullam nobis modi perferendis iste voluptatum enim. Libero sed dignissimos recusandae. Dolor et veniam animi eum eos voluptatem ipsum. Mollitia magnam autem laborum blanditiis.',
  votes_amount: 11,
  votes_average: 3.6364
}, {
  id: 35,
  first_name: 'Christa',
  last_name: 'Bernier',
  country_iso: 'BI',
  alcohol: 12.49,
  story: 'Porro atque voluptate quaerat ullam quia aut consequatur. Porro sit aspernatur recusandae quos laborum est itaque. Accusamus molestiae enim voluptatem magni.',
  votes_amount: 13,
  votes_average: 2.3846
}, {
  id: 36,
  first_name: 'Giovani',
  last_name: 'Brakus',
  country_iso: 'UM',
  alcohol: 10.5,
  story: 'Nemo facere distinctio tempora laudantium et. Debitis consectetur asperiores pariatur qui.',
  votes_amount: 12,
  votes_average: 3.3333
}, {
  id: 37,
  first_name: 'Donnie',
  last_name: 'McGlynn',
  country_iso: 'JO',
  alcohol: 1.86,
  story: 'Quia numquam sed reiciendis est est et distinctio. Reiciendis eligendi et molestias quos dolores repudiandae et. Ea nostrum quasi perferendis praesentium harum voluptatum sit.',
  votes_amount: 7,
  votes_average: 3.1429
}, {
  id: 38,
  first_name: 'Cameron',
  last_name: 'Baumbach',
  country_iso: 'LI',
  alcohol: 5.17,
  story: 'Mollitia dolorum quaerat sit sint. Ratione nisi et sapiente animi consequatur et dolores. Reprehenderit occaecati quos maxime voluptatem aut.',
  votes_amount: 10,
  votes_average: 2.9
}, {
  id: 39,
  first_name: 'Caitlyn',
  last_name: 'Baumbach',
  country_iso: 'TG',
  alcohol: 4.22,
  story: 'Mollitia molestias omnis laboriosam qui voluptates voluptate consequuntur. Excepturi recusandae est consectetur. Architecto iusto labore modi a ex.',
  votes_amount: 6,
  votes_average: 2.6667
}, {
  id: 40,
  first_name: 'Jeramie',
  last_name: 'Kessler',
  country_iso: 'SJ',
  alcohol: 3.21,
  story: 'Non cumque laboriosam accusamus dolorem officiis et. Ut facilis corporis velit sit. Cupiditate deleniti eum omnis iure.',
  votes_amount: 7,
  votes_average: 2.2857
}, {
  id: 41,
  first_name: 'Kaylah',
  last_name: 'Carroll',
  country_iso: 'RS',
  alcohol: 11.62,
  story: 'Ut quasi in amet ut voluptatem ut. Ex necessitatibus sed impedit. Quaerat quis delectus quaerat corporis. Ea et minima voluptatum quos.',
  votes_amount: 9,
  votes_average: 1.8889
}, {
  id: 42,
  first_name: 'Colten',
  last_name: 'Murphy',
  country_iso: 'BW',
  alcohol: 14.61,
  story: 'Nobis dolor doloremque qui praesentium recusandae omnis ex. Nemo eos reprehenderit molestiae tenetur. Et voluptatem qui dolorem eaque facere aperiam minima enim.',
  votes_amount: 15,
  votes_average: 1.7333
}, {
  id: 43,
  first_name: 'Arnold',
  last_name: 'Grady',
  country_iso: 'TD',
  alcohol: 6.29,
  story: 'Sed voluptas perspiciatis voluptatibus nihil. Est repellendus doloremque accusamus eum magni. Natus debitis ipsam libero dolores autem. Id eaque et fugit pariatur odit velit.',
  votes_amount: 15,
  votes_average: 2.7333
}, {
  id: 44,
  first_name: 'Kaycee',
  last_name: 'Gislason',
  country_iso: 'KI',
  alcohol: 11.97,
  story: 'Qui exercitationem minima qui aut omnis accusamus. Eveniet quos cupiditate dicta fuga.',
  votes_amount: 6,
  votes_average: 1.6667
}, {
  id: 45,
  first_name: 'Esther',
  last_name: 'Denesik',
  country_iso: 'NO',
  alcohol: 1.93,
  story: 'Dignissimos aliquid voluptates nesciunt minus. Et labore et sed illum ea eos. Sunt tempora voluptas pariatur omnis et expedita tenetur qui. Quia distinctio quas quas inventore et.',
  votes_amount: 7,
  votes_average: 2.1429
}, {
  id: 46,
  first_name: 'Donny',
  last_name: 'Altenwerth',
  country_iso: 'CD',
  alcohol: 4.13,
  story: 'Porro ipsum quae laborum voluptatem aliquam. Voluptatum porro velit officia nam. Sint molestiae et quaerat distinctio.',
  votes_amount: 7,
  votes_average: 2.1429
}, {
  id: 47,
  first_name: 'Valentine',
  last_name: 'Daniel',
  country_iso: 'EG',
  alcohol: 14.49,
  story: 'Voluptatem ducimus saepe nesciunt laboriosam. Quos suscipit reprehenderit numquam quia aliquam qui.',
  votes_amount: 11,
  votes_average: 2.4545
}, {
  id: 48,
  first_name: 'Rylan',
  last_name: 'Russel',
  country_iso: 'AU',
  alcohol: 0.03,
  story: 'Et dolorem voluptates est libero. Officia ullam aut ab rerum. Expedita pariatur dolor et maiores doloremque.',
  votes_amount: 12,
  votes_average: 1.75
}, {
  id: 49,
  first_name: 'Jailyn',
  last_name: 'Kuphal',
  country_iso: 'HN',
  alcohol: 5.76,
  story: 'Non et ut officiis illum accusantium qui. Fuga sint consequuntur dicta voluptatem fugiat ducimus accusamus. Neque omnis rerum corporis molestiae et. Voluptates ipsa molestiae soluta sint libero ut.',
  votes_amount: 14,
  votes_average: 1.9286
}, {
  id: 50,
  first_name: 'Renee',
  last_name: 'Fadel',
  country_iso: 'AU',
  alcohol: 2.9,
  story: 'Ex ullam cum dolores sit sunt ea ut totam. Deleniti quae sapiente omnis dolor omnis voluptas. Delectus dolore saepe minima cupiditate et ducimus esse ut. Eos doloremque ut eum quos quis debitis ut.',
  votes_amount: 10,
  votes_average: 3.1
}, {
  id: 51,
  first_name: 'Loyal',
  last_name: 'Gulgowski',
  country_iso: 'US',
  alcohol: 2.81,
  story: 'Optio et magni praesentium sit ex tenetur omnis. Commodi officia asperiores aut iste. Voluptatem praesentium nemo aut laboriosam.',
  votes_amount: 11,
  votes_average: 3
}, {
  id: 52,
  first_name: 'Moises',
  last_name: 'Harvey',
  country_iso: 'BT',
  alcohol: 4.15,
  story: 'Expedita dolorem nobis saepe ullam et. Quasi voluptatem eius qui modi officia qui nihil. Quasi ullam est sit rem sunt quisquam tenetur. Reiciendis neque aut earum ut.',
  votes_amount: 10,
  votes_average: 2.1
}, {
  id: 53,
  first_name: 'Selina',
  last_name: 'Bode',
  country_iso: 'SD',
  alcohol: 11.79,
  story: 'Provident tempore libero aperiam molestiae sit et ducimus tempore. Voluptatem beatae atque voluptatem tempore voluptatum sit aut. Voluptatem quos qui vitae aspernatur perspiciatis consequatur officiis. Quia quibusdam saepe magnam aut modi.',
  votes_amount: 9,
  votes_average: 1.6667
}, {
  id: 54,
  first_name: 'Rollin',
  last_name: 'Olson',
  country_iso: 'US',
  alcohol: 12.2,
  story: 'Minima nisi ipsa qui molestias eum. Natus maiores consequatur modi et iure accusantium illo. Sequi quasi ullam accusantium veniam hic in quidem.',
  votes_amount: 15,
  votes_average: 1.8667
}, {
  id: 55,
  first_name: 'Paige',
  last_name: 'Daugherty',
  country_iso: 'JO',
  alcohol: 14.57,
  story: 'Unde voluptates quaerat voluptas nisi architecto assumenda. Voluptatibus perspiciatis ipsa et et amet ea itaque. Similique quis nemo non itaque placeat dolor ex.',
  votes_amount: 8,
  votes_average: 2.125
}, {
  id: 56,
  first_name: 'Valerie',
  last_name: 'Schultz',
  country_iso: 'ST',
  alcohol: 13.86,
  story: 'Est molestiae vel provident. Et esse fuga distinctio sint nobis sit dolores. Ut aut laboriosam id et delectus est iste. Nesciunt id a sit distinctio doloremque occaecati recusandae. Quo voluptate expedita quis adipisci illo rerum praesentium.',
  votes_amount: 4,
  votes_average: 2.5
}, {
  id: 57,
  first_name: 'Mathias',
  last_name: 'Miller',
  country_iso: 'BY',
  alcohol: 11.55,
  story: 'Consequatur doloribus error eligendi iure sit laudantium qui. Nulla mollitia qui maiores soluta voluptatem at quia. Quo eaque necessitatibus libero cupiditate ad quis maiores.',
  votes_amount: 12,
  votes_average: 1.1667
}, {
  id: 58,
  first_name: 'Marshall',
  last_name: 'Jacobson',
  country_iso: 'CW',
  alcohol: 1.15,
  story: 'Ratione hic omnis qui ipsum quasi et. Quo repellendus harum et possimus. Provident dicta aliquid et odio totam.',
  votes_amount: 10,
  votes_average: 2.2
}, {
  id: 59,
  first_name: 'Treva',
  last_name: 'Lindgren',
  country_iso: 'BV',
  alcohol: 6.8,
  story: 'Et quia qui et sed rerum. Nisi ex animi minima reprehenderit qui. Ratione repudiandae quisquam velit pariatur.',
  votes_amount: 9,
  votes_average: 3.2222
}, {
  id: 60,
  first_name: 'Ruby',
  last_name: 'Rodriguez',
  country_iso: 'PK',
  alcohol: 1.35,
  story: 'Quasi itaque fuga ut consequatur minima magni. Omnis maxime cumque molestiae quo hic. Rerum doloribus commodi ex.',
  votes_amount: 10,
  votes_average: 3
}, {
  id: 61,
  first_name: 'Ulises',
  last_name: 'Quitzon',
  country_iso: 'PM',
  alcohol: 8.92,
  story: 'Ipsa et nam et veritatis et exercitationem autem. Consequatur accusamus voluptatem non velit voluptatum autem. Cumque nobis ipsam dolorem temporibus aut est.',
  votes_amount: 9,
  votes_average: 1.8889
}, {
  id: 62,
  first_name: 'Rashad',
  last_name: 'Kautzer',
  country_iso: 'MX',
  alcohol: 0,
  story: 'Et accusantium delectus reprehenderit qui tempora est. Voluptatem molestiae necessitatibus illo aut qui vel. Et rerum laborum autem facere eaque consequuntur ut. Laboriosam tempora et id dolorum.',
  votes_amount: 6,
  votes_average: 2.3333
}, {
  id: 63,
  first_name: 'Stewart',
  last_name: 'Hammes',
  country_iso: 'SO',
  alcohol: 9.14,
  story: 'Exercitationem ut odit illum sed. Expedita dignissimos repellendus in beatae accusamus. Est eum quas unde qui non soluta sit.',
  votes_amount: 10,
  votes_average: 2.6
}, {
  id: 64,
  first_name: 'Eudora',
  last_name: 'Pollich',
  country_iso: 'UZ',
  alcohol: 6.95,
  story: 'Unde sint rerum nam. Velit facere quaerat non laborum dolores esse. Neque ex aut natus natus est alias. Id reprehenderit praesentium accusamus aut cum sint totam.',
  votes_amount: 8,
  votes_average: 0.5
}, {
  id: 65,
  first_name: 'Gabriel',
  last_name: 'Howell',
  country_iso: 'TM',
  alcohol: 9.45,
  story: 'Pariatur eos enim et magni fugiat magnam. Quis ut itaque illo enim. Itaque ut et repellat blanditiis. Velit aut et ut excepturi quo molestias maxime repellendus.',
  votes_amount: 12,
  votes_average: 2.5833
}, {
  id: 66,
  first_name: 'Dolly',
  last_name: 'Leffler',
  country_iso: 'SS',
  alcohol: 2.92,
  story: 'Eum quisquam facilis qui veniam rem esse iure beatae. Aut alias nam tempore delectus. Dolor cupiditate fugiat rem corrupti. Et rerum recusandae nostrum dignissimos reprehenderit. Dolores ut dolor expedita magnam.',
  votes_amount: 9,
  votes_average: 2.7778
}, {
  id: 67,
  first_name: 'Dolores',
  last_name: 'Flatley',
  country_iso: 'GN',
  alcohol: 9.57,
  story: 'Beatae ut vero molestiae temporibus vitae quo ut. Corporis laboriosam accusantium natus et et ipsa nemo. Laboriosam nemo quis commodi maiores quos amet.',
  votes_amount: 6,
  votes_average: 2.5
}, {
  id: 68,
  first_name: 'Fay',
  last_name: 'Rogahn',
  country_iso: 'CN',
  alcohol: 2.57,
  story: 'Totam culpa deserunt magnam ea non eaque quia. Necessitatibus dolores sed sunt odit. Aspernatur dicta ea ipsam facere sed est eveniet. Nisi accusantium mollitia sed neque vero aut. In architecto enim praesentium beatae praesentium.',
  votes_amount: 6,
  votes_average: 2.8333
}, {
  id: 69,
  first_name: 'Richard',
  last_name: 'Pacocha',
  country_iso: 'PM',
  alcohol: 10.8,
  story: 'Atque totam quia repudiandae aut aliquam quidem neque aut. Doloremque vel ut eaque quibusdam cupiditate dignissimos quam. Aut tenetur animi iusto id recusandae non fugiat. Natus in dolore impedit quisquam.',
  votes_amount: 11,
  votes_average: 2.1818
}, {
  id: 70,
  first_name: 'Katherine',
  last_name: 'Smith',
  country_iso: 'SZ',
  alcohol: 0.74,
  story: 'Nobis fuga soluta ratione id error sapiente rerum debitis. Rem dolores fuga iure et eius ad laudantium et. Sed nemo ab laboriosam quis eum minus sit saepe. Aspernatur et ut quidem id quibusdam adipisci delectus ratione.',
  votes_amount: 16,
  votes_average: 2.8125
}, {
  id: 71,
  first_name: 'Terry',
  last_name: 'Wehner',
  country_iso: 'TG',
  alcohol: 3.56,
  story: 'Necessitatibus qui voluptatem incidunt quidem nihil officia vitae. Laborum incidunt qui adipisci veritatis qui. Excepturi quam eos eos qui eum. Vel atque et debitis.',
  votes_amount: 8,
  votes_average: 2.375
}, {
  id: 72,
  first_name: 'Ivah',
  last_name: 'Hyatt',
  country_iso: 'IE',
  alcohol: 4.65,
  story: 'Et inventore harum aut. Dolore consequatur soluta modi. Perspiciatis itaque quam quos vero qui. Sequi dolore alias consequuntur voluptatibus quo asperiores recusandae accusamus.',
  votes_amount: 11,
  votes_average: 2.4545
}, {
  id: 73,
  first_name: 'Sophie',
  last_name: 'Shanahan',
  country_iso: 'JO',
  alcohol: 11.69,
  story: 'Asperiores accusamus explicabo explicabo sapiente molestiae ducimus ut. Et ex corporis fuga ratione animi dolores. Excepturi est laborum ab est. Blanditiis aperiam voluptate quas odio dolor quasi et odit. Provident natus dolores quo distinctio dolores et optio maiores.',
  votes_amount: 13,
  votes_average: 2.2308
}, {
  id: 74,
  first_name: 'Cleora',
  last_name: 'Corkery',
  country_iso: 'GW',
  alcohol: 14.19,
  story: 'Enim impedit molestiae nulla alias placeat eum eos. Quasi modi nisi possimus veniam itaque. Quis officiis ut optio rerum.',
  votes_amount: 10,
  votes_average: 2.7
}, {
  id: 75,
  first_name: 'Alberta',
  last_name: 'Schinner',
  country_iso: 'DJ',
  alcohol: 12.73,
  story: 'Ipsa eveniet non dolore voluptate. Voluptatem voluptatem omnis velit voluptates. Eius ut nesciunt quidem et dolorem quae. Eaque voluptas quaerat perspiciatis exercitationem ea deleniti.',
  votes_amount: 11,
  votes_average: 2.9091
}, {
  id: 76,
  first_name: 'Sidney',
  last_name: 'Sipes',
  country_iso: 'AI',
  alcohol: 1.01,
  story: 'Itaque repellendus est atque molestiae quia pariatur. Nihil corporis voluptate id nihil rerum tempore. Illum quibusdam aspernatur vero quod sint expedita.',
  votes_amount: 12,
  votes_average: 1.75
}, {
  id: 77,
  first_name: 'Cathy',
  last_name: 'Nitzsche',
  country_iso: 'GR',
  alcohol: 0.73,
  story: 'Recusandae minus et eos architecto expedita officia nihil. Deleniti officia odio ea officia. Cumque voluptatum repellendus placeat mollitia. Saepe et saepe sit consequatur rerum quas.',
  votes_amount: 12,
  votes_average: 3.1667
}, {
  id: 78,
  first_name: 'Euna',
  last_name: 'Ernser',
  country_iso: 'JE',
  alcohol: 1.83,
  story: 'Aliquam suscipit et qui voluptatum at vitae ipsa. Libero beatae delectus dolorum aut quos voluptatibus eveniet. Minima aut sit corporis voluptatem exercitationem quo officia. Molestiae eveniet labore impedit et ad magnam assumenda. Laborum voluptatem corrupti rerum libero.',
  votes_amount: 11,
  votes_average: 2.2727
}, {
  id: 79,
  first_name: 'Sarah',
  last_name: 'Lockman',
  country_iso: 'KP',
  alcohol: 9.61,
  story: 'Est mollitia error adipisci sapiente a unde. Tenetur et ex adipisci deleniti atque unde qui. Repudiandae maxime id id enim dolor. Numquam maxime reprehenderit explicabo dolore.',
  votes_amount: 14,
  votes_average: 2.5
}, {
  id: 80,
  first_name: 'Vaughn',
  last_name: 'Schultz',
  country_iso: 'TL',
  alcohol: 7.93,
  story: 'Quis deleniti illo quia ullam. Quae quas mollitia ea eveniet. Repellat veritatis sint vel possimus dolorem deserunt minima. Quibusdam enim ipsum corrupti consequatur architecto non.',
  votes_amount: 11,
  votes_average: 2.9091
}, {
  id: 81,
  first_name: 'Melany',
  last_name: 'Beier',
  country_iso: 'UM',
  alcohol: 4.88,
  story: 'Recusandae culpa voluptas asperiores et soluta. Sit consequatur atque porro recusandae quia. In atque aut accusantium nesciunt cupiditate molestias rerum.',
  votes_amount: 8,
  votes_average: 2.5
}, {
  id: 82,
  first_name: 'Gay',
  last_name: 'Reinger',
  country_iso: 'JM',
  alcohol: 9.68,
  story: 'Qui animi et et. Odio voluptates et dicta nesciunt ut quis quaerat aut. Eos in commodi numquam qui pariatur. Est soluta non nisi id.',
  votes_amount: 15,
  votes_average: 2.6667
}, {
  id: 83,
  first_name: 'Ervin',
  last_name: 'Hilpert',
  country_iso: 'LI',
  alcohol: 0.96,
  story: 'Veritatis temporibus delectus cupiditate optio illo. Autem iusto atque qui hic totam veniam consequuntur. Voluptas magni sequi aliquam assumenda aperiam pariatur est.',
  votes_amount: 7,
  votes_average: 2.1429
}, {
  id: 84,
  first_name: 'Otha',
  last_name: 'Pfeffer',
  country_iso: 'RS',
  alcohol: 2.86,
  story: 'Ut repellat soluta consectetur quis molestias. Quam non placeat vitae corrupti autem exercitationem quae. Ad et sapiente ad aut molestiae est. Ut veritatis ducimus et sit et libero.',
  votes_amount: 7,
  votes_average: 4.1429
}, {
  id: 85,
  first_name: 'Bobby',
  last_name: 'Collins',
  country_iso: 'CI',
  alcohol: 2.11,
  story: 'Omnis cumque et sint tempore provident ut voluptate. Fugiat atque sed eos inventore vel inventore adipisci iusto. Explicabo et officia ratione aut iure qui ut. Aperiam autem cum beatae quae voluptatibus.',
  votes_amount: 16,
  votes_average: 1.8125
}, {
  id: 86,
  first_name: 'Justine',
  last_name: 'Mayer',
  country_iso: 'AD',
  alcohol: 12.98,
  story: 'Quae magni quia dolor quae non. Ut ratione eligendi quam quasi minus voluptas nisi. Inventore aut sed explicabo minima ex in quasi. Enim nisi laudantium numquam amet in soluta aliquam.',
  votes_amount: 12,
  votes_average: 2.5833
}, {
  id: 87,
  first_name: 'Willis',
  last_name: 'Fay',
  country_iso: 'PS',
  alcohol: 1.13,
  story: 'Eveniet occaecati sapiente voluptate magni illo. Qui voluptas voluptatem vero qui velit voluptas. Error nisi corporis occaecati ut velit soluta. Impedit rerum corporis minus est.',
  votes_amount: 12,
  votes_average: 3.8333
}, {
  id: 88,
  first_name: 'Gregoria',
  last_name: 'Kuhic',
  country_iso: 'LV',
  alcohol: 4.48,
  story: 'Est ad aspernatur minima ipsum optio. Beatae fugit est et sit. Ipsa tenetur mollitia laborum voluptatibus sed.',
  votes_amount: 7,
  votes_average: 2.4286
}, {
  id: 89,
  first_name: 'Elise',
  last_name: 'Robel',
  country_iso: 'ET',
  alcohol: 11.16,
  story: 'In voluptas qui doloremque. Odit dolor aliquid hic beatae aliquid rerum. Laboriosam ipsum repellendus iure nam. Maiores facilis quaerat dolores facere nihil commodi et.',
  votes_amount: 2,
  votes_average: 2
}, {
  id: 90,
  first_name: 'Gunnar',
  last_name: 'Wolf',
  country_iso: 'IL',
  alcohol: 1.7,
  story: 'Voluptatem expedita qui expedita. Libero a quam accusantium.',
  votes_amount: 10,
  votes_average: 2.6
}, {
  id: 91,
  first_name: 'Gaylord',
  last_name: 'Kris',
  country_iso: 'GY',
  alcohol: 7.54,
  story: 'Molestiae cupiditate et inventore suscipit dolores repellendus. Exercitationem dolor sint ipsum laborum excepturi minima sit. Praesentium fuga quis ipsum optio quasi.',
  votes_amount: 10,
  votes_average: 3.3
}, {
  id: 92,
  first_name: 'Breanne',
  last_name: 'Feest',
  country_iso: 'AO',
  alcohol: 2.94,
  story: 'Voluptatibus aut suscipit sapiente nemo. Consectetur facilis non sed non id possimus omnis tenetur. Saepe delectus voluptatum id et esse et. Perferendis adipisci neque beatae eveniet.',
  votes_amount: 11,
  votes_average: 2.7273
}, {
  id: 93,
  first_name: 'Anderson',
  last_name: 'Haley',
  country_iso: 'NF',
  alcohol: 14.59,
  story: 'Repellendus odit reprehenderit dolore eveniet perferendis accusantium. Non consequatur eos sed eum id ad. Et maiores cupiditate excepturi ad non. Culpa totam consequuntur dolores exercitationem inventore corrupti autem recusandae.',
  votes_amount: 10,
  votes_average: 2.4
}, {
  id: 94,
  first_name: 'Rodrigo',
  last_name: 'Dach',
  country_iso: 'CZ',
  alcohol: 3.53,
  story: 'Totam porro sed ducimus. Quia voluptatem quibusdam officiis earum. Omnis illo dolore beatae. Aspernatur modi eaque id rerum quam.',
  votes_amount: 15,
  votes_average: 2.2667
}, {
  id: 95,
  first_name: 'Rafaela',
  last_name: 'Herman',
  country_iso: 'IQ',
  alcohol: 3.49,
  story: 'Iste porro sed iste laboriosam saepe. Laudantium ducimus sapiente suscipit vel qui. Tempore voluptas unde voluptatem asperiores et voluptatibus sequi. Nam quod quas eius cum dolore aperiam.',
  votes_amount: 13,
  votes_average: 2.6154
}, {
  id: 96,
  first_name: 'Mark',
  last_name: 'Kihn',
  country_iso: 'GA',
  alcohol: 8.87,
  story: 'Ut et et ut ut nemo ab. Maxime ducimus fuga provident eum pariatur iusto nobis.',
  votes_amount: 10,
  votes_average: 2
}, {
  id: 97,
  first_name: 'Garnet',
  last_name: 'Vandervort',
  country_iso: 'AT',
  alcohol: 11.75,
  story: 'Blanditiis qui ea et voluptatum. Tenetur nam nobis eligendi officia assumenda. Quod rerum ex delectus. Quia porro tempore rerum saepe. Culpa laborum doloremque praesentium.',
  votes_amount: 12,
  votes_average: 1.75
}, {
  id: 98,
  first_name: 'Shemar',
  last_name: 'Corkery',
  country_iso: 'BA',
  alcohol: 4.01,
  story: 'Iure laboriosam velit ab autem quae ut. Nihil modi impedit aliquid ab quam placeat. Quia magnam eos omnis labore nobis exercitationem veniam.',
  votes_amount: 6,
  votes_average: 2.8333
}, {
  id: 99,
  first_name: 'Arlie',
  last_name: 'Paucek',
  country_iso: 'ZW',
  alcohol: 2.63,
  story: 'Ad quis repellat esse aliquam eos accusantium. Aut suscipit aut tempore laudantium eaque ducimus. Commodi a qui similique. Tempore numquam soluta quod tempore atque deserunt ut.',
  votes_amount: 9,
  votes_average: 1.8889
}, {
  id: 100,
  first_name: 'Deven',
  last_name: 'Wilderman',
  country_iso: 'TV',
  alcohol: 7.69,
  story: 'Est officia veritatis facere omnis omnis. Voluptatum cum et amet veniam. Occaecati nostrum ullam et dolor quia et. Labore et ut corrupti et nihil soluta dolore.',
  votes_amount: 7,
  votes_average: 2.5714
}];
