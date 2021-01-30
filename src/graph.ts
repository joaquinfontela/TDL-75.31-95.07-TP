const Graph = require('graphology');

/**
 * This class holds every important bit of information a subject can have.
 */
export class Subject {
    private name: string;
    private code: string;
    private credits: string;
    private correlativeCodes: string[];

    public getCode(): string { return this.code; }
    public getCredits(): string { return this.credits; }
    public getName(): string { return this.name; }
    public getCorrelatives(): string[] { return this.correlativeCodes; }

    public constructor(name: string, code: string, credits: string, correlatives: string[]) {
        this.name = name;
        this.code = code;
        this.credits = credits;
        this.correlativeCodes = correlatives;
    }
};

function listConainedInAnother(a: any[], b: any[]): boolean {
    console.log("Comparando: ", a.toString(), " con: ", b.toString());
    for (var i = 0; i < a.length; i++) {
        if (b.includes(a[i])) {
            return true;
        }
    }
    return false;
}

export class SubjectGraph {
    private adjList: Subject[] = [];

    /**
     * 
     * @param subject Pushes subject to adjacency list.
     */
    public addSubject(subject: Subject) {
        this.adjList.push(subject);
    }

    /**
     * 
     * @param code String that represents the code of the subject to be searched.
     * 
     * @returns Subject or undefined whether the subject was found or not.
     */
    private searchSubjectByCode(code: string): Subject | undefined {
        return this.adjList.find((s: Subject) => s.getCode() === code);
    }

    /**
     * Wrapper for this.searchSubjectByCode. Returns the answer if it was found,
     * throws and exception otherwise.
     * 
     * @param code String that represents the code of the subject to be searched. 
     */
    public getSubjectByCode(code: string): Subject {
        var value: Subject | undefined = this.searchSubjectByCode(code);
        if (value === undefined) {
            throw new TypeError("Couldn't find said subject.");
        } else {
            return value;
        }
    }

    /**
     * 
     * @param code Code of the subjects correlative list to be returned.
     */
    public getCorrelatives(code: string): string[] {
        return this.getSubjectByCode(code).getCorrelatives();
    }

    /**
     * DEBUG ONLY
     * 
     * This function prints the graph structure.
     */
    public printGraph() {
        for (var i = 0; i < this.adjList.length; i++) {
            var subject: Subject = this.adjList[i];
            var correlativeString: string = "";
            var correlatives: string[] = subject.getCorrelatives();
            correlatives.forEach((code: string) => {
                correlativeString += " -> " + this.getSubjectByCode(code).getName();
            });
            console.log(subject.getName() + correlativeString);
        }
    }

    private _subjectCodesNeededFor(code: string, codes: string[]): string[] {
        console.log(`Codes up to now: ${codes.toString()}`);
        this.adjList.forEach((s: Subject) => {
            let correlatives: string[] = this.getCorrelatives(code);
            let iterCode: string = s.getCode();
            if (correlatives.includes(iterCode) && !codes.includes(iterCode)) {
                codes.push(iterCode);
                codes = this._subjectCodesNeededFor(iterCode, codes);
            }
        });
        return codes;
    }

    public subjectCodesNeededFor(code: string): string[] {
        return this._subjectCodesNeededFor(code, []);
    }

    public size(): number {
        return this.adjList.length;
    }

    public subjectsICanDo(codes: string[]): string[] {
        var availables: string[] = [];
        for (var i = 0; i < this.adjList.length; i++) {
            let correlatives: string[] = this.adjList[i].getCorrelatives();
            /*if () {
                availables.push(this.adjList[i].getCode());
            }*/
            if (listConainedInAnother(codes, correlatives)) {
                availables.push(this.adjList[i].getCode());
            }
        }
        return availables;
    }
}

function test(): void {
    var graph: SubjectGraph = new SubjectGraph();
    var a1: Subject = new Subject("analisis 1", "A1", "10", []);
    var a2: Subject = new Subject("analisis 2", "A2", "20", ["A1"]);
    var a3: Subject = new Subject("analisis 3", "A3", "40", ["A2"]);
    var av: Subject = new Subject("algebra super-vectorial", "AV", "30", ["A2"]);
    var final: Subject = new Subject("gg", "FF", "90", ["AV", "A3"]);
    var f1: Subject = new Subject("fisica 1", "F1", "10", []);
    var f2: Subject = new Subject("fisica 2", "F2", "10", ["F1"]);
    graph.addSubject(a1);
    graph.addSubject(a2);
    graph.addSubject(a3);
    graph.addSubject(av);
    graph.addSubject(final);
    graph.addSubject(f1);
    graph.addSubject(f2);
    //graph.printGraph();
    //console.log(graph.subjectCodesNeededFor("FF").toString());
    console.log(graph.subjectsICanDo(["A2", "F1"]).toString());
}

//test();