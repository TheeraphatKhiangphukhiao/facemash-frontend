export interface PhotoModelHasGraph {
    PID:                number;
    name:               string;
    photo_url:          string;
    score:              number;
    UID:                number;
    rank:               number;
    wins:               number;
    loses:              number;
    days:               string[];
    ranking_graph:      number[];
    score_wins_graph:   number[];
    score_loses_graph:  number[];
    wins_amount_graph:  number[];
    loses_amount_graph: number[];
}