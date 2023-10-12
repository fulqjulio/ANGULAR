import { v4 as uuid} from 'uuid';

export class DestinoViaje {
    
    id = uuid();
    selected: boolean;
    servicios: string[];
    votes: number;

    constructor(public nombre: string,public imageUrl: string) { 
        this.servicios = ['pileta', 'desayuno'];
        this.selected = false;
        this.votes = 0;
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