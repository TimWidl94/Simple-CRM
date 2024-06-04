export class Date {
  id: string;
  date: number;
  onlineCall: boolean;
  time: number;
  participant: string;


  constructor(obj?: any){
    this.id = obj ? obj.id : '';
    this.date = obj ? obj.date : '';
    this.onlineCall = obj ? obj.onlineCall : true;
    this.time = obj ? obj.time : '';
    this.participant = obj ? obj.participiant : '';
  }
}
