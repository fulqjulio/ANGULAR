import { v4 as uuid} from 'uuid';

export class DestinoViaje {
    
    public id = uuid();
    selected: boolean;
    servicios: string[];
    votes: number;

    constructor(public nombre: string, public imageUrl: string, selected: boolean = false, votes: number = 0) { 
        this.servicios = ['pileta', 'desayuno'];
        this.selected = selected;
        this.votes = votes;
    }
    
    public static createDestinoViaje(destino: DestinoViaje) {
        return new DestinoViaje(destino.nombre, destino.imageUrl, destino.selected, destino.votes);
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(b: boolean): DestinoViaje {
        this.selected = b;
        return this;
    }

    voteUp() {
        this.votes++;
    }
    
    voteDown() {
        this.votes--;
    }
}