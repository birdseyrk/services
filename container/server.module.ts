export class Server {
    public suite: string;
    public hostName: string;
    public epoch: string;
    public lastUpdate: string;
    public status: string;
    public upTime: number;
    public icon: string;

    constructor(hostName: string, suite:string,  icon:string, epoch:string, lastUpdate:string, upTime:number, status:string) {
        this.hostName = hostName;
        this.suite = suite;
        this.icon = icon;
        this.epoch = epoch;
        this.lastUpdate = lastUpdate;
        this.upTime = upTime;
        this.status = status;
    }
}