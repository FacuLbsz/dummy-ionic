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
    "api_key": "RGAPI-92ba2481-3541-4de0-a28c-e93c71aa2d87",
    "api_pvp_net_url": "https://{{region}}.api.pvp.net/",
    "region_to_replace": "{{region}}",
    "api_key_to_replace": "{{api_key}}",
    "getSummonerCurrentGameInfoById": "observer-mode/rest/consumer/getSpectatorGameInfo/LA2/{{getSummonerCurrentGameInfoById}}?api_key={{api_key}}",
    "getSummonerIdByName": "api/lol/{{region}}/v1.4/summoner/by-name/{{getSummonerIdByName}}?api_key={{api_key}}"
  }

  constructor(public http: Http) {
    //this.getData();
    this.getSummonerCurrentGameInfoByName("las", "");
  }

  getSummonerCurrentGameInfoById(region: string, summonerId: number) {

    let isInMatch: boolean = true;

    if (!region) {
      //error
    }

    let pvp_net_url: string = this.conf.api_pvp_net_url;
    pvp_net_url = pvp_net_url.replace(new RegExp(this.conf.region_to_replace, 'gi'), region);

    let api_url: string = this.conf.getSummonerCurrentGameInfoById;

    api_url = api_url.replace(new RegExp(this.conf.region_to_replace, 'gi'), region);
    api_url = api_url.replace(new RegExp(this.conf.api_key_to_replace, 'gi'), this.conf.api_key);
    api_url = api_url.replace(new RegExp('{{getSummonerCurrentGameInfoById}}', 'gi'), '' + summonerId);


    console.log('URL: ' + api_url);

    pvp_net_url = pvp_net_url.concat(api_url)

    console.log('URL: ' + pvp_net_url);

    //let response: any;

    this.http.get("https://las.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/LA2/5640507?api_key=RGAPI-92ba2481-3541-4de0-a28c-e93c71aa2d87")
      .map(res => res.json())
      .subscribe(data => {
        /*if (data != null) {
          isInMatch = false;
          console.log("MODO DE status: " + data.status);
        } else {*/
        console.table(data);
        //}
      }, error => {
        console.table(error);
      });
  }

  logProperties(rej) {
    if (rej) {
      console.log('Keys:', Object.getOwnPropertyNames(rej).sort());
      Object.getOwnPropertyNames(rej).sort().forEach((element) => {
        console.log(element + ' : ' + rej[element]);
        this.logProperties(rej[element]);
      });
    }
  }

  getSummonerCurrentGameInfoByName(region: string, summoner: string) {
    return this.getSummonerCurrentGameInfoById(region, this.getSummonerIdByName(region, summoner));
  }

  getSummonerIdByName(region: string, summoner: string): number {
    return 6640877;
  }

}
