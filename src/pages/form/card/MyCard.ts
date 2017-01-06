export class Card {

  public title: string;
  public content: string;
  public img: string;
  public description:string;

  constructor(title, description, img) {
    this.title = title;
    this.description = description;
    this.img = img;
  }

  setContent(content:string){
    this.content=content;
  }

}