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
    "getSummonerCurrentGameInfoById": "observer-mode/rest/consumer/getSpectatorGameInfo/{{region}}/{{getSummonerCurrentGameInfoById}}?api_key={{api_key}}",
    "getSummonerIdByName": "api/lol/{{region}}/v1.4/summoner/by-name/{{getSummonerIdByName}}?api_key={{api_key}}"
  }

  constructor(public http: Http) {
    this.getSummonerCurrentGameInfoByName("na", "imaqtpie");
  }


  getUrlFormmated(getUrl: string, region: string, keyToReplace: string, dataToReplace: any, api_key: string, replacer: RegionReplacer): string {

    let pvp_net_url: string = this.conf.api_pvp_net_url;
    pvp_net_url = pvp_net_url.replace(new RegExp(this.conf.region_to_replace, 'gi'), region);

    let api_url: string = getUrl;

    api_url = api_url.replace(new RegExp(this.conf.region_to_replace, 'gi'), replacer.getRegionByName(region));
    api_url = api_url.replace(new RegExp(this.conf.api_key_to_replace, 'gi'), api_key);
    api_url = api_url.replace(new RegExp(keyToReplace, 'gi'), '' + dataToReplace);


    console.log('URL: ' + api_url);

    pvp_net_url = pvp_net_url.concat(api_url)

    return pvp_net_url;
  }

  getSummonerCurrentGameInfoById(region: string, summonerId: number) {

    if (!region) {
      //error
    }

    let api_url: string = this.conf.getSummonerCurrentGameInfoById;

    let pvp_net_url: string = this.getUrlFormmated(api_url, region, '{{getSummonerCurrentGameInfoById}}', summonerId, this.conf.api_key, new ReplacerForCurrentGame());


    console.log('URL: ' + pvp_net_url);

    this.http.get(pvp_net_url)
      .map(res => res.json())
      .subscribe(data => {
        console.table(data);
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
    if (!region) {
      //error
    }

    let api_url: string = this.conf.getSummonerIdByName;
    let pvp_net_url: string = this.getUrlFormmated(api_url, region, '{{getSummonerIdByName}}', summoner, this.conf.api_key, new ReplacerForSummonerId());

    let id: number;

    console.log('URL: ' + pvp_net_url);

    this.http.get(pvp_net_url)
      .map(res => res.json())
      .subscribe(data => {
        console.table(data);
        id = data.id;
      }, error => {
        console.table(error);
      });
    return id;
  }

}

export interface RegionReplacer {

  getRegionByName(region): string;


}

export class ReplacerForCurrentGame implements RegionReplacer {

  getRegionByName(region: string): string {

    switch (region.toLowerCase()) {
      case 'las':
        return 'LA2';
      case 'lan':
        return 'LA1';
      case 'br':
        return 'BR!';
      case 'eun':
        return 'EUN1';
      case 'euw':
        return 'EUW1';
      case 'jp':
        return 'JP1';
      case 'kr':
        return 'KR';
      case 'na':
        return 'NA1';
      case 'oc':
        return 'OC1';
      case 'pbe':
        return 'PBE1';
      case 'ru':
        return 'RU';
      case 'tr':
        return 'TR1';
      default:
        break;

    }
  }
}

export class ReplacerForSummonerId implements RegionReplacer {

  getRegionByName(region: string): string {

    return region;
  }
}
