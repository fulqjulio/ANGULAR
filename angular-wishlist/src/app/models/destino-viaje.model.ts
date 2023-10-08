import { v4 as uuid} from 'uuid';

export class DestinoViaje {
    id = uuid();
    selected: boolean;
    servicios: string[];

    constructor(public nombre: string,public imageUrl: string, public votes: number = 0) { 
        this.servicios = ['pileta', 'desayuno']
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(b: boolean) {
        this.selected = b;
    }

    voteUp() {
        this.votes++;
    }
    
    voteDown() {
        this.votes--;
    }
}