import cheerio from 'cheerio';
import nodeFetch from 'node-fetch';

import Parser from "./parser";

class Kattis extends Parser{
    baseUrl = 'https://open.kattis.com';
    public parseProblem = async (problemId: string, contestId: string): Promise<ProblemTests> => {

        
    }
    public getContestProblems = async (contestId: string): Promise<string[]> => {
        const html = await nodeFetch(this.buildContestUrl(contestId));
        const body = await html.text();
        const $ = cheerio.load(body);
        const problemIds: string[] = [];
    }

    public buildContestUrl = (contestId: string): string => {
        return `${this.baseUrl}/contests/${contestId}/problems`;
    }

    public buildProblemUrl = (problemId: string, contestId: string): string => {
        return `${this.buildContestUrl(contestId)}/${problemId}`;
    }

}

export default Kattis;