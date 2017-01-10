import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


//404 not found no se encuentra

//fransl 420931
//6452386 adrianosqui


@Injectable()
export class MyOpGGImp {

  riot_api_urls: any = '';

  conf: any = {
    api_key: '',
    api_pvp_net_url: '',
    region_to_replace: '',
    api_key_to_replace: ''
  }

  constructor(public http: Http) {
    this.getData();
  }


  getData() {
    Promise.resolve(this.http.get('assets/data/riot-api-urls.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.riot_api_urls = data;
        this.conf = data;
        this.getSummonerCurrentGameInfoByName("las", "");

      }, (rej) => { console.error("Could not load local data", rej) }));
  }

  getSummonerCurrentGameInfoById(region: string, summonerId: number) {

    let isInMatch: boolean = true;

    if (!region) {
      //error
    }

    let pvp_net_url: string = this.conf.api_pvp_net_url;
    pvp_net_url = pvp_net_url.replace(new RegExp(this.conf.region_to_replace, 'gi'), region);

    let api_url: string = this.riot_api_urls.getSummonerCurrentGameInfoById;

    api_url = api_url.replace(new RegExp(this.conf.region_to_replace, 'gi'), region);
    api_url = api_url.replace(new RegExp(this.conf.api_key_to_replace, 'gi'), this.conf.api_key);
    api_url = api_url.replace(new RegExp('{{getSummonerCurrentGameInfoById}}', 'gi'), '' + summonerId);


    console.log('URL: ' + api_url);

    pvp_net_url = pvp_net_url.concat(api_url)

    console.log('URL: ' + pvp_net_url);

    //let response: any;

    this.http.get("https://las.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/LA2/5640507?api_key=RGAPI-92ba2481-3541-4de0-a28c-e93c71aa2d87").map(res => res.json()).subscribe(data => {
      /*if (data != null) {
        isInMatch = false;
        console.log("MODO DE status: " + data.status);
      } else {*/
      console.log("MODO DE JUEGO: " + data.gameMode);
      //}
    });
  }

  getSummonerCurrentGameInfoByName(region: string, summoner: string) {
    return this.getSummonerCurrentGameInfoById(region, this.getSummonerIdByName(region, summoner));
  }

  getSummonerIdByName(region: string, summoner: string): number {
    return 6640877;
  }

}
