import { Base } from './base';

export class Subject extends Base {
    
    constructor(private subjectId,
                private name
    ) {
        super();
    }
}
